
import axios from 'axios'


const http = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3 * 1e3
})

http.interceptors.request.use(config=>{
    config.headers['Authorization'] = 'apikey1111111';
    return config
})

export async function userSignup(formdata) {
    try {
        const result = await http.post('/api/user/signup', formdata);
        return result;
    } catch (err) {
        throw err.response
    }
}

