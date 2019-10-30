import React, { Component } from 'react'
import axios from 'axios'
import {
  List,
  Button,
  Drawer,
  Dropdown,
  Menu,
  notification,
  Icon,
  Input,
  Divider
} from 'antd';
import EqTypesDrawer from './EqTypesDrawer'
import Forbidden from '../../Config/Forbidden';
import GeneralTypeForm from './GeneralTypeForm'

const { Search } = Input

export default class EquipmentTypes extends Component {
  state = {
    generalTypes: [],
    currentUser: null,
    loading: true,
    drawerVisible: false,
    generalTypebyID: [],
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
    const { generalTypes, drawerVisible, generalTypebyID, currentUser, loading } = this.state;
    return (
      currentUser && currentUser.level < 2 ?
        <Forbidden />
        : <>
          <h2>General types:
            <Divider type='horizontal' />
            {currentUser && currentUser.level > 3 ?
              <div>
                <Search
                  style={{ padding: 0, margin: '3px 5px 0 0', width: 400 }}
                  placeholder={`Search ${generalTypes.length} entries`}
                  onSearch={value => console.log(value)}
                  enterButton
                />
                <span style={{ float: 'right' }}>
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
                </span>
              </div>
              : null}
          </h2>
          <List
            itemLayout='horizontal'
            dataSource={generalTypes}
            size='large'
            loading={loading}
            pagination={{
              pageSize: 7
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
            <Drawer
              title={<h3 style={{ margin: 0 }}>{generalTypebyID.label}</h3>}
              placement="right"
              closable={false}
              onClose={this.closeDrawer}
              visible={drawerVisible}
              destroyOnClose
              style={{ position: 'absolute', }}
              width='auto'
            >
              <EqTypesDrawer generalType={generalTypebyID} />
            </Drawer>
          </List>
        </>
    )
  }
}
