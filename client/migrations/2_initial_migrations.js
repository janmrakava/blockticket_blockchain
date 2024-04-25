const ContractEvent = artifacts.require("ContractEvent");
const TicketContract = artifacts.require("TicketContract");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(ContractEvent);
    const eventInstance = await ContractEvent.deployed();


    await deployer.deploy(TicketContract, eventInstance.address);

    const ticketInstance = await TicketContract.deployed();
    await ticketInstance.setEventContractAddress(eventInstance.address);
};
