import React, { Component } from 'react';
import {
  // List
} from 'antd'

export default class EqTypesPopover extends Component {
  render() {
    const { generalType, equipmentTypes } = this.props
    console.log(`${generalType.title}`, equipmentTypes)
    return (
      <>
        {generalType.title}
      </>
    )
  }
}
