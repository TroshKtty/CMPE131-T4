import { useCart } from "@/hooks/useCart";
import {
  Card,
  CardContent,
  AspectRatio,
  Typography,
  Stack,
  IconButton,
  Box,
  Button,
} from "@mui/joy";
import { CircleMinus, CirclePlus } from "lucide-react";
import PropTypes from "prop-types";

export default function CartItem({ product }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <Card
      variant="plain"
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "md",
        ":hover": {
          boxShadow: "lg",
        },
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ gap: 2, alignItems: "center" }}
      >
        <AspectRatio ratio="1" sx={{ width: 128, flexShrink: 0 }}>
          <img
            src={product.images.split(";")[0] ?? "https://placehold.co/400x300"}
            alt={product.name}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        </AspectRatio>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography level="title-md" noWrap fontWeight="bold">
            {product.name}
          </Typography>
          <Typography level="body-sm">
            Unit Price: ${product.price}/lb
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ mt: 1.5 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="sm"
                variant="soft"
                color="neutral"
                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                disabled={product.quantity <= 1}
              >
                <CircleMinus size={18} />
              </IconButton>
              <Typography fontWeight="md" textAlign="center">
                {product.quantity}
              </Typography>
              <IconButton
                size="sm"
                variant="soft"
                color="neutral"
                onClick={() => updateQuantity(product.id, product.quantity + 1)}
              >
                <CirclePlus size={18} />
              </IconButton>
            </Box>
            <Button
              size="sm"
              variant="soft"
              color="danger"
              onClick={() => removeFromCart(product.id)}
              sx={{ minWidth: "auto" }}
            >
              Remove
            </Button>
            <Typography level="title-sm" fontWeight="bold">
              ${(product.price * product.quantity).toFixed(2)}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
