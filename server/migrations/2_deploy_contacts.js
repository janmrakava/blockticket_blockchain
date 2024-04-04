// eslint-disable-next-line no-undef
const Events = artifacts.require('./Events.sol');

module.exports = function (deployer) {
  deployer.deploy(Events);
};
