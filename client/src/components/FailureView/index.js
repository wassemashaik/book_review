import React from "react";
import { PiSealWarningFill } from "react-icons/pi";
import "./index.css";

const FailureView = () => {
  return (
    <div className="fail-container">
      <h1>
        <PiSealWarningFill size={70} />
      </h1>
      <p>Oops! something went wrong please try again later</p>
    </div>
  );
};

export default FailureView;
