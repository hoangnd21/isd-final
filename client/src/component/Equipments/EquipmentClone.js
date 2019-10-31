import React from 'react';
import {
  Upload,
  Icon,
  message,
  Button
} from 'antd';
import EquipmentForm from './EquipmentForm'

const { Dragger } = Upload;

export default class EquipmentClone extends React.Component {
  state = {
    step: 1
  }
  render() {
    const { step } = this.state
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
          // this.setState({
          //   step: 2
          // });
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    return (
      step === 1 ? <> <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag your code file to this area to upload.</p>
      </Dragger>
        <Icon type='up' /> Is this the right file?
        <div style={{ textAlign: 'right' }}>
          <Button type='primary'>Confim</Button>
        </div>
      </> :
        <EquipmentForm />
    )

  }
}
