import axios from 'axios'

var userToken = ''

if (localStorage.getItem('user_data') !== null) {
  userToken = JSON.parse(localStorage.getItem('user_data'))
  userToken = userToken.user.auth_token
}

const configService = axios.create({
  baseURL: 'staging.comidaenlau.com/',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2fQ.cmfqeZanuGPtFheDSGzeXhAg56D3DODqyseskOO3Dg8'
  }
})

export default configService
