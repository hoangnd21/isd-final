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
          // cai setState nay k thuc hien
          this.setState({ loginModal: false })
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  onLoggedOut = () => {
    this.setState({
      loginModal: true
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
              src='data:image/png;base64,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'
            />
          </div>
          <Menu
            mode="inline"
          >
            <Menu.Item key="home">
              <Link to='/'>
                <Icon type='home' /><span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="users">
              <Link to="/users" >
                <Icon type="user" />
                <span>Users</span></Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about" >
                <Icon type="info-circle" />
                <span>About</span>
              </Link>
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