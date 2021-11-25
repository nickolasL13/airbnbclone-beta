import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Imovel from '../backend/DTO/dtos';
import fetch from 'node-fetch';
import { Container, Button, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';
import { multiplica } from '../backend/useful/multiplicar';


export default function PaginaImovel() {
    const params = useParams();
    const navigate = useNavigate();
    const [dados, setDados] = useState<Array<Imovel>>();
    const [url, setUrl] = useState(process.env.URL!);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(false);

 

      let diasReserva = 3;


    useEffect(() => {
        async function consultarWebServer() {
            setErro(false);
            setCarregando(true);
            try {
                const resultado = await fetch(`https://ws-airbnbclone-1226.herokuapp.com/${params.id}`);
                if (resultado.ok) {
                    const dados: Array<Imovel> = await resultado.json();
                    setDados(dados);
                } else {
                    setErro(true);
                }
            } catch (error) {
                setErro(true);
            }

            setCarregando(false);
        }

        consultarWebServer();
    }, []);

    return (
        <>
            {erro && <div>Ocorreu um erro!</div>}
            {carregando ? (
                <div>Carregando...</div>
            ) : (
                dados && (
                    <div className="containerImoveis">
                        <Container>
                            <Button
                                variant="light"
                            >
                                <h6>{dados[0].lugar.endereco}, {dados[0].lugar.cidade}, {dados[0].lugar.estado}, Brasil</h6>
                                <img src={`/images/${dados[0].photo}`} alt="" className="ImageButton" />
                                <Col className="ImovelButton">
                                    <div>Espaço inteiro: {dados[0].espaco}</div>
                                    <h6>{dados[0].label}</h6>
                                    <div>
                                        {dados[0].nHospedes} hóspedes • {dados[0].nQuartos} quartos • {dados[0].nCamas} camas • {dados[0].nBanheiros} banheiros
                                    </div>
                                    <div> ~~~~ </div>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Descrição</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{dados[0].label}</Card.Subtitle>
                                            <Card.Text>
                                                {dados[0].descricao}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <h5 className="priceNight">R${dados[0].pricePerNight} / Noite</h5>
                                    <h4 className="priceTotal">R${multiplica((dados[0].pricePerNight),diasReserva)} / Total </h4>
                                    <h4> por {diasReserva} noites</h4>
                                    <h6 className="offers">O que esse lugar oferece???</h6>
                                    <div>{dados[0].arCond && (" • Ar Condicionado")}{dados[0].wifi && (" • Wifi")}{dados[0].cozinha && (" • Cozinha")}{dados[0].freeParking && (" • Estacionamento Gratuito")}{dados[0].piscina && (" • Piscina • ")} </div>
                                </Col>
                            </Button>
                        </Container>

                        <Button className="botaolindo" variant="light" onClick={() => {
                            navigate('/');
                        }}>Voltar</Button>
                    </div>
                )
            )}
        </>
    );
}