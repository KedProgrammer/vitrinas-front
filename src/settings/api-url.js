import axios from 'axios'

var userToken = ''

if (localStorage.getItem('user') !== null) {
  userToken = JSON.parse(localStorage.getItem('user')).auth_token
}

const configService = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'authorization': userToken
  }
})

export default configService
