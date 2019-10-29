import React, { Component } from 'react'
import axios from 'axios'
import {
  Card,
  Row,
  Col,
  Modal
} from 'antd'

const { Meta } = Card

export default class Users extends Component {
  state = {
    allUsers: [],
    loading: true,
    visible: false,
    userDetail: {}
  }
  componentDidMount() {
    axios.get('http://localhost:9000/user')
      .then(res => {
        this.setState({
          allUsers: res.data,
          loading: false
        })
      })
  }

  userInfoModal = user => {
    this.setState({
      visible: true,
      userDetail: user
    })
  }

  hideModal = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { allUsers, loading, visible, userDetail } = this.state
    console.log('allUsers', allUsers)
    return (
      <>
        <h2>Users List</h2>
        <Row gutter={10}>
          {allUsers && allUsers.map(u =>
            <Col xl={4} style={{ marginBottom: 10 }}>
              <Card
                onClick={() => this.userInfoModal(u)}
                loading={loading}
                hoverable
                cover={
                  <span style={{ textAlign: 'center', background: 'auto' }}>
                    <img
                      style={{ width: 'auto', maxHeight: 225 }}
                      alt={u.image}
                      src={u.image}// user image
                    />
                  </span>
                }
              >
                <Meta
                  title={u.fullname}
                  description={u.username}
                />
              </Card>
            </Col>)}
        </Row>
        <Modal
          title={userDetail.username}
          centered
          visible={visible}
          footer={null}
          onCancel={this.hideModal}
        >
          {userDetail.username}
        </Modal>
      </>
    )
  }
}
