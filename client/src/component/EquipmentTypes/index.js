import React, { Component } from 'react'
import axios from 'axios'
import {
  List,
  Button,
  Drawer
} from 'antd';
import EqTypesDrawer from './EqTypesDrawer'
import Forbidden from '../../Config/Forbidden';

export default class EquipmentTypes extends Component {
  state = {
    generalTypes: [],
    currentUser: null,
    loading: true,
    drawerVisible: false,
    generalTypebyID: []
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
          generalTypes: res.data,
          loading: false
        })
      })
  }

  eqTypesDrawer = item => {
    console.log(item)
    this.setState({
      drawerVisible: true,
      generalTypebyID: item
    })
  }
  closeDrawer = () => {
    this.setState({
      drawerVisible: false
    })
  }

  render() {
    const { generalTypes, drawerVisible, generalTypebyID, currentUser } = this.state;
    return (
      <>
        {currentUser && currentUser.level > 3 ? <div style={{ overflowX: "hidden", width: '100%' }}>
          <List
            itemLayout='horizontal'
            dataSource={generalTypes}
            header={<h2>List of general types</h2>}
            size='large'
            pagination={{
              pageSize: 10,
            }}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Button style={{ padding: 0 }} type='link' onClick={() => this.eqTypesDrawer(item)}><h3>{item.label}</h3></Button>
                  }
                  description={`ID: ${item.value}`}
                />
              </List.Item>
            )}
          >
          </List>
          <Drawer
            title={generalTypebyID.label}
            placement="right"
            closable={false}
            onClose={this.closeDrawer}
            visible={drawerVisible}
            style={{ position: 'absolute' }}
            destroyOnClose
            maskStyle={{ backgroundColor: 'transparent' }}
          >
            <EqTypesDrawer generalType={generalTypebyID} />
          </Drawer>
        </div>
          :
          <Forbidden />
        }
      </>
    )
  }
}
