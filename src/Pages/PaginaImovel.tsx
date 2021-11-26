import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Imovel, {Locacao} from '../backend/DTO/dtos';
import fetch from 'node-fetch';
import { Container, Button, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';
import { multiplica } from '../backend/useful/multiplicar';


export default function PaginaImovel() {
    const hoje = new Date();
    const params = useParams();
    const navigate = useNavigate();
    const Idparams = parseInt(params.id!);
    const [dados, setDados] = useState<Array<Imovel>>();
    const [url, setUrl] = useState(process.env.URL!);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(false);

    const [idImovel, SetIdImovel] = useState(Idparams);
    const [checkin,setCheckin] = useState(new Date());
    const [checkout,setCheckout] = useState(new Date());
    const [nome,setNome] = useState('');
    const [telefone,setTelefone] = useState(0);
    const [email, setEmail] = useState('');
    const [total, setTotal]= useState(0);


    let diasReserva = 3;

    useEffect(() => {
        async function consultarWebServer() {
            setErro(false);
            setCarregando(true);
            try {
                const resultado = await fetch(`http://localhost:5000/imovel/${params.id}`);
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

    async function CriarReserva() {
        setErro(false);
        setCarregando(true);
        try {
          const post: Locacao = {
          idImovel:  idImovel,
          checkin:   checkin,
          checkout:  checkout,
          nome:      nome,
          telefone:  telefone,
          email:     email,
          total:    total
        };
        const resposta = await fetch('http://localhost:3000/locacao/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if (resposta.ok) {
            const dadosjson: Locacao = await resposta.json();
            console.log('Dados:');
            console.log(dadosjson);
            
        } else {
            console.log('POST status:', resposta.status);
            console.log('POST statusText:', resposta.statusText);
            setErro(true);
        }
        } catch (error) {
          setErro(true);
        }
        setCarregando(false);
    };


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

                        <hr/>
              <div className="rightPosition">
                <p className="card-text">
                  Check-In: 
                  <input 
                    type="date" 
                    name="check-in"
                    id='checkin'
                    min={hoje.getFullYear().toString()+'-'+(hoje.getMonth()+1).toString()+'-'+hoje.getDate().toString()}
                    className= "form-control"
                    required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    onChange={(event)=>{
                    setCheckin(new Date(event.target.value));
                   }}
                   
                />
              </p>
              
              <p className="card-text">
              Check-Out:  
              <input 
                type="date" 
                name="check-out"
                min={checkin.getFullYear().toString()+'-'+(checkin.getMonth()+1).toString()+'-'+(checkin.getDate()+2).toString()}
                required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"   
                className= "form-control"
                onChange={(event)=>{
                setCheckout(new Date(event.target.value));
              }}
              />
              </p>
              <p className="card-text">
              Nome:
              <input 
                type="text" 
                name="Nome"
                placeholder="Entre com o Nome"
                className= "form-control"
                onChange={(event)=>{
                setNome(event.target.value);
               }}
               required
               />
              </p>
              <p className="card-text">
              Telefone:
              <input 
                type="Telephone" 
                name="telefone"
                placeholder="Entre com o telefone"
                className= "form-control"
                onChange={(event)=>{
                setTelefone(parseInt(event.target.value));
               }}
               required
              />
              </p>

              <p className="card-text">
              Email:
              <input 
                type="email" 
                name="email"
                placeholder="Entre com o email"
                className= "form-control"
                onChange={(event)=>{
                setEmail((event.target.value));
               }}
               required
              />
              </p>
                
              <p className="card-text">
              Total:
              <input 
                type="text" 
                name="total"
                placeholder="Calculando.."
                className= "form-control"
                onChange={(event)=>{
                setTotal(parseInt(event.target.value));
               }}
               readOnly
              />
              </p>
                <button onClick={(e=>{
                   CriarReserva();
                })}
                type="submit">Reservar</button>
                
                </div>
                        <Button className="botaolindo" variant="light" onClick={() => {
                            navigate('/');
                        }}>Voltar</Button>
                    </div>
                )
            )}
        </>
    );
}