import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import "./HeaderBar.css";

const { Header } = Layout;

const HeaderBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Header className={`site-header ${mobileOpen ? "expanded" : ""}`}>
      <div className="container-header">
        <Row className="header-inner">
          <Col>
            <div className="logo">
              <a href="/">
                <img src={logo} alt="Logo" />
              </a>
              <h2>Flame</h2>
            </div>
          </Col>
          <Col>
            <NavMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          </Col>
        </Row>
      </div>
    </Header>
  );
};


export default HeaderBar;

const NavMenu = ({ mobileOpen, setMobileOpen }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handleChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", handleChange);
    else mq.addListener(handleChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handleChange);
      else mq.removeListener(handleChange);
    };
  }, []);

  const dropdownItems = [
    { key: "links", label: <a href="#links">Links</a> },
    { key: "table", label: <a href="#table">Table</a> },
    { key: "form", label: <a href="#form">Form</a> },
  ];

  return (
    <nav className="main-nav">
      {!isMobile && (
        <Row gutter={[16, 0]} wrap={false}>
          <Col>
            <Dropdown
              menu={{ items: dropdownItems }}
              trigger={["hover"]}
              placement="bottomLeft"
              getPopupContainer={(trigger) => trigger.parentNode}
            >
              <a className="nav-el dropbtn" tabIndex={0}>
                Navigation <DownOutlined />
              </a>
            </Dropdown>
          </Col>
          <Col><a href="#about" className="nav-el">About</a></Col>
          <Col><a href="#contacts" className="nav-el">Contacts</a></Col>
        </Row>
      )}

      {isMobile && (
        <div className="mobile-nav-wrap">
          <button
            className="dropbtn mobile-toggle"
            onClick={() => setMobileOpen((s) => !s)}
          >
            Navigation <DownOutlined />
          </button>
          <div className="mobile-dropdown">
            <a href="#links">Links</a>
            <a href="#table">Table</a>
            <a href="#form">Form</a>
          </div>
          <div className="mobile-links">
            <a href="#about" className="nav-el">About</a>
            <a href="#contacts" className="nav-el">Contacts</a>
          </div>
        </div>
      )}
    </nav>
  );
};
