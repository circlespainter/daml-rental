import axios from 'axios'
import { SERVER_HOST } from './conf'

const adapter = () => axios.create({
    baseURL: SERVER_HOST,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export default adapter