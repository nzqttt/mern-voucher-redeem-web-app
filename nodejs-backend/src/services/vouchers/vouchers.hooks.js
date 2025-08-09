const { authenticate } = require("@feathersjs/authentication").hooks;
const { populate } = require("feathers-hooks-common");

const categorySchema = {
  include: {
    service: "category",
    nameAs: "categoryId",   // this will replace the ObjectId with the full category object
    parentField: "categoryId",
    childField: "_id"
  }
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [populate({ schema: categorySchema })],
    get: [populate({ schema: categorySchema })],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
