import PropTypes from "prop-types";

const Slider = ({ onValueChange, value, max, min = 0, label }) => {
  return (
    <label>
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onValueChange(parseInt(e.target.value, 10))}
        className="slider"
      />
    </label>
  );
};

Slider.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number,
  label: PropTypes.string.isRequired,
};
export default Slider;
