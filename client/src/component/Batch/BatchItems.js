import React, { Component } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Card
} from 'antd'

export default class BatchItems extends Component {
  componentDidMount() {
    const { currentBatch } = this.props
    console.log(currentBatch)
    axios.get('')
  }
  render() {
    const { currentBatch } = this.props
    return (
      <>
        <Row guttter={8}>
          <Col xl={12} style={{ paddingRight: 3 }}>
            <Card
              title='Equipments'
            >
              {currentBatch.code} equipments:
            </Card>
          </Col>
          <Col xl={12} style={{ paddingLeft: 3 }}>
            <Card
              title='Accessories'
            >
              {currentBatch.code} accessories:
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
