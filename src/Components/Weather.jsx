import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
const Weather = () => {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }

    const search=async (city)=>{
 
        if(city===""){
            alert("Enter City name")
            return;
        }

       try{
 const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
 const response=await fetch(url);
 const data=await response.json();
 if(!response.ok){
    alert(data.message);
    return;
 }
 console.log(data);
 const icon=allIcons[data.weather[0].icon] || clear_icon;
 setWeatherData({
    humidity:data.main.humidity,
    windSpeed:data.wind.speed,
    temparature:Math.floor(data.main.temp),
    Location:data.name,
    icon:icon
 })
       }
       catch(error){

       }
    }

    useEffect(()=>{
        search("Multan");
    },[])

  return (
    <div className='weather'>
        <div className='searcch-bar'>
            <input ref={ inputRef} type="text" placeholder='Serach' />
            <img src={Search_icon} alt="" onClick={()=>
                search(inputRef.current.value)
            }/>
        </div>
        <img src={weatherData.icon} alt="" className='weather_App'/>
        <p className='temperature'>{weatherData.temparature}°C</p>
        <p className='location'> {weatherData.Location}</p>
        <div className="weather_data">
            <div className="cols">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>humidity</span>
                </div>
            </div>

            <div className="cols">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>wind speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather