import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// API KEY: /movie/now_playing?api_key=dfb70475e09086887517fbfce39e2581&language=pt-BRpage=1
// Exemplo de URL: https://api.themoviedb.org/3/movie/550?api_key=1f54bd990f1


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;