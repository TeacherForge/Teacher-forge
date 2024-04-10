import React from 'react';
import footer_logo_blue from '../../constant/image/footer_logo_blue.svg'
import footer_logo_white from '../../constant/image/footer_logo_white.svg'
import {Col, Row} from "antd";
import './Footer.css'

const Footer = () => {
    const role = localStorage.getItem('role');
    const getColor = () => {
        switch (role) {
            case 'ADMIN': return '#3E3E3E';
            default: return '#FFFFFF';
        }
    };

    return (
        <nav 
            className='footer'
            style={{
            backgroundColor: getColor(),
            minWidth:1000,
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
        }}>
            {role === 'ADMIN' ? (
                <div className='footer-container' style={{flex: 1, display: 'flex',flexDirection:'column', width:'100%', padding:'10px', color:'white'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <img src={footer_logo_white} alt='Картинка' style={{width: '200px', height: '50px', backgroundColor:getColor}}/>
                            <p style={{width:'50%'}}>Teaching's art and science, find balance and reliance - TeacherForge your mental alliance</p>
                        </div>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <div style={{display:'flex', flexDirection:'column', marginRight:20}}>
                                <b><p>Kaliakhmetov Imangali</p></b>
                                <b><p>Kydyrali Sagyndyk</p></b>
                                <b><p>Amir Saken</p></b>
                            </div>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <p>200107112</p>
                                <p>200107103</p>
                                <p>200107075</p>
                            </div>
                        </div>
                    </div>
                    <hr style={{width:'100%'}}/>
                    <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                        <span>© TeacherForge 2024</span>
                    </div>
                    
                </div>
            ) : role !== 'ADMIN' ? (
                <div className='footer-container' style={{flex: 1, display: 'flex',flexDirection:'column', width:'100%', padding:'10px', color:'#101010'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <img src={footer_logo_blue} alt='Картинка' style={{width: '200px', height: '50px', backgroundColor:getColor}}/>
                            <p style={{width:'50%'}}>Teaching's art and science, find balance and reliance - TeacherForge your mental alliance</p>
                        </div>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <div style={{display:'flex', flexDirection:'column', marginRight:20}}>
                                <b><p>Kaliakhmetov Imangali</p></b>
                                <b><p>Kydyrali Sagyndyk</p></b>
                                <b><p>Amir Saken</p></b>
                            </div>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <p>200107112</p>
                                <p>200107103</p>
                                <p>200107075</p>
                            </div>
                        </div>
                    </div>
                    <hr style={{width:'100%'}}/>
                    <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                        <span>© TeacherForge 2024</span>
                    </div>
                    
                </div>
            ) : null}
        </nav>
    );

}

export default Footer;