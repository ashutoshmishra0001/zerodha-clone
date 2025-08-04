import React, { useContext } from "react";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const { holdings, isLoading } = useContext(GeneralContext);

  if (isLoading) {
    return <h3>Loading your holdings...</h3>;
  }

  const labels = holdings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [{
      label: "Current Value",
      data: holdings.map((stock) => (stock.price * stock.qty)),
      backgroundColor: "rgba(65, 132, 243, 0.5)",
      borderColor: "rgba(65, 132, 243, 1)",
      borderWidth: 1,
    }],
  };

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>
      {holdings.length === 0 ? (
        <p>You do not have any holdings. Buy stocks from the watchlist to get started.</p>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th><th>Qty.</th><th>Avg. cost</th><th>LTP</th><th>Cur. val</th><th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((stock) => {
                const curValue = stock.price * stock.qty;
                const pnl = curValue - (stock.avg * stock.qty);
                const isProfit = pnl >= 0;
                return (
                  <tr key={stock._id}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={isProfit ? "profit" : "loss"}>{pnl.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="row">
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
