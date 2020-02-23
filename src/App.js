import React, { Component } from 'react';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.history.push('/content');
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App container">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="get-shit-done navbar-brand" href="">Get Sh*t Done!</a>
            </div>
              <ul className="nav navbar-nav navbar-right">
                {
                  isAuthenticated() && (
                      <li>
                        <button className="btn navbar-brand login-logout" onClick={this.logout.bind(this)}>Logout</button>
                      </li>
                    )
                }
                {
                  !isAuthenticated() && (
                      <button className="btn navbar-brand login-logout" onClick={this.login.bind(this)}>Login</button>
                    )
                }
              </ul>
            </div>
        </nav>
      </div>
    );
  }
}

export default App;
