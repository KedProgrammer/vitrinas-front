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
    'authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4fQ.o0rzosFkPZuOsdmi6vfiI7WJ5f18ITtyqdPxDED_aIs'
  }
})

export default configService
