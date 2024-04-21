const ContractEvent = artifacts.require("ContractEvent");
const TicketContract = artifacts.require("TicketContract");

module.exports = async function (deployer, network, accounts) {
    // Nejdříve nasadíte ContractEvent
    await deployer.deploy(ContractEvent);
    const eventInstance = await ContractEvent.deployed();

    // Zde předpokládám, že adresa ContractEvent je potřebná jako vstupní parametr pro TicketContract
    // Pokud ContractEvent neposkytuje požadovanou adresu, musíte ji získat nebo definovat jinak
    await deployer.deploy(TicketContract, eventInstance.address);

    // Nyní můžete v TicketContract nastavit adresu ContractEvent, pokud je to potřeba
    // Toto je jen ukázka, jak by to mohlo vypadat, pokud TicketContract potřebuje vědět o ContractEvent
    const ticketInstance = await TicketContract.deployed();
    await ticketInstance.setEventContractAddress(eventInstance.address);
};
