module.exports = function (app) {
  const modelName = "cartItems";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      voucherId: { type: Schema.Types.ObjectId, ref: "vouchers", required: true },


      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
        index: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
        default: 1,
      },
      points: {
        type: Number,
        required: true,
        min: 0,
      },
      status: {
        type: String,
        required: true,
        enum: ['pending', 'redeemed'],
        default: 'pending',
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
