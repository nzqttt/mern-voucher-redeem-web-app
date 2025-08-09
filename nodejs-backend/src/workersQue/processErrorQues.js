const { Queue, Worker } = require("bullmq");
const connection = require("../services/redis/config");

// Create and export the job queue
const jobQueue = new Queue("errorQues", { connection });

// Create and export the worker
const createErrorsJobWorker = (app) => {
  const worker = new Worker(
    "errorQues",
    async (job) => {
      const { id, data } = job;
      // Add your job processing logic
      console.log(id, data);
    },
    { connection },
  );

  // Event listeners for worker
  worker.on("completed", (job) => {
    console.debug(`Job ${job.id} completed successfully`);
    if (job.data) {
      try {
        app.service("errorQues").patch(job.data._id, {
          end: new Date(),
          status: true,
          jobId: job.id,
        });
      } catch (error) {
        console.error(error);
        throw Error(error);
      }
    } else {
      console.debug(`Job success but ${job.data} data not found`);
    }
  });

  worker.on("failed", async (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`);
    if (job.data) {
      await app.service("errorQues").patch(job.data._id, {
        end: new Date(),
        jobId: job.id,
        error: err.message,
      });
      const _mail = {
        name: "on_error_job_que_worker",
        type: "errors",
        from: "info@cloudbasha.com",
        recipients: [job.data.email],
        status: false,
        data: { ...job.data },
        subject: "error processing failed",
        templateId: "onError",
        errorMessage: err.message,
      };
      app.service("mailQues").create(_mail);
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

  const errorQueService = app.service("errorQues");
  errorQueService.hooks({
    error: {
      all: async (context) => {
        const { result } = context;
        await jobQueue.add("errorQues", result);
        return context;
      },
    },
  });
};

module.exports = { createErrorsJobWorker };
