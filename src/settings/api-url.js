import axios from 'axios'

var userToken = ''

if (localStorage.getItem('yek') !== null) {
  userToken = localStorage.getItem('yek')
}

const configService = axios.create({
  baseURL: 'http://staging.comidaenlau.com/',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': userToken
  }
})

export default configService
