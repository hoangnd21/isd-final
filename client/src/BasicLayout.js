
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
} from 'antd';
import './BasicLayout.less';
import LoginPage from './Config/login'

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
        if (res.data !== 'Invalid login. Please try again') {
          this.setState({
            loginModal: false,
            currentUser: res.data,
            loginError: '',
            loading: false
          })
        } else {
          this.setState({
            loginModal: true,
            currentUser: null,
            loginError: '',
            loading: false
          })
        }
      })
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
      .then((res) => {
        console.log("res", res)
        if (res.data !== 'Invalid login. Please try again' && res.data !== 'Invalid user. Please try again') {
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
      .then((res) => {
        if (res.data) {
          this.setState({
            loginModal: true,
            currentUser: null
          })
        }
      })
  }

  render() {
    const { collapsed, loginModal, currentUser, loginError, loading } = this.state;
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
              <Menu mode="inline">
                <Menu.Item key="home">
                  <Link to='/'><Icon type='home' /><span>Home</span></Link>
                </Menu.Item>
                <Menu.Item key="equipments">
                  <Link to="/equipments" ><Icon type="sliders" /><span>Equipments</span></Link>
                </Menu.Item>
                <Menu.Item key="eqtype">
                  <Link to="/equipment-types" ><Icon type="ordered-list" /><span>Equipment Types</span></Link>
                </Menu.Item>
                <Menu.Item key="about">
                  <Link to="/about" ><Icon type="info-circle" /><span>About</span></Link>
                </Menu.Item>
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
                <span style={{ float: 'right', marginRight: 12 }}>
                  <span style={{ color: '#87BC26', marginRight: 5, fontSize: 16 }}>
                    {loginModal ? '' : `Hello ${currentUser.username}`}
                  </span>
                  <Tooltip title='Log out' placement='bottomRight' onClick={this.onLoggedOut}>
                    <Link to='/'>
                      <Button type='primary' ghost icon='login' style={{ border: 0, boxShadow: 0 }} />

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
          mask={false}
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
