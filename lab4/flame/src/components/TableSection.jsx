import React from 'react';
import { Table } from 'antd';

const TableSection = () => {
  const columns = [
    { title: 'Lorem, ipsum dolor.', dataIndex: 'col1', key: 'col1' },
    { title: 'Quaerat, praesentium earum!', dataIndex: 'col2', key: 'col2' },
    { title: 'Incidunt, odio molestias?', dataIndex: 'col3', key: 'col3' },
    { title: 'Laboriosam, delectus sapiente.', dataIndex: 'col4', key: 'col4' }
  ];

  const data = Array.from({ length: 5 }).map((_, i) => ({
    key: i,
    col1: 'Lorem, ipsum dolor.',
    col2: 'Neque, temporibus ipsa?',
    col3: 'Illum, tempora atque!',
    col4: 'Dicta, molestiae voluptatum.'
  }));

  return (
    <section className="table-wrapper" id="table">
      <h2>Table</h2>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          size="middle"
        />
      </div>
    </section>
  );
};

export default TableSection;
