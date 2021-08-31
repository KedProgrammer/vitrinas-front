import axios from 'axios'
// hola mundo
var userToken = ''

if (localStorage.getItem('user') !== null) {
  userToken = JSON.parse(localStorage.getItem('user')).auth_token
}

const configService = axios.create({
  baseURL: 'http://ec2-3-16-149-108.us-east-2.compute.amazonaws.com',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': userToken
  }
})

export default configService
