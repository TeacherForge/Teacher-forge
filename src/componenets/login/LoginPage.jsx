import React, {useState} from 'react';
import './index.css';
import logo from '../../constant/image/logoblue.svg'
import {Button, Card, Checkbox, Col, Form, Input, Row, Space, Typography} from 'antd';
import {useForm} from 'antd/es/form/Form';
import {login} from '../../services/LoginService';
import {loginOTP} from '../../services/LoginService';
import App, {useUserContext} from "../../App";
import {useNavigate} from "react-router-dom";

const {Title, Text} = Typography;

const LoginPage = () => {
    const [form] = useForm();
    const [step, setStep] = useState(0);
    const [loginName, setLoginName] = useState();
    const [remember, setRememberMe] = useState();
    const { setAccessToken, setRole } = useUserContext();
    const navigate = useNavigate();

    const onFinish = async (values) => {

        if (step === 0) {
            const clone = (({remember, ...o}) => o)(values);
            await login(clone)
            setStep(step + 1);
        } else if (step === 1) {
            const clone = (({...o}) => o)(values);
            const data = {
                email: loginName,
                rememberMe: remember,
                ...clone
            };
        await loginOTP(data, setAccessToken).then(() => {
            const role = localStorage.getItem('role');
            const accessToken = localStorage.getItem('accessToken');
            //console.log("userRole " + role + " and accessToken " + accessToken);
            const getHomePagePath = () => {
                switch (role) {
                    case 'ADMIN': return '/schools';
                    case 'TEACHER': return '/report-teacher';
                    case 'PSYCHOLOGIST': return '/report-psychologist';
                    default: return '/login';
                }
            };
                navigate(getHomePagePath(role));
        });
        }
    };

    return (
        <div>
            <div className={'layout'}>
                <Row gutter={36} style={{padding: '110px', height: 900}}>
                    <Col xs={24} md={12} style={{marginTop: '90px', textAlign: 'right'}}>
                        <Title style={{color: 'white'}} level={2}>
                            Teaching's art and science,
                            find balance and reliance
                            - TeacherForge your mental alliance
                        </Title>
                        <Text style={{color: 'white'}}>@TeacherForge</Text>
                    </Col>
                    <Col xs={24} md={12} style={{alignItems: 'center'}}>
                        <Card className={'container'}>
                            <div className={'container'}>
                                <img src={logo} alt={'logo'} style={{width: '50%', height: '50%'}}/>
                            </div>
                            <Form
                                name='basic'
                                form={form}
                                onFinish={onFinish}
                                layout={'vertical'}
                            >
                                {
                                    step === 0
                                        ?
                                        <>
                                            <Form.Item
                                                label='Username'
                                                name='email'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your username!',
                                                    },
                                                ]}
                                            >
                                                <Input onChange = {(e) => {setLoginName(e.target.value)}}/>
                                            </Form.Item>

                                            <Form.Item
                                                label='Password'
                                                name='password'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your password!',
                                                    },
                                                ]}
                                            >
                                                <Input.Password/>
                                            </Form.Item>

                                            <Form.Item
                                                name='remember'
                                                valuePropName='checked'
                                            >
                                                <Checkbox onChange = {(e) => {setRememberMe(e.target.value)}}>Remember me</Checkbox>
                                            </Form.Item>

                                            <Form.Item>
                                                <Button htmlType='submit' style={{width: '100%', borderRadius: '25px', backgroundColor:'#1885C2', color:'white'}}>
                                                    Log in
                                                </Button>
                                            </Form.Item>
                                        </>
                                        :
                                        step === 1
                                        &&
                                        <>
                                            <Form.Item name={'code'} label={'Write code:'}>
                                                <Space wrap>
                                                    <Input maxLength={6} />
                                                </Space>
                                            </Form.Item>
                                            <Form.Item>
                                                <Typography.Text>Send again?</Typography.Text>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button htmlType='submit'style={{width: '100%', borderRadius: '25px', backgroundColor:'#1885C2', color:'white'}}>
                                                    Check
                                                </Button>
                                            </Form.Item>
                                        </>
                                }
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default LoginPage;
