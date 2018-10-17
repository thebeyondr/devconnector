import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import store from './store'
import jwtDecode from 'jwt-decode'
import setAuthHeader from './utils/setAuthHeader'
import { setCurrentUser, logoutUser } from './actions/authActions'
import Dashboard from './components/dashboard/Dashboard'
import { clearCurrentProfile } from './actions/profileActions'
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'

if (window.localStorage.jwtToken) {
  const { jwtToken } = window.localStorage
  // Set Authorization Header
  setAuthHeader(jwtToken)
  // Set current user
  const decodedToken = jwtDecode(jwtToken)
  // Dispatch set_current_user action
  store.dispatch(setCurrentUser(decodedToken))

  // If session is up, logout user
  const currentTime = Date.now() / 1000
  if (decodedToken.exp < currentTime) {
    store.dispatch(clearCurrentProfile())
    store.dispatch(logoutUser())

    /** TODO:
     * > Remove user profile
     * > Redirect user to '/login
     */
    window.location.href = '/login'
  }
}
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />

            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
