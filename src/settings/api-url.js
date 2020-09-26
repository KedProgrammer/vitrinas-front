import axios from 'axios'

var userToken = ''

if (localStorage.getItem('user') !== null) {
  userToken = JSON.parse(localStorage.getItem('user')).auth_token
}

const configService = axios.create({
  baseURL: 'http://api.sistema-integral.com',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': userToken
  }
})

export default configService
