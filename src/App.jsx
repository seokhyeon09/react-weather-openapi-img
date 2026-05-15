import './App.css'
import { useState, useRef, useEffect, useMemo } from 'react'
import WeatherCard from './components/WeatherCard'
import { fetchWeatherByCoords } from './api/weather'
import { fetchCoordinates } from './api/geo'
import { getColorByWeatherId } from './data/bgColor'

function App() {

  const [city, setCity] = useState('seoul')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })

  const bg = useMemo(() => {
    const weatherId = weather?.weather?.[0].id
    return getColorByWeatherId(weatherId ?? 0)
  }, [weather])

  const handleSearch = async () => {
    //문자열의 공백제거
    const q = city.trim()

    if (!q) return

    try {
      setLoading(true)
      setErr('')
      const { lat, lon, name, country } = await fetchCoordinates(q)
      console.log(lat, lon, name, country)
      const data = await fetchWeatherByCoords(lat, lon)
      console.log(data)
      setWeather(data)
      setCity('')
    } catch (error) {
      setErr(error)
    } finally {
      setLoading(false)
    }
  }
  const onChangeInput = (e) => setCity(e.target.value)
  const onKeyup = (e) => {
    if (e.key === 'Enter') handleSearch()
  }
  return (
    <div className='app' style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className='container'>
        <h1>정석현의 날씨앱</h1>
        <div className="input-wrap">
          <input
            value={city}
            //내용이 바뀌었을때
            onChange={onChangeInput}
            //키가눌렸을때
            onKeyUp={onKeyup}
            ref={inputRef}
            type="text"
            placeholder='날씨를 입력하세요'
          />
          <button
            onClick={handleSearch}
          >검색</button>
        </div>
        {err && <p>{err}</p>}
        {loading && <p>불러오는 중...</p>}
        <WeatherCard weather={weather} />
      </div>
    </div>
  )
}

export default App
