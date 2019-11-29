import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';
import axios from 'axios'

export default class EquipmentInfo extends React.Component {
  state = {
    generalType: [],
    subType: [],
    loading: true
  }
  componentDidMount() {
    const { equipment } = this.props
    axios.get(`http://localhost:9000/generalTypes/code/${equipment.generalType[0]}`)
      .then(res => {
        this.setState({
          generalType: res.data,
        })
      })
      .catch(error => {
        console.log(error)
      });

    axios.get(`http://localhost:9000/subTypes/subType?genTypeId=${equipment.generalType}&value=${equipment.subtype[0]}`)
      .then(res => {
        this.setState({
          subType: res.data,
          loading: false
        })
      })
      .catch(error => {
        console.log(error)
      });

  }
  render() {
    const { generalType, subType, loading } = this.state
    const { equipment } = this.props;
    return (
      <Card loading={loading} bodyStyle={{ margin: 0, padding: 0 }} style={{ border: 0 }}>
        <Row gutter={16} style={{ fontSize: '1.1em' }}>
          <Col xl={12}>
            <h3>{generalType.label}:&nbsp;{equipment.name}<br />
              Equipment Code: {equipment.code}<br />
            </h3>
            <div style={{ lineHeight: '2em' }}>
              Equipment Type: {subType.label}<br />
              Purchased date: {equipment.datePurchase.slice(8, 10)}-{equipment.datePurchase.slice(5, 7)}-{equipment.datePurchase.slice(0, 4)}<br />
              Batch: {equipment.batch}<br />
            </div>
          </Col>
          <Col xl={12}>
            <h3>
              Lock Status:&nbsp;
              <span
                style={
                  equipment.lockStatus[0] === "Ready" ?
                    { color: 'green' } :
                    equipment.lockStatus[0] === "Locked" ?
                      { color: 'red' } :
                      { color: '#f0cb65' }}>
                {equipment.lockStatus}
              </span><br />
              <span>
                {equipment.eqStatus[0] === 'Use' ? `Owner: ${equipment.owner}` : 'Equipment is in storage.'}
              </span>
            </h3>
            <div style={{ lineHeight: '2em' }}>
              Batch: {equipment.batch} <br />
              Price: ${equipment.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br />
              Manufacturer: {equipment.manufacturer}<br />
            </div>
          </Col>
        </Row>
      </Card>
    )
  }
}