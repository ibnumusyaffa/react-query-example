import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

function RSelect({ size = "default", error = false, zIndex = null, ...props }) {
  const customStyles = {
    input: (provided, state) => ({
      ...provided,
      height: size == "default" ? 30 : 38,
      borderColor: error ? "#F56565" : null,
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: error ? "#F56565" : "#e2e8f0",
      fontSize: "0.875rem",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#a0aec0",
      fontSize: "0.875rem",
    }),
    container: (provided, state) => ({
      ...provided,
      zIndex: zIndex,
    }),
  };

  return <Select styles={customStyles} {...props} />;
}

RSelect.propTypes = {
  size: PropTypes.oneOf(["default"]),
  error: PropTypes.bool,
  zIndex: PropTypes.number,
};

export default RSelect;
