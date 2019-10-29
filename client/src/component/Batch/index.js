import React from 'react';
import axios from 'axios'

export default class Batch extends React.Component {
  state = {
    currentUser: null,
    allBatch: []
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
    axios.get('http://localhost:9000/batch')
      .then(res => {
        this.setState({
          allBatch: res.data
        })
      })
  }
  render() {
    const { allBatch } = this.state
    console.log(allBatch)
    return (
      <h2>Batch</h2>
    )
  }
}