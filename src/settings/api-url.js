import axios from 'axios'

var userToken = ''

if (localStorage.getItem('token') !== null) {
  userToken = localStorage.getItem('token')
}

const configService = axios.create({
  baseURL: 'http://18.223.247.60',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': userToken
  }
})

export default configService
