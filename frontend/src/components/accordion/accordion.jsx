import { Accordion as MUIAccordion } from "@mui/joy";
import PropTypes from "prop-types";

export default function Accordion({ children }) {
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