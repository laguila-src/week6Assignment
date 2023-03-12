const expect = chai.expect;

describe('Week 6 Assignment Tests', () => {
    describe('createDeck creates a deck of cards', () => {
        it ('#Should create a deck of 52 cards', function() {
            // Arrange  Act  Assert
            const d = new Deck(); // Create a deck object
            d.createDeck();       // Call method to create a deck of cards
            expect(d.cards).to.have.lengthOf(52); // Checks if number of cards is equal to 52
        });
    });
});