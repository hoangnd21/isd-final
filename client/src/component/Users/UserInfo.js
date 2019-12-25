import React, { useState, } from 'react'
import {
  Row,
  Col,
  Divider,
  Button,
  Card,
  Typography,
  Modal
} from 'antd'
import ProfileUpdateForm from './ProfileUpdateForm'
import ChangePasswordForm from './ChangePasswordForm'
const { Paragraph } = Typography

const DEFAULT_MEN_AVATAR = 'https://lh3.google.com/u/3/d/1AzqNSkJevyJMgSpilja43d_dOmhj6TiA=w1920-h583-iv1'
const DEFAULT_WOMEN_AVARTAR = 'https://lh3.google.com/u/3/d/1ICyotW2GHiRHi1dxXW1P_C9RDHJ8gTNK=w1920-h583-iv1'

export default function UserInfo(props) {

  const [editing, setEditing] = useState(false)
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const { user, location } = props

  const changePasswordRequest = (login) => {
    // check login, param là {username: props.username, password: login.password}, cái login là từ form ra nhé.

    // nếu ok thì .patch(updateUser, {password: login.newPassword})
    // nếu nhập pass sai thì trả ra "invalid password, try again"
  }

  return (
    <>
      {location === 'Users' ?
        null :
        <h2>
          About
          {editing ?
            <>
              <Button style={{ margin: '0 5px', width: 95 }} type='danger' onClick={() => setEditing(false)} icon='close'>Cancel</Button>
            </> :
            <Button style={{ margin: '0 5px', width: 95 }} type='primary' icon='edit' onClick={() => setEditing(true)}>Edit</Button>}
          <Button type='defauly' onClick={() => setChangePasswordModal(true)}>Change Password</Button>
          <Divider style={{ margin: '10px 0' }} type='horizontal' />
        </h2>}
      <Row gutter={10}>
        {editing ? <ProfileUpdateForm user={user} /> :
          <Card
            bordered
            style={location === 'Users' ? {} :
              { fontSize: 18, lineHeight: '2em', }
            }
            bodyStyle={{ padding: 16 }}
          >
            <Col xl={20} style={{ padding: 0 }}>
              <Col xl={12} style={{ padding: '0 10px 0 0', borderRight: '1.5px solid whitesmoke' }} >
                <h3>Personal information</h3>
                <Divider style={{ margin: 0 }} type='horizontal' />
                <Paragraph ellipsis={{ rows: 5, expandable: true }}>
                  <Col xl={9}>Fullname:</Col><Col xl={15}>{user.fullname}</Col>
                  <Col xl={9}>Date of Birth:</Col>
                  <Col xl={15}>
                    {user.DOB === undefined ?
                      'dob' :
                      `${user.DOB.slice(8, 10)}/${user.DOB.slice(5, 7)}/${user.DOB.slice(0, 4)}`
                    }
                  </Col>
                  <Col xl={9}>Genre:</Col><Col xl={15}>{user.gender}</Col>
                  <Col xl={9}>Marital Status:</Col><Col xl={15}>{user.maritalStatus}</Col>
                  <Col xl={9}>Nationality:</Col><Col xl={15}>{user.nationality}</Col>
                  <Col xl={9}>Phone:</Col><Col xl={15}>{user.mobilePhone}</Col>
                  <Col xl={9}>Email:</Col><Col xl={15}>{user.personalEmail}</Col>
                  <Col xl={9}>ID Card No. :</Col><Col xl={15}>{user.idCard}</Col>
                  <Col xl={9}>ID Card Location:</Col><Col xl={15}>{user.issuedPlace}</Col>
                  <Col xl={9}>ID Card issued on:</Col>
                  <Col xl={15}>
                    {user.issuedDate === undefined ?
                      'ID' :
                      `${user.issuedDate.slice(8, 10)}/${user.issuedDate.slice(5, 7)}/${user.issuedDate.slice(0, 4)}`
                    }
                  </Col>
                </Paragraph>
              </Col>
              <Col xl={12} style={{ padding: '0 0 0 10px' }}>
                <h3>Office information</h3>
                <Divider style={{ margin: '0' }} type='horizontal' />
                <Paragraph ellipsis={{ expandable: true, rows: 5 }}>
                  <Col xl={9}>Username:</Col><Col xl={15}>{user.username}</Col>
                  <Col xl={9}>Employee Code:</Col><Col xl={15}>{user.code}</Col>
                  <Col xl={9}>Employee Rank:</Col><Col xl={15}>{user.rank}</Col>
                  <Col xl={9}>Employee Function:</Col><Col xl={15}>{user.function}</Col>
                  <Col xl={9}>Employee Level:</Col><Col xl={15}>{user.level}</Col>
                  <Col xl={9}>Office Phone:</Col><Col xl={15}>{user.officePhone}</Col>
                  <Col xl={9}>Office Email:</Col><Col xl={15}>{user.officeMail}</Col>
                </Paragraph>
              </Col>
            </Col>
            <Col xl={4} style={{ padding: '0 0 0 10px', verticalAlign: 'middle' }}>
              <h3>User avatar:</h3>
              <Divider style={{ margin: '10px 0' }} type='horizontal' />
              <img
                style={{ width: '100%' }}
                alt='#'
                src={user.gender === undefined ? null : user.image ?
                  user.image :
                  user.gender[0] === 'male' ?
                    DEFAULT_MEN_AVATAR :
                    DEFAULT_WOMEN_AVARTAR}
              />
            </Col>

          </Card>}
      </Row>
      <Modal
        visible={changePasswordModal}
        footer={null}
        onCancel={() => setChangePasswordModal(false)}
        centered
      >
        <ChangePasswordForm
          changePasswordRequest={changePasswordRequest}
        />
      </Modal>
    </>
  )
}

