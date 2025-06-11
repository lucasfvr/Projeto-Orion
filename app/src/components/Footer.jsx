import React from 'react';
import discordIcon from '../assets/ico/discordia.png';
import facebookIcon from '../assets/ico/facebook.png';
import instagramIcon from '../assets/ico/instagram.png';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Sobre</h3>
                    <ul>
                        <li><a href="#">Nossa Empresa</a></li>
                        <li><a href="#">Carreiras</a></li>
                        <li><a href="#">Investidores</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Produtos</h3>
                    <ul>
                        <li><a href="#">Orion Pass</a></li>
                        <li><a href="#">Jogos Disponíveis</a></li>
                        <li><a href="#">Futuras Adições</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Suporte</h3>
                    <ul>
                        <li><a href="#">Ajuda e Suporte</a></li>
                        <li><a href="#">Fale Conosco</a></li>
                        <li><a href="#">Serviços</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Nos siga</h3>
                    <ul className="social-links">
                        <li><a href="#"><img src={discordIcon} alt="discord" className="social-icon" /></a></li>
                        <li><a href="#"><img src={facebookIcon} alt="facebook" className="social-icon" /></a></li>
                        <li><a href="#"><img src={instagramIcon} alt="instagram" className="social-icon" /></a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Orion. Todos os direitos reservados.</p>
                <div className="footer-legal">
                    <a href="#">Privacidade</a>
                    <span className="separator">|</span>
                    <a href="#">Termos de Serviço</a>
                    <span className="separator">|</span>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;