import axios from 'axios'

const setAuthHeader = token => {
  if (token) {
    // Set Authorization header in axios
    axios.defaults.headers.common['Authorization'] = token
  } else {
    // Delete Auth header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthHeader
