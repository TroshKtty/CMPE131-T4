import { useRef, useState, useEffect } from "react";
import { Tooltip, Typography } from "@mui/joy";
import PropTypes from "prop-types";

export default function TextWithTooltip({
  className = "",
  text,
  maxWidth = 400,
}) {
  const textRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const element = textRef.current;
      if (element) {
        const isOverflowing = element.scrollWidth > element.clientWidth;
        setShowTooltip(isOverflowing);
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text, textRef]);

  const content = (
    <Typography
      ref={textRef}
      noWrap
      variant="title-lg"
      sx={{
        maxWidth,
        color: "common.black",
      }}
    >
      {text}
    </Typography>
  );

  return showTooltip ? (
    <Tooltip className={className ?? ""} title={text} placement="top" arrow>
      {content}
    </Tooltip>
  ) : (
    content
  );
}

TextWithTooltip.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  maxWidth: PropTypes.number,
};
