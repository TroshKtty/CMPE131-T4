import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  Table,
  Typography,
  Sheet,
  Stack,
} from "@mui/joy";
import { ChevronDown, Plus, Minus } from "lucide-react";
import Product from "@/components/product/Product";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./styles.module.css";
import NotFound from "@/components/404/not-found";
import axios from "axios";
import Loader from "@/components/loader/loader";
import { useCart } from "@/hooks/useCart";
import Accordion from "@/components/accordion/accordion";

// k;v|k;v| -> [[k, v], [k, v], ...]
function decomposeString(str) {
  return str.split("|").map((pair) => pair.split(";"));
}

// TODO: refactor
export default function ProductPage() {
  const { product: productParam } = useParams();
  const { cart, addToCart, updateCount, removeFromCart, hasCartInit } =
    useCart();
  const { isLoggedIn } = useCart();

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (productParam && hasCartInit) {
      // Try and find in cart, updating state too
      const item = cart.find(
        (item) => item.id === Number.parseInt(productParam, 10)
      );
      if (item) {
        const ogCount = item.count;
        const quantity = !Number.isNaN(ogCount) ? ogCount : 1;
        setQuantity(quantity);
        // console.log(`${item.name} found in cart with quantity ${quantity}`);
      } else {
        // console.log("Item was not found in cart");
      }
    }
  }, [productParam, hasCartInit, cart]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      if (productParam) {
        console.log("productParam:", productParam);

        try {
          const resp = await axios.get(
            `http://localhost:3000/products/${productParam}`
          );

          // console.log("resp", resp);

          if (resp?.data) {
            console.log("Got the data, setting it now");
            // console.log("resp.data", resp.data);

            setProduct(resp.data);
            setProductData({
              ...resp.data,
              price: Number.parseFloat(resp.data.price, 10),
              weight: Number.parseFloat(resp.data.weight, 10),
              descriptions: resp.data.descriptions.split(";"),
              quantity: Number.parseInt(resp.data.quantity, 10),
              count: 0,
              specifications: decomposeString(resp.data.specifications),
              nutritionInfo: decomposeString(resp.data.nutritionInfo),
            });
            setProductImages(resp.data.images.split(";"));
          } else {
            console.log("Product not found?", resp);
            setProductData(null);
          }
        } catch (error) {
          console.log(
            `An error occured while trying to fetch product '${productParam}':`,
            error
          );
          setProductData(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [productParam]);

  useEffect(() => {
    console.log("productData:", productData);
    console.log("productImages:", productImages);
  }, [productData, productImages]);

  useEffect(() => {
    if (hasCartInit && productData !== null) {
      updateCount(productData.id, quantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  if (loading) {
    return <Loader />;
  }

  if (!loading && (!productData || product === null)) {
    return <NotFound />;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id, token);
    setQuantity(1);
  };

  const handleIncrement = () => {
    updateCount(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateCount(product.id, quantity - 1);
  };

  return (
    <Sheet className={styles.wrapper}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6, lg: 8 }}
          alignItems="flex-start"
        >
          <Box sx={{ width: { xs: "100%", md: "50%" }, maxWidth: "600px" }}>
            <Product images={productImages} />
          </Box>

          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography level="h1" component="h1" sx={{ mb: 2 }}>
              {productData.name}
            </Typography>

            <Divider />

            <List sx={{ my: 2 }}>
              <ListItem>
                <Typography level="h3">
                  ${productData.price.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography level="body1">
                  Weight: {productData.weight} lbs
                </Typography>
              </ListItem>
            </List>

            <Divider />

            <Box sx={{ my: 2 }}>
              <Typography level="h3" sx={{ mb: 1 }}>
                About This Item
              </Typography>
              <List marker="disc">
                {(
                  productData?.descriptions ?? ["Lorem ipsum dolor sit amet"]
                ).map((item, index) => (
                  <ListItem key={index}>
                    <Typography level="body1">{item}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              {isLoggedIn && (
                <Sheet
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "sm",
                  }}
                >
                  <IconButton
                    onClick={handleDecrement}
                    disabled={quantity === 1}
                    variant="plain"
                  >
                    <Minus />
                  </IconButton>
                  <Typography
                    level="body1"
                    sx={{ mx: 2, minWidth: "2rem", textAlign: "center" }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton onClick={handleIncrement} variant="plain">
                    <Plus />
                  </IconButton>
                </Sheet>
              )}
              {isLoggedIn ? (
                cart.find((item) => item.id === product.id) ? (
                  <Button
                    color="danger"
                    size="md"
                    sx={{ flexGrow: 1 }}
                    onClick={handleRemoveFromCart}
                  >
                    Remove From Cart
                  </Button>
                ) : (
                  <Button
                    size="md"
                    sx={{ flexGrow: 1 }}
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </Button>
                )
              ) : (
                <Button variant="soft" fullWidth>
                  Sign In To Add
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>

        <Stack spacing={2} sx={{ mt: { xs: 4, md: 6 } }}>
          <Accordion>
            <AccordionSummary indicator={<ChevronDown />}>
              <Typography level="h2">Specifications</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table
                sx={{
                  "& tr:nth-of-type(odd)": {
                    bgcolor: "background.level1",
                  },
                  "& td": {
                    p: 1.5,
                  },
                }}
              >
                <tbody>
                  {productData.specifications.map(([key, value], index) => (
                    <tr key={index}>
                      <td style={{ width: "40%" }}>
                        <Typography level="body2" fontWeight="md">
                          {key}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body2">{value}</Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary indicator={<ChevronDown />}>
              <Typography level="h2">Nutritional Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table
                sx={{
                  "& tr:nth-of-type(odd)": {
                    bgcolor: "background.level1",
                  },
                  "& td": {
                    p: 1.5,
                  },
                }}
              >
                <tbody>
                  {productData.nutritionInfo.map(([key, value], index) => (
                    <tr key={index}>
                      <td style={{ width: "40%" }}>
                        <Typography level="body2" fontWeight="md">
                          {key}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body2">{value}</Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>
    </Sheet>
  );
}
