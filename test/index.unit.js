'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export astracore-lib', function() {
    var astracore = require('../');
    should.exist(astracore.lib);
    should.exist(astracore.lib.Transaction);
    should.exist(astracore.lib.Block);
  });
});
