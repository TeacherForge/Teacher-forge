import React from 'react';
// import {AllEmailIcon, LeftIcon, LetterIcon, OpenLetterIcon, RightIcon} from "../../icons/Index.";
import {Checkbox, Col, Row, Typography} from "antd";

const ReadAppealsPage = () => {

    const styleSideBar = {
        backgroundColor: 'white',
        height: '100%',
        width: '25%',
        padding: '20px'
    };

    return (
        <>
            <div style={styleSideBar}>
                <Row gutter={[20,20]}>
                    <Col xs={24}>
                        <Row gutter={16}>
                            <Col style={{marginTop:'2px'}}>
                                {/*<AllEmailIcon/>*/}
                            </Col>
                            <Col style={{fontSize:'18px', color: 'black'}}>
                                All mail
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24}>
                        <Row gutter={16}>
                            <Col style={{marginTop:'2px'}}>
                                {/*<LetterIcon />*/}
                            </Col>
                            <Col style={{fontSize:'18px', color: 'black'}}>
                                Read
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24}>
                        <Row gutter={16}>
                            <Col style={{marginTop:'2px'}}>
                               {/*<OpenLetterIcon />*/}
                            </Col>
                            <Col style={{fontSize:'18px', color: 'black'}}>
                                Unread
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:'15px'}}>
                    <Col xs={24} lg={2}>
                        <input type={'checkbox'} style={{width:'100%', height:'100%'}} />
                    </Col>
                    <Col xs={24} lg={22} style={{display:'flex', justifyContent: 'flex-end',marginTop:'2px'}}>
                        <Row gutter={24}>
                            <Col>
                                1-10 of 1,435
                            </Col>
                            <Col>
                                {/*<LeftIcon />*/}
                                &nbsp;
                                &nbsp;
                                {/*<RightIcon />*/}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />
            </div>
            <div>
                <Typography.Title level={2}>Mail for appeals</Typography.Title>
            </div>
        </>
    );
};

export default ReadAppealsPage;
