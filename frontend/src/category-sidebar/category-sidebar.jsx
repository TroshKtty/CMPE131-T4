import { List, ListItem, ListItemButton, Typography, Divider } from "@mui/joy";
import PropTypes from "prop-types";
import "./category-sidebar.css";

export default function CategorySidebar({
  onCategoryChange,
  activeCategory,
  categories,
}) {
  return (
    <div className="list">
      <List>
        <ListItem>
          <Typography level="h4" sx={{ mb: 1 }}>
            Categories
          </Typography>
        </ListItem>

        <Divider className="divider" />

        <ListItem>
          <ListItemButton
            selected={activeCategory === ""}
            onClick={() => onCategoryChange("")}
            className="list-item-button"
          >
            All Products
          </ListItemButton>
        </ListItem>
        {Object.entries(categories).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemButton
              selected={activeCategory === value}
              onClick={() => onCategoryChange(value)}
              className="list-item-button"
            >
              {value}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

CategorySidebar.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  categories: PropTypes.object.isRequired,
};
