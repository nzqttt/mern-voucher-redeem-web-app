const assert = require('assert');
const app = require('../../src/app');

describe('\'vouchers\' service', () => {
  it('registered the service', () => {
    const service = app.service('vouchers');

    assert.ok(service, 'Registered the service (vouchers)');
  });
});
