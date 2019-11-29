import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [currentUser, setCurrentUser] = useState({})
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
  }, [])
  return (
    <>
      <h2>
        Welcome {currentUser.fullname}
      </h2>
    </>
  )
}
