import { List, ListItem, ListItemButton, Sheet, Typography } from "@mui/joy";
import PropTypes from "prop-types";

export default function CategorySidebar({
  onCategoryChange,
  activeCategory,
  categories,
}) {
  return (
    <Sheet
      sx={{
        borderRadius: "sm",
        p: 2,
      }}
    >
      <Typography level="h2" sx={{ mb: 2 }}>
        Categories
      </Typography>
      <List
        sx={{
          "--List-gap": "8px",
          "--ListItem-radius": "8px",
        }}
      >
        <ListItem>
          <ListItemButton
            selected={activeCategory === ""}
            onClick={() => onCategoryChange("")}
            sx={{
              fontWeight: activeCategory === "" ? "bold" : "normal",
            }}
          >
            All Products
          </ListItemButton>
        </ListItem>
        {Object.entries(categories).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemButton
              selected={activeCategory === value}
              onClick={() => onCategoryChange(value)}
              sx={{
                fontWeight: activeCategory === value ? "bold" : "normal",
              }}
            >
              {value}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Sheet>
  );
}

CategorySidebar.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  categories: PropTypes.object.isRequired,
};
