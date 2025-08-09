const { authenticate } = require("@feathersjs/authentication").hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate("jwt"),
      (context) => {
        const { req, res } = context.params;

        if (!req || !res) {
          throw new Error("Missing req/res in params. Make sure you're using REST.");
        }

        // Inject into context.data so the service class can access it
        context.data = {
          ...context.data,
          req,
          res,
        };

        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
  },
};
