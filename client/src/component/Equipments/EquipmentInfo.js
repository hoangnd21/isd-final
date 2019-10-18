import React from 'react';
import {
  Row,
  Col
} from 'antd';
import axios from 'axios'

export default class EquipmentInfo extends React.Component {
  state = {
    generalType: [],
    subType: []
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

    // axios
    axios.get(`http://localhost:9000/subTypes/${equipment.subtype[0]}`)
      .then(res => {
        this.setState({
          subType: res.data,
        })
      })
      .catch(error => {
        console.log(error)
      });

  }
  render() {
    const { generalType, subType } = this.state
    const { equipment } = this.props;
    console.log(equipment)
    return (
      <>
        <Row gutter={16}>
          <Col xl={12}>
            <h2>{equipment.name}</h2>
            <div style={{ fontSize: '1.1em' }}>
              General type: {generalType.label}<br />
              Batch: {equipment.batch} <br />
              Price: ${equipment.originalPrice}<br />
              Code: {equipment.code}<br />
              Purchased date: {equipment.datePurchase.slice(8, 10)}-{equipment.datePurchase.slice(5, 7)}-{equipment.datePurchase.slice(0, 4)}<br />
              Batch: {equipment.batch}<br />
              Manufacturer: {equipment.manufacturer}<br />
            </div>
          </Col>
          <Col xl={12}>
            <h2>
              Status: <span style={equipment.status[0] === "Ready" ? { color: 'green' } : { color: 'red' }}>{equipment.status}</span>
            </h2>
            <div style={{ fontSize: '1.1em' }}>
              Equipment Type: {subType}<br />
            </div>
          </Col>

        </Row>

      </>
    )
  }
}