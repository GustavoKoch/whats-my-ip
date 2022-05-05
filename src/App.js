import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";



function App() {

  const [ipLocation, setIpLocation]=useState();

  useEffect(() => {
    setIsLoading(true);   

    const urlSearch= new URL("https://geo.ipify.org/api/v2/country,city?apiKey=at_HXLoCImM2y30wTnSnKWjwCPpZRUmQ");
 
   
     console.log("Hello URL:"+ urlSearch); 

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
        setNews(data);
        console.log(data)
       
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [ipLocation]);


  // https://www.npmjs.com/package/react-paginate

  // npm install --save react-spinners
 
  // let array = [];




  return (
    <div className="App">

    </div>
  );
}

export default App;


// 'https://geo.ipify.org/api/v2/country,city?apiKey=at_HXLoCImM2y30wTnSnKWjwCPpZRUmQ'

// 'https://geo.ipify.org/api/v2/country,city?apiKey={process.env.REACT_APP_API_KEY_IPADDRESS}'