const Card = require("../models/card_model");
const CardItem = require("../models/card_items_model");
const Address = require("../models/address_model");
const AddressItem = require("../models/address_items_model");
const User = require("../models/auth_model");
const Order = require("../models/order_model");
const OrderItem = require("../models/order_items_model");
const Product = require("../models/product");

// Get the user's card information
const cardInfo = async (req, res) => {
  try {
    const userId = req.user.user_id;

    // find the card _ id for the user
    const cards = await Card.findAll({
      where: { customer_id: userId },
      include: {
        model: CardItem,
        attributes: ["card_item_id", "card_number", "expiry", "type"], // Only include expiry from the CardItem table
      },
    });

    if (!cards || cards.length === 0) {
      return res.status(404).json({ message: "No cards found." });
    }

    //get all the cards for user found in previous step
    const simplifiedCards = cards
      .map((card) => {
        if (card.CardItems && card.CardItems.length > 0) {
          return card.CardItems.map((cardItem) => {
            if (!cardItem) return;

            const lastFourDigits = cardItem.card_number.slice(-4); // Get the last 4 digits
            const cardType = cardItem.type; // Card type (Visa, MasterCard, etc.)
            const expiry = cardItem.expiry; // Card expiry
            const id = cardItem.card_item_id; // Card ID

            return {
              lastFourDigits,
              expiry,
              cardType,
              id,
            };
          });
        }
      })
      .flat()
      .filter((card) => card !== null && card !== undefined);

    //no cards handle
    if (simplifiedCards.length === 0) {
      return res
        .status(404)
        .json({ message: "No valid card information found." });
    }

    // eeturn the simplified array with only required information
    return res.status(200).json(simplifiedCards);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const detectCardType = (cardNumber) => {
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?/;
  const masterCardRegex = /^5[1-5][0-9]{14}/;
  const amexRegex = /^3[47][0-9]{13}/;
  const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}/;

  if (visaRegex.test(cardNumber)) return "Visa";
  if (masterCardRegex.test(cardNumber)) return "MasterCard";
  if (amexRegex.test(cardNumber)) return "American Express";
  if (discoverRegex.test(cardNumber)) return "Discover";
  return "Unknown"; // If no match is found
};

const addCard = async (req, res) => {
  try {
    const { cardNumber, cvv, expiry } = req.body;
    const userId = req.user.user_id;

    // check if the user already has a card entry
    let card = await Card.findOne({
      where: { customer_id: userId },
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

    return res.status(200).json({
      message: "Card added successfully",
      cardId: card.id,
      lastFourDigits,
      expiry,
      cardType,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding card", error });
  }
};

const removeCard = async (req, res) => {
  const { cardId } = req.body;
  const userId = req.user.user_id;

  //find card id of user
  if (!cardId)
    return res.status(400).json({ message: "Specify the card to remove" });

  let card = await Card.findOne({
    where: { customer_id: userId },
  });

  //find cards belonging to that user
  if (!card)
    return res
      .status(400)
      .json({ message: "Card Details not Found for the User" });

  //delete them
  let deleteCard = await CardItem.findOne({
    where: { card_id: card.id, card_item_id: cardId },
  });

  if (!deleteCard) return res.status(400).json({ message: "Card not found" });
  deleteCard.destroy();
  return res.status(200).json({ message: "Card deleted" });
};

const addAddress = async (req, res) => {
  try {
    const { street, city, state, zipcode } = req.body;
    const userId = req.user.user_id;

    // see if there is address id for user, if not create one
    let address = await Address.findOne({ where: { customer_id: userId } });
    if (!address) {
      address = await Address.create({ customer_id: userId });
    }

    // add the AddressItem entry
    const newAddressItem = await AddressItem.create({
      address_id: address.id,
      street,
      city,
      state,
      zipcode,
    });

    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddressItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// remove address
const removeAddress = async (req, res) => {
  try {
    const addressItemId = req.body.id;
    const userId = req.user.user_id;

    // check if the address belongs to the user
    const addressItem = await AddressItem.findOne({
      where: { address_item_id: addressItemId },
      include: {
        model: Address,
        where: { customer_id: userId },
      },
    });

    if (!addressItem) {
      return res
        .status(404)
        .json({ message: "Address not found or not authorized." });
    }

    // delete the address
    await addressItem.destroy();
    res.status(200).json({ message: "Address removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const addressInfo = async (req, res) => {
  try {
    const userId = req.user.user_id;

    // get all addresses for user
    const addresses = await Address.findAll({
      where: { customer_id: userId },
      include: {
        model: AddressItem,
        attributes: ["address_item_id", "street", "city", "state", "zipcode"],
      },
    });

    if (!addresses || addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found." });
    }

    const simplifiedAddresses = addresses
      .map((address) =>
        address.AddressItems.map((item) => ({
          id: item.address_item_id,
          street: item.street,
          city: item.city,
          state: item.state,
          zipcode: item.zipcode,
        }))
      )
      .flat();

    res.status(200).json(simplifiedAddresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const userInfo = async (req, res) => {
  try {
    const userId = req.user.user_id;
    user = await User.findByPk(userId);

    if (!user) return res.status(400).json({ message: "User not found" });

    return res
      .status(200)
      .json({
        name: user.name,
        email: user.email,
        phone: user.phone_no,
        createdAt: user.created_at,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error" });
  }
};

const orderInfo = async (req, res) => {
    const userId = req.user.user_id; // Assumes user ID is available in the request object
  
    try {
      // Fetch all orders for the user with related order items, products, card, and address
      const orders = await Order.findAll({
        where: { customer_id: userId },
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ["id", "name", "price"], // Include product details
              },
            ],
          },
          {
            model: CardItem,
            attributes: ["card_number", "expiry", "type"], // Include card item details
          },
          {
            model: AddressItem,
            attributes: ["street", "city", "state", "zipcode"], // Include address item details
          },
        ],
      });
  
      if (!orders || !orders.length) {
        return res.status(404).json({ message: "No orders found." });
      }
  
      // Format the orders for a clean API response
      const formattedOrders = orders.map((order) => {
        // Ensure OrderItems exist before mapping
        const items = order.OrderItems?.map((item) => ({
          productName: item.Product?.name || "Unknown",
          price: item.Product?.price || 0,
          quantity: item.quantity || 0,
          totalPrice: (item.Product?.price || 0) * (item.quantity || 0),
        })) || [];
  
        // Ensure CardItem exists
        const cardDetails = order.CardItem
          ? {
              cardNumber: (order.CardItem.card_number).slice(-4) || "N/A",
              type: order.CardItem.type || "N/A",
            }
          : null;
  
        // Ensure AddressItem exists
        const addressDetails = order.AddressItem
          ? {
              street: order.AddressItem.street || "N/A",
              city: order.AddressItem.city || "N/A",
              state: order.AddressItem.state || "N/A",
              zipcode: order.AddressItem.zipcode || "N/A",
            }
          : null;
            const subtotal = (order.totalPrice - order.deliveryCharge) * 0.92;
        return {
          orderId: order.id,
          status: order.status,
          placedAt: order.createdAt,
          subtotal: subtotal.toFixed(2),
          totalPrice: order.totalPrice,
          shippingFee: order.deliveryCharge,
          totalWeight: order.totalWeight,
          taxes: ( subtotal * 0.08).toFixed(2),
          cardDetails,
          deliveryAddress: addressDetails,
          items,
        };
      });
  
      res.status(200).json(formattedOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// get all addresses for user
module.exports = {
  cardInfo,
  addCard,
  removeCard,
  addressInfo,
  addAddress,
  removeAddress,
  userInfo,
  orderInfo,
};
