import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserInfo from '../Users/UserInfo'
import {
  notification
} from 'antd'

const About = () => {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    document.title = `About`
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
        setCurrentUser(res.data)
      })
  }, [])

  return (
    <>
      <UserInfo user={currentUser} location='About' />
    </>
  )
}

const updateProfileRequest = data => {
  axios.post(`http://localhost:9000/users/updateUser/${data._id}`, data)
    .then(res => {
      if (res.status === 200) {
        notification.success({
          message: res.data,
          placement: 'bottomRight'
        })
      }
    })
}

export default About