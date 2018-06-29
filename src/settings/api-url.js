import axios from 'axios'

var userToken = ''

if (localStorage.getItem('user_data') !== null) {
  userToken = JSON.parse(localStorage.getItem('user_data'))
  userToken = userToken.user.auth_token
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
