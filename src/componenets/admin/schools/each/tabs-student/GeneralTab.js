import React, {useEffect, useState} from 'react';
import {Card, Form, Input} from "antd";

const GeneralTab = ({general,isEditGeneral,setGeneral}) => {



    return (
            <Card style={{marginTop:'-20px'}}>
                {
                    isEditGeneral
                    ?
                     <Input.TextArea defaultValue={general} onChange={(e) => setGeneral(e.target.value)}/>
                        :
                    general!==null && general
                }
            </Card>
    );
};

export default GeneralTab;
