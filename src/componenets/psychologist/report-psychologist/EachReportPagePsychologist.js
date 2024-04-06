import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, notification } from 'antd';
import axios from 'axios';
import { Base_URL } from "../../../constant";

const { Title } = Typography;

const EachReportPagePsychologist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState({});
  const profileId = localStorage.getItem('id'); 
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`${Base_URL}/psychologist/reports/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}`},
        });
        setReport(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'An error occurred while fetching the report.',
        });
      }
    };
    
    fetchReport();
  }, [id]);

  const handleTakeToWork = async () => {
    try {
      const response = await axios.put(`${Base_URL}/reports/${id}`, {
        workedById: profileId,
        action: 'IN_WORK',
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setReport({ ...report, status: 'IN_WORK', workedById: profileId });
      notification.success({
        message: 'Report Taken',
        description: 'You have taken the report to work.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while taking the report to work.',
      });
    }
  };

  const handleFinishWork = async () => {
    if (report.workedById !== profileId) {
      notification.error({
        message: 'Unauthorized',
        description: 'You cannot finish work on a report you did not take.',
      });
      return;
    }

    try {
      const response = await axios.put(`${Base_URL}/reports/${id}/finish-work`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
        action: 'FINISHED'
      });

      setReport({ ...report, status: 'FINISHED' });
      notification.success({
        message: 'Report Finished',
        description: 'You have finished the work on the report.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while finishing the report.',
      });
    }
  };

  return (
    <div>
      <Title level={2}>Report Details</Title>
      {/* ... детали отчета ... */}
      <Button
        type={report.status === 'IN_REQUEST' ? 'primary' : 'default'}
        onClick={report.status === 'IN_REQUEST' ? handleTakeToWork : handleFinishWork}
      >
        {report.status === 'IN_REQUEST' ? 'Take to Work' : 'Finish'}
      </Button>
    </div>
  );
};

export default EachReportPagePsychologist;
