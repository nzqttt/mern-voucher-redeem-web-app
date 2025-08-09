const { authenticate } = require("@feathersjs/authentication").hooks;
const { hashPassword, protect } = require("@feathersjs/authentication-local").hooks;
const { disallow } = require("feathers-hooks-common");

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [
      hashPassword("password"), // Allow public signup
    ],
    update: [disallow()],
    patch: [authenticate("jwt"), hashPassword("password")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [protect("password")],
    find: [],
    get: [],
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
