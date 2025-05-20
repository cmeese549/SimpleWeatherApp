import * as Papa from 'papaparse'

interface CityLocationResponse {
    city_id: number
    city_name: string
    state_code: string
    country_code: string
    country_full: string
    lat: number
    lon: number
}

export interface CityLocation {
    cityName: string
    lat: number
    lon: number
}

interface CurrentWeatherData {
    temp: number
    feelsLike: number
    tempMax: number
    tempMin: number
    description: string
}

export interface HourlyForecastData {
    icon: string
    time: number 
    temp: number
    description: string
    timezone: number
    humidity: number
}

export interface WeatherData {
    current: CurrentWeatherData,
    forecast: HourlyForecastData[]
}

export interface LocalData {
    pinnedCities: string[]
    metric: string
}

const defaultLocalData: LocalData = {
    pinnedCities: [
        'Rio De Janeiro',
        'Beijing',
        'Los Angeles'
    ],
    metric: 'metric'
}

const response = await fetch('/cities_20000.csv')
const fileContent = await response.text()
const { data } = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true
}) as { data: CityLocationResponse[] }

//Get Latitude/Longitude from name of city
export const getCityLocation = async (cityName: string): Promise<CityLocation | { error: string }> => {
    try {
        const city = data.find(record => 
            record.city_name.toLowerCase() === cityName.toLowerCase()
        )

        if (!city) {
            return {
                error: `City "${cityName}" not found`
            }
        }

        return {
            cityName: city.city_name,
            lat: city.lat,
            lon: city.lon
        }
    } catch (error) {
        return {
            error: `Error reading city data: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
    }
}

//Search CSV file for city with a given name
export const searchCities = async (query: string): Promise<string[]>  => {
    try {
        const normalizedQuery = query.trim().toLowerCase();

        const searchResults = data
            .filter(record => {
                const cityName = (record.city_name || '').trim().toLowerCase();
                return cityName.startsWith(normalizedQuery);
            })
            .map(record => `${record.city_name}, ${record.state_code}`)
            .sort()
            .slice(0, 100);

        return searchResults;
    } catch (error) {
        console.error('Error searching cities:', error);
        return [];
    }
}

//Collect both the current weather data and a 5 day forcast from the API
export const getWeatherData = async (cityLocation: CityLocation, units: string): Promise<WeatherData | { error: string }> => {
    try {
        const currentWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${cityLocation.lat}&lon=${cityLocation.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        let data = await currentWeatherData.json()
        const currentWeather: CurrentWeatherData = {
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            tempMax: Math.round(data.main.temp_max),
            tempMin: Math.round(data.main.temp_min),
            description: data.weather[0].description.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }
        const forecastData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=${units}&lat=${cityLocation.lat}&lon=${cityLocation.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        data = await forecastData.json()
        const forecast = data.list.map((forecast: any) => {
            return {
                icon: forecast.weather[0].icon,
                time: forecast.dt,
                temp: Math.round(forecast.main.temp),
                description: forecast.weather[0].description.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                timezone: data.city.timezone,
                humidity: forecast.main.humidity
            }
        })
        return {
           current: currentWeather,
           forecast: forecast
        }
    } catch (error) {
        return {
            error: `Error reading weather data: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
    }
}

//Save/Load data to local storage
export const loadLocalData = async (): Promise<LocalData> => {
    try {
        const raw = localStorage.getItem('localWeatherData')
        return raw ? JSON.parse(raw) : defaultLocalData
      } catch {
        return defaultLocalData
      }
}

export const saveLocalData = async (localData: LocalData) => {
    try {
        localStorage.setItem('localWeatherData', JSON.stringify(localData))
    } catch (error) {
        console.error('Error saving local data:', error)
    }
}