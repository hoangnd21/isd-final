import React, { Component } from 'react'
import axios from 'axios'

export default class EquipmentTypes extends Component {
  state = {
    equipmentTypesList: [],
    generalTypes: [],
    currentUser: null,
  }

  componentDidMount() {
    axios({
      baseURL: '/login',
      method: 'get',
      headers: {
        "charset": "UTF-8",
        "accept": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then(res => {
        this.setState({
          currentUser: res.data
        })
      })
    axios.get(`http://localhost:9000/generalTypes`)
      .then(res => {
        this.setState({
          generalTypes: res.data
        })
      })
  }
  getAllEqTypes = () => {
    const { generalTypes, equipmentTypesList } = this.state;
    generalTypes.map(g => {
      axios.get(`http://localhost:9000/subTypes/genTypeId/${g.value}`)
        .then(res => {
          this.setState({
            equipmentTypesList: equipmentTypesList.concat(res.data)
          })
          console.log(equipmentTypesList)
        })
    })
  }
  render() {
    const { generalTypes } = this.state
    return (
      <>
      </>
    )
  }
}
