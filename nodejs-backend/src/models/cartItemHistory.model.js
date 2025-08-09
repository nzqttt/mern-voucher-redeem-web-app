module.exports = function (app) {
  const modelName = "cart_item_history";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      id: { type: String, maxLength: 150, index: true, trim: true },
      voucherId: { type: Schema.Types.ObjectId, ref: 'vouchers', required: true, index: true },
      userId: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
      quantity: { type: Number, required: true, min: 1 },
      points: { type: Number, required: true, min: 0 },
      status: { type: String, required: true, enum: ['pending', 'redeemed'], default: 'redeemed' },
      completedDate: { type: String, required: true },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
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
