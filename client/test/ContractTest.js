const TicketContract = artifacts.require("TicketContract");
const ContractEvent = artifacts.require("ContractEvent");

contract("TicketContract tests using ContractEvent", accounts => {
    let ticketContractInstance, contractEventInstance;

    before(async () => {
        contractEventInstance = await ContractEvent.new();
        ticketContractInstance = await TicketContract.new(contractEventInstance.address);
        await contractEventInstance.setTicketContractAddress(ticketContractInstance.address, { from: accounts[0] });
    });

    it("should allow ContractEvent to create a new ticket after creating an event", async () => {
        // Data pro vytvoření události
        const eventName = "Test Event";
        const dateOfEvent = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Datum o den později
        const numberOfTickets = 100; // Dostatečný počet lístků
        const ticketPrice = web3.utils.toWei("0.1", "ether");
        const placeName = "Test Place";
        const eventDescription = "Test Description";
        const eventCategory = "Test Category";
        const eventImage = "Test Image";

        // Vytvoření události
        const eventResult = await contractEventInstance.createEvent(
            eventName, dateOfEvent, numberOfTickets, ticketPrice,
            placeName, eventDescription, eventCategory, eventImage,
            { from: accounts[0] }
        );

        const eventID = eventResult.logs[0].args.eventID; // Získání ID události z eventu emitovaného při vytvoření události

        // Nákup lístku
        const result = await contractEventInstance.buyTicket(eventID, accounts[1], ticketPrice, {
            from: accounts[0],
            value: ticketPrice // Poslání Etheru spolu s voláním funkce
        });

        // Kontrola, zda transakce proběhla úspěšně
        assert.equal(result.receipt.status, true, "Transaction should succeed");

        // Kontrola, zda byl emitován event TicketBought
        assert.exists(result.logs.find(log => log.event === "TicketBought"), "TicketBought event should be emitted");

        // Kontrola podrobností lístku z eventu TicketBought
        const ticketBoughtEvent = result.logs.find(log => log.event === "TicketBought");
        assert.equal(ticketBoughtEvent.args.eventID, eventID, "Event ID should match the input");
        assert.equal(ticketBoughtEvent.args.ticketID.length, 66, "Ticket ID should be a valid bytes32 value");
    });
});
