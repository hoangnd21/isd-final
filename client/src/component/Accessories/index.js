import React, { Component } from 'react'
import axios from 'axios'

export default class Accessories extends Component {
  state = {
    currentUser: {},
    allAccessories: []
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
    axios.get('http://localhost:9000/accessories')
      .then(res => {
        this.setState({
          allAccessories: res.data
        })
      })
  }
  render() {
    const { currentUser, allAccessories } = this.state
    console.log('allAccessories', allAccessories)
    console.log(currentUser)
    return (
      <>
        <h2>Accessories</h2>
      </>
    )
  }
}
