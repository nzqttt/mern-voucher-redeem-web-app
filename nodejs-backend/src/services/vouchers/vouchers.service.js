const { Vouchers } = require("./vouchers.class");
const createModel = require("../../models/vouchers.model");
const hooks = require("./vouchers.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use("/vouchers", new Vouchers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("vouchers");

  // Get the schema of the collections
  app.get("/vouchersSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map((key) => {
      return {
        field: key,
        properties: schema[key],
      };
    });
    return response.status(200).json(result);
  });

  // Attach the default hooks first
  service.hooks(hooks);
};
