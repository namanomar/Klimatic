import { useEffect, useState } from "react";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import sunny from "../assets/images/sunny.png";
import snowy from "../assets/images/snowy.png";
import windy from "../assets/images/windy.png";
import { API } from "../config/config";
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';
const Box = () => {
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [input, setInput] = useState("London");
  const [search, setSearch] = useState(false);
  const [image, setImage] = useState(sunny);
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API}`;

  const SearchVal = () => {
    setSearch((prevSearch) => !prevSearch);
  };
  const [response, setResponse] = useState({
    coord: {
      lon: -0.1257,
      lat: 51.5085,
    },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d",
      },
    ],
    base: "stations",
    main: {
      temp: 291.01,
      feels_like: 290.99,
      temp_min: 289.87,
      temp_max: 292.04,
      pressure: 1012,
      humidity: 82,
      sea_level: 1012,
      grnd_level: 1008,
    },
    visibility: 10000,
    wind: {
      speed: 5.14,
      deg: 210,
    },
    clouds: {
      all: 100,
    },
    dt: 1720599974,
    sys: {
      type: 2,
      id: 2075535,
      country: "GB",
      sunrise: 1720583734,
      sunset: 1720642550,
    },
    timezone: 3600,
    id: 2643743,
    name: "London",
    cod: 200,
  });

  useEffect(() => {
    let isMounted = true;

    if (input.length == null) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        if (isMounted) {
            setResponse(await response.data); // Handle the response
            console.log("hello");
            ImageById(response.data)
          } // Handle the response
      } catch (error) {
        if (isMounted) {
            console.log("Wrong Contry or API limit reached");
          }
      }
    };

    fetchData();
    return () => {
        isMounted = false; // Clean up function to set isMounted to false when component unmounts
      };
  
  }, [search]);

  const ImageById=(response)=>{
    const id=response.weather[0].id;
    if(id>=200 && id<300){
        setImage(windy)
    }
    else if(id>=300 && id<600){
        setImage(rainy)
    }else if(id>=600 && id<=700){
        setImage(snowy)
    }else if(id===800){
        setImage(sunny)
    }
    else if(id>800){
        setImage(cloudy)
    }else{
        setImage(sunny)
    }

  }
  
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div
        className="flex-1 bg-cover bg-center text-white p-6"
        style={{
          backgroundImage: `url(${image})`,backgroundSize: "cover",backgroundPosition: "center",
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">{response.name}</h1>
            <h2 className="text-xl">{response.sys.country}</h2>
          </div>
          <div>
            <div className="text-6xl font-bold">{response.main.temp}°F</div>
            <div className="text-2xl">{date.getHours()}:{date.getMinutes()}:{date.getSeconds()} </div>
            <div className="text-lg">{days[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gray-900 text-white p-6">
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <div className="text-4xl"><img src={`https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`}></img></div>
            <h2 className="text-4xl font-bold">{response.weather[0].main}</h2>
          </div>

          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Search any city"
              className="p-2 rounded bg-gray-700 text-white"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="mt-2 p-2 bg-gray-800 rounded"
              onClick={SearchVal}
            >
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-2xl">
              {response.name}, {response.sys.country}
            </h3>
            <div className="mt-4">
              <div>
                Temperature: {response.main.temp}°C ({response.weather[0].main})
              </div>
              <hr className="w-96 mx-auto" />
              <div>Humidity: {response.main.humidity}%</div>
              <hr className="w-96 mx-auto" />
              <div>Visibility: {response.visibility} mi</div>
              <hr className="w-96 mx-auto" />
              <div>Feels Like: {response.main.feels_like} °C</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

// const styles = {
//   firstbox: {
//     backgroundImage: `url(${windy})`,
//     backgroundSize: "cover", // Optional: to make the image cover the entire div
//     backgroundPosition: "center", // Optional: to center the image
//   },
// };

export default Box;
