import React, { useState } from 'react';
import './index.css';
import logo from '../../constant/image/logoblue.svg';
import { Button, Card, Checkbox, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { login, loginOTP } from '../../services/LoginService';
import { useUserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LoginPage = () => {
    const [form] = useForm();
    const [step, setStep] = useState(0);
    const [loginName, setLoginName] = useState('');
    const [remember, setRememberMe] = useState(false);
    const { setAccessToken} = useUserContext();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        if (step === 0) {
            await login({email: values.email, password: values.password})
                .then(() => {
                    setLoginName(values.email);
                    setStep(1); // Переходим ко второму шагу после успешного первого
                });
        } else if (step === 1) {
            const data = {
                email: loginName,
                rememberMe: remember, // Передаем сохраненное состояние чекбокса "Запомнить меня"
                code: values.code
            };
            await loginOTP(data, setAccessToken).then(() => {
                const role = localStorage.getItem('role');
                const accessToken = localStorage.getItem('accessToken');
                const getHomePagePath = () => {
                    switch (role) {
                        case 'ADMIN': return '/schools';
                        case 'TEACHER': return '/report-teacher';
                        case 'PSYCHOLOGIST': return '/report-psychologist';
                        default: return '/login';
                    }
                };
                navigate(getHomePagePath(role)); // Навигация на домашнюю страницу в зависимости от роли
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
