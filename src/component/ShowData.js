import React, { useState, useEffect } from "react";
import axios from "axios";

//base urL in API
const endpoint = "http://127.0.0.1:8000/api";

const ShowData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //call api method
  useEffect(() => {
    getAllUser();
  }, []);

  //call show api
  const getAllUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${endpoint}/show`);
      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShowData;
