import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Divider,
  Row,
  Col
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
      <h2>
        {currentUser.username}
        <Divider type='horizontal' />
      </h2>
      <Row gutter={20}>
        <Col xl={12}>
          Col
        </Col>
        <Col xl={12}>
          Col
        </Col>
      </Row>
    </>
  )
}
export default About