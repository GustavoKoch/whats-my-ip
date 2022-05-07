import "./App.css";
import React, { useState, useEffect } from "react";
import MyMap from "./MyMap";

function App() {
  const [ipLocation, setIpLocation] = useState();
  const [isError, setIsError] = useState(false);
  // const [country, setCountry] = useState();
  const [flag, setFlag] = useState();

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY_IPADDRESS;
    //console.log(apiKey);
    const urlSearch = new URL(
      "https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey
    );
    //"https://geo.ipify.org/api/v2/country,city?apiKey=at_HXLoCImM2y30wTnSnKWjwCPpZRUmQ"

    //console.log("Hello URL:"+ urlSearch);
    //console.log(process.env.REACT_APP_API_KEY_IPADDRESS);

    fetch(urlSearch)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `An error has occured while fetching the data. Status code: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setIpLocation(data);
        fetch(`https://restcountries.com/v3.1/alpha/${data.location.country}`) // DE
          .then((response1) => {
            if (!response1.ok) {
              throw new Error(
                `An error has occured while fetching the data. Status code: ${response1.status}`
              );
            }
            return response1.json();
          })
          .then((data1) => {
            setFlag(data1[0].flags.png);
          });
      })

      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  let today = new Date();
  let date =
    " " +
    today.getDate() +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear();
  let time =
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  // console.log(ipLocation.location.city);

  // https://www.npmjs.com/package/react-paginate

  // npm install --save react-spinners

  // let array = [];

  if (isError) {
    return (
      <div className="App">
        <h2>You have encountered an error, please try your search again.</h2>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="ipdetails">
          <img src={flag} alt="country flag"/>
          {ipLocation && <h3>Your IP is: {ipLocation && ipLocation.ip}</h3>}

          {ipLocation && (
            <h5>
              📍 Your location is: {ipLocation.location.city} ,{" "}
              {ipLocation.location.region}{" "}
            </h5>
          )}
          {ipLocation && <h5>🗓️ The current date is:{date} </h5>}
          {ipLocation && <h5>🕑 The local time is: {time}</h5>}
        </div>
        {ipLocation && (
          <MyMap lat={ipLocation.location.lat} lng={ipLocation.location.lng} />
        )}
      </div>
    );
  }
}

export default App;
