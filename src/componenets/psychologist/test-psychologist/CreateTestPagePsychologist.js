import React, { useState, useEffect } from 'react';
import { Select, Button, Form, Input, Upload, List, Typography ,Space, message, notification} from 'antd';
import { useParams, useNavigate} from 'react-router-dom';
import { UploadOutlined, DeleteOutlined, MinusCircleOutlined, PlusOutlined,EditOutlined } from '@ant-design/icons';
import { uploadFile } from '../../../services/UploadFileService';
import {downloadFile}  from '../../../services/DownLoadFileService'
import axios from "axios";
import {Base_URL} from "../../../constant";
import './CreateTestPagePsychologist.css'


const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const CreateTestPage = () => {

  const {id} = useParams();
  const accessToken = localStorage.getItem('accessToken')
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState();
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();
  const [numberOfQuestion, setNumberOfQuestion] = useState(1);
  const [details, setDetails] = useState();
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [photoUrls, setPhotoUrls] = useState([]);



  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${Base_URL}/psychologist/tests/${id}/questions`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setQuestions(response.data);
      } catch (error) {}
    };
  
    fetchQuestions();
  }, [id]);

  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
    form.setFieldsValue({ questionType: value });
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

  const fetchPhotoUrls = async (photoIds) => {
    const urls = await Promise.all(photoIds.map(async (id) => {
      const result = await downloadFile(id);
      return result ? result.downloadUrl : null;
    }));
    setPhotoUrls(urls.filter(url => url !== null));
  };
  

  const editQuestion = (question) => {
    setSelectedQuestion(question);
    setNumberOfQuestion(question.number);
    form.setFieldsValue({
      questionType: question.questionType,
      question: question.details.question,
      answers: question.details.answers?.map(answer => ({ answer })),
    });
    
    // Вызовите fetchPhotoUrls, если у вопроса есть photoIds
    if (question.details.photoIds && question.details.photoIds.length > 0) {
      fetchPhotoUrls(question.details.photoIds);
    } else {
      setPhotoUrls([]); // Очистите URL-адреса, если у вопроса нет прикрепленных фото
    }
  };
  

  
  const addQuestion = () => {
    form.resetFields();
    setSelectedQuestion(null);
    setNumberOfQuestion(questions.length + 1);
  };

  const finishTest = async () => {
    try {
      await axios.put(`${Base_URL}/psychologist/tests/${id}/finish`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      notification.success({
        message: 'Тест завершён и отправлен'
      });
      navigate('/tests');
    } catch (error) {
      notification.error({
        message: 'Ошибка завершения теста',
        description: error.message
      });
    }
  };

  const deleteQuestion = async (questionNumber) => {
    try {
      await axios.delete(`${Base_URL}/psychologist/tests/${id}/question/${questionNumber}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setQuestions(questions.filter(q => q.number !== questionNumber));
    } catch (error) {
      notification.error({
        message: 'Ошибка удаления вопроса',
        description: error.message
      });
    }
  };

  

  const saveQuestion = async (questionData) => {
    setUploading(true);
    let response;
    try {
      if (selectedQuestion) {
        response = await axios.put(`${Base_URL}/psychologist/tests/${id}/question/${selectedQuestion.number}`, questionData, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      } else {
        response = await axios.post(`${Base_URL}/psychologist/tests/${id}/question`, questionData, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      }
      if (response.status === 200) {
        const updatedQuestions = selectedQuestion
          ? questions.map((q) => q.number === selectedQuestion.number ? response.data : q)
          : [...questions, response.data];
        setQuestions(updatedQuestions);
        setSelectedQuestion(null);
        message.success('Вопрос успешно сохранен!');
        form.resetFields();
        setNumberOfQuestion(updatedQuestions.length + 1);
      }
    } catch (error) {
      message.error('Ошибка при сохранении вопроса: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const onFinish = async (values) => {
    // Структурируем данные в формате, ожидаемом бэкендом
    const questionData = {
      testId: id,
      questionType: values.questionType,
      details: {
        photoIds: documentIds, // Используем сохраненные ID загруженных файлов
        question: values.question,
        answers: values.answers ? values.answers.map((item) => item.answer) : [] // Маппим только ответы для сохранения
      },
      number: selectedQuestion ? selectedQuestion.number : numberOfQuestion
    };
    await saveQuestion(questionData);
  };


  return (
    <div 
        className='create-test-container' 
        style={{
            display:'flex', 
            flexDirection:'column', 
             
            justifyContent:'center',
            padding:"20px 200px 20px 200px"
        }}>,
            
        <div 
            style={{
                display:'flex', 
                flexDirection:'row',
                justifyContent:'center',

            }}>
            <div 
                className="questions-list" 
                style={{display:'flex', 
                    flexDirection:'column', 
                    width:'30%',
                    marginRight:20, 
                    backgroundColor:'white',
                    borderRadius:20, 
                    padding:20,

                }}>

                <List
                style={{
                    height:400,
                    overflowY:'scroll',
                    padding:20,
                }}
                dataSource={questions}
                renderItem={(question) => (
                    <List.Item 
                      actions={[<a style={{textDecoration:'none'}} onClick={() => editQuestion(question)}><EditOutlined/></a>, <DeleteOutlined onClick={() => deleteQuestion(question.number)} />]}
                    >
                      {'Question №' + question.number}
                    </List.Item>
                  )}
                />
                <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Button type="primary" onClick={addQuestion} style={{width:120, backgroundColor:'#454BE5'}}>Add Question</Button>
                </div>

            </div>
            <div 
                style={{
                    display:'flex', 
                    flexDirection:'column', 
                    width:'70%',
                    backgroundColor:'white', 
                    borderRadius:20,
                    padding: 20
                }}>
                <Form form={form} onFinish={onFinish} style={{height:'400px', overflowY:'scroll', padding:20}}>
                    <Form.Item name="questionType" style={{width:150,}}>
                        <Select placeholder={'Choise the Type'} onChange={handleQuestionTypeChange}>
                        <Option value="SINGLE_CHOICE">Single choice</Option>
                        <Option value="MULTIPLE_CHOICE">Multiple choice</Option>
                        <Option value="OPEN">Open</Option>
                        </Select>
                    </Form.Item>
                    <div style={{display:'flex', flexDirection:'row'}}>
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
                        <div>
                            {photoUrls.map((url, index) => (
                                <img key={index} src={url} alt="Attached" style={{ width: '100px', height: '100px' }} />
                            ))}
                        </div>
                    </div>
                    

                    <Form.Item name="question" label="Question:"rules={[{ required: true }]}>
                        <Input placeholder="Enter question text..." />
                    </Form.Item>

                    {questionType !== 'OPEN' && (
                        <Form.List name="answers"
                        rules={[
                            {
                              validator: async (_, answers) => {
                                if (!answers || answers.length < 1) {
                                  return Promise.reject(new Error(message.error('Please add at least one answer option')));
                                }
                              },
                            },
                          ]}
                        style={{
                            height:400,
                            overflowY:'scroll'
                        }}>
                            
                        {(fields, { add, remove }) => (
                            <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Form.Item
                                {...restField}
                                key={key}
                                style={{ marginBottom: 0 }}
                                >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'answer']}
                                    rules={[{ required: true, message: 'Введите вариант ответа' }]}
                                    style={{ display: 'inline-block', width: 'calc(100% - 40px)' }}
                                >
                                    <Input placeholder="Вариант ответа" />
                                </Form.Item>
                                <Button
                                    type="link"
                                    onClick={() => remove(name)}
                                    icon={<DeleteOutlined />}
                                    style={{ display: 'inline-block', width: '40px', textAlign: 'center' }}
                                />
                                </Form.Item>
                            ))}
                            <Button type="primary" onClick={() => add()} block icon={<PlusOutlined />} style={{backgroundColor:'#454BE5', width:150}}>
                                Add Answer
                            </Button>
                            </>
                        )}
                        </Form.List>
                    )}
                    <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                        <Button type="default" htmlType="reset" style={{margin:"5px"}}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit" disabled={uploading} style={{backgroundColor:'#48B813'}}>
                            {uploading ? 'Loading...' : 'Submit'}
                        </Button>
                    </div>

                </Form>


            </div>
        </div>
        <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
        <Button type="primary" htmlType="submit" disabled={uploading} onClick={finishTest} style={{width:120, margin:'20px 0 20px 0', borderRadius:20, backgroundColor:'black'}}>
                {uploading ? 'Loading...' : 'Submit Test'}
        </Button>
        </div>
    </div>
    
    
  );
};

export default CreateTestPage;
