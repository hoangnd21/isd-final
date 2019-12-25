import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Divider, List, Modal, } from 'antd'
import NotificationView from './NotificationView'

export default function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const [notifications, setNotifications] = useState([])
  const [newNotifications, setNewNotifications] = useState([])
  const [background, setbackground] = useState('teal')
  const [modalVisible, setModalVisible] = useState(false)
  const [currentNoti, setCurrentNoti] = useState({})

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

  const openModal = item => {
    setModalVisible(true)
    setCurrentNoti(item)
  }

  // const readNotification = item => {
  //   axios.patch(`http://localhost:9000/noti/updatenotification/${item._id}`, { unread: false })
  //     .then(() => {
  //       setbackground('white')
  //     })
  // }

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
            return (
              <List.Item
                key={item._id}
                style={{ background: background }}
                onClick={() => openModal(item)}
              >
                <List.Item.Meta
                  title={item.type === 'error' ?
                    `${item.sender} reported` :
                    item.type === 'handing' ?
                      `${item.sender} requested handing` :
                      `${item.sender} requested reclaim`
                  }
                />
              </List.Item>
            )
          }}
        />
        <Modal
          visible={modalVisible}
          footer={null}
          onCancel={() => setModalVisible(false)}
          centered
          destroyOnClose
        >
          <NotificationView noti={currentNoti} />
        </Modal>
      </>
        : null}
    </>
  )
}
