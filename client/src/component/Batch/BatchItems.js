import React, { Component } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  List,
  Card,
} from 'antd'

export default class BatchItems extends Component {
  state = {
    equipments: [],
    accessories: [],
    loading: true
  }
  componentDidMount() {
    const { currentBatch } = this.props
    axios.get(`http://localhost:9000/search/equipments?batch=${currentBatch.code}`)
      .then(res => {
        this.setState({
          equipments: res.data
        })
      })

    axios.get(`http://localhost:9000/search/accessories?batch=${currentBatch.code}`)
      .then(res => {
        this.setState({
          accessories: res.data,
          loading: false
        })
      })
  }
  render() {
    const { equipments, accessories, loading } = this.state
    const { currentBatch } = this.props
    return (
      <Card loading={loading} style={{ overflowX: 'hidden', overflowY: 'auto', height: 500, paddingRight: 10, border: 0 }} bodyStyle={{ padding: 0 }}>
        <Row guttter={20}>
          <Col xl={12} style={{ paddingRight: 3 }}>
            {!equipments.length ? <h3>Batch {currentBatch.code} does not include any equipment </h3> :
              <>
                <h3>Equipments</h3>
                <List
                  size="small"
                  header={null}
                  footer={null}
                  bordered
                  dataSource={equipments}
                  renderItem={item => <List.Item><List.Item.Meta title={item.name} description={item.code} /></List.Item>}
                />
              </>
            }
          </Col>
          <Col xl={12} style={{ paddingLeft: 3 }}>
            {!accessories.length ? <h3>Batch {currentBatch.code} does not include any accessory</h3> :
              <>
                <h3>Accessories</h3>
                <List
                  size="small"
                  header={null}
                  footer={null}
                  bordered
                  dataSource={accessories}
                  renderItem={item => <List.Item><List.Item.Meta title={item.accName} description={item.accCode} /></List.Item>}
                />
              </>
            }
          </Col>
        </Row>
      </Card>

    )
  }
}
