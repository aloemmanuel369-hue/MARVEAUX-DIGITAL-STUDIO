import { useEffect, useMemo, useState } from 'react'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const RECENT_KEY = 'skycast-recent-searches'
const DEFAULT_CITY = 'San Francisco'

const weatherIcon = (code, isDay = true) => {
  if (code?.startsWith('01')) return isDay ? '☀️' : '🌙'
  if (code?.startsWith('02')) return isDay ? '🌤️' : '☁️'
  if (code?.startsWith('03') || code?.startsWith('04')) return '☁️'
  if (code?.startsWith('09') || code?.startsWith('10')) return '🌧️'
  if (code?.startsWith('11')) return '⛈️'
  if (code?.startsWith('13')) return '❄️'
  return '🌫️'
}

const getRecent = () => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') } catch { return [] }
}

function App() {
  const [city, setCity] = useState('')
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY)
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [unit, setUnit] = useState('C')
  const [recent, setRecent] = useState(getRecent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const convertTemp = (celsius) => unit === 'C' ? Math.round(celsius) : Math.round((celsius * 9) / 5 + 32)
  const tempUnit = unit === 'C' ? '°C' : '°F'

  const loadWeather = async (query) => {
    if (!API_KEY) {
      setError('Add VITE_OPENWEATHER_API_KEY to your environment to connect live weather data.')
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    try {
      const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`)
      if (!currentResponse.ok) throw new Error('City not found. Try searching for another city.')
      const current = await currentResponse.json()
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${current.coord.lat}&lon=${current.coord.lon}&appid=${API_KEY}&units=metric`)
      if (!forecastResponse.ok) throw new Error('Forecast data is unavailable right now.')
      const forecastData = await forecastResponse.json()
      setWeather(current)
      setForecast(forecastData.list)
      setSelectedCity(`${current.name}, ${current.sys.country}`)
      const nextRecent = [current.name, ...recent.filter((item) => item.toLowerCase() !== current.name.toLowerCase())].slice(0, 5)
      setRecent(nextRecent)
      localStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent))
    } catch (err) {
      setError(err.message || 'Something went wrong while loading the weather.')
    } finally { setLoading(false) }
  }

  useEffect(() => { loadWeather(DEFAULT_CITY) }, [])

  const dailyForecast = useMemo(() => {
    const days = []
    forecast.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString()
      if (!days.some((day) => day.date === date) && days.length < 5) days.push({ date, item })
    })
    return days
  }, [forecast])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (city.trim()) { loadWeather(city.trim()); setCity('') }
  }

  const formatDay = (date, index) => index === 0 ? 'Today' : new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(date))
  const formatTime = (timestamp) => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(timestamp * 1000))

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="logo" href="/" aria-label="Skycast home"><span className="logo-mark">✦</span> skycast</a>
        <div className="header-meta"><span className="live-dot" /> Live weather, everywhere</div>
        <div className="unit-toggle" aria-label="Temperature unit">
          <button className={unit === 'C' ? 'active' : ''} onClick={() => setUnit('C')}>°C</button>
          <button className={unit === 'F' ? 'active' : ''} onClick={() => setUnit('F')}>°F</button>
        </div>
      </header>

      <main>
        <section className="hero-copy">
          <p className="overline">Your daily atmosphere</p>
          <h1>Look up.<br /><em>Feel the forecast.</em></h1>
          <p className="intro">A calmer way to check the sky. Search a city to see the moment, the week ahead, and everything in between.</p>
          <form className="search-form" onSubmit={handleSubmit}>
            <span className="search-icon">⌕</span>
            <input aria-label="Search city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Search any city..." />
            <button type="submit" aria-label="Search">Search <span>↗</span></button>
          </form>
          <div className="recent-row">
            <span>Recent</span>
            {recent.length ? recent.map((item) => <button key={item} onClick={() => loadWeather(item)}>{item}</button>) : <small>Your searched cities will appear here.</small>}
          </div>
        </section>

        {error && <div className="notice">{error}</div>}
        {loading ? <div className="loading"><span /> Reading the sky...</div> : weather && (
          <>
            <section className="current-card">
              <div className="current-main">
                <div className="location"><span className="pin">⌖</span><span>{selectedCity}</span><small>Local time {formatTime(weather.dt)}</small></div>
                <div className="current-temp">{convertTemp(weather.main.temp)}<sup>{tempUnit}</sup></div>
                <p className="condition">{weather.weather[0].description}</p>
              </div>
              <div className="sky-illustration"><span className="sun">☼</span><span className="cloud">☁</span></div>
              <div className="current-details">
                <div><span>Feels like</span><strong>{convertTemp(weather.main.feels_like)}{tempUnit}</strong></div>
                <div><span>Humidity</span><strong>{weather.main.humidity}%</strong></div>
                <div><span>Wind</span><strong>{Math.round(weather.wind.speed * 3.6)} km/h</strong></div>
                <div><span>Visibility</span><strong>{(weather.visibility / 1000).toFixed(1)} km</strong></div>
              </div>
            </section>

            <section className="forecast-section">
              <div className="section-heading"><div><p className="overline">The week ahead</p><h2>Five day forecast</h2></div><span className="updated">Updated just now <i /></span></div>
              <div className="forecast-grid">{dailyForecast.map(({ date, item }, index) => <article className={index === 0 ? 'forecast-card today' : 'forecast-card'} key={date}><span className="forecast-day">{formatDay(date, index)}</span><span className="forecast-icon">{weatherIcon(item.weather[0].icon, item.weather[0].icon.endsWith('d'))}</span><strong>{convertTemp(item.main.temp)}{tempUnit}</strong><span className="forecast-condition">{item.weather[0].main}</span><div className="range"><span>{convertTemp(item.main.temp_min)}°</span><span className="range-line" /><span>{convertTemp(item.main.temp_max)}°</span></div></article>)}</div>
            </section>
          </>
        )}
      </main>
      <footer><span>skycast</span><span>Weather with a little more clarity.</span><span>Data by OpenWeatherMap · <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">Learn more ↗</a></span></footer>
    </div>
  )
}

export default App
