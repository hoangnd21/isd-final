
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
    apiResponse: '',
    loginModal: true,
    error: ''
  };
  componentDidMount = () => {
    //testAPI
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
    this.setState({
      loginModal: true
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


  onLoggedIn = (loginInfo) => {
    this.setState({
      userName: loginInfo.username
    })
    // login
    axios.post('http://localhost:9000/login', {
      username: loginInfo.username,
      password: loginInfo.password
    })
      .then((res) => {
        if (res.data === "success") {

          this.setState({ loginModal: false })
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  onLoggedOut = () => {
    this.setState({
      loginModal: true,
      userName: ''
    })
  }

  render() {
    const { collapsed, apiResponse, loginModal, userName, error } = this.state;
    const { children } = this.props;
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
            <Menu.Item key="users">
              <Link to="/users" ><Icon type="user" /><span>Users</span></Link>
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
              style={{ color: 'whitesmoke', fontSize: 18 }}
              onClick={this.toggleCollapse}
            />
            {/* login button, will be "welcome //user when logged in" */}
            <span style={{ float: 'right', marginRight: 12 }}>
              <span style={{ color: 'white', marginRight: 5, fontSize: 16 }}>
                {loginModal ? '' : `Hello ${userName}`}
              </span>
              <Tooltip title='Log out' placement='bottomRight'>
                <Button type='secondary' icon='login' ghost style={{ border: 0 }} onClick={this.onLoggedOut} />
              </Tooltip>
            </span>
          </Header>
          <Content className='bl-content'>
            {children}
            {apiResponse}
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