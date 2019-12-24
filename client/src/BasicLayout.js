
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Icon,
  Modal,
  Button,
  Tooltip,
  Divider,
  Avatar,
  notification,
  Badge
} from 'antd';
import './BasicLayout.less';
import LoginPage from './Config/login'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

const { Header, Content, Footer, Sider } = Layout;

export default class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      loginModal: false,
      currentUser: null,
      loginError: '',
      loading: false,
      notifications: 0
    };
  }

  componentDidMount = () => {
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
        if (res.data !== 'Invalid login. Please try again!') {
          this.setState({
            loginModal: false,
            currentUser: res.data,
            loginError: '',
            loading: false
          }, this.getNotification(res.data))
        } else {
          this.setState({
            loginModal: true,
            currentUser: null,
            loginError: '',
            loading: false
          })
        }
      })
    axios.get(`http://localhost:9000/noti/getMsg/msg?unread=true`)
      .then(res => {
        this.setState({
          notifications: res.data.length
        })
      })
  }

  getNotification = loginInfo => {
    socket.on('recieved', function (msg) {
      axios.get(`http://localhost:9000/noti/getMsg/msg?msg=${msg}&unread=true`)
        .then(res => {
          if (res.status === 200) {
            let notificationContent = res.data[0]
            axios.get(`http://localhost:9000/equipments/${notificationContent.equipment}`)
              .then(res => {
                let equipmentInNotification = res.data
                if (notificationContent.sender !== loginInfo.username) {
                  return <Link to='/'>{notification.info({
                    message:
                      <>
                        {notificationContent.sender} reported a problem with device: {equipmentInNotification.name}.
                      </>,
                    // onClick: () => axios.patch(`http://localhost:9000/noti/updatenotification/${notificationContent._id}`, {unread: false })
                  })}
                  </Link>
                } else {
                  notification.success({
                    message: 'Complete!',
                  })
                }
              })
          }
        })
    });
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onLoggedIn = loginInfo => {
    this.setState({
      loading: true
    })
    axios({
      url: '/login',
      method: 'post',
      headers: {
        "charset": "UTF-8",
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      data: {
        username: loginInfo.username,
        password: loginInfo.password
      }
    })
      .then(res => {
        if (res.data !== 'Invalid login. Please try again!' && res.data !== 'Invalid username. Please try again!') {
          this.setState({
            loginModal: false,
            currentUser: res.data,
            loading: false
          })
        } else {
          this.setState({
            loginModal: true,
            loginError: res.data,
            loading: false
          })
        }
      })
  }

  onLoggedOut = () => {
    axios({
      url: '/logout',
      method: 'post',
      headers: {
        "charset": "UTF-8",
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      }
    })
      .then(res => {
        if (res.data) {
          this.setState({
            loginModal: true,
            currentUser: null
          })
        }
      })
  }

  render() {
    const { collapsed, loginModal, currentUser, loginError, loading, notifications } = this.state;
    return (
      <Layout className='basic-layout'>
        {currentUser !== null ?
          <>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={this.onCollapse}
              style={{ background: '#fff' }}
              trigger={null}
            >
              <div className='logo'>
                <img
                  alt=''
                  src='https://upload.wikimedia.org/wikipedia/en/2/2b/DeloitteNewSmall.png'
                />
              </div>
              <Divider type='horizontal' style={{ marginTop: 10 }} />
              <Menu mode='vertical'>
                <Menu.Item key="home">
                  <Link to='/' className='menu-item'>
                    {currentUser.level > 3 ?
                      <Badge dot={notifications ? true : false} offset={[-8, 0]} title={`You have ${notifications} notifications.`}>
                        <Icon type='home' />
                      </Badge> : <Icon type='home' />}
                    <span>Home</span>
                  </Link>
                </Menu.Item>
                {currentUser.level > 2 ?
                  <Menu.Item key="eqtype">
                    <Link to="/equipment-types" className='menu-item'>
                      <Icon type="ordered-list" />
                      <span>
                        Types
                      </span>
                    </Link>
                  </Menu.Item>
                  : null}
                <Menu.Item key="equipments">
                  <Link to="/equipments" className='menu-item'>
                    <Icon type="sliders" />
                    <span>
                      Equipments
                    </span>
                  </Link>
                </Menu.Item>
                {currentUser.level > 1 ?
                  <Menu.Item key="accessories" >
                    <Link to="/accessories" className='menu-item'>
                      <Icon type="chrome" />
                      <span>
                        Accessories
                      </span>
                    </Link>
                  </Menu.Item> : null}

                {currentUser.level > 3 ?
                  <Menu.Item key="batch">
                    <Link to="/batch" className='menu-item'>
                      <Icon type="shopping-cart" />
                      <span>
                        Batch
                      </span>
                    </Link>
                  </Menu.Item> : null}
                {currentUser.level > 3 ?
                  <Menu.Item key="providers" >
                    <Link to="/providers" className='menu-item'>
                      <Icon type="bank" />
                      <span>
                        Providers
                      </span>
                    </Link>
                  </Menu.Item> : null}
                {currentUser.level > 3 ?
                  <Menu.Item key="users">
                    <Link to="/users" className='menu-item'>
                      <Icon type="team" />
                      <span>
                        Users
                      </span>
                    </Link>
                  </Menu.Item>
                  : null}
              </Menu>
            </Sider>
            <Layout>
              <Header className='bl-header'>
                <Icon
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  className='trigger'
                  style={collapsed ? { fontSize: 18 } : { color: '#87BC26', fontSize: 18 }}
                  onClick={this.toggleCollapse}
                />
                <span
                  style={{
                    fontSize: 20,
                    marginLeft: 20,
                  }}
                >
                  Deloitte - Make an impact.
                </span>
                <span style={{ float: 'right', marginRight: 12 }}>
                  <span style={{ color: '#87BC26', marginRight: 5, fontSize: 16 }}>
                    {loginModal ? '' :
                      <Link to='/about' style={{ fontSize: 20 }}>
                        {currentUser.fullname}&nbsp;
                        <Avatar alt='' src={currentUser.image} shape='circle' />
                      </Link>}
                  </span>
                  <Divider type='vertical' />
                  <Tooltip title='Logout' placement='bottomRight' onClick={this.onLoggedOut}>
                    <Link to='/'>
                      <Button type='link' icon='login' />
                    </Link>
                  </Tooltip>
                </span>
              </Header>
              <Content className='bl-content'>


                {this.props.children}


              </Content>
              <Footer className='bl-footer'>
                PMS - ISD
              </Footer>
            </Layout>
          </> : <> </>}
        <Modal
          title='Please login to continue'
          visible={loginModal}
          closable={false}
          footer={null}
          centered
          destroyOnClose
          width={700}
        // mask={false}
        >
          <LoginPage
            onLoggedIn={this.onLoggedIn}
            loginError={loginError}
            loading={loading}
          />
        </Modal>

      </Layout >
    );
  }
}
