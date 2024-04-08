import React, {useEffect, useState} from 'react';
import {Card} from "antd";

const GeneralTab = ({general}) => {
    const [data, setData] = useState(null);


    useEffect(() => {
        if (general) {
            setData(general?.general);
        }
    },[general])

    if (!general) return(<Card style={{marginTop: '-20px', textAlign: 'center'}}>Нет данных</Card>);

    return (
            general
            &&
            data!==null
            &&
            <Card style={{marginTop:'-20px'}}>
                {data}
            </Card>
    );
};

export default GeneralTab;
