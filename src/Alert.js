import React, { useEffect } from "react";

const Alert = ({ list, removeAlert, message, type }) => {
  useEffect(() => {
    let timeout = setTimeout(() => removeAlert(), 3000);
    return () => clearTimeout(timeout);
  });

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
