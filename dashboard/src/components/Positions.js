import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPositions = async () => {
      if (user) {
        try {
          const res = await axios.get("/api/positions");
          setAllPositions(res.data);
        } catch (err) {
          console.error("Error fetching positions:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPositions();
  }, [user]);

  if (loading) {
    return <p>Loading positions...</p>;
  }

  // ... The rest of your component's rendering logic ...
  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>
      {/* ... your table rendering logic ... */}
    </>
  );
};

export default Positions;