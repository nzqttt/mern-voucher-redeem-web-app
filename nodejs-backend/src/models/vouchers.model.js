module.exports = function (app) {
  const modelName = "vouchers";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      id: { type: String, maxLength: 150, index: true, trim: true },
      categoryId: { type: Schema.Types.ObjectId, ref: 'category', index: true },
      points: { type: Number, required: false, max: 10000000 },
      title: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      expiryDate: { type: Date, required: false },
      termsCondition: { type: String, required: true },
      isLatest: { type: Boolean, required: false },

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
