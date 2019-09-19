import React from 'react';
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

export default class BasicLayout extends React.Component {

  state = {
    collapsed: false,
    apiResponse: '',
    loginModal: false,
    userName: ''
  };
  componentDidMount = () => {
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

  // test functions simulate login and logout
  onLoggedIn = (username) => {
    this.setState({
      loginModal: false,
      userName: username
    })
    // if (this.state.loginModal === false) {
    //   return (<Redirect exact to="/" />);
    // }
  }

  onLoggedOut = () => {
    this.setState({
      loginModal: true,
      userName: ''
    })
  }

  render() {
    const { collapsed, apiResponse, loginModal, userName } = this.state;
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
            <div style={{ marginTop: 10 }}>
              <Icon
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                className='trigger'
                style={{ color: '#80BC26', fontSize: 18 }}
                onClick={this.toggleCollapse}
              />
              {/* login button, will be "welcome //user when logged in" */}
              <span style={{ float: 'right', marginRight: 12 }}>
                <span className='hello-user'>
                  {loginModal ? '' : `Hello ${userName}`}
                </span>
                <Tooltip title='Log out' placement='bottomRight'>
                  <Button type='primary' icon='login' ghost style={{ border: 0 }} onClick={this.onLoggedOut} />
                </Tooltip>
              </span>
            </div>
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
          />
        </Modal>

      </Layout >
    );
  }
}