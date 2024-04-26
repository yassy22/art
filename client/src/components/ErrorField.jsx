import PropTypes from "prop-types"; // PropTypes is a library that helps you specify the type of data that a component should receive. This is useful for catching bugs early and making your code more readable.

const ErrorField = ({ data, field }) => {
  if (data && data.error?.[field]) {
    return <p>{data.error[field]}</p>;
  }
  return null;
};

ErrorField.propTypes = {
  data: PropTypes.object,
  field: PropTypes.string.isRequired,
};

export default ErrorField;
