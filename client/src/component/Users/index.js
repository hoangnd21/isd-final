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
} from 'antd'
import CreateUserForm from './CreateUserForm'
import UserInfo from './UserInfo'
import Forbidden from '../../Config/Forbidden'

const { Meta } = Card

export default class Users extends Component {
  state = {
    allUsers: [],
    loading: true,
    visible: false,
    userDetail: {},
    currentUser: {}
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
          currentUser: res.data,
          loading: false
        })
      })
    axios.get('http://localhost:9000/user')
      .then(res => {
        this.setState({
          allUsers: res.data,
        })
      })
  }

  userInfoModal = user => {
    this.setState({
      visible: true,
      userDetail: user,
      modalType: 'view'
    })
  }

  hideModal = () => {
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
                    onClick={() => this.userInfoModal(u)}
                    loading={loading}
                    hoverable
                    cover={
                      <div style={{ textAlign: 'center', verticalAlign: 'middle', position: 'relative', overflow: 'hidden', height: 261, width: 261 }}>
                        <img
                          style={{ width: '100%' }}
                          alt={u.image}
                          src={u.image}// user image
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
          title={modalType === 'create' ? 'Create User' : userDetail.fullname}
          centered
          visible={visible}
          footer={null}
          onCancel={this.hideModal}
          width={1000}
        >
          {modalType === 'create' ?
            <CreateUserForm /> :
            <UserInfo userDetail={userDetail} />}
        </Modal>
      </>
    )
  }
}
