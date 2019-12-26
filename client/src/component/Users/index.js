import React, { Component } from 'react'
import axios from 'axios'
import {
  Card,
  Row,
  Col,
  Modal,
  Divider,
  Button,
  Tooltip,
  notification,
  Icon,
  Dropdown,
  InputNumber
} from 'antd'
import CreateUserForm from './CreateUserForm'
import UserInfo from './UserInfo'
import Forbidden from '../../Config/Forbidden'

const { Meta } = Card

const DEFAULT_MEN_AVATAR = 'https://lh3.google.com/u/3/d/1AzqNSkJevyJMgSpilja43d_dOmhj6TiA=w1920-h583-iv1'
const DEFAULT_WOMEN_AVARTAR = 'https://lh3.google.com/u/3/d/1ICyotW2GHiRHi1dxXW1P_C9RDHJ8gTNK=w1920-h583-iv1'

export default class Users extends Component {
  state = {
    allUsers: [],
    loading: true,
    visible: false,
    userDetail: {},
    currentUser: {},
    dropdownVisible: false
  }
  componentDidMount() {
    document.title = 'Users'
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
          currentUser: res.data,
          loading: false
        })
      })
    axios.get('http://localhost:9000/users')
      .then(res => {
        this.setState({
          allUsers: res.data,
        })
      })
  }

  getAllUsers = () => {
    axios.get('http://localhost:9000/users')
      .then(res => {
        this.setState({
          allUsers: res.data,
          loading: false
        })
      })
  }

  changeLevel = user => {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible,
    })
  }

  changeLevelRequest = (level, user) => {
    console.log(level)
    console.log(user)
    axios.patch(`http://localhost:9000/users/updateUser/${user._id}`, { level: level })
      .then(res => {
        console.log(res.data)
      })
  }

  userInfoModal = user => {
    document.title = `Users - ${user.username}`
    this.setState({
      visible: true,
      userDetail: user,
      modalType: 'view'
    })
  }

  hideModal = () => {
    document.title = `Users`
    this.setState({
      visible: false
    })
  }

  createNewUser = () => {
    this.setState({
      visible: true,
      modalType: 'create'
    })
  }

  createUserRequest = data => {
    axios.post('http://localhost:9000/users/addUser', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            visible: false,
            loading: true
          }, this.getAllUsers())
          notification.success({
            message: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    const { allUsers, loading, visible, userDetail, modalType, currentUser } = this.state
    return (
      <>
        {currentUser && currentUser.level < 4 ? <Forbidden /> :
          <>
            <h2>Users List
          <Divider type='horizontal' />
            </h2>
            <Row gutter={10}>
              {allUsers && allUsers.map(u =>
                <Col xl={4} style={{ marginBottom: 10, borderRadius: 5 }} key={u.username}>
                  <Card
                    actions={[
                      <Tooltip title='Change the level of this user'>
                        <Dropdown trigger={['click']} overlay={<InputNumber min={1} max={4} defaultValue={u.level} onChange={(value) => this.changeLevelRequest(value, u)} />}>
                          <Icon type="setting" key="setting" onClick={() => this.changeLevel(u)} />
                        </Dropdown>
                      </Tooltip>,
                    ]}
                    loading={loading}
                    hoverable
                    cover={
                      <div
                        style={{ textAlign: 'center', verticalAlign: 'middle', position: 'relative', overflow: 'hidden', height: 261, width: 261 }}
                        onClick={() => this.userInfoModal(u)}
                      >
                        <img
                          style={{ width: '100%' }}
                          alt='#'
                          src={u.image ?
                            u.image :
                            u.gender[0] === 'male' ?
                              DEFAULT_MEN_AVATAR :
                              DEFAULT_WOMEN_AVARTAR}
                        />
                      </div>}
                  >
                    <Meta
                      title={u.fullname}
                      description={u.idCard}
                    />
                  </Card>
                </Col>)}
              <Col xl={4} style={{ marginBottom: 10, borderRadius: 5 }}>
                <Tooltip title='Add a new User' placement='bottom'>
                  <Button
                    type='dashed'
                    onClick={this.createNewUser}
                    loading={loading}
                    icon='plus'
                    style={{
                      width: '100%',
                      height: 356,
                      background: 'whitesmoke',
                      fontSize: 40
                    }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </>
        }
        <Modal
          title={modalType === 'create' ? 'Create User' : 'User Information'}
          centered
          visible={visible}
          footer={null}
          onCancel={this.hideModal}
          width={1000}
        >
          {modalType === 'create' ?
            <CreateUserForm createUser={this.createUserRequest} /> :
            <UserInfo user={userDetail} location='Users' />}
        </Modal>
      </>
    )
  }
}
