import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100.00);
  const { closeTradeWindow, fetchHoldings } = useContext(GeneralContext);

  const handleTrade = () => {
    axios.post("/api/trade", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: mode,
    })
    .then(() => {
      fetchHoldings();
      closeTradeWindow();
    })
    .catch(err => {
      console.error("Trade failed:", err);
      alert(err.response?.data?.message || "Trade could not be completed.");
    });
  };

  return (
    <div className="container" id="buy-window">
      <div className="header" style={{ backgroundColor: mode === 'BUY' ? '#4184f3' : '#ff5722' }}>
          <h3>{mode} {uid} <span className="exchange">NSE</span></h3>
      </div>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input type="number" name="qty" id="qty" min="1" onChange={(e) => setStockQuantity(e.target.value)} value={stockQuantity} />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input type="number" name="price" id="price" step="0.05" onChange={(e) => setStockPrice(e.target.value)} value={stockPrice} />
          </fieldset>
        </div>
      </div>
      <div className="buttons">
        <span>Margin required: ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button className="btn" style={{ backgroundColor: mode === 'BUY' ? '#4184f3' : '#ff5722' }} onClick={handleTrade}>
            {mode}
          </button>
          <button className="btn btn-grey" onClick={closeTradeWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;