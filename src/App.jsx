import React, { useState } from "react";
import axios from "axios";
const App = () => {
  const [name, setName] = useState("");
  const [responseData, setResponseData] = useState("");
  const [error, setError] = useState("");
  const formHandler = async () => {
    setError(""); // Clear previous errors
    setResponseData(""); // Clear previous response

    try {
      const { data } = await axios.get(
        `https://greeting-backend-uenn.onrender.com/api/greet?name=${name}`
      );

      setResponseData(data.message);
      setName(""); // Clear input field
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Server Error!");
      } else if (error.request) {
        setError("No response from server! Please try again.");
      } else {
        setError("An unexpected error occurred!");
      }
    }
  };

  const clearHandler = () => {
    setName("");
    setResponseData("");
    setError("");
  };

  const boxstyle = {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    background: "rgb(96 130 158)",
  };
  return (
    <div style={boxstyle}>
      <input
        type="text"
        name="name"
        id=""
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div>
        <button onClick={formHandler}>greeting</button>
        <button onClick={clearHandler}>Clear </button>
      </div>

      <div style={{ color: "#fff", fontSize: "25px" }}>
        <span>{responseData ? responseData : error}</span>
      </div>
    </div>
  );
};

export default App;
