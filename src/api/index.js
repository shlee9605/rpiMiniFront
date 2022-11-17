import axios from 'axios'
import router from '../routes'

// const DOMAIN = 'http://192.168.0.54:8080';
// const DOMAIN = 'http://192.168.0.63:8080';
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {    //request router
  return axios({
    method, 
    url: 'http://192.168.0.54:8080' + url, 
    // url: 'http://192.168.0.63:8080' + url, 
    data
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if (status === UNAUTHORIZED) onUnauthorized()
      throw result.response
    })
}

export const setAuthInHeader = token => { //set header in JWT
  axios.defaults.headers.common['Authorization'] = token ? `${token}` : null;
}

const {token} = localStorage
if (token) setAuthInHeader(token)

export const profile = {      
  fetch() {                   // read certain ID data in KEY table
    return request('get', '/profile/read')
  },
  fetchall() {                // read all KEY table
    return request('get', '/profile/read/all')
  },
  updateid(key, userid){      // update userid in key table
    return request('patch', '/profile/patch', {key, userid})
  },
}
export const auth = {
  login(userid, password) {   // auth login
    return request('post', '/login', {userid, password}) 
  },
  
  signup(userid, password){   //auth join
    return request('post', '/auth/join', {userid, password})
  }
}