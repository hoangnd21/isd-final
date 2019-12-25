import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Divider, List, } from 'antd'

export default function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const [notifications, setNotifications] = useState([])
  const [newNotifications, setNewNotifications] = useState([])
  const [background, setbackground] = useState('teal')

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
    axios.get(`http://localhost:9000/noti`)
      .then(res => {
        setNotifications(res.data)
      })
    axios.get(`http://localhost:9000/noti/getMsg/msg?unread=true`)
      .then(res => {
        setNewNotifications(res.data.length)
      })
  }, [])

  const readNotification = item => {
    axios.patch(`http://localhost:9000/noti/updatenotification/${item._id}`, { unread: false })
      .then(() => {
        setbackground('white')
      })
  }

  return (
    <>
      <h2>
        Welcome {currentUser.fullname}
        <Divider type='horizontal' />
      </h2>
      {currentUser.level > 3 ? <>
        <h3>
          You have {newNotifications} new notifications.
      </h3>
        <List
          itemLayout='vertical'
          dataSource={notifications}
          bordered
          scroll={{ y: 600 }}
          renderItem={item => {
            item.unread ? setbackground('teal') : setbackground('white')

            let eq
            axios.get(`http://localhost:9000/equipments/${item.equipment}`)
              .then(res => {
                return eq = res.data.name
              })

            return <List.Item
              key={item._id}
              style={{ background: background }}
              onClick={item.unread ? () => readNotification(item) : setbackground('white')}
            >
              <List.Item.Meta
                title={item.sender}
                description={item.type === 'error' ?
                  `reported about device: ${eq}` :
                  item.type === 'handing' ?
                    `requested handing this device: ${eq}` :
                    `requested reclaim this device: ${eq}`
                }
              />
            </List.Item>
          }}
        />
      </>
        : null}
    </>
  )
}
