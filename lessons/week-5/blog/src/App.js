import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import './App.css';
import Users from './components/Users'
import Posts from './components/Posts'

class App extends Component {
  state = {
    user: null
  }

  login = async () => {
    // hacky/temp sign in - Get all users, return first one
    const res = await axios.get('users')
    return res.data.data[0]
  }

  async componentDidMount() {
    const user = await this.login()
    this.setState({ user })
  }

  render() {
    // If no user, display 'not logged in'
    if(this.state.user) {
      return (
        <Router>
          <div>
            <h1>Hello {this.state.user.name}!</h1>
            <p>To see a list of users, <Link to='/users'>click here.</Link></p>
            <p>To see a list of posts, <Link to='/posts'>click here.</Link></p>
            <Route path='/users' component={Users} />
            <Route path='/posts' component={Posts} />
          </div>
        </Router>
      )
    }
    // If a user, greet them
    return (
      <h1>Not logged in</h1>
    );
  }
}

export default App;
