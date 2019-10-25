import React from 'react';
import axios from 'axios'

export default class Home extends React.Component {
  state = {
    currentUser: null
  }
  componentDidMount() {
    axios({
      baseURL: '/login',
      method: 'get',
      headers: {
        "charset": "UTF-8",
        "accept": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then(res => {
        this.setState({
          currentUser: res.data
        })
      })
  }
  render() {
    return (
      <h1>Content of Home</h1>
    )
  }
}