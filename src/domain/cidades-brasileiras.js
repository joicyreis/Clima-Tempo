import cidadesBrasil from '../data/data-source/br-cidades'


const cidadesBrasileiras = {
  cidades: [],
}
for (let i = 0; i < cidadesBrasil.length; i++) {
  cidadesBrasileiras.cidades.push({
    id: cidadesBrasil[i].id,
    nome: cidadesBrasil[i].nome,
    estado: cidadesBrasil[i].estado,
    latitude: cidadesBrasil[i].latitude,
    longitude: cidadesBrasil[i].longitude,
 })
  
}

export default cidadesBrasileiras;