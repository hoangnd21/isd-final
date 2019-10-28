import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export default class Forbidden extends Component {
  render() {
    return (
      <>
        <h1>
          403 - Forbidden.
        </h1>
        <p>You do not have access to this page.</p>
        <Link to='/'><Button type='primary'>Go Home</Button></Link>
      </>

    )
  }
}
