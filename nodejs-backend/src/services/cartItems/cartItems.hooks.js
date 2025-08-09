const { populate } = require('feathers-hooks-common');

const voucherSchema = {
  include: {
    service: 'vouchers',
    nameAs: 'voucherId',
    parentField: 'voucherId',
    childField: '_id'
  }
};

module.exports = {
  after: {
    find: populate({ schema: voucherSchema }),
    get: populate({ schema: voucherSchema })
  }
};
