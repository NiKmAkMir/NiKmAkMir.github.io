import React from 'react';
import { Layout, Row, Col, Grid, Space } from 'antd';
import HeaderBar from './components/HeaderBar';
import LinksSection from './components/LinksSection';
import TableSection from './components/TableSection';
import FormSection from './components/FormSection';
import FooterBar from './components/Footer';
import './App.css';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const App = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Layout className="back">
      <Space size="large" direction="vertical">
        <HeaderBar />
        <Content className="container site-content">
          <Row gutter={[24, 24]}>
            {isMobile ? (
              <>
                <Col span={24}><TableSection /></Col>
                <Col span={24}><LinksSection /></Col>
              </>
            ) : (
              <>
                <Col span={24}><LinksSection /></Col>
                <Col span={24}><TableSection /></Col>
              </>
            )}
          </Row>

          <Row>
            <Col span={24}><FormSection /></Col>
          </Row>
        </Content>

        <FooterBar />
      </Space>
    </Layout>
  );
};

export default App;
