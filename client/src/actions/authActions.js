import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './types'
import axios from 'axios'
import setAuthHeader from './../utils/setAuthHeader'
import jwtDecode from 'jwt-decode'

// Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Login - Get token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save token to local storage
      const { token } = res.data
      window.localStorage.setItem('jwtToken', token)
      // Set Authorization Header
      setAuthHeader(token)
      // Decode token and set the current user
      const decoded = jwtDecode(token)
      dispatch(clearErrors())
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  window.localStorage.removeItem('jwtToken')
  // remove Authorization header from requests
  setAuthHeader(false)
  // empty current use and set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
