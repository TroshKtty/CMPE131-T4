import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Divider, List, ListItem, Box } from '@mui/joy';
import axios from 'axios';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);  // Track expanded orders
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // get order history from backend
  useEffect(() => {
    const orderHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/userInfo/orderInfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    orderHistory();
  }, [token]);

  // order expand
  const handleExpandClick = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId); // toggle
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography level="h2" sx={{ marginBottom: 2 }}>Your Orders</Typography>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <div>
          {orders.map(order => (
            <Card key={order.orderId} variant="outlined" sx={{ marginBottom: 2, backgroundColor: "#dde7eeee"}}>
              <CardContent>
                <Typography level="h5">Order Id: {order.orderId}</Typography>
                <Typography>Status: {order.status}</Typography>
                <Typography>Placed on: {new Date(order.placedAt).toLocaleString()}</Typography>
                <Typography>Total price: ${order.totalPrice}</Typography>

                {/*order details */}
                <Button variant="outlined" onClick={() => handleExpandClick(order.orderId)} sx={{ marginTop: 2 }}>
                  {expandedOrder === order.orderId ? 'Hide Details' : 'Show Details'}
                </Button>

                {expandedOrder === order.orderId && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography>Paid with {order.cardDetails.type} card ending in: **** {order.cardDetails.cardNumber}</Typography>

                    {/*delivery add. */}
                    <Typography>Delivery Address:</Typography>
                    <Typography>{order.deliveryAddress.street}</Typography>
                    <Typography>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipcode}</Typography>

                    <Divider sx={{ my: 2 }} />
                    
                    {/* items */}
                    <Typography level="h6">Items:</Typography>
                    <List>
                      {order.items.map((item, index) => (
                        <ListItem key={index}>
                          <Typography>{item.productName} - ${item.price} x {item.quantity} </Typography>
                        </ListItem>
                      ))}
                    </List>
                    <Typography level="h6">Total Weight: {order.totalWeight} lbs</Typography>

                    {/* pricing*/}
                    <Divider sx={{ my: 2 }} />
                    <Typography>Subtotal: ${order.subtotal}</Typography>
                    <Typography>Shipping fee: ${order.shippingFee}</Typography>
                    <Typography>Taxes: ${order.taxes}</Typography>
                    <Typography>Total price: ${order.totalPrice}</Typography>
                    
                      {/*
                    {order.status === 'Placed' && (
                      <Button variant="danger" onClick={() => cancelOrder(order.id)}>Cancel Order</Button>
                    )}*/}
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Box>
  );
};

export default OrderPage;
