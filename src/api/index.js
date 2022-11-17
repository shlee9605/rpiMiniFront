import axios from 'axios'
import router from '../routes'

const DOMAIN = 'http://localhost:8080';
// const DOMAIN = 'http://192.168.0.63:8080';
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {
  return axios({
    method, 
    url: DOMAIN + url, 
    data
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if (status === UNAUTHORIZED) onUnauthorized()
      throw result.response
    })
}

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `${token}` : null;
}

const {token} = localStorage
if (token) setAuthInHeader(token)

export const profile = {
  fetch() {
    return request('get', '/profile/read')
  },
  fetchall() {
    return request('get', '/profile/read/all')
  },
  updateid(key, userid){
    return request('patch', '/profile/patch', {key, userid})
  },
}
export const auth = {
  login(userid, password) {
    return request('post', '/login', {userid, password}) 
  },
  
  signup(userid, password){
    return request('post', '/auth/join', {userid, password})
  }
}