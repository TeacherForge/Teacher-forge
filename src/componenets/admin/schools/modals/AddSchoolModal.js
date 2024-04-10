import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Typography, Image} from 'antd';
import {useForm} from 'antd/es/form/Form';
import '../table.css'
import RegionService from "../../../../services/RegionService";
import SchoolsService from "../../../../services/SchoolsService";
import schoolImage from '../../images/SchoolAdd.svg'

const AddSchoolModal = ({isOpen, onClose}) => {
    const [form] = useForm();
    const [data, setData] = useState([]);


    useEffect(() => {
        getRegions();
    },[])

    const getRegions = async () => {
        await RegionService.getRegions().then((responce) => {
            setData(responce.data);
        });
    }

    const handleClick = async () => {
        const values = form.getFieldsValue();
        const data = {
            domain: values.domain,
            name:values.nameOfSchool,
            status:values.status,
            type:values.typeOfSchool,
            regionId:values.region,
            address: values.address
        }
        await SchoolsService.createSchools(data);
        onClose();
    }

    return (
        <Modal
          open={isOpen}
          onCancel={onClose}
          footer={null}
          width={'850px'}
        >
            <div style={{textAlign:'center'}}>
                <Typography.Title level={4}>
                    Create School
                </Typography.Title>
            </div>

            <Row style={{marginTop:'30px', marginBottom:'10px'}}>
                <Col xs={8}>
                    <Image src={schoolImage} alt={'school'} />
                </Col>
                <Col xs={16}>
                    <Form form={form}>
                        <Row gutter={16}>
                            <Col xs={12}>
                                <Form.Item name={'nameOfSchool'}>
                                    <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Name of School'}/>
                                </Form.Item>
                                <Form.Item name={'region'}>
                                    <Select
                                        options={
                                        data.map((item) => (
                                            { value: item.id, label: item.name }
                                        ))
                                        }
                                        style={{borderRadius:'80px', borderColor:'#000', height:'40px'}}
                                        placeholder={'Region'}
                                    />
                                </Form.Item>
                                <Form.Item name={'address'}>
                                   <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Address'}/>
                                </Form.Item>
                            </Col>
                            <Col xs={12}>
                                <Form.Item name={'domain'}>
                                    <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Domain'}/>
                                </Form.Item>
                                <Form.Item name={'typeOfSchool'}>
                                    <Select
                                        options={[
                                        { value: 'GYMNASIUMS', label: 'GYMNASIUMS' },
                                        { value: 'LYCEUMS', label: 'LYCEUMS' },
                                        { value: 'INTERNATIONAL', label: 'INTERNATIONAL' },
                                        { value: 'SPECIALIZED', label: 'SPECIALIZED' },
                                        { value: 'GENERAL', label: 'GENERAL' },
                                        { value: 'BOARDING', label: 'BOARDING' },
                                        ]}
                                        style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeholder={'Type Of School'}/>
                                </Form.Item>
                                <Form.Item name={'status'}>
                                    <Select
                                        options={[
                                            { value: 'STATE', label: 'STATE' },
                                            { value: 'MUNICIPAL', label: 'MUNICIPAL' },
                                            { value: 'PRIVATE', label: 'PRIVATE' },
                                        ]}
                                        style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeholder={'Status'}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button style={{borderRadius:'80px', width:'100%'}} type={'primary'} onClick={() => handleClick()}>
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Modal>
    );
};

export default AddSchoolModal;
