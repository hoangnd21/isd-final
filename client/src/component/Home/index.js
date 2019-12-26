import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Divider } from 'antd'
import './styles.less'

export default function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const [notifications, setNotifications] = useState([])
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
    axios.get(`http://localhost:9000/noti`)
      .then(res => {
        setNotifications(res.data)
      })
    axios.get(`http://localhost:9000/noti/getMsg/msg?unread=true`)
      .then(res => {
        setNewNotifications(res.data.length)
      })
  }, [])

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
            return (
              noti.type === 'report' ?
                <p key={noti._id} className='notification'><span>{noti.sender}</span> reported, device: <span>{noti.equipment.eqName}</span></p> :
                noti.type === 'handing' ?
                  <p key={noti._id} className='notification'><span>{noti.sender}</span> requested HANDING device: <span>{noti.equipment.eqName}</span></p> :
                  <p key={noti._id} className='notification'><span>{noti.sender}</span> requested RECLAIM device: <span>{noti.equipment.eqName}</span></p>
            )
          })}
        </div>
      </>
        : null}
    </>
  )
}
