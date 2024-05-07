import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { Button, Typography, notification, Input, Modal, DatePicker, Form} from 'antd';
import axios from 'axios';
import { Base_URL } from "../../../constant";
import { useNavigate } from 'react-router-dom';
import './EachReportPagePsychologist.css';
import { ReactComponent as StudentIcon } from '../../../constant/image/icons/Student.svg';
import { ReactComponent as TeacherIcon } from '../../../constant/image/icons/Teacher.svg';
import { DownloadOutlined, PlusOutlined, FileOutlined } from '@ant-design/icons';
import {downloadFile}  from '../../../services/DownLoadFileService'


const { Title } = Typography;

const EachReportPagePsychologist = () => {
  const { id } = useParams();
  const [report, setReport] = useState({});
  const profileId = localStorage.getItem('id'); 
  const accessToken = localStorage.getItem('accessToken')
  const [workModalVisible, setWorkModalVisible] = useState(false);
  const [newWork, setNewWork] = useState({ title: '', timeFinished: '', details: '' });
  const [fileLinks, setFileLinks] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkTimes = async () => {
      try {
        const response = await axios.get(`${Base_URL}/psychologist/reports/${id}/work-times`,{
        headers: { Authorization: `Bearer ${accessToken}`}
      });
        setWorkTimes(response.data);
      } catch (error) {
        console.error('Ошибка при получении времени работы:', error);
      }
    };

    fetchWorkTimes();
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`${Base_URL}/psychologist/reports/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}`},
        });
        setReport(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'An error occurred while fetching the report.',
        });
      }
    };
    
    fetchReport();
  }, [id]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (report.documentIds && report.documentIds.length > 0) {
        const linksPromises = report.documentIds.map(fileId => downloadFile(fileId));
        try {
          const links = await Promise.all(linksPromises);
          setFileLinks(links.filter(link => link !== null)); // Исключаем null значения
        } catch (error) {
          notification.error({
            message: 'Error fetching files',
            description: 'Unable to download files.',
          });
        }
      }
    };
  
    if (report.documentIds) {
      fetchFiles();
    }
  }, [report.documentIds]);

  const handleActionButtonClick = async (action) => {
    try {
      const response = await axios.put(`${Base_URL}/psychologist/reports/${id}`, {
        action: action,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params:{action: action,}
      });
      setReport(response.data);
    } catch (error) {}
  };
  
  const handleStudentClick = (studentId) => {
    navigate(`/psychologist/students/${studentId}`);
  };

  const submitWorkTime = async () => {
    if (!newWork.title || !newWork.description || !newWork.workDate) {
      notification.error({
        message: 'Error',
        description: 'All fields are required.',
      });
      return;
    }

    try {
      const response = await axios.post(
        `${Base_URL}/psychologist/reports/${id}/work-times`, 
        {
          title: newWork.title,
          description: newWork.description,
          workDate: newWork.workDate.format('YYYY-MM-DD'),
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setWorkModalVisible(false);
      notification.success({
        message: 'Success',
        description: 'Work time has been successfully added.',
      });
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while adding work time.',
      });
    }
  };

  const handleWorkModalSubmit = () => {
    submitWorkTime();
  };

  const hasComments = report.comments && report.comments.trim().length > 0;

  return (
    <div className='container-ABC'>
      <div className='button-container'>
        {report?.status === 'IN_REQUEST' && (
          <>
            <Button onClick={() => handleActionButtonClick('IN_WORK')} style={{backgroundColor:'white', color:'black'}}>Take To Work</Button>
            <Button onClick={() => handleActionButtonClick('REJECTED')} style={{backgroundColor:'Red', color:'White'}}>Reject</Button>
          </>
        )}
        {report?.status === 'IN_WORK' && report?.workedById === profileId && (
          <>
            <Button onClick={() => handleActionButtonClick('FINISHED')} style={{backgroundColor:'Green', color:'White'}}>Finish</Button>
            <Button onClick={() => handleActionButtonClick('REJECTED')} style={{backgroundColor:'Red', color:'White'}}>Reject</Button>
          </>
        )}
        {report?.status === 'IN_WORK' && report?.workedById !== profileId && (
          <Button onClick={() => handleActionButtonClick('IN_WORK')} style={{backgroundColor:'white', color:'black'}}>Take To Work</Button>
        )}
        
      </div>

      <div className='first'>
        
        <div className='first-container' style={{marginRight:10}} onClick={() => handleStudentClick(report.studentId)}>
          <span><StudentIcon/> {report.studentFullName}</span>
          <span>Class: {report.studentClass}</span>
          <span>Phone number: {report.studentPhoneNumber}</span>
        </div>

        <div className='first-container'style={{marginLeft:10}}>
          <span><TeacherIcon/> {report.createdFullName}</span>
          <span>Category: {report.teacherCategory}</span>
          <span>Phone number: {report.teacherPhoneNumber}</span>
        </div>
      </div>

      <div className='second'>
        <div className='second-container'>
          <Title><Typography className='second-container-title'>Report</Typography></Title>
        </div>
        <div className='second-container'>
          <div className='second-container-inner'>

            {report.status === 'IN_REQUEST' && (
              <span className='second-container-inner-element'>  
                  <span className='second-container-inner-element-report'>
                    <span>Type of Violation: </span>
                    <span>Status: </span>
                    <span>Time of Violation: </span>
                    <span>Lesson: </span>
                    <span>Time of created: </span>
                  </span>
                  <span className='second-container-inner-element-report'>
                    <span>{report.reportTypeText}</span>
                    <span>{report.status}</span>
                    <span>{report.violationTime}</span>
                    <span>{report.lesson && report.lesson.trim().length > 0 ? (<span>{report.lesson}</span>) : (<p style={{margin:0}}>No Data</p>)}</span>
                    <span>{report.createdTime}</span>
                  </span>
              </span>
            )}

            {report.status === 'IN_WORK' && (
              <span className='second-container-inner-element'>  
                <span className='second-container-inner-element-report'>
                  <span>Type of Violation: </span>
                  <span>Status: </span>
                  <span>Time of Violation: </span>
                  <span>Lesson: </span>
                  <span>Time of created: </span>
                  <span> Worked By: </span>
                </span>
                <span className='second-container-inner-element-report'>
                  <span>{report.reportTypeText}</span>
                  <span style={{color:'blue'}}>{report.status}</span>
                  <span>{report.violationTime}</span>
                  <span>{report.lesson && report.lesson.trim().length > 0 ? (<span>{report.lesson}</span>) : (<p style={{margin:0}}>No Data</p>)}</span>
                  <span>{report.createdTime}</span>
                  <span>{report.workedFullName}</span>
                </span>
              </span>
            )}

            {report.status === 'FINISHED' && (
              <span className='second-container-inner-element'>    
                <span className='second-container-inner-element-report'>
                <span>Type of Violation: </span>
                <span>Status: </span>
                <span>Time of Violation: </span>
                <span>Lesson: </span>
                <span>Time of created: </span>
                <span>Worked By: </span>
                <span>Time of Finished: </span>
              </span>
              <span className='second-container-inner-element-report'>
                <span>{report.reportTypeText}</span>
                <span style={{color:'green'}}>{report.status}</span>
                <span>{report.violationTime}</span>
                <span>{report.lesson && report.lesson.trim().length > 0 ? (<span>{report.lesson}</span>) : (<p style={{margin:0}}>No Data</p>)}</span>
                <span>{report.createdTime}</span>
                <span>{report.workedFullName}</span>
                <span>{report.workedFullName}</span>
                </span>
              </span>
            )}

            {report.status === 'REJECTED' && (
              <span className='second-container-inner-element'>  
                <span className='second-container-inner-element-report'>
                  <span>Type of Violation: </span>
                  <span>Status: </span>
                  <span>Time of Violation: </span>
                  <span>Lesson: </span>
                  <span>Time of created: </span>
                </span>
                <span className='second-container-inner-element-report'>
                  <span>{report.reportTypeText}</span>
                  <span style={{color:'red'}}>{report.status}</span>
                  <span>{report.violationTime}</span>
                  <span>{report.lesson && report.lesson.trim().length > 0 ? (<span>{report.lesson}</span>) : (<p style={{margin:0}}>No Data</p>)}</span>
                  <span>{report.createdTime}</span>
                </span>
              </span>
              
            )}
            
            <div className="files">
              {fileLinks.map((file, index) => {
                return (
                  <div key={index} className="file-item">
                    <a href={file.downloadUrl} download={file.filename}>
                      <Button style={{border:0}} icon={<FileOutlined style={{color:'#0085FF',border:0}}/>} size="small">{file.filename}</Button>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
          <hr className="custom-hr" />
          <div className='comment'>
            <span>Comment: </span>
            <div className='comment-container'>
              {hasComments ? (<span>{report.comments}</span>) : (<p>No Data</p>)}
            </div>
          </div>
        </div>

      </div>

      {/* Working area */}
      <div className='third'>
        <div className='third-title'>
          <Title><Typography style={{fontSize:34}}>Working</Typography></Title>
        </div>
          
        <div className='third-container'>
        <div className='third-container-button'>
          <Button style={{border: 0}} onClick={() => setWorkModalVisible(true)}><PlusOutlined /></Button>
        </div>
        
          <Modal
            title="Work Report"
            visible={workModalVisible}
            onOk={handleWorkModalSubmit}
            onCancel={() => setWorkModalVisible(false)}
          >
          <Input
            value={newWork.title}
            onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
            placeholder="Your title"
            style={{margin: '0 0 10px 0', borderRadius:20}}
          />
          <DatePicker
            style={{ width: '100%',margin: '0 0 10px 0',borderRadius:20 }}
            onChange={(date) => setNewWork({ ...newWork, workDate: date })}
          />
          <Input.TextArea
            value={newWork.description}
            onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
            placeholder="What have you done?"
            style={{ width: '100%',borderRadius:20 }}
          />
          </Modal>
            <div >
              {workTimes.map((work, index) => (
                <div key={work.id} className="work-times">
                  <h3 style={{margin:'0 0 0 10px'}}>{work.title}</h3>
                  <div style={{display:'flex', flexDirection:'row'}}>
                    <p style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', width:'50%', margin:'0 0 0 10px', fontSize:10}}>{work.workedFullName}</p>
                    <p style={{display:'flex', flexDirection:'row', justifyContent:'flex-end',width:'50%',margin:0,fontSize:10}}>{work.workDate}</p>
                  </div>
                  <div>
                    <p>{work.description}</p>
                  </div>
                    
                </div>
              ))}
            </div>
        </div>
          
      </div>
    </div>
    
  );
};
export default EachReportPagePsychologist;