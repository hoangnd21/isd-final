import React from 'react';
import axios from 'axios'

export default class About extends React.Component {
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
    const { currentUser } = this.state;
    return (
      <>
        <h1>
          {currentUser && currentUser.rank} {currentUser && currentUser.username}
        </h1>
      </>
    )
  }
}