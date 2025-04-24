import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isErrorMsgPresent: false}

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLogin = event => {
    event.preventDefault()
    this.getUserAuthentication()
  }

  getUserAuthentication = async () => {
    const {username, password} = this.state

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({errorMsg, isErrorMsgPresent: true})
    }
  }

  render() {
    const {errorMsg, isErrorMsgPresent} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitLogin}>
          <h1 className="login-heading">UNI Resto Cafe</h1>
          <label htmlFor="username" className="label-style">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="input-style"
            onChange={this.updateUsername}
          />
          <label htmlFor="password" className="label-style">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="input-style"
            onChange={this.updatePassword}
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          {isErrorMsgPresent ? (
            <p className="error-msg-style">*{errorMsg}</p>
          ) : (
            ''
          )}
        </form>
      </div>
    )
  }
}
export default Login
