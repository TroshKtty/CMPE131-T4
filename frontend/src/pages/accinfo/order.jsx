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
        setOrders(response.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
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
                <Typography level="h5">Order Id: {order?.orderId || 'N/A'}</Typography>
                <Typography>Status: {order?.status || 'N/A'}</Typography>
                <Typography>Placed on: {order?.placedAt ? new Date(order.placedAt).toLocaleString() : 'N/A'}</Typography>
                <Typography>Total price: ${order?.totalPrice || '0.00'}</Typography>

                {/*order details */}
                <Button variant="outlined" onClick={() => handleExpandClick(order.orderId)} sx={{ marginTop: 2 }}>
                  {expandedOrder === order.orderId ? 'Hide Details' : 'Show Details'}
                </Button>

                {expandedOrder === order.orderId && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography>
                      Paid with {order?.cardDetails?.type || 'N/A'} card ending in: **** {order?.cardDetails?.cardNumber || 'N/A'}
                    </Typography>

                    {/*delivery add. */}
                    <Typography>Delivery Address:</Typography>
                    <Typography>{order?.deliveryAddress?.street || 'N/A'}</Typography>
                    <Typography>
                      {order?.deliveryAddress?.city || 'N/A'}, {order?.deliveryAddress?.state || 'N/A'} {order?.deliveryAddress?.zipcode || 'N/A'}
                    </Typography>

                    <Divider sx={{ my: 2 }} />
                    
                    {/* items */}
                    <Typography level="h6">Items:</Typography>
                    <List>
                      {order?.items?.length > 0 ? (
                        order.items.map((item, index) => (
                          <ListItem key={index}>
                            <Typography>
                              {item?.productName || 'N/A'} - ${item?.price || '0.00'} x {item?.quantity || 0}
                            </Typography>
                          </ListItem>
                        ))
                      ) : (
                        <Typography>No items found.</Typography>
                      )}
                    </List>
                    <Typography level="h6">Total Weight: {order?.totalWeight || '0'} lbs</Typography>

                    {/* pricing*/}
                    <Divider sx={{ my: 2 }} />
                    <Typography>Subtotal: ${order?.subtotal || '0.00'}</Typography>
                    <Typography>Shipping fee: ${order?.shippingFee || '0.00'}</Typography>
                    <Typography>Taxes: ${order?.taxes || '0.00'}</Typography>
                    <Typography>Total price: ${order?.totalPrice || '0.00'}</Typography>
                    
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
