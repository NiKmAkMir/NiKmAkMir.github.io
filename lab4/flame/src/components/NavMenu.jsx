import React from 'react';
import { Dropdown, Menu, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const NavMenu = () => {
  const menuItems = (
    <Menu
      items={[
        { key: '1', label: <a href="#links">Links</a> },
        { key: '2', label: <a href="#table">Table</a> },
        { key: '3', label: <a href="#form">Form</a> },
      ]}
      className="dropdown-content"
    />
  );

  return (
    <nav className="main-nav">
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col>
          <Dropdown menu={menuItems} trigger={['hover']}>
            <a onClick={(e) => e.preventDefault()} className="nav-el dropbtn">
              Navigation <DownOutlined />
            </a>
          </Dropdown>
        </Col>
        <Col>
          <a href="#" className="nav-el">About</a>
        </Col>
        <Col>
          <a href="#" className="nav-el">Contacts</a>
        </Col>
      </Row>
    </nav>
  );
};

export default NavMenu;
