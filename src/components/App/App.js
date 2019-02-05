import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css'

import Header from '../Header/Header'
import ProductsList from '../ProductsList/ProductsList'
import Login from '../Login/Login'
import SellProduct from '../SellProduct/SellProduct'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      loggedIn: false,
      loginVisible: false,
      loginLeaving: false,
    }
    this.loginResult = this.loginResult.bind(this)
    this.closeLogin = this.closeLogin.bind(this)
    this.showLogin = this.showLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  loginResult({user, loggedIn}) {
    this.setState({user, loggedIn})
  }

  showLogin() {
    this.setState({
      loginVisible: true
    })
  }

  async closeLogin() {
    await this.setState({loginLeaving: true})
    setTimeout(() => {
      this.setState({
        loginVisible: false,
        loginLeaving: false
      })
    }, 1000)
  }

  logout() {
    this.setState({
      user: null,
      loggedIn: false
    })
  }

  render() {
    return (
      <div className="container">
        <Header showLogin={this.showLogin} loggedIn={this.state.loggedIn} requestLogout={this.logout} />
        
        {this.state.loginVisible && <Login loginResult={this.loginResult} requestClose={this.closeLogin} leaving={this.state.loginLeaving}/> }
        <main>
          <Switch>
            <Route path='/' exact render={() => {
              return <Redirect to='/products' />
            }} />
            <Route path='/products' component={ ProductsList }/>
            <Route path='/sell' component={ SellProduct }/>
            <Route path='/profile' component={ ProductsList }/>
            <Route path='/login' component={ ProductsList }/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
