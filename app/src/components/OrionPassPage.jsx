import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import logo from '../assets/ico/Orion-logo-desenho.ico';
import zeldaImg from '../assets/imagens/zelda.png';
import godOfWarImg from '../assets/imagens/god of war 1.png';
import eldenRingImg from '../assets/imagens/Elden Ring.png';
import wukongImg from '../assets/imagens/Black Myth Wukong.jpg';

function OrionPassPage() {
    return (
        <main style={{ marginTop: '120px', marginBottom: '100px' }}>
            <Container>
                <Row className="align-items-center g-3">
                    <Col lg={7} className="text-start">
                        <Image src={logo} alt="Logo do Orion Pass" width="150" className="mb-3" />

                        <h2 className="display-4 fw-bold">ORION PASS</h2>

                        <p className="lead">
                            Seja o primeiro a jogar novos jogos no primeiro dia. Explore uma vasta biblioteca de jogos e, eventualmente, emule esses jogos na nuvem em alto desempenho.
                        </p>

                        <Button href="#pagamento" className="btn-lg btn-orion-assinar mt-3">
                            ASSINE AGORA
                        </Button>

                        <p className="display-1 fw-bolder mt-3">R$39,90/mês</p>

                        <h4 className="mt-4 fw-light">DESCUBRA SEU PRÓXIMO JOGO FAVORITO</h4>
                    </Col>

                    <Col lg={5}>
                        <Row>
                            <Col xs={6} className="mb-4">
                                <Image src={zeldaImg} alt="Capa do jogo Zelda" fluid rounded />
                            </Col>
                            <Col xs={6} className="mb-4">
                                <Image src={godOfWarImg} alt="Capa do jogo God of War" fluid rounded />
                            </Col>
                            <Col xs={6} className="mb-4">
                                <Image src={eldenRingImg} alt="Capa do jogo Elden Ring" fluid rounded />
                            </Col>
                            <Col xs={6} className="mb-4">
                                <Image src={wukongImg} alt="Capa do jogo Black Myth Wukong" fluid rounded />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
export default OrionPassPage;