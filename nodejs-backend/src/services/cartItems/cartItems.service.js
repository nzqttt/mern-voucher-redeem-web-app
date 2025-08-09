// src/services/cart-items/cart-items.service.js

const { CartItems } = require('./cartItems.class');
const createModel = require('../../models/cartItems.model');
const hooks = require('./cartItems.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['create', 'patch', 'remove'],   // ✅ Allow multiple operations
    whitelist: ['$populate'],              // ✅ Allow client to use $populate
  };

  // Initialize our service with any options it requires
  app.use('/cartItems', new CartItems(options, app));

  // Get our initialized service to register hooks
  const service = app.service('cartItems');
  service.hooks(hooks);
};
