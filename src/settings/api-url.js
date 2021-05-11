import axios from 'axios'

var userToken = ''

if (localStorage.getItem('user') !== null) {
  userToken = JSON.parse(localStorage.getItem('user')).auth_token
}

const configService = axios.create({
  baseURL: 'http://ec2-3-17-208-186.us-east-2.compute.amazonaws.com',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': userToken
  }
})

export default configService
