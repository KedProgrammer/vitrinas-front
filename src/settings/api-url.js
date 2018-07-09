import axios from 'axios'

var userToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4fQ.o0rzosFkPZuOsdmi6vfiI7WJ5f18ITtyqdPxDED_aIs'

const configService = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'accept-language': 'es',
    'Content-Type': 'application/json',
    'authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2fQ.cmfqeZanuGPtFheDSGzeXhAg56D3DODqyseskOO3Dg8'
  }
})

export default configService
