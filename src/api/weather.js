import axios from "axios";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

//좌표값을 받아와서 함수를 작성, 다른 파일에서도 쓸 수 있게 export사용
export const fetchWeatherByCoords=async(lat, lon)=>{
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params:{
            lat,
            lon,
            units:'metric',
            lang:'kr',
            appid:API_KEY,
        }
    })
    return res.data
}