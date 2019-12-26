import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserInfo from '../Users/UserInfo'

const About = () => {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    document.title = `About`
    getCurrentUser()
  }, [])

  const getCurrentUser = () => {
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
  }

  return (
    <>
      <UserInfo user={currentUser} location='About' getCurrentUser={getCurrentUser} />
    </>
  )
}



export default About