var sinon = require('sinon')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

global.expect = chai.expect
global.sinon = sinon
