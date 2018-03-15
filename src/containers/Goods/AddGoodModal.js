import React from 'react';
import {
  Button,
  message,
  Icon,
  Upload,
  Modal,
  Form,
  Input
} from 'antd';

const FormItem = Form.Item

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

@Form.create()
export default class AddGoodMOdal extends React.Component {
  state = {
    loading: false
  }

  beforeUpload = (file) => {
    const isJPGOrPNG = file.type === 'image/jpeg' || 'image/png';
    if (!isJPGOrPNG) {
      message.error('You can only upload JPG or PNG file!');
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false
    }

    this.setState({
      file
    })

    return false;
  }

  // handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl => this.setState({
  //       imageUrl,
  //       loading: false,
  //     }));
  //   }
  // }

  renderUploadButton() {
    return (
      <Button>
        <Icon type={this.state.loading ? 'loading':'plus'} />
        上传图片
      </Button>
    )
  }

  render() {
    const {
      visible,
      handleCancel,
      handleSubmit,
      form
    } = this.props

    console.log(this.state)

    const { getFieldDecorator } = form
    const uploadButton = this.renderUploadButton()
    const imageUrl = this.state.imageUrl

    return (
      <Modal
        visible={visible}
        title="新增商品"
        okText="保存"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form layout="vertical">
          <FormItem label="商品名称:">
            {getFieldDecorator('goodName', {
              rules: [{
                required: true,
                message: '请输入商品名称'
              }, {
                max: 20,
                min: 1,
                message: '商品名称不能多于20个字符'
              }]
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem label="图片:">
            {getFieldDecorator('image', {
              rules: [{
                isRequired: true,
                message: '请上传商品图片'
              }]
            })(
              <Upload
                name="image"
                listType="picture"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
              >
                {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
              </Upload>
            )}
          </FormItem>
          <FormItem label="现价:">
            {getFieldDecorator('price', {
              rules: [{
                isRequired: true,
                message: '请输入商品价格'
              }, {

              }]
            })(
              <Input type="number"/>
            )}
          </FormItem>
          <FormItem label="原价:">
            {getFieldDecorator('originalPrice', {
            })(
              <Input type="number"/>
            )}
          </FormItem>
          <FormItem label="规格:">
            {getFieldDecorator('spec', {
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="原产地:">
            {getFieldDecorator('origin', {
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
