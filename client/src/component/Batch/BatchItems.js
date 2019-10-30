import React, { Component } from 'react'

export default class BatchItems extends Component {
  render() {
    const { allItems } = this.props
    console.log(allItems)
    return (
      <div>
        BatchItems
      </div>
    )
  }
}
