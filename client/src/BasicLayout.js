
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
import Deloitte from './Config/constant'

const { Header, Content, Footer, Sider } = Layout;

export default class BasicLayout extends Component {

  state = {
    collapsed: false,
    loginModal: false,
    error: '',
    isAuthenticated: ''
  };
  componentDidMount = () => {
    axios.get('http://localhost:9000')
      .then((res) => {
        if (res.data) {
          this.setState({
            loginModal: false,
            isAuthenticated: res.data
          })
        } else {
          this.setState({
            loginModal: true
          })
        }
      })
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  onLoggedIn = loginInfo => {
    // login
    axios.post('http://localhost:9000/login',
      {
        username: loginInfo.username,
        password: loginInfo.password
      }
    )
      .then((res) => {
        if (res.data) {
          this.setState({
            loginModal: false,
            isAuthenticated: res.data
          })
        }
      })
  }

  onLoggedOut = () => {
    this.setState({
      loginModal: true,
      userName: ''
    })
  }

  render() {
    const { collapsed, loginModal, isAuthenticated, error } = this.state;
    const { children } = this.props;
    console.log('isAuthenticated', isAuthenticated)
    return (
      <Layout className='basic-layout'>
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
              src={Deloitte.logo}
            />
          </div>
          <Menu mode="inline">
            <Menu.Item key="home">
              <Link to='/'><Icon type='home' /><span>Home</span></Link>
            </Menu.Item>
            <Menu.Item key="equipments">
              <Link to="/equipments" ><Icon type="sliders" /><span>Equipments</span></Link>
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
                {loginModal ? '' : `Hello ${isAuthenticated.username}`}
              </span>
              <Tooltip title='Log out' placement='bottomRight' onClick={this.onLoggedOut}>
                <Button type='primary' ghost icon='login' style={{ border: 0, boxShadow: 0 }} />
              </Tooltip>
            </span>
          </Header>
          <Content className='bl-content'>
            {children}
          </Content>
          <Footer className='bl-footer'>
            PMS - ISD
          </Footer>
        </Layout>
        <Modal
          title='Please login to continue'
          visible={loginModal}
          closable={false}
          footer={null}
          centered
        >
          <LoginPage
            onLoggedIn={this.onLoggedIn}
            error={error}
          />
        </Modal>

      </Layout >
    );
  }
}