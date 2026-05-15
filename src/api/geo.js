import axios from "axios";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

//도시의 좌표값을 가져오는 함수
export const fetchCoordinates = async (city) => {
    const res = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params:{
            //주소를 통해 값을 받기위해 내가 보내야하는 값들
            q: city,
            limit: 1,
            appid: API_KEY,
        }
    })
    if (!Array.isArray(res.data || res.data.length === 0)) {
        throw new Error('도시를 찾을 수 없습니다.')
    }
    const {lat, lon, name, country} = res.data[0]
    return {lat, lon, name, country}
}