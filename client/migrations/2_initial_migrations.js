const ContractEvent = artifacts.require("ContractEvent");
const TicketContract = artifacts.require("TicketContract");

module.exports = async function (deployer, network, accounts) {
    // Nasazení ContractEvent bez jakýchkoli parametrů v konstruktoru
    await deployer.deploy(ContractEvent);
    const eventInstance = await ContractEvent.deployed();

    // Nasazení TicketContract, s předáním adresy ContractEvent, pokud to vyžaduje konstruktor
    await deployer.deploy(TicketContract, eventInstance.address);
    const ticketInstance = await TicketContract.deployed();

    // Nastavení adresy TicketContract v ContractEvent, pokud je to potřeba
    await eventInstance.setTicketContractAddress(ticketInstance.address);

    // Logování adres pro kontrolu
    console.log("EventContract Address:", eventInstance.address);
    console.log("TicketContract Address:", ticketInstance.address);
};
