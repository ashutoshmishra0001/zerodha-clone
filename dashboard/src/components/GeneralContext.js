import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isTradeWindowOpen, setIsTradeWindowOpen] = useState(false);
  const [tradeStock, setTradeStock] = useState({ uid: "", mode: "BUY" });
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHoldings = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const res = await axios.get("/api/holdings");
      setHoldings(res.data);
    } catch (err) {
      console.error("Failed to fetch holdings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, [user]);

  const openTradeWindow = (uid, mode = "BUY") => {
    setTradeStock({ uid, mode });
    setIsTradeWindowOpen(true);
  };

  const closeTradeWindow = () => {
    setIsTradeWindowOpen(false);
    setTradeStock({ uid: "", mode: "BUY" });
  };

  return (
    <GeneralContext.Provider
      value={{
        openTradeWindow,
        closeTradeWindow,
        holdings,
        isLoading,
        fetchHoldings,
      }}
    >
      {children}
      {isTradeWindowOpen && <BuyActionWindow uid={tradeStock.uid} mode={tradeStock.mode} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;