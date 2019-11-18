import React, { Component } from 'react'

export default class PersonInfo extends Component {
	render() {
		const { personInfo, } = this.props;
		return (
			<>
				Name:&nbsp;{personInfo.CPName || personInfo.WPName}<br />
				Phone No.:&nbsp;{personInfo.phoneCP || personInfo.phoneWP}<br />
				Email:&nbsp;{personInfo.emailCP || personInfo.emailWP}<br />
			</>
		)
	}
}
