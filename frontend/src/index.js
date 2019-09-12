import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BasicLayout from './BasicLayout'
import routes from './Config/route.config.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <BasicLayout>
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
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

