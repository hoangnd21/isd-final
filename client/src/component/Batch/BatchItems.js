import React, { Component } from 'react'

export default class BatchItems extends Component {
  render() {
    const { allItems, currentBatch } = this.props
    console.log('allItems', allItems)
    return (
      <div>
        {currentBatch}
      </div>
    )
  }
}
