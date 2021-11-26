import React, { useState, useEffect } from 'react';
import Imovel from '../backend/DTO/dtos';
import fetch from 'node-fetch';
import { Button, ButtonGroup, Container, Col } from 'react-bootstrap';
import { useNavigate, Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';

export default function PaginaPrincipal() {
    const [dados, setDados] = useState<Array<Imovel>>();
    const [url, setUrl] = useState(process.env.URL!);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(false);
    const [elements, setElements] = useState<Array<JSX.Element>>([]);
    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        async function consultarWebServer() {
            setErro(false);
            setCarregando(true);
            try {
                const resultado = await fetch(`http://localhost:5000/estado/${params.estado}`);
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
    }, [params]);

    useEffect(() => {
        function Elements(dados: Array<Imovel>) {
            let element = [];
            for (let i of dados) {
                    element.push(
                        <>
                            <Container className="ImovelContainer">
                                <Button
                                    variant="light"
                                    onClick={() => {
                                        navigate(`/imovel/${i.iId}`)
                                    }}>
                                         <img src={`/images/${i.photo}`} alt="" className="ImageButton"/>
                                    <Col className="ImovelButton">
                                        <div>Espaço inteiro: {i.espaco}</div>
                                        <h6>{i.label}</h6>
                                        <div>
                                            {i.nHospedes} hóspedes • {i.nQuartos} quartos • {i.nCamas} camas • {i.nBanheiros} banheiros
                                        </div>
                                        <div> ~~~~ </div>
                                        <div>{i.arCond && (" • Ar Condicionado • ")}{i.wifi && ("Wifi • ")} {i.cozinha && ("Cozinha • ")} {i.freeParking && ("Estacionamento Gratuito • ")} </div>
                                        <div> ~~~~ </div>
                                        <h5>R${i.pricePerNight} / Noite</h5>
                                    </Col>
                                </Button>
                            </Container>

                        </>
                    );
            }

            setElements(element);
        }

        Elements(dados || []);
    }, [dados]);

    return (
        <>
           
            {erro && <div>Ocorreu um erro!</div>}
            {carregando ? (
                <div>Carregando...</div>
            ) : (
                dados && (<div> <ButtonGroup vertical> {elements} </ButtonGroup></div>)
            )}
        </>
    );
}