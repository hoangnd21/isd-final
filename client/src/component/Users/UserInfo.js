import React, { Component } from 'react'

export default class UserInfo extends Component {
  render() {
    const { user } = this.props
    return (
      <>
        {user.fullname}<br />
        {user.username}
      </>
    )
  }
}
