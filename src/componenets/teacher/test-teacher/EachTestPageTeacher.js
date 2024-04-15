import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Base_URL} from "../../../constant";
import { useParams, useNavigate } from 'react-router-dom';
import { List, Form, Button, Input, Radio, Checkbox, Card, notification } from 'antd';
import '../../psychologist/test-psychologist/CreateTestPagePsychologist.css'
import {downloadFile}  from '../../../services/DownLoadFileService'

const EachTestPageTeacher = () => {
  const accessToken = localStorage.getItem('accessToken')
  const { id, questionCount } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionsData, setQuestionsData] = useState({});
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const profileId = localStorage.getItem('id');
  const [photoUrls, setPhotoUrls] = useState([]);
  const questionNumber = parseInt(questionCount, 10);

  useEffect(() => {
    const fetchQuestionData = async (num) => {
      try {
        const response = await axios.get(`${Base_URL}/client/tests/${id}/questions/${num}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
        setQuestionsData(prev => ({ ...prev, [num]: response.data }));
        if (response.data.details.photoIds && response.data.details.photoIds.length > 0) {
            fetchPhotoUrls(response.data.details.photoIds);
          } else {
            setPhotoUrls([]); 
          }
      } catch (error) {
        notification.error({ message: 'Failed to load question data.' });
      }
    };

    fetchQuestionData(currentQuestion);
  }, [id, currentQuestion]);

  const fetchPhotoUrls = async (photoIds) => {
    const urls = await Promise.all(photoIds.map(async (id) => {
      const result = await downloadFile(id);
      return result ? result.downloadUrl : null;
    }));
    setPhotoUrls(urls.filter(url => url !== null));
  };

  const submitResponse = async (questionNum) => {
    if (!responses[questionNum]) {
      notification.error({ message: 'You must answer the question before proceeding.' });
      return;
    }

    setSubmitting(true);
    try {
      await axios.put(`${Base_URL}/client/tests/${id}/questions/${questionNum}`, {
        questionType: questionsData[questionNum].questionType,
        questionId: questionsData[questionNum].id,
        teacherId: profileId,
        responses: responses[questionNum],
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      notification.success({ message: 'Response saved!' });
  
      if (questionNum < questionCount) {
        setCurrentQuestion(questionNum + 1);
      } else {

      }
    } catch (error) {
      notification.error({ message: 'Failed to save response.' });
    } finally {
      setSubmitting(false);
    }
  };


  const finishTest = async () => {

    setSubmitting(true);
    try {
      await submitResponse(questionNumber);
    } catch (error) {
      notification.error({ message: 'Failed to save the last response.' });
      setSubmitting(false);
      return;
    }

    try {
      await axios.put(`${Base_URL}/client/tests/${id}/finish`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      notification.success({ message: 'Test finished successfully!' });
      navigate('/test-teacher');
    } catch (error) {
      notification.error({ message: 'Failed to finish the test.' });
    } finally {
      setSubmitting(false);
    }
  };
  


  const onAnswerChange = (e, questionType) => {
    let answerValue;
    
    if (questionType === 'MULTIPLE_CHOICE') {
      answerValue = e;
    } else if (questionType === 'SINGLE_CHOICE') {
      answerValue = [e.target.value];
    } else {
      answerValue = [e.target.value];
    }
  
    setResponses({ ...responses, [currentQuestion]: answerValue });
  };

  const questionComponents = {
    OPEN: (data) => (
      <Input.TextArea
        value={responses[currentQuestion]}
        onChange={(e) => onAnswerChange(e, 'OPEN')}
      />
    ),
    SINGLE_CHOICE: (data) => (
      <Radio.Group
        value={responses[currentQuestion]}
        onChange={(e) => onAnswerChange(e, 'SINGLE_CHOICE')}
      >
        {data.map((answer, index) => (
          <Radio key={index} value={answer}>{answer}</Radio>
        ))}
      </Radio.Group>
    ),
    MULTIPLE_CHOICE: (data) => (
      <Checkbox.Group
        value={responses[currentQuestion]}
        onChange={(e) => onAnswerChange(e, 'MULTIPLE_CHOICE')}
      >
        {data.map((answer, index) => (
          <Checkbox key={index} value={answer}>{answer}</Checkbox>
        ))}
      </Checkbox.Group>
    )
  };

  return (
    <div className="test-container" style={{display:'flex', flexDirection:'row', justifyContent:'center', width:'100%'}}>
      <div className="questions-list" style={{display:'flex', flexDirection:'column', width:'200px',height:500, backgroundColor:'white', padding:20, borderRadius:20,margin:'20px 20px 20px 0'}}>
        <List
        style={{display:'flex', flexDirection:'column', width:'200px',height:500, backgroundColor:'white', padding:20, borderRadius:20, overflowY:'scroll'}}
          dataSource={Array.from({ length: questionCount }, (_, i) => `Question №${i + 1}`)}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => setCurrentQuestion(index + 1)}
              className={index + 1 === currentQuestion ? 'selected' : ''}
            >
              {item}
            </List.Item>
          )}
        />
      </div>
      <div className="question-display" style={{display:'flex', flexDirection:'column', width:'800px',height:500, backgroundColor:'white', padding:20, borderRadius:20,margin:'20px 20px 20px 0'}}>
        {questionsData[currentQuestion] && (
          <Card>
            <div className="question-content">
              <h1>Question № {currentQuestion}</h1>
              <h3>{questionsData[currentQuestion].details.question}</h3>
              <div>
                {photoUrls.map((url, index) => (
                    <img key={index} src={url} alt="Attached" style={{ width: '100px', height: '100px' }} />
                ))}
            </div>
              <div style={{display:'flex', flexDirection:'column'}}>
                {questionComponents[questionsData[currentQuestion].questionType](
                    questionsData[currentQuestion].details.answers 
                )}
              </div>

            </div>
            <div className="submit-area" style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
          {currentQuestion < questionNumber && (
            <Button
              type="primary"
              onClick={() => submitResponse(currentQuestion)}
              disabled={submitting}
              style={{backgroundColor:'#48B813', marginTop:20}}
            >
              Save Answer
            </Button>
          )}
          {/* The Finish Test button will appear only if we are on the last question */}
          {currentQuestion === questionNumber && (
            <Button
              type="primary"
              onClick={finishTest}
              disabled={submitting || Object.keys(responses).length < questionNumber}
              style={{backgroundColor:'#64B5D7', color:'white',marginTop:20}}
            >
              Finish Test
            </Button>
          )}
        </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EachTestPageTeacher;