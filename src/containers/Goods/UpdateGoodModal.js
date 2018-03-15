import React from 'react';
import {
  Modal,
  Form,
  Input
} from 'antd';

const FormItem = Form.Item

const UpdateGoodModal = Form.create()(
  (props) => {
    const {
      visible,
      onCancel,
      onUpdate,
      form
    } = props

    const { getFieldDecorator } = form
    let updateForm = props.updateForm || {}

    return (
      <Modal
        visible={visible}
        title="更新商品"
        okText="更新"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onUpdate}
      >
        <Form layout="vertical">
          <FormItem label="商品id:">
            {getFieldDecorator('goodId', {
              initialValue: updateForm.goodId || ''
            })(
              <Input disabled />
            )}
          </FormItem>
          <FormItem label="商品名称:">
            {getFieldDecorator('goodName', {
              initialValue: updateForm.goodName || '',
              rules: [{
                isRequired: true,
                message: '请输入商品名称'
              }, {
                max: 20,
                message: '商品名称不能超过20个字符'
              }]
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="现价:">
            {getFieldDecorator('price', {
              initialValue: updateForm.price || '',
              rules: [{
                isRequired: true,
                message: '请输入商品价格'
              }, {
                max: 10,
                message: '商品价格不能超过10位数'
              }]
            })(
              <Input type="number"/>
            )}
          </FormItem>
          <FormItem label="原价:">
            {getFieldDecorator('originalPrice', {
              initialValue: updateForm.originalPrice || '',
              rules: [{
                isRequired: true,
                message: '请输入商品价格'
              }, {
                max: 10,
                message: '商品原价不能超过10位数'
              }]
            })(
              <Input type="number"/>
            )}
          </FormItem>
          <FormItem label="规格:">
            {getFieldDecorator('spec', {
              initialValue: updateForm.spec || '',
              rules: [{
                isRequired: true,
                message: '请输入商品规格'
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="原产地:">
            {getFieldDecorator('origin', {
              initialValue: updateForm.origin || '',
              rules: [{
                isRequired: true,
                message: '请输入商品的原产地'
              }]
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
)

export default UpdateGoodModal
