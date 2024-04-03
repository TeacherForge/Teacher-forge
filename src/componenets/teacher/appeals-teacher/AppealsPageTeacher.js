import React from 'react';
import { Form, Input, DatePicker, TimePicker, Button, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AppealsPageTeacher.css';

const { TextArea } = Input;
const { Title } = Typography;

const AppealsPageTeacher = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Здесь код для отправки данных формы, например, через запрос к API
  };

  // Функция для нормализации значений поля файлов
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className='appeals'>
    <div className='appeals-header'>
        <b><p className='header-first'>Appeals</p></b>
        <p className='header-second'>Describe your event and we will take action</p>
    </div>
    <div className="appeals-container">
        
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="appeals-form"
      >
        <Form.Item
          name="name"
          label="Name of people"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ type: 'object', required: true, message: 'Please select date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="time"
          label="Time"
          rules={[{ type: 'object', required: true, message: 'Please select time!' }]}
        >
          <TimePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="schoolName"
          label="School name"
        >
          <Input placeholder="Enter school name" />
        </Form.Item>

        <Form.Item
          name="regionName"
          label="Region name"
        >
          <Input placeholder="Enter region name" />
        </Form.Item>

        <Form.Item
          name="comment"
          label="Comment (optional)"
        >
          <TextArea placeholder="Add a comment" />
        </Form.Item>

        <Form.Item
          name="attachment"
          label="Attach a file"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="PDF, PNG, JPEG no more than 5 MB"
        >
          <Upload action="/upload" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType='reset'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
    
  );
};

export default AppealsPageTeacher;
