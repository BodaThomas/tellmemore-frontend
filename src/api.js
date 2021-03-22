import axios from 'axios'

export default axios.create({
    baseURL: 'https://tellmemore-backend-api.herokuapp.com/'
})
