import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BasicLayout from './BasicLayout'
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./component/About";
import Home from "./component/Home";
import Equipments from './component/Equipments';


class App extends React.Component {
  state = {
    isAuthenticated: null
  }
  isAuthen = data => {
    this.setState({
      isAuthenticated: data
    })
  }
  render() {
    const { isAuthenticated } = this.state
    const routes = [
      {
        path: '/',
        exact: true,
        main: () => <Home currentUser={isAuthenticated} />
      },
      {
        path: '/equipments',
        main: () => <Equipments currentUser={isAuthenticated} />,
      },
      {
        path: '/about',
        main: () => <About currentUser={isAuthenticated} />
      }
    ]

    return <Router>
      <BasicLayout bringAuthenUp={this.isAuthen}>
        {routes.map((route, index) =>
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        )}
      </BasicLayout>
    </Router>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

