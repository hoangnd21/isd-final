import React from 'react';
import About from "../component/About";
import Home from "../component/Home";
import Equipments from '../component/Equipments';
import EquipmentTypes from '../component/EquipmentTypes'
import Accessories from '../component/Accessories'
import Users from '../component/Users'

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />
  },
  {
    path: '/equipments',
    main: () => <Equipments />,
  },
  {
    path: '/about',
    main: () => <About />
  },
  {
    path: '/equipment-types',
    main: () => <EquipmentTypes />
  },
  {
    path: '/accessories',
    main: () => <Accessories />
  },
  {
    path: '/users',
    main: () => <Users />
  }
]
export default routes;