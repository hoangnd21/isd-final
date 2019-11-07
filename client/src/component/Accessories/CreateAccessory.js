import React, { Component } from 'react'
import {
	Form,
	Input,
	Row,
	Col,
	Cascader,
	Tooltip,
	Icon,
	InputNumber
} from 'antd'
import axios from 'axios'

class CreateAccessory extends Component {
	state = {
		generalTypes: [],
		batches: [],
		equipmentTypes: []
	}

	componentDidMount() {
		axios.get(`http://localhost:9000/generalTypes`)
			.then(res => {
				this.setState({
					generalTypes: res.data
				})
			})
		axios.get(`http://localhost:9000/batch`)
			.then(res => {
				this.setState({
					batches: res.data.map(b => {
						return ({
							value: b.code,
							label: b.code
						})
					})
				})
			})
	}

	choseGenType = genTypeID => {
		axios.get(`http://localhost:9000/subTypes/${genTypeID}`)
			.then(res => {
				this.setState({
					equipmentTypes: res.data,
					genTypeId: genTypeID
				})
			})
	}

	codegen = length => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	render() {
		const { generalTypes, batches, equipmentTypes } = this.state
		const accCode = ['VN'].concat(this.codegen(12)).join('')
		const { form } = this.props
		const { getFieldDecorator } = form
		return (
			<>
				<Form layout='vertical' onSubmit={this.createAccessory}>
					<Row gutter={10}>
						<Col xl={12}>
							<Col xl={12} style={{ padding: '0 5px 0 0' }}>
								<Form.Item label={<span>Accessory code <Tooltip title='Auto generate'><Icon type='question-circle' /></Tooltip></span>}
								>
									{getFieldDecorator('accCode', {
										rules: [
											{
												required: true,
												message: 'accCode',
											},
										],
										initialValue: accCode,
									})(<Input disabled />)}
								</Form.Item>
							</Col>
							<Col xl={12} style={{ padding: '0 0 0 5px' }}>
								<Form.Item label='Batch'
								>
									{getFieldDecorator('batch', {
										rules: [
											{
												required: true,
												message: 'batch',
											},
										],
									})(<Cascader options={batches && batches} />)}
								</Form.Item>
							</Col>
							<Col xl={24} style={{ padding: 0 }}>
								<Form.Item label='General type attached'
								>
									{getFieldDecorator('genTypeAttached', {
										rules: [
											{
												required: true,
												message: 'accName',
											},
										],
									})(<Cascader options={generalTypes && generalTypes} onChange={this.choseGenType} />)}
								</Form.Item>
								<Form.Item label='Accessory Price'
								>
									{getFieldDecorator('price', {
										rules: [
											{
												required: true,
												message: 'price',
											},
										],
									})(<InputNumber style={{ width: '100%' }} placeholder="price" />)}
								</Form.Item>
							</Col>
						</Col>
						<Col xl={12}>
							<Form.Item label='Accessory Name'
							>
								{getFieldDecorator('accName', {
									rules: [
										{
											required: true,
											message: 'accName',
										},
									],
								})(<Input placeholder="accName" />)}
							</Form.Item>

							<Form.Item label='Equipment type attached'
							>
								{getFieldDecorator('subTypeAttached', {
									rules: [
										{
											required: true,
											message: 'subTypeAttached',
										},
									],
								})(<Cascader options={equipmentTypes && equipmentTypes} placeholder='subTypeAttached' />)}
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</>
		)
	}
}
const AForm = Form.create({})(CreateAccessory);

export default AForm;
