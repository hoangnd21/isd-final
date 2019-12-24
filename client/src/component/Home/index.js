import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Divider, List, } from 'antd'

export default function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const [newNotifications, setNewNotifications] = useState([])
  useEffect(() => {
    document.title = 'Home'
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
    axios.get(`http://localhost:9000/noti/getMsg/msg?unread=true`)
      .then(res => {
        setNewNotifications(res.data)
      })
  }, [])

  return (
    <>
      <h2>
        Welcome {currentUser.fullname}
        <Divider type='horizontal' />
      </h2>
      <h3>
        You have {newNotifications.length} notifications.
      </h3>
      <Divider type='horizontal' />
      <List
        itemLayout='vertical'
        dataSource={newNotifications}
        renderItem={item =>
          <List.Item
            key={item._id}
          >
            <List.Item.Meta
              title={item.sender}
              description={`reported about device: ${item.equipment}`}
            />
          </List.Item>
        }
      />
    </>
  )
}
