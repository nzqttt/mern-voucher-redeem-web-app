// src/models/users.model.js

module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const schema = new Schema(
    {
      email: { type: String, unique: true, required: true },
      name: { type: String, required: true },   // ✅ must be defined
      password: { type: String },
      username: { type: String },
      profileImage: { type: String },
      isActive: { type: Boolean, default: true },
      points: { type: Number, default: 0 },
      phoneNumber: { type: String },
      address: { type: String },
      aboutMe: { type: String },
      role: { type: String, default: "user" },

      // ✅ Add this field to support registration logic
      status: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    }
  );
  

  // This line prevents model overwrite error in hot reload
  if (mongooseClient.modelNames().includes(modelName)) {
    return mongooseClient.model(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
