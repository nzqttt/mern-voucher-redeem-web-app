const { Queue, Worker } = require("bullmq");
const connection = require("../services/redis/config");
const _ = require("lodash");
const config = require("../resources/config.json");
const standard = require("../resources/standard.json");

// Create and export the job queue
const jobQueue = new Queue("jobQueue", { connection });

// Create and export the worker
const createJobQueWorker = (app) => {
  const worker = new Worker(
    "jobQueue",
    async (job) => {
      const { data } = job;
      // console.log(app.authorization);
      // Add your job processing logic
      // console.log(id, data);
      // console.log("service", data.fromService);
      const sourceData = await app.service(data.fromService).find({});
      // console.log(sourceData.data.length);
      const destinationData = await app.service(data.toService).find({});
      // console.log(destinationData.data.length);
      let destinationFields = _.find(config.services, {
        serviceName: data.toService,
      });
      if (!destinationFields) {
        destinationFields = _.find(standard.services, {
          serviceName: data.toService,
        });
      }
      // console.log(destinationFields);
      const dynaFields = await app
        .service("dynaFields")
        .find({ query: { dynaLoader: data.dynaLoaderId } });
      // console.log(data.dynaLoaderId);
      // console.log(dynaFields.data);
      const referenceIds = _.filter(dynaFields.data, {
        toType: "ObjectId",
      });
      // console.log("referenceIds",referenceIds);
      const results = await Promise.all(
        referenceIds.map((ref) => app.service(ref.toRefService).find({})),
      );
      const referenceData = {};
      referenceIds.forEach(
        (ref, i) => (referenceData[ref.toRefService] = results[i].data),
      );

      const inserts = [];
      sourceData.data.forEach((row) => {
        const _data = {};
        destinationFields.schemaList.forEach((field) => {
          const dynaField = _.find(dynaFields.data, {
            to2: field.fieldName,
          });
          if (dynaField.from && row[dynaField.from]) {
            if (
              dynaField.toType === "ObjectId" &&
              dynaField.identifierFieldName
            ) {
              const query = {};
              query[dynaField.identifierFieldName] = row[dynaField.from];
              const _value = _.find(
                referenceData[dynaField.toRefService],
                query,
              );
              if (_value) {
                _data[field.fieldName] = _value._id;
              } else {
                _data[field.fieldName] = null;
              }
            } else if (dynaField.toType === "Date") {
              const dateParsed = Date.parse(row[dynaField.from]) || new Date();
              _data[field.fieldName] = new Date(dateParsed);
            } else {
              _data[field.fieldName] = row[dynaField.from] || null;
            }
          }
        });
        _data["createdBy"] = data.createdBy;
        _data["updatedBy"] = data.updatedBy;
        inserts.push(_data);
      });

      let patchination = [];
      destinationData.data.forEach((row) => {
        delete row.createdBy;
        delete row.updatedBy;
        delete row._id;
        delete row.createdAt;
        delete row.updatedAt;
        delete row.__v;

        // console.log(row)
        const rowIndexData = _.findIndex(inserts, { ...row }, 0);
        // console.log(rowIndexData)
        // if (rowIndexData >= 0) destination = inserts.splice(rowIndexData, 1);
        // else
        patchination.push(inserts[rowIndexData]);
      });
      // console.log(inserts);
      // console.log(destination.length);

      if (inserts.length > 0) {
        await app.service(data.toService).create(inserts);
      } else {
        console.debug("nothing to create");
      }
    },
    { connection },
  );

  // Event listeners for worker
  worker.on("completed", (job) => {
    console.debug(`JobQue ${job.id} completed successfully`);
    if (job.data) {
      try {
        app.service("jobQues").patch(job.data._id, {
          end: new Date(),
          status: true,
          jobId: job.id,
        });
        const _mail = {
          name: job.data.name.replaceAll(" ", "_").replace("=>", ""),
          type: "dynaloader",
          from: "info@cloudbasha.com",
          recipients: [job.data.email],
          status: true,
          subject: "job processing",
          templateId: "onDynaLoader",
        };
        app.service("mailQues").create(_mail);
      } catch (error) {
        console.error(error);
        throw Error(error);
      }
    } else {
      console.debug(`Job success but ${job.data} data not found`);
    }
  });

  worker.on("failed", async (job, err) => {
    console.error(`JobQue ${job.id} failed with error ${err.message}`);
    if (job.data) {
      app.service("jobQues").patch(job.data._id, {
        end: new Date(),
        jobId: job.id,
      });
    } else {
      console.error(`Job error and ${job.data} data not found`);
    }
    if (err.message === "job stalled more than allowable limit") {
      await job.remove().catch((err) => {
        console.error(
          `jobId: ${job.id} ,  remove error : ${err.message} , ${err.stack}`,
        );
      });
    }
  });

  const jobQueService = app.service("jobQues");
  jobQueService.hooks({
    after: {
      create: async (context) => {
        const { result } = context;
        await jobQueue.add("dynaLoader", result);
        return context;
      },
    },
  });
};

module.exports = { createJobQueWorker };
