import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Base_URL} from "../../../constant";
import {notification} from "antd";
import { Form, Select, DatePicker, TimePicker, Input, Button, Upload, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './ReportsPage.css';
import { SendReport } from '../../../services/ReportService';
import { uploadFile } from '../../../services/UploadFileService';

const { TextArea } = Input;
const { Option } = Select;

const ReportsPage = () => {
  const [reportTypes, setReportTypes] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedViolationTypeId, setSelectedViolationTypeId] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [fileList, setFileList] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  
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

  const handleSearch = async (value) => {
    setSearchText(value);
    if (value) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${Base_URL}/client/students`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { search: value }
        });
        const filteredStudents = response.data.map(student => ({
          id: student.id,
          name: `${student.surname} ${student.name} ${student.middlename}`,
          classRoom: student.classRoom,
        }));
        setStudents(filteredStudents);
      } catch (error) {}
    } else {
      setStudents([]);
    }
  };

  useEffect(() => {
    const fetchReportTypes = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${Base_URL}/client/reports-type`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setReportTypes(response.data);
      } catch (error) {}
    };

    fetchReportTypes();
  }, []);


  const onFinish = async (values) => {
    try {
        const formData = {
          ...values,
          documentIds:documentIds,
          studentId: selectedStudentId,
          reportTypeId: selectedViolationTypeId,
        };
        await SendReport(formData);
        notification.success({
          message: 'Report submitted successfully',
          description: 'Your report has been submitted.',
        });

    } catch (error) {
      notification.error({
        message: 'Submission failed',
        description: 'There was a problem submitting your report.',
      });
    }
    
  };

  return (
    
    <div className="reports-page">
      <div className="header">
        <b><p className='header-first'>Disciplinary report</p></b>
        <p className='header-second'>Describe your event and we will take action</p>
        {/* Include illustration here */}
      </div>
      <div className="form-container">
      <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="studentId" label="Full name of student" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select a student"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={(value) => setSelectedStudentId(value)}
          notFoundContent={null}
          style={{ width: '100%', overflow: 'auto' }}
          listItemHeight={10} // Установите нужную высоту элемента
          listHeight={250} // Установите максимальную высоту списка
        >
        {students.map((student) => (
        <Option key={student.id} value={student.id}>{`${student.name} (${student.classRoom})`}</Option>
        ))}
        </Select>
      </Form.Item>
      <Form.Item name="reportTypeId" label="Type of violation" rules={[{ required: true }]}>
        <Select placeholder="Select a violation type" onChange={(value) => setSelectedViolationTypeId(value)}>
          {reportTypes.map((type) => (
            <Option key={type.id} value={type.id}>
              <Tooltip title={type.description}>
                 <span>{type.name}</span>
               </Tooltip>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="violationDate" label="Date of violation" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="violationTime" label="Time of violation" rules={[{ required: true }]}>
        <TimePicker />
      </Form.Item>
      <Form.Item name="lesson" label="Lesson">
        <Input />
      </Form.Item>
      <Form.Item name="place" label="Place" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="comments" label="Comment">
        <TextArea />
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
        <Button type="primary" htmlType="submit" style={{margin:"5px"}}>
          Submit
        </Button>
        <Button type="default" htmlType="reset" style={{margin:"5px"}}>
          Reset
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  );
};


export default ReportsPage;
