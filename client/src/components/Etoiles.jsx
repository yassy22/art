import React from "react";
import PropTypes from "prop-types";

const Etoile = ({ items, gradient }) => {
  const etoils = [];
  console.log(items);
  items.forEach((item, index) => {
    etoils.push(
      <g key={`line${index}`}>
        <defs>{gradient}</defs>
        <polyline
          key={`line${index}`}
          points={`${item.x1},${item.y1} ${item.x2},${item.y2} ${item.cx1},${item.cy1}`}
          fill="none"
          stroke="#CACBD1"
          strokeWidth="0.2"
        />
        ,
        <circle key={`ellips`} cx={item.x1} cy={item.y1} r="2" fill="yellow" />,
        <circle
          key={`ellipse1`}
          cx={item.x2}
          cy={item.y2}
          r="2"
          fill="yellow"
        />
        ,
        <circle
          key={`ellipse2`}
          cx={item.cx1}
          cy={item.cy1}
          r={item.radius}
          fill={`url(#gradient)`}
        />
      </g>
    );
  });
  return etoils;
};
Etoile.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      cx1: PropTypes.number.isRequired,
      cy1: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Etoile;
