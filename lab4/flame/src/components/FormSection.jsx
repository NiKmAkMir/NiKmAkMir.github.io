import React from 'react';
import { Form, Input, DatePicker, Radio, Select, Checkbox, Button } from 'antd';
const { Option } = Select;

const FormSection = () => (
  <section className="form-section" id="form">
    <h2>Form</h2>
    <Form layout="vertical" onFinish={(values) => console.log(values)} className="form-field">
      <Form.Item label="Name" name="name" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item label="Phone number" name="phone" rules={[{ required: true }]}><Input type="tel" /></Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
      <Form.Item label="Birthday" name="birthday" rules={[{ required: true }]}><DatePicker /></Form.Item>
      <Form.Item label="Gender" name="gender">
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Choose favorite language" name="language">
        <Select>
          <Option value="python">Python</Option>
          <Option value="js">JavaScript</Option>
          <Option value="java">Java</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Biography" name="bio"><Input.TextArea rows={4} /></Form.Item>
      <Form.Item name="agree" valuePropName="checked"><Checkbox>I have read the contract</Checkbox></Form.Item>
      <Form.Item><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
    </Form>
  </section>
);

export default FormSection;
