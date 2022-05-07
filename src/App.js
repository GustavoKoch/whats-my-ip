import './App.css';
import React, { useState, useEffect } from "react";
import MyMap from "./MyMap";

function App() {

  const [ipLocation, setIpLocation]=useState();
  const [isError, setIsError] = useState(false);
  const [country, setCountry] = useState();
  const [flag, setFlag] = useState();

  useEffect(() => {
      
    const apiKey= process.env.REACT_APP_API_KEY_IPADDRESS;
    const urlSearch= new URL("https://geo.ipify.org/api/v2/country,city?apiKey="+apiKey);
    //"https://geo.ipify.org/api/v2/country,city?apiKey=at_HXLoCImM2y30wTnSnKWjwCPpZRUmQ"
 
   
     console.log("Hello URL:"+ urlSearch); 
     console.log(process.env.REACT_APP_API_KEY_IPADDRESS);

    fetch(urlSearch) 
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `An error has occured while fetching the data. Status code: ${response.status}`
          );
        }
        return response.json()
      })
      .then((data) => {
        setIpLocation(data);
       // console.log(data)
       // console.log(data.location.lat)
       // console.log(data.location.lng)
       // console.log(data.location.country) 
        setCountry(data.location.country)
      
        
        fetch(`https://restcountries.com/v3.1/alpha/${country}`) 
        .then((response1) => {
          if (!response1.ok) {
            throw new Error(
              `An error has occured while fetching the data. Status code: ${response1.status}`
            );
          }
          return response1.json()
        })
        .then((data1) => { 
          //console.log(data1[0].flags.png)  
          setFlag(data1[0].flags.png)       


      })
    })


      .catch((error) => {
        console.log(error);
        setIsError(true);
        
      });
  }, [country]);

//console.log(ipLocation);

  // https://www.npmjs.com/package/react-paginate

  // npm install --save react-spinners
 
  // let array = [];


  return (
    <div className="App">
         
          Your IP is: {ipLocation&&ipLocation.ip}
          {ipLocation&&<MyMap  lat={ipLocation.location.lat} lng={ipLocation.location.lng}/>}
          <img src={flag}/>
    </div>
  );
}

export default App;


// 'https://geo.ipify.org/api/v2/country,city?apiKey=at_HXLoCImM2y30wTnSnKWjwCPpZRUmQ'

// 'https://geo.ipify.org/api/v2/country,city?apiKey={process.env.REACT_APP_API_KEY_IPADDRESS}'