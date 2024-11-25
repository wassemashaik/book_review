import React from "react";
import Header from '../Header'
import { TiTickOutline } from "react-icons/ti";
import './index.css'

function SuccessView() {
  return (
    <div className="main-container">
      <Header />
    <div className="success-view">
      <p className="tick">
        <TiTickOutline size={120} />
      </p>
      <p>Successfully uploaded</p>
    </div>
    </div>
  );
}

export default SuccessView;
