import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './index.css';
import logoblue from '../../constant/image/logoblue.svg'
import logowhite from '../../constant/image/logowhite.svg'
import {Button, Col, Row, Typography} from "antd";
import {UserContext, useUserContext} from "../../App";
import {createContext, useContext, useEffect, useState} from 'react';
import shiro from '../../constant/image/icons/shiro.png'

const Navbar = () => {
    const getColor = () => {
        switch (role) {
            case 'ADMIN': return '#303030';
            case 'TEACHER': return '#1E9BE1';
            case 'PSYCHOLOGIST': return '#1E9BE1';
            default: return '303030';
        }
    };
    const role = localStorage.getItem('role');
    const fullName = localStorage.getItem('fullName');

    const navigate = useNavigate();
    const { setAccessToken, setRole } = useUserContext();
    return (
        <nav style={{
            backgroundColor: getColor(),
            minWidth:1000,
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem'
        }}>
            {role === 'ADMIN' ? (
                <div style={{flex: 1, display: 'flex'}}>
                    <img src={logoblue} alt='Картинка' style={{width: '200px', height: '50px'}}/>
                    <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                    <Row gutter={16}>
                        <Col>
                            <NavLink to="/schools" className="nav-link"
                                     style={{textDecoration: 'none', marginRight: '1rem'}}>Schools</NavLink>
                        </Col>
                        <Col>
                            <NavLink to="/appeals" className="nav-link"
                                     style={{textDecoration: 'none', marginRight: '1rem'}}>Appeals</NavLink>
                        </Col>
                    </Row>
                    </div>
                </div>
            ) : role === 'TEACHER' ? (
                <div style={{flex: 1, display: 'flex'}}>
                    <img src={logowhite} alt='Картинка' style={{width: '200px', height: '50px'}}/>
                    <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                    <Row gutter={16}>
                        <Col>
                            <NavLink to="/report-teacher" className="nav-link"
                                     style={{textDecoration: 'none', marginRight: '1rem'}}>Report</NavLink>
                        </Col>
                        <Col>
                            <NavLink to="/appeals-teacher" className="nav-link"
                                     style={{textDecoration: 'none', marginRight: '1rem'}}>Appeals</NavLink>
                        </Col>
                        <Col>
                            <NavLink to="/test-teacher" className="nav-link"
                                     style={{textDecoration: 'none', marginRight: '1rem'}}>Test</NavLink>
                        </Col>

                    </Row>
                    </div>

                </div>
            ): role === 'PSYCHOLOGIST' ? (
                <div style={{flex: 1, display: 'flex'}}>
                    <img src={logowhite} alt='Картинка' style={{width: '200px', height: '50px'}}/>
                    <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                    <Row gutter={16}>
                        <Col>
                            <NavLink to="/report-psychologist" className="nav-link"
                                     style={{textDecoration: 'none', marginRight: '1rem'}}>Report</NavLink>
                        </Col>
                        <Col>
                            <NavLink to="/appeals-psychologist" className="nav-link"
                                     style={{textDecoration: 'none', marginRight: '1rem'}}>Appeals</NavLink>
                        </Col>
                        <Col>
                            <NavLink to="/test-psychologist" className="nav-link"
                                     style={{textDecoration: 'none', marginRight: '1rem'}}>Test</NavLink>
                        </Col>

                    </Row>
                    </div>

                </div>
            ) : null}
            <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <Row gutter={16}>
                    <Col>
                        <Typography.Text style={{color:'white', textAlign:'center', fontSize:'20px'}}>{fullName}</Typography.Text>
                    </Col>
                    <Col>
                        <Button style={{borderRadius:'50px'}} onClick={() => {localStorage.removeItem('accessToken');localStorage.removeItem('role');setAccessToken(false);setRole(false); navigate('/login')}}><b>Log Out</b></Button>
                    </Col>
                </Row>
            </div>
        </nav>
    );
};


export default Navbar;




