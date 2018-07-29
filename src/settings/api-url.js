import axios from 'axios'

var userToken = ''

if (localStorage.getItem('yek') !== null) {
  userToken = localStorage.getItem('yek')
}

const configService = axios.create({
  baseURL: 'https://api.comidaenlau.com/',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': userToken
  }
})

export default configService
