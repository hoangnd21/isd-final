import React, { Component } from 'react'
import axios from 'axios'
import {
  List,
  Button,
  Drawer,
  Dropdown,
  Menu,
  notification,
  Divider,
  Row,
  Col,
  Card
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
          notification.success({
            message: res.data
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
      currentUser && currentUser.level < 3 ?
        <Forbidden />
        : <>
          <h2>General types
            {currentUser && currentUser.level > 3 ?
              <span style={{ float: 'right' }}>
                <Dropdown
                  destroyOnClose
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
              : null}
            <Divider type='horizontal' style={{ marginBottom: 0 }} />
          </h2>
          <Row gutter={10} style={{ margin: 0 }}>
            <List
              itemLayout='horizontal'
              dataSource={generalTypes}
              size='small'
              loading={loading}
              pagination={{
                pageSize: 14,
                size: "small",
                total: generalTypes.length,
                showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`
              }}
              renderItem={item => (
                <Col xl={12} style={{ padding: '0 5px 5px 5px' }}>
                  <Card bodyStyle={{ borderRadius: 10, padding: 10 }}>
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <Button style={{ padding: 0 }} type='link' onClick={() => this.eqTypesDrawer(item)}><h3>{item.label}</h3></Button>
                        }
                        description={`ID: ${item.value}`}
                      />
                    </List.Item>
                  </Card>
                </Col>
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
                <EqTypesDrawer generalType={generalTypebyID} currentUser={currentUser} />
              </Drawer>
            </List>
          </Row>
        </>
    )
  }
}
