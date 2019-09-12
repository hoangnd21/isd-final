import React from 'react'
import About from "../component/About";
import Home from "../component/Home";
import Users from '../component/Users'

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home />,
    },
    {
        path: '/users',
        main: () => <Users />,
    },
    {
        path: '/about',
        main: () => <About />,
    }
]
export default routes;