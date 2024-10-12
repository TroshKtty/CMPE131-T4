const Product = require('../models/product');
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  const { customerId, items, deliveryAddress } = req.body;
  
  let totalWeight = 0;
  let totalPrice = 0;
  
  for (let item of items) {
    const product = await Product.findByPk(item.productId);
    if (product) {
      totalWeight += product.weight * item.quantity;
      totalPrice += product.price * item.quantity;
    }
  }

  const deliveryCharge = totalWeight > 20 ? 5 : 0;
  const finalPrice = totalPrice + deliveryCharge;
  
  const order = await Order.create({
    customerId,
    totalWeight,
    totalPrice: finalPrice,
    deliveryCharge,
    deliveryAddress
  });

  res.json(order);
};
