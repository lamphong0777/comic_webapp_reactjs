import axios from "axios";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import {Link, useNavigate} from "react-router-dom";
import "./Header.css";
import {Button, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const navigate = useNavigate();
    const [getData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeKey, setActiveKey] = useState('home');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://otruyenapi.com/v1/api/the-loai`
                );
                setData(response.data);
                setLoading(false);
                // console.log(response.data);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setActiveKey('home');
    }, [setActiveKey]);

    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const query = formData.get("keyword");
        navigate(`/search?query=${query}`)
    }

    if (loading) {
        return "";
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary p-3" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" onClick={() => {
                    setActiveKey('home')
                }} className={'comic-logo'}>
                    Truyện tranh
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0"
                         style={{maxHeight: '100px'}}
                         navbarScroll>
                        <Nav.Link as={Link} to="/" className={`${activeKey === 'home' ? 'active' : ''}`}
                                  onClick={() => {
                                      setActiveKey('home')
                                  }}>
                            Trang chủ
                        </Nav.Link>
                        <Nav.Link as={Link} to="/list/dang-phat-hanh"
                                  className={`${activeKey === 'ongoing' ? 'active' : ''}`}
                                  onClick={() => {
                                      setActiveKey('ongoing')
                                  }}>
                            Đang phát hành
                        </Nav.Link>
                        <Nav.Link as={Link} to="/list/hoan-thanh"
                                  className={`${activeKey === 'completed' ? 'active' : ''}`}
                                  onClick={() => {
                                      setActiveKey('completed')
                                  }}>
                            Hoàn Thành
                        </Nav.Link>
                        <Nav.Link as={Link} to="/list/sap-ra-mat"
                                  className={`${activeKey === 'commingsoon' ? 'active' : ''}`}
                                  onClick={() => {
                                      setActiveKey('commingsoon')
                                  }}>
                            Sắp ra mắt
                        </Nav.Link>

                        <NavDropdown title="Thể loại" id="navbarScrollingDropdown">
                            <div className="row">
                                {getData.data.items && getData.data.items.length > 0
                                    ? getData.data.items.map((item, index) => (
                                        <div className="col-md-3" key={index}>
                                            <NavDropdown.Item
                                                as={Link}
                                                to={`/category/${item.slug}`}
                                            >
                                                {item.name}
                                            </NavDropdown.Item>
                                        </div>
                                    ))
                                    : "Thể loại"}
                            </div>
                        </NavDropdown>
                        <Form autoComplete="off" method="get" onSubmit={handleSearch}>
                            <Row className="align-items-center p-0 m-0">
                                <Col xs="auto" className="pe-0">
                                    <Form.Control
                                        type="text"
                                        name="keyword"
                                        placeholder="Tìm kiếm truyện tranh..."
                                        className="mr-sm-2"
                                        required={true}
                                    />
                                </Col>
                                <Col className="ps-1">
                                    <button type="submit" className={'search-button text-dark'}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className={'icon'} />
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default Header;
