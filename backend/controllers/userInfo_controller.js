const Card = require('../models/card_model');
const CardItem = require('../models/card_items_model');

// Get the user's card information
const cardInfo = async (req, res) => {
    try {
      const userId = req.user.user_id;
  
      // find the card _ id for the user
      const cards = await Card.findAll({
        where: { customer_id: userId },
        include: {
          model: CardItem,
          attributes: ['card_item_id', 'card_number', 'expiry', 'type'], // Only include expiry from the CardItem table
        },
      });
  
      if (!cards || cards.length === 0) {
        return res.status(404).json({ message: 'No cards found.' });
      }
      
      
      //get all the cards for user found in previous step
      const simplifiedCards = cards.map(card => {
        if (card.CardItems && card.CardItems.length > 0) {
          return card.CardItems.map(cardItem => {
            const lastFourDigits = cardItem.card_number.slice(-4); // Get the last 4 digits
            const cardType = cardItem.type; // Card type (Visa, MasterCard, etc.)
            const expiry = cardItem.expiry; // Card expiry
            const id = cardItem.card_item_id; // Card ID
      
            return {
              lastFourDigits,
              expiry,
              cardType,
              id
            };
          });
        }
      }).flat().filter(card => card !== null);
      
      //no cards handle
      if (simplifiedCards.length === 0) {
        return res.status(404).json({ message: 'No valid card information found.' });
      }
  
      // eeturn the simplified array with only required information
      return res.status(200).json(simplifiedCards);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error });
    }
  };
  
const detectCardType = (cardNumber) => {
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?/;
  const masterCardRegex = /^5[1-5][0-9]{14}/;
  const amexRegex = /^3[47][0-9]{13}/;
  const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}/;
  
  if (visaRegex.test(cardNumber)) return 'Visa';
  if (masterCardRegex.test(cardNumber)) return 'MasterCard';
  if (amexRegex.test(cardNumber)) return 'American Express';
  if (discoverRegex.test(cardNumber)) return 'Discover';
  return 'Unknown'; // If no match is found
};

const addCard = async (req, res) => {
  try {
    const { cardNumber, cvv, expiry } = req.body;
    const userId = req.user.user_id;

    // check if the user already has a card entry
    let card = await Card.findOne({
      where: { customer_id: userId }
    });

    if (!card) {
      card = await Card.create({ customer_id: userId });
    }

    // detect the card type
    const cardType = detectCardType(cardNumber);

    // Insert the basic card info into the `Card` table (only customer_id)

    // Insert the full card info into the `CardItem` table
    await CardItem.create({
      card_id: card.id,
      card_number: cardNumber,
      cvv: cvv,
      expiry: expiry,
      type: cardType,  
    });

    let lastFourDigits = cardNumber.slice(-4); //so that the frontend card list can be updated

    return res.status(200).json({ message: 'Card added successfully', cardId: card.id, lastFourDigits, expiry, cardType});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding card', error });
  }
};

const removeCard = async (req,res) => {
    const {cardId} = req.body;
    const userId = req.user.user_id;

    //find card id of user
    if(!cardId)
        return res.status(400).response({message: "Specify the card to remove"});

    let card = await Card.findOne({
        where: { customer_id: userId }
      });
    
      //find cards belonging to that user
    if(!card)
        return res.status(400).json({message: "Card Details not Found for the User"});

    //delete them
    let deleteCard = await CardItem.findOne({
        where: {card_id: card.id,
            card_item_id: cardId,
        }
    })

    if(!deleteCard)
        return res.status(400).json({message: "Card not found"});
    deleteCard.destroy();
    return res.status(200).json({message: "Card deleted"});

}
module.exports = { cardInfo, addCard, removeCard };
