import React, { useState, useEffect } from 'react';
import './index.css';
import logo from '../../constant/image/logoblue.svg';
import { Button, Card, Checkbox, Col, Form, Input, Row, Typography, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { login, loginOTP } from '../../services/LoginService';
import { useUserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LoginPage = () => {
    const [form] = useForm();
    const [step, setStep] = useState(0);
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRememberMe] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(60);
    const { setAccessToken } = useUserContext();
    const navigate = useNavigate();
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        const timerStart = localStorage.getItem('timerStart');
        const timerLogin = localStorage.getItem('timerLogin');

        if (timerStart && timerLogin) {
            const timePassed = Math.floor((Date.now() - new Date(timerStart).getTime()) / 1000);
            if (timePassed < 60) {
                setSecondsRemaining(60 - timePassed);
                setTimeout(() => {
                    localStorage.removeItem('timerStart');
                    localStorage.removeItem('timerLogin');
                    setSecondsRemaining(60);
                }, (60 - timePassed) * 1000);
            }
        }
    }, []);

    useEffect(() => {
        let interval;
        if (timerActive && secondsRemaining > 0) {
            interval = setInterval(() => {
                setSecondsRemaining(seconds => seconds - 1);
            }, 1000);
        } else if (secondsRemaining <= 0) {
            setTimerActive(false);
            setSecondsRemaining(60);
        }
        return () => clearInterval(interval);
    }, [timerActive, secondsRemaining]);

    const handleLoginAttempt = async (values) => {
        const timerLogin = localStorage.getItem('timerLogin');
        if (timerLogin === values.email) {
            const timePassed = Math.floor((Date.now() - new Date(localStorage.getItem('timerStart')).getTime()) / 1000);
            if (timePassed < 60) {
                notification.info({
                    message: 'Please wait',
                    description: `You can try logging in again in ${60 - timePassed} seconds.`
                });
                return;
            }
        }

        try {
            await login({ email: values.email, password: values.password });
            console.log('Login request sent successfully.');
            localStorage.setItem('timerStart', new Date().toISOString());
            localStorage.setItem('timerLogin', values.email);
            setLoginName(values.email);
            setPassword(values.password);
            setTimerActive(true);
            setStep(1);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to send login request. Please try again.'
            });
        }
    };

    const onFinish = async (values) => {
        if (step === 0) {
            handleLoginAttempt(values);
        } else if (step === 1) {
            await loginOTP({
                email: loginName,
                rememberMe: remember,
                code: values.code
            }, setAccessToken).then(() => {
                const role = localStorage.getItem('role');
                const getHomePagePath = () => {
                    switch (role) {
                        case 'ADMIN': return '/schools';
                        case 'TEACHER': return '/report-teacher';
                        case 'PSYCHOLOGIST': return '/report-psychologist';
                        default: return '/login';
                    }
                };
                navigate(getHomePagePath());
            });
        }
    };

    const resendCode = async () => {
        try {
            await login({ email: loginName, password: password});
            console.log('Code resent successfully.');
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to resend the code. Please try again.'
            });
        }
    };

    

    return (
        <div className="layout">
            <Row gutter={36} style={{ padding: '110px', height: 900 }}>
                <Col xs={24} md={12} style={{ marginTop: '90px', textAlign: 'right' }}>
                    <Title style={{ color: 'white' }} level={2}>
                        Teaching's art and science,
                        find balance and reliance
                        - TeacherForge your mental alliance
                    </Title>
                    <Text style={{ color: 'white' }}>@TeacherForge</Text>
                </Col>
                <Col xs={24} md={12} style={{ alignItems: 'center' }}>
                    <Card className="container">
                        <img src={logo} alt="logo" style={{ width: '50%', height: '50%' }} />
                        <Form
                            name="basic"
                            form={form}
                            onFinish={onFinish}
                            layout="vertical"
                        >
                            {step === 0 ? (
                                <>
                                    <Form.Item
                                        label="Username"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input onChange={(e) => setLoginName(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                    >
                                        <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>Remember me</Checkbox>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                            Log in
                                        </Button>
                                    </Form.Item>
                                </>
                            ) : (
                                <>
                                    <Form.Item
                                        label="Write code:"
                                        name="code"
                                        style={{width:100}}
                                        rules={[{ required: true, message: 'Please input the code from the email!' }]}
                                    >
                                        <Input maxLength={6} />
                                    </Form.Item>
                                    <Button onClick={() => resendCode()} style={{ float: 'right' }} disabled={timerActive}>
                                        Send again? ({secondsRemaining}s)
                                    </Button>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                            Check
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
