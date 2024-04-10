import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Radio, Row, Space, Table, Typography} from 'antd';
import {CaretDownOutlined, CaretRightOutlined, PlusOutlined} from '@ant-design/icons';
import Search from "antd/es/input/Search";
import '../schools/table.css'
import {Link} from "react-router-dom";
import AddSchoolModal from "./modals/AddSchoolModal";
import SchoolsService from "../../../services/SchoolsService";
import RegionService from "../../../services/RegionService";


const jsonTypes = [
    {
        value: 'General',
        name: 'General'
    },
    {
        value: 'Lyceums',
        name: 'Lyceums'
    },
    {
        value: 'Gymnasium',
        name: 'Gymnasium'
    }
]

const jsonStatus = [
    {
        value: 'State',
        name: 'State'
    },
    {
        value: 'Municipal',
        name: 'Municipal'
    },
    {
        value: 'Private',
        name: 'Private'
    }
];


const columns = [
    {
        title: 'Name of school',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`/schools/${record?.id}`}>{text}</Link>,
    },
    {
        title: 'Location',
        dataIndex: 'address',
        key: 'address',
        render: (text, record) => <Link to={`/schools/${record?.id}`}>{text}</Link>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => <Link to={`/schools/${record?.id}`}>{text}</Link>,
    },
    {
        title: 'Type of school',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => <Link to={`/schools/${record?.id}`}>{text}</Link>,
    }
];

const SchoolsPage = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenTypes, setIsOpenTypes] = useState(true);
    const [isOpenStatus, setIsOpenStatus] = useState(true);
    const [data, setData] = useState([]);
    const [dataRegion, setDataRegion] = useState([]);
    const [regionId, setRegionId] = useState(null);
    const [search, setSearch] = useState(null);

    const [open, setOpen] = useState(false);



    useEffect(() => {
        getRegions();
    },[])

    const getRegions = async () => {
        await RegionService.getRegions().then((responce) => {
            setDataRegion(responce.data);
        });
    }

    useEffect(() => {
       listSchools();
    },[open])

    const listSchools = async () => {
        await SchoolsService.getSchools().then((res) => {
            setData(res.data);
        });
    }

    const toggleList = (setOpen, open) => {
        setOpen(!open);
    };

    return (
        <>
            <Row gutter={16} style={{ marginTop: '80px', justifyContent: 'space-between' }}>
                <Col>
                    <Search style={{ width: '600px', borderRadius: '20px' }} placeholder={'Search'} onChange={(e) => setSearch(e.target.value)} />
                </Col>
                <Col>
                    <Button type={'primary'} style={{ borderRadius: '20px', width: '200px' }} onClick={() => setOpen(true)}>
                        Create School <PlusOutlined />
                    </Button>
                </Col>
            </Row>
            <Row gutter={36} style={{marginTop: '30px'}}>
                <Col xs={6}>
                    <Card>
                        <Typography.Title level={4}>Schools</Typography.Title>
                        <div style={{marginLeft:'15px'}}>
                            <div style={{marginTop:'15px'}}>
                                <div onClick={() => toggleList(setIsOpen, isOpen)} style={{marginBottom:'10px'}}>
                                    Region
                                    {isOpen ? <CaretDownOutlined/> : <CaretRightOutlined/>}
                                </div>
                                {isOpen && (
                                    <Radio.Group>
                                        <Space direction="vertical" style={{marginLeft:'18px'}}>
                                            {
                                                dataRegion.map((item) => (
                                                    <Radio value={item.id} onChange={(e) => {setRegionId(e.target.value)}}>{item.name}</Radio>
                                                ))
                                            }
                                        </Space>
                                    </Radio.Group>
                                )}
                            </div>
                            <hr style={{color:'#F0F8FF'}} />
                            <div>
                                <div onClick={() => toggleList(setIsOpenTypes, isOpenTypes)} style={{marginBottom:'10px'}}>
                                    Type of school
                                    {isOpenTypes ? <CaretDownOutlined/> : <CaretRightOutlined/>}
                                </div>
                                {isOpenTypes && (
                                    <Radio.Group>
                                        <Space direction="vertical" style={{marginLeft:'18px'}}>
                                            {jsonTypes.map((item) => (
                                                <Radio value={item.value}>{item.name}</Radio>
                                            ))}
                                        </Space>
                                    </Radio.Group>
                                )}
                            </div>
                            <hr style={{color:'#F0F8FF'}} />
                            <div>
                                <div onClick={() => toggleList(setIsOpenStatus, isOpenStatus)} style={{marginBottom:'10px'}}>
                                    Status
                                    {isOpenStatus ? <CaretDownOutlined/> : <CaretRightOutlined/>}
                                </div>
                                {isOpenStatus && (
                                    <Radio.Group>
                                        <Space direction="vertical" style={{marginLeft:'18px'}}>
                                            {jsonStatus.map((item) => (
                                                <Radio value={item.value}>{item.name}</Radio>
                                            ))}
                                        </Space>
                                    </Radio.Group>
                                )}
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={18}>
                    <Card>
                        <Table
                            columns={columns}
                            dataSource={data}
                        />
                    </Card>
                </Col>
            </Row>
            <AddSchoolModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

export default SchoolsPage;
