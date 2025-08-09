// ✅ CORRECTED uploader.service.js

const { Uploader } = require("./uploader.class");
const hooks = require("./uploader.hooks");

module.exports = function (app) {
  const options = {
    paginate: app.get("paginate"),
  };

  // ✅ Register the service without a third argument
  app.use("/uploader", new Uploader(options, app));

  // Register hooks
  const service = app.service("uploader");
  service.hooks(hooks);
};
