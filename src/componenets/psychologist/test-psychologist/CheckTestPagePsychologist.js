import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Base_URL} from "../../../constant";
import { useParams} from 'react-router-dom';
import {Pagination, Col, Row,Button} from 'antd';
import './CreateTestPagePsychologist.css'
import {downloadFile}  from '../../../services/DownLoadFileService'

const CheckTestPagePsychologist = () => {
    const {id, teacherId, questionCount} = useParams();
    const accessToken = localStorage.getItem('accessToken')
    const [testResults, setTestResults] = useState([]);
    const [ansFullName, setAnsFullName] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(); 
    const [fileLinks, setFileLinks] = useState([]);
    const pageSize = 10;

    const normalizeResponses = (responses) => {
      return responses.map(response => response.replace(/[{}"]/g, ""));
    };

    useEffect(() => {
        const fetchTestResponses = async () => {
          try {
            const response = await axios.get(`${Base_URL}/psychologist/tests/${id}/teacher/${teacherId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                params : {
                  page: currentPage,
                  pageSize: pageSize,
                }
              });
            setAnsFullName(response.headers['user-full-name'], 10);
            setTotalRecords(parseInt(response.headers['x-total-count'], 10));
            setTestResults(response.data.map((question, index) => ({ ...question, key: index })));
          } catch (error) {} 
        };
    
        fetchTestResponses();
      }, [id, teacherId,currentPage]);

      useEffect(() => {
        const fetchFiles = async () => {
          testResults.forEach(async (testResult) => {
            if (testResult.details && testResult.details.photoIds) {
              const linksPromises = testResult.details.photoIds.map(fileId => downloadFile(fileId));
              try {
                const links = await Promise.all(linksPromises);
                setFileLinks(prevLinks => ({
                  ...prevLinks,
                  [testResult.id]: links.filter(link => link && link.isImage).map(link => link.downloadUrl)
                }));
              } catch (error) {
                console.error(error);
              }
            }
          });
        };
      
        if (testResults.length > 0) {
          fetchFiles();
        }
      }, [testResults]);

      const handlePageChange = async (value) => {
        await new Promise(resolve => {
            setCurrentPage(value, resolve);
        });
        setTestResults([]);
        }
    

return(
    <div className='create-test-container' style={{paddingTop:'40px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <div style={{width:'70%',padding:'20px 40px 20px 40px', backgroundColor:'white', borderRadius:20}} >
          <Row style={{
            justifyContent:'space-between',
            alignItems:'center'
          }}>
            <Col>
              <b><p style={{fontSize:19}}>{questionCount} Questions</p></b>
            </Col>
            <Col>
              <b><p style={{fontSize:19}}>{ansFullName}</p></b>
            </Col>
            <Col>
              <Pagination
                current={currentPage}
                onChange={handlePageChange}
                pageSize={pageSize}
                total={totalRecords}
                showSizeChanger={false}
                size='small'
                rootClassName='pagination-container'
              />
            </Col>
          </Row>
          <Col>
          {testResults.map((question, index) => (
            <Col key={question.id} style={{margin:'30px 0 30px 0'}}>
              <Row>
                <b><p>{question.number} Question</p></b>
              </Row>
              <Row>
                <b style={{padding:'0 0 10px 20px'}}>{question.question}</b>
              </Row>
              <Row>
              {fileLinks[question.id] && fileLinks[question.id].map((fileLink) => (
                  <img key={fileLink} src={fileLink} alt="question visual" style={{maxHeight:400}} />
                ))}
              </Row>
              <Col>
              {question.details.answers.map((ans) => (
                <Row key={ans} style={{ 
                    background: normalizeResponses(question.responses).includes(ans) ? '#16A6F6' : 'none',
                    color: normalizeResponses(question.responses).includes(ans) ? 'white' : 'none',
                    padding: 5,
                    margin: 5,
                    border:1,
                    width:"40%",
                    borderRadius:5
                }}>
                  {ans}
                </Row>
              ))}
              {question.questionType === "OPEN" && (
                <Row>
                  <p style={{ background: '#f0f0f0', padding: 5 }}>{normalizeResponses(question.responses).join(", ")}</p>
                </Row>
              )}
              </Col>
            </Col>
          ))}

          </Col>
          

        </div>
    </div>
);

};
export default CheckTestPagePsychologist;