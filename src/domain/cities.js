import api from './api.service';

const Cities = {
    getCities: async (dados) => {
        const response = await api.get(`onecall?lat=${dados[0].latitude}&lon=${dados[0].longitude}&exclude=minutely,hourly,alerts&lang=pt_br&units=metric&appid=cb4861466c75a1d2cc1bab160e5cbaf1`)
        const clima = {
            currentTemp: response.data.current.temp.toString().substr(0, 2),
            details: [],
        }
        for (let i = 0; i < 3; i++) {
            clima.details.push({
                icon: (`http://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png`),
                condition: response.data.daily[i].weather[0].description,
                pop: response.data.daily[i].pop * 100,
                humidity: response.data.daily[i].humidity,
                minTemp: response.data.daily[i].temp.min.toString().substr(0, 2),
                maxTemp: response.data.daily[i].temp.max.toString().substr(0, 2),
           })
            
        }
        return clima
    }
}

export default Cities;

