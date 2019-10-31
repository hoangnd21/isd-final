import React, { Component } from 'react'
import axios from 'axios'
import {
  Divider
} from 'antd'

export default class Providers extends Component {
  state = {
    currentUser: {},
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
    axios.get('http://localhost:9000/providers')
      .then(res => {
        this.setState({
          allProviders: res.data
        })
      })
  }

  render() {
    const { allProviders } = this.state;
    console.log(allProviders)
    return (
      <>
        <h2>Providers
          <Divider type='horizontal' />
        </h2>
      </>
    )
  }
}
