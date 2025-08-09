const { BadRequest } = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async (context) => {
        const { app, data } = context;
        const { userId, points } = data;

        if (!userId || typeof points !== "number") {
          throw new BadRequest("userId and points are required.");
        }

        // ✅ Fetch current user
        const user = await app.service("users").get(userId);
        const currentPoints = user.points || 0;

        // ✅ Validate sufficient points
        if (currentPoints < points) {
          throw new BadRequest("Insufficient points.");
        }

        // ✅ Deduct points
        await app.service("users").patch(userId, {
          points: currentPoints - points,
        });

        // Continue to create redemption record
        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};