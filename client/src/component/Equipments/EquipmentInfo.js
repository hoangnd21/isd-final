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
    return (
      <>
        <Row gutter={16}>
          <Col xl={12}>
            <h3>{generalType.label}&nbsp;{equipment.name}</h3>
            <div style={{ fontSize: '1.1em', lineHeight: '2em' }}>
              Equipment Type: {subType.label}<br />
              Equipment Code: {equipment.code}<br />
              Purchased date: {equipment.datePurchase.slice(8, 10)}-{equipment.datePurchase.slice(5, 7)}-{equipment.datePurchase.slice(0, 4)}<br />
              Batch: {equipment.batch}<br />
              Manufacturer: {equipment.manufacturer}<br />
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
              </span>
            </h3>
            <div style={{ fontSize: '1.1em' }}>
              Batch: {equipment.batch} <br />
              Price: ${equipment.originalPrice}<br />
            </div>
          </Col>

        </Row>

      </>
    )
  }
}