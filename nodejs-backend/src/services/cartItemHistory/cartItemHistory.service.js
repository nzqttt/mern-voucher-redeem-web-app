const { CartItemHistory } = require("./cartItemHistory.class");
const createModel = require("../../models/cartItemHistory.model");
const hooks = require("./cartItemHistory.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use("/cartItemHistory", new CartItemHistory(options, app));
  
  // Add a method to create history from cart items
  app.service('cartItemHistory').createFromCart = async function(cartItems, userId) {
    if (!cartItems || !cartItems.length) {
      return [];
    }
    
    const historyItems = cartItems.map(item => ({
      voucherId: item.voucherId,
      userId: userId,
      quantity: item.quantity,
      points: item.points,
      status: 'redeemed',
      completedDate: new Date().toISOString(),
      createdBy: userId,
      updatedBy: userId
    }));
    
    return this.create(historyItems);
  };

  // Get our initialized service so that we can register hooks
  const service = app.service("cartItemHistory");

  // Get the schema of the collections
  app.get("/cartItemHistorySchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map((key) => {
      return {
        field: key,
        properties: schema[key],
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};
