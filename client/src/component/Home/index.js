import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Divider, Modal, } from 'antd'
import NotificationView from './NotificationView'
import './styles.less'

export default function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const [notifications, setNotifications] = useState([])
  const [newNotifications, setNewNotifications] = useState([])
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
        <div className='notification-area'>
          {notifications.map(noti => {
            console.log(noti)
            // return (
            //   noti.type === 'report' ?
            //     <p className='notification'>{noti.sender} reported. {axios.get(`http://localhost:9000/equipments/${noti.equipment.eqName}`).then(res => { return res.data.name })}</p> :
            //     noti.type === 'handing' ?
            //       <p className='notification'>{noti.sender} requested HANDING. {axios.get(`http://localhost:9000/equipments/${noti.equipment.eqName}`).then(res => { return res.data.name })}</p> :
            //       <p className='notification'>{noti.sender} requested RECLAIM.{axios.get(`http://localhost:9000/equipments/${noti.equipment.eqName}`).then(res => { return res.data.name })} </p>
            // )
          })}
        </div>
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
