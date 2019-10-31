import React, { Component } from 'react'
import {
  Row,
  Col,
  Card
} from 'antd'

export default class BatchItems extends Component {
  render() {
    const { allItems, currentBatch } = this.props
    console.log('allItems', allItems)
    return (
      <>
        <Row guttter={8}>
          <Col xl={12} style={{ paddingRight: 3 }}>
            <Card
              title='Equipments'
            >
              {currentBatch} equipments:
            </Card>
          </Col>
          <Col xl={12} style={{ paddingLeft: 3 }}>
            <Card
              title='Accessories'
            >
              {currentBatch} accessories:
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
