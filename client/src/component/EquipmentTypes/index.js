import React, { Component } from 'react'
import axios from 'axios'
import {
  List,
  Button,
  Drawer,
  Dropdown,
  Menu,
  notification,
  Icon
} from 'antd';
import EqTypesDrawer from './EqTypesDrawer'
import Forbidden from '../../Config/Forbidden';
import GeneralTypeForm from './GeneralTypeForm'

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

  getAllGenTypes = () => {
    axios.get(`http://localhost:9000/generalTypes`)
      .then(res => {
        this.setState({
          generalTypes: res.data,
        })
      })
  }
  eqTypesDrawer = item => {
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

  addGenType = genType => {
    console.log('index', genType)
    axios.post('http://localhost:9000/generalTypes/addGeneralType', genType)
      .then(res => {
        if (res.status === 200) {
          notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
              {res.data}
            </span>
          })
          this.getAllGenTypes()
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    const { generalTypes, drawerVisible, generalTypebyID, currentUser } = this.state;
    return (
      <>
        {currentUser && currentUser.level < 2 ?
          <Forbidden />
          : <div>
            <h2>List of General types
            {currentUser && currentUser.level > 3 ? <div style={{ float: 'right' }}>
                <Dropdown
                  overlay={
                    <Menu style={{ padding: 5 }}>
                      <GeneralTypeForm addGenTypeRequest={this.addGenType} />
                    </Menu>
                  }
                  trigger={['click']}
                  placement='bottomRight'
                >
                  <Button
                    type='primary'
                    icon='down'
                  >
                    Add a new General Type
                </Button>
                </Dropdown>
              </div> : null}
            </h2>
            <List
              itemLayout='horizontal'
              dataSource={generalTypes}
              size='large'
              pagination={{
                pageSize: 8
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
            ><Drawer
              title={generalTypebyID.label}
              placement="right"
              closable={false}
              onClose={this.closeDrawer}
              visible={drawerVisible}
              style={{ position: 'absolute', }}
              maskStyle={{ backgroundColor: 'transparent' }}
              width={900}
            >
                <EqTypesDrawer generalType={generalTypebyID} />
              </Drawer>
            </List>
          </div>
        }
      </>
    )
  }
}
