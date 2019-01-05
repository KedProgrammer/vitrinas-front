import axios from 'axios'

var userToken = ''

if (localStorage.getItem('token') !== null) {
  userToken = localStorage.getItem('token')
}

const configService = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': userToken
  }
})

export default configService
