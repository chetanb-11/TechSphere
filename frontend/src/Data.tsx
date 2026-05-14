import { useEffect, useState } from "react";
import Navbar from "./layouts/navbar";

function Data() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/data")
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0) {
          setData(json);
        } else {
          setData(null);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
    <Navbar/>
      <div style={{ padding: "2rem" }}>
        {data ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {data.map((item: any) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
                <h3 style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
                  {item.title}
                </h3>
                <p style={{ fontWeight: "bold", color: "#2ecc71" }}>
                  ${item.price}
                </p>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  {item.category}
                </p>
              </div>
            ))}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}

export default Data;
