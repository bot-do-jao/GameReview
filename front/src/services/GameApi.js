import axios from "axios";

const gameApi = axios.create({
    baseURL: "https://api.rawg.io/api/"
});

export default gameApi;