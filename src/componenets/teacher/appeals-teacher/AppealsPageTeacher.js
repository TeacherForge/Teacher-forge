import React from 'react';
import { Form, Input, DatePicker, TimePicker, Button, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AppealsPageTeacher.css';
import { uploadFile } from '../../../services/UploadFileService';
import {notification} from "antd";
import axios from "axios";
import {Base_URL} from "../../../constant";

const { TextArea } = Input;
const { Title } = Typography;

const AppealsPageTeacher = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`${Base_URL}/client/appeals`,values, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        
        });
        form.resetFields(); 
      } catch (error) {}
  };

  let documentIds = [];
  const handleUpload = async (file) => {
    try {
      const uploadedFileId = await uploadFile(file);
      documentIds.push(uploadedFileId);
      return documentIds; 
    } catch (error) {
      notification.error({
        message: 'Upload Error',
        description: 'There was an error uploading the file.',
      });
    }
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
          name="topic"
          rules={[{ required: true, message: 'Please input the topic!' }]}
        >
          <Input placeholder="Enter topic" />
        </Form.Item>

        <Form.Item
          name="text"
        >
          <TextArea placeholder="Write your situation" style={{minHeight:200}}/>
        </Form.Item>

        <Form.Item
        name="attachment"
        label="Attach a file"
        extra="PDF, PNG, JPEG no more than 5 MB"
      >
        <Upload
          multiple
          beforeUpload={(file) => {
            handleUpload(file); 
            return false; 
          }}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType='reset'>
            Reset
          </Button>
        </Form.Item>
        
      </Form>
    </div>
    </div>
    
  );
};

export default AppealsPageTeacher;
