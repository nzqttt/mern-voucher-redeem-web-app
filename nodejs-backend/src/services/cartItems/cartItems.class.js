// cart-items.class.js
const { Service } = require("feathers-mongoose");
const { NotFound, BadRequest } = require('@feathersjs/errors');

exports.CartItems = class CartItems extends Service {
  // Custom methods for CartItems service
  
  // Override the create method to ensure proper data handling
  async create(data, params) {
    // If data is an array, process each item
    if (Array.isArray(data)) {
      return Promise.all(data.map(item => this.create(item, params)));
    }
    
    // Ensure required fields are present
    if (!data.voucherId) {
      throw new BadRequest('voucherId is required');
    }
    
    if (!data.userId) {
      throw new BadRequest('userId is required');
    }
    
    if (!data.points) {
      throw new BadRequest('points is required');
    }
    
    // Set default values if not provided
    if (!data.status) {
      data.status = 'pending';
    }
    
    if (!data.quantity) {
      data.quantity = 1;
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
    
    try {
      // Check if voucher exists
      const voucher = await this.app.service('vouchers').get(data.voucherId);
      if (!voucher) {
        throw new NotFound(`Voucher with id ${data.voucherId} not found`);
      }
      
      return super.create(data, params);
    } catch (error) {
      if (error.name === 'NotFound') {
        // If voucher not found, create cart item anyway but with a flag
        data.voucherExists = false;
        return super.create(data, params);
      }
      throw error;
    }
  }
  
  // Override find method to handle potential errors
  async find(params) {
    try {
      const result = await super.find(params);
      
      // Ensure data is properly formatted
      if (result && result.data) {
        // Check each item to ensure it has valid properties
        result.data = result.data.map(item => {
          // If item is null or undefined, return a default object
          if (!item) {
            return { voucherData: { title: 'Unavailable', points: 0 } };
          }
          
          // If item has toJSON method, ensure it's properly handled
          if (typeof item.toJSON === 'function') {
            try {
              return item.toJSON();
            } catch (e) {
              console.error('Error converting item to JSON:', e);
              return item;
            }
          }
          
          return item;
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error in cartItems.find:', error);
      return { data: [] }; // Return empty data on error
    }
  }
};
