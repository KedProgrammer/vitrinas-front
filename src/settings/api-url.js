import axios from 'axios'

var userToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4fQ.o0rzosFkPZuOsdmi6vfiI7WJ5f18ITtyqdPxDED_aIs'

const configService = axios.create({
  baseURL: 'http://staging.comidaenlau.com/',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4fQ.o0rzosFkPZuOsdmi6vfiI7WJ5f18ITtyqdPxDED_aIs'
  }
})

export default configService
