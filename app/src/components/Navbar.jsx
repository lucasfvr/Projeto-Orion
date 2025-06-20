import React, { useState, useEffect } from "react";
import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Image,
    Form,
    Offcanvas,
    Modal,
    Button
} from "react-bootstrap";
import logo from "../assets/ico/Orion-logo-desenho.ico";
import profileIcon from "../assets/imagens/iconlogin5.png";

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house mb-1" viewBox="0 0 16 16">
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
    </svg>
);
const ControllerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-controller mb-1" viewBox="0 0 16 16">
        <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z" />
        <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27" />
    </svg>
);
const RocketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-rocket-takeoff" viewBox="0 0 16 16">
        <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532" />
        <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z" />
        <path d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z" />
    </svg>
);

export default function OrionNavbar() {
    const [usuario, setUsuario] = useState(null);
    const [perfil, setPerfil] = useState({ name: "Perfil", img: profileIcon });
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem("UsuarioLogado");
        if (userStr) {
            const userObj = JSON.parse(userStr);
            setUsuario(userObj);
            const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
            const perfilAtual = profiles.find(
                p => p.email === userObj.usuario || p.name === userObj.usuario
            );
            setPerfil({
                name: perfilAtual?.name || "Perfil",
                img: perfilAtual?.img || profileIcon,
            });
        } else {
            setUsuario(null);
            setPerfil({ name: "Perfil", img: profileIcon });
        }
    }, []);

    const handleNavClick = (e, page) => {
        const current = window.location.pathname.replace(/\\/g, '/').toLowerCase();
        if (
            (page === 'home' && current.endsWith('/index.html')) ||
            (page === 'biblioteca' && current.endsWith('/biblioteca.html')) ||
            (page === 'orionpass' && (current.endsWith('/orionpass.html') || current.endsWith('/orionpass/')))
        ) {
            e.preventDefault();
        }
    };

    const handleShowLogoutModal = () => setShowLogoutModal(true);
    const handleCloseLogoutModal = () => setShowLogoutModal(false);

    const handleLogout = () => {
        setShowLogoutModal(false);
        setTimeout(() => {
            localStorage.removeItem("UsuarioLogado");
            setUsuario(null);
            setPerfil({ name: "Perfil", img: profileIcon });
            window.location.href = "/index.html";
        }, 1000);
    };

    return (
        <>
            <Navbar expand="xxl" fixed="top" variant="dark" className="p-2">
                <Container fluid>
                    <Navbar.Brand href="/index.html" className="fs-1 text">
                        <img src={logo} alt="Logo" width="70" height="70" className="d-inline-block align-text" />
                        {" "}ORION
                    </Navbar.Brand>

                    <div className="d-xxl-block d-none">
                        <Nav className="text-center">
                            <Nav.Link href="index.html" active onClick={e => handleNavClick(e, 'home')}>
                                <HomeIcon /> Home
                            </Nav.Link>
                            <Nav.Link href="biblioteca.html" onClick={e => handleNavClick(e, 'biblioteca')}>
                                <ControllerIcon /> Biblioteca de Jogos
                            </Nav.Link>
                            <Nav.Link href="orionpass.html" className="text-primary-emphasis" onClick={e => handleNavClick(e, 'orionpass')}>
                                <RocketIcon /> Orion Pass
                            </Nav.Link>
                        </Nav>
                    </div>

                    <div className="d-none d-xxl-block">
                        <Form className="d-flex mt-1 align-items-center" role="search">
                            <Form.Control className="me-2" type="search" placeholder="Buscar" aria-label="Search" />
                            <Button variant="outline-primary" type="submit">Buscar</Button>
                            {usuario && (
                                <NavDropdown
                                    className="perfilnav perfil ms-2"
                                    title={
                                        <Image
                                            src={perfil.img}
                                            alt={perfil.name}
                                            width="60"
                                            height="60"
                                            roundedCircle
                                            className="imgperfilnav"
                                        />
                                    }
                                    id="perfil-dropdown-desktop"
                                    align="end"
                                >
                                    <NavDropdown.Item href="escolhaoperfil.html">Perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="minhalista.html">Minha lista</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleShowLogoutModal}>Sair</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Form>
                    </div>

                    <Navbar.Toggle
                        aria-controls="offcanvasNavbar"
                        className="d-block d-xxl-none"
                        onClick={() => setShowOffcanvas(true)}
                    />
                    <Offcanvas
                        show={showOffcanvas}
                        onHide={() => setShowOffcanvas(false)}
                        placement="end"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="text-light" id="offcanvasNavbarLabel">
                                ORION
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {usuario && (
                                    <NavDropdown
                                        className="perfilDrop"
                                        title={
                                            <span>
                                                <Image
                                                    src={perfil.img}
                                                    alt={perfil.name}
                                                    width="50"
                                                    height="50"
                                                    roundedCircle
                                                    className="imgperfilmenu"
                                                />{" "}
                                                {perfil.name}
                                            </span>
                                        }
                                        id="perfil-dropdown-mobile"
                                        align="end"
                                    >
                                        <NavDropdown.Item href="escolhaoperfil.html">Perfil</NavDropdown.Item>
                                        <NavDropdown.Item href="minhalista.html">Minha Lista</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {
                                            setShowOffcanvas(false);
                                            handleShowLogoutModal();
                                        }}>Sair</NavDropdown.Item>
                                    </NavDropdown>
                                )}
                                <Nav.Link href="index.html" onClick={e => handleNavClick(e, 'home')}>
                                    <HomeIcon /> Home
                                </Nav.Link>
                                <Nav.Link href="biblioteca.html" onClick={e => handleNavClick(e, 'biblioteca')}>
                                    <ControllerIcon /> Biblioteca de Jogos
                                </Nav.Link>
                                <Nav.Link href="orionpass.html" className="text-primary-emphasis" onClick={e => handleNavClick(e, 'orionpass')}>
                                    <RocketIcon /> Orion Pass
                                </Nav.Link>
                            </Nav>
                            <Form className="d-flex mt-3" role="search">
                                <Form.Control className="me-2" type="search" placeholder="Buscar" aria-label="Search" />
                                <Button variant="outline-primary" type="submit">Buscar</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Container>
            </Navbar>

            <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de Saída</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Já vai? A masmorra final ainda nem foi explorada! Tem certeza que quer sair??
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogoutModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Sair
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}