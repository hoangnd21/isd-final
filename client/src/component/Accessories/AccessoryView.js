import React, { Component } from 'react'

export default class AccessoryView extends Component {
  render() {
    const { accessory } = this.props
    console.log(accessory)
    return (
      <>
        AccessoryView
      </>
    )
  }
}
