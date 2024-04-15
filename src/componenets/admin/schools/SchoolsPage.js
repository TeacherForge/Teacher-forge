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
        value: 'GENERAL',
        name: 'General'
    },
    {
        value: 'LYCEUMS',
        name: 'Lyceums'
    },
    {
        value: 'GYMNASIUMS',
        name: 'Gymnasium'
    },
    {
        value: 'INTERNATIONAL',
        name: 'International'
    },
    {
        value: 'SPECIALIZED',
        name: 'Specialized'
    },
    {
        value: 'BOARDING',
        name: 'Boarding'
    }
]

const jsonStatus = [
    {
        value: 'STATE',
        name: 'State'
    },
    {
        value: 'MUNICIPAL',
        name: 'Municipal'
    },
    {
        value: 'PRIVATE',
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
    const [typeFilter, setTypeFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [open, setOpen] = useState(false);

    const resetFilters = () => {
        setRegionId(null);
        setTypeFilter(null);
        setStatusFilter(null);
        setSearch(null);
        listSchools();
        setSearch(null);
    };
    

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
     }, [regionId, typeFilter, statusFilter, open, search]); 
     
    const listSchools = async () => {
        const data = {
            regionId: regionId,
            type: typeFilter,
            status: statusFilter,
            name: search
        };
    
        await SchoolsService.getSchools(data).then((res) => {
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
                    <Col>
                        <Button type="default" style={{ borderRadius: '20px', width: '100px'}} onClick={resetFilters}>
                            Reset Filters
                        </Button>
                    </Col>
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
                                    <Radio.Group onChange={(e) => setTypeFilter(e.target.value)}>
                                    {jsonTypes.map((item) => (
                                        <Radio value={item.value}>{item.name}</Radio>
                                    ))}
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
                                    <Radio.Group onChange={(e) => setStatusFilter(e.target.value)}>
                                    {jsonStatus.map((item) => (
                                        <Radio value={item.value}>{item.name}</Radio>
                                    ))}
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
