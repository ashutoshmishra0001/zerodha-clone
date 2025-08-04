import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        &nbsp;
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" style={{ height: "50px",marginBottom :"15px" }} alt="Smallcase logo" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/streakLogo.png" style={{ height: "50px",marginBottom :"15px" }} alt="Streak logo" />
          <p className="text-small text-muted">Algo & strategy platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/sensibullLogo.svg" style={{ height: "50px",marginBottom :"15px" }} alt="Sensibull logo" />
          <p className="text-small text-muted">Options trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/zerodhaFundhouse.png" style={{ height: "50px",marginBottom :"15px" }} alt="Zerodha Fundhouse logo" />
          <p className="text-small text-muted">Asset management</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png" style={{ height: "50px",marginBottom :"15px" }} alt="GoldenPi logo" />
          <p className="text-small text-muted">Bonds trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png" style={{ height: "50px",marginBottom :"15px" }} alt="Ditto logo" />
          <p className="text-small text-muted">Insurance</p>
        </div>

        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto", textDecoration: "none" }}
        >
          Signup Now
        </Link>
      </div>
    </div>
  );
}

export default Universe;