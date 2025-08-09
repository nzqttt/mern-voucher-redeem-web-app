const { Service } = require("feathers-mongoose");

exports.CartItemHistory = class CartItemHistory extends Service {
  // Custom methods for CartItemHistory service
  
  // Override the create method to ensure proper data handling
  async create(data, params) {
    // If data is an array, process each item
    if (Array.isArray(data)) {
      return Promise.all(data.map(item => this.create(item, params)));
    }
    
    // Ensure required fields are present
    if (!data.voucherId) {
      throw new Error('voucherId is required');
    }
    
    if (!data.userId) {
      throw new Error('userId is required');
    }
    
    if (!data.quantity) {
      throw new Error('quantity is required');
    }
    
    if (!data.points) {
      throw new Error('points is required');
    }
    
    // Set default values if not provided
    if (!data.status) {
      data.status = 'redeemed';
    }
    
    // Set completedDate if not provided
    if (!data.completedDate) {
      data.completedDate = new Date().toISOString();
    }
    
    // Set createdBy and updatedBy if not provided
    if (params.user && params.user._id) {
      if (!data.createdBy) {
        data.createdBy = params.user._id;
      }
      
      if (!data.updatedBy) {
        data.updatedBy = params.user._id;
      }
    }
    
    return super.create(data, params);
  }
};
