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

export interface WeatherData {
    temp: number
    feelsLike: number
    tempMax: number
    tempMin: number
    description: string
}

export async function getCityLocation(cityName: string): Promise<CityLocation | { error: string }> {
    try {
        // Fetch CSV file
        const response = await fetch('/cities_20000.csv')
        const fileContent = await response.text()
        
        // Parse CSV data
        const { data } = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true
        }) as { data: CityLocationResponse[] }

        // Find the city
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

export async function getWeatherData(cityLocation: CityLocation, units: string): Promise<WeatherData | { error: string }> {
    try {
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${cityLocation.lat}&lon=${cityLocation.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        const data = await weatherData.json()
        return {
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            tempMax: Math.round(data.main.temp_max),
            tempMin: Math.round(data.main.temp_min),
            description: data.weather[0].description.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }
    } catch (error) {
        return {
            error: `Error reading weather data: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
    }
}

