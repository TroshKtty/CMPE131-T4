import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion as MUIAccordion,
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
  CircularProgress,
} from "@mui/joy";
import { ChevronDown, Plus, Minus } from "lucide-react";
import Product from "@/components/product/Product";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import PropTypes from "prop-types";
import NotFound from "@/components/404/not-found";
import axios from "axios";

// k;v|k;v| -> [[k, v], [k, v], ...]
function decomposeString(str) {
  return str.split("|").map((pair) => pair.split(";"));
}

// Hacky fix for accordion wrapper to remove accordion hover bg and when it's clicked
function Accordion({ children }) {
  return (
    <MUIAccordion
      sx={{
        "--joy-palette-neutral-plainHoverBg": "transparent", // Hover bg
        "--joy-palette-neutral-plainActiveBg": "transparent", // Click bg
      }}
    >
      {children}
    </MUIAccordion>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
};

// TODO: refactor
export default function ProductPage() {
  const { product: productParam } = useParams();

  const [product, setProduct] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      if (productParam) {
        console.log("productParam", productParam);

        try {
          const resp = await axios.get(
            `http://localhost:3000/products/${productParam}`
          );

          console.log("resp", resp);

          if (resp?.data) {
            console.log("resp.data", resp.data);

            setProduct(resp.data);
            setProductData({
              ...resp.data,
              price: Number.parseFloat(resp.data.price, 10),
              weight: Number.parseFloat(resp.data.weight, 10),
              descriptions: resp.data.descriptions.split(";"),
              specifications: decomposeString(resp.data.specifications),
              nutritionInfo: decomposeString(resp.data.nutritionInfo),
            });
            setProductImages(resp.data.images.split(";"));
          } else {
            console.log("product not found?", resp);
						setProductData(null);
          }
        } catch (error) {
					console.log(
						`An error occured while trying to fetch product ${productParam}:`,
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

	if (loading) {
    return (
      <Sheet
        sx={{
          bgcolor: "background.body",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          margin: 4,
          gap: 4,
        }}
      >
        <CircularProgress />
        <p>Loading...</p>
      </Sheet>
    );
  }

	if (!loading && (!productData || product === "")) {
    return <NotFound />;
  }

  const handleAddToCart = (ev) => {
    ev.preventDefault();
    alert(`Added ${quantity}x ${productData.name} to cart`);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <Sheet sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
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
                  ${productData.price?.toFixed(2)}
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
              <Button size="lg" sx={{ flexGrow: 1 }} onClick={handleAddToCart}>
                Add To Cart
              </Button>
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
