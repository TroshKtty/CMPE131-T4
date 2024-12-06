const Card = require("../models/card_model");
const CardItem = require("../models/card_items_model");
const Address = require("../models/address_model");
const AddressItem = require("../models/address_items_model");
const User = require("../models/auth_model");
const Order = require("../models/order_model");
const OrderItem = require("../models/order_items_model");
const Product = require("../models/product");

// user's card information
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

            const lastFourDigits = cardItem.card_number.slice(-4);
            const cardType = cardItem.type;
            const expiry = cardItem.expiry;
            const id = cardItem.card_item_id;

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
  else if (masterCardRegex.test(cardNumber)) return "MasterCard";
  else if (amexRegex.test(cardNumber)) return "American Express";
  else if (discoverRegex.test(cardNumber)) return "Discover";
  else return "Unknown";
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

    // add the card itself into the cards table
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

// get all addresses for user
const addressInfo = async (req, res) => {
  try {
    const userId = req.user.user_id;

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

//general user info like email, phone, etc.
const userInfo = async (req, res) => {
  try {
    const userId = req.user.user_id;
    user = await User.findByPk(userId);

    if (!user) return res.status(400).json({ message: "User not found" });

    return res.status(200).json({
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

//get orders and all related info - items in order and their details, card used, address, date, total price, wieght, shipping, tax
const orderInfo = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const orders = await Order.findAll({
      where: { customer_id: userId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price"],
            },
          ],
        },
        {
          model: CardItem,
          attributes: ["card_number", "expiry", "type"],
        },
        {
          model: AddressItem,
          attributes: ["street", "city", "state", "zipcode"],
        },
      ],
    });

    if (!orders || !orders.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    const formattedOrders = orders.map((order) => {
      const items =
        order.OrderItems?.map((item) => ({
          productName: item.Product?.name || "Unknown",
          price: item.price || 0,
          quantity: item.quantity || 0,
          totalPrice: (item.price || 0) * (item.quantity || 0),
        })) || [];

      const cardDetails = order.CardItem
        ? {
            cardNumber: order.CardItem.card_number.slice(-4) || "N/A",
            type: order.CardItem.type || "N/A",
          }
        : null;

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
        taxes: (subtotal * 0.08).toFixed(2),
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
