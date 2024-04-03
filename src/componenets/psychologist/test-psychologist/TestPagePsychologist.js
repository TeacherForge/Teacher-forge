import React, { useState } from 'react';
import { Table, Tag, Space, Typography } from 'antd';

const { Title } = Typography;

const TestsPage = () => {
  // Здесь должен быть ваш стейт и функции для обработки данных, которые обычно вы получаете с бэкенда
  const accessToken = localStorage.getItem('accessToken');
  const columns = [
    {
      title: 'Who created',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: 'Created date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Addressed',
      dataIndex: 'addressed',
      key: 'addressed',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = 'geekblue';
        if (status === 'ANSWERED') {
          color = 'green';
        } else if (status === 'SEND') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const data = [
    // Пример данных
    {
      key: '1',
      creator: 'Saken A.R',
      date: '16/04/2024 16:04',
      title: 'Biology',
      addressed: 'Imangali L.O',
      status: 'SEND',
    },
    // Добавьте дополнительные данные
  ];

  return (
    <div>
      <button>Create test</button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TestsPage;
