import api from './api.service';
const chave = ''

const Cidades = {
    getCidades: async (dados) => {
        const response = await api.get(`onecall?lat=${dados[0].latitude}&lon=${dados[0].longitude}&exclude=minutely,hourly,alerts&lang=pt_br&units=metric&appid=${chave}`)
        const clima = {
            tempAtual: response.data.current.temp.toString().substr(0, 2),
            detalhes: [],
        }
        for (let i = 0; i < 3; i++) {
            clima.detalhes.push({
                icone: (`http://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png`),
                descricao: response.data.daily[i].weather[0].description,
                chuva: response.data.daily[i].pop * 100,
                humidade: response.data.daily[i].humidity,
                minTemp: response.data.daily[i].temp.min.toString().substr(0, 2),
                maxTemp: response.data.daily[i].temp.max.toString().substr(0, 2),
           })
            
        }
        return clima
    }
}

export default Cidades;

