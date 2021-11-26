import React, { useState, useEffect } from 'react';
import Imovel from '../backend/DTO/dtos';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useNavigate, useParams } from 'react-router';

//npm i react-toastify
//https://wbruno.com.br/html/validando-formularios-apenas-com-html5/

export default function PaginaCadastro() {
    let navigate = useNavigate();
    const [dados, setDados] = useState<Imovel[]>();
    const [Id, setId] = useState('0');

    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [endereco, setEndereco] = useState('');

    const [iId, setiId] = useState('');
    const [espaco, setEspaco] = useState('');
    const [label, setLabel] = useState('');
    const [nHospedes, setnHospedes] = useState(0);
    const [nQuartos, setnQuartos] = useState(0);
    const [nCamas, setnCamas] = useState(0);
    const [nBanheiros, setnBanheiros] = useState(0);
    const [arCond, setArcond] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [cozinha, setCozinha] = useState(false);
    const [freeParking, setFreeParking] = useState(false);
    const [piscina, setPiscina] = useState(false);
    const [pricePerNight, setPerNight] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [lugar, setLugar] = useState({ cidade: cidade, estado: estado, endereco: endereco });
    const [taxaDeServico, setTaxaDeServico] = useState<{ cobra: boolean, valor: number | undefined }>({ cobra: false, valor: undefined });
    const [taxaDeLimpeza, setTaxaDeLimpeza] = useState<{ cobra: boolean, valor: number | undefined }>({ cobra: false, valor: undefined });
    const [photo, setphoto] = useState('');

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(false);
    const [url, setUrl] = useState('http://localhost:5000/');
    const [urlInsertUpdate, setUrlInsertUpdate] = useState('https://ws-airbnbclone-1226.herokuapp.com');
    const [search, setSearch] = useState('');

    const success = () => toast.success('Dados enviados!');
    const error = () => toast.error('Não foi possível!');
    const waiting = () => toast.info('Carregando...');

    useEffect(() => {
        async function consulta() {
            setErro(false);
            setCarregando(true);
            try {
                const resultado = await fetch(url);
                if (resultado.ok) {
                    const dados: Imovel[] = await resultado.json();
                    setDados(dados);
                    console.log(dados);
                } else {
                    setErro(true);
                }
            } catch (error) {
                setErro(true);
            }
            setCarregando(false);
        }
        consulta();
    }, [url]);

    useEffect(() => {
        async function insertUpdate() {
            setErro(false);
            setCarregando(true);
            try {
                const post: Imovel = {
                    iId: iId,
                    espaco: espaco,
                    label: label,
                    nHospedes: nHospedes,
                    nQuartos: nQuartos,
                    nCamas: nCamas,
                    nBanheiros: nBanheiros,
                    arCond: arCond,
                    wifi: wifi,
                    cozinha: cozinha,
                    freeParking: freeParking,
                    piscina: piscina,
                    pricePerNight: pricePerNight,
                    descricao: descricao,
                    lugar: lugar,
                    taxaDeServico: taxaDeServico,
                    taxaDeLimpeza: taxaDeLimpeza,
                    photo: photo
                };
                const resposta = await fetch(urlInsertUpdate, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post)
                });
                if (resposta.ok) {
                    const dadosjson: Imovel = await resposta.json();
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
        }
        insertUpdate();
    }, [urlInsertUpdate]);

    return (
        <div className="abulebule">
            <hr />
            <form className='pocoyo'>
                <div className='texto'>
                    Espaço:
                </div>
                <input
                    type="text"
                    name="espaco"
                    className="form-control"
                    onChange={(event) => {
                        setEspaco(event.target.value);
                    }}
                    required
                    pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Label:
                </div>
                <input
                    type="text"
                    name="Label"
                    className="form-control"
                    onChange={(event) => {
                        setLabel(event.target.value);
                    }}
                    required
                    pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Descrição:
                </div>
                <input
                    type="text"
                    name="descricao"
                    className="form-control"
                    onChange={(event) => {
                        setDescricao(event.target.value);
                    }}
                    required
                    pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Url da Foto:
                </div>
                <input
                    type="text"
                    name="Label"
                    className="form-control"
                    onChange={(event) => {
                        setphoto(event.target.value);
                    }}
                    required />
            </form>
            <form className='pocoyo'>
                <a href="#" className="card-link"><img src={photo} width="98%" height="320px" /></a>
            </form>

            <hr />
            <form className='pocoyo'>
                <div className='texto'>
                    Hóspedes:
                </div>
                <input
                    type="text"
                    name="nhospedes"
                    className="form-control"
                    onChange={(event) => {
                        setnHospedes(parseInt(event.target.value));
                    }}
                    required
                    pattern="[0-9]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Quartos:
                </div>
                <input
                    type="text"
                    name="nquartos"
                    className="form-control"
                    onChange={(event) => {
                        setnQuartos(parseInt(event.target.value));
                    }}
                    required
                    pattern="[0-9]+$" />
                <div className="valid-feedback">
                    Ok!
                </div>
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Camas:
                </div>
                <input
                    type="text"
                    name="ncamas"
                    className="form-control"
                    onChange={(event) => {
                        setnCamas(parseInt(event.target.value));
                    }}
                    required
                    pattern="[0-9]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Banheiros:
                </div>
                <input
                    type="text"
                    name="nbanheiros"
                    className="form-control"
                    onChange={(event) => {
                        setnBanheiros(parseInt(event.target.value));
                    }}
                    required
                    pattern="[0-9]+$" />
            </form>
            <hr />
            <div className='oferecimentosCadastro'>
                <label className="oferecimentosLabel">
                    Ar Condicionado
                </label>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        onChange={(event) => {
                            setArcond(!arCond);
                        }}
                    />
                </div>
                <label className="possui">
                    {arCond && (<b>Possui!</b>)}
                </label>
            </div>
            <div className='oferecimentosCadastro'>
                <label className="oferecimentosLabel">
                    Wifi
                </label>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        onChange={(event) => {
                            setWifi(!wifi);
                        }}
                    />
                </div>
                <label className="possui">
                    {wifi && (<b>Possui!</b>)}
                </label>
            </div>
            <div className='oferecimentosCadastro'>
                <label className="oferecimentosLabel">
                    Cozinha
                </label>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        onChange={(event) => {
                            setCozinha(!cozinha);
                        }}
                    />
                </div>
                <label className="possui">
                    {cozinha && (<b>Possui!</b>)}
                </label>
            </div>
            <div className='oferecimentosCadastro'>
                <label className="oferecimentosLabel">
                    Estacionamento
                </label>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        onChange={(event) => {
                            setFreeParking(!freeParking);
                        }}
                    />
                </div>
                <label className="possui">
                    {freeParking && (<b>Possui!</b>)}
                </label>
            </div>
            <div className='oferecimentosCadastro'>
                <label className="oferecimentosLabel">
                    Piscina
                </label>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        onChange={(event) => {
                            setPiscina(!piscina);
                        }}
                    />
                </div>
                <label className="possui">
                    {piscina && (<b>Possui!</b>)}
                </label>
            </div>

            <hr />
            <form className='pocoyo'>
                <div className='texto'>
                    Cidade:
                </div>
                <input
                    type="text"
                    name="lugar"
                    className="form-control"
                    onChange={(event) => {
                        setCidade(event.target.value);
                        setLugar({ cidade: cidade, estado: estado, endereco: endereco });
                    }}
                    required
                    pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Estado:
                </div>
                <input
                    type="text"
                    name="estado"
                    className="form-control"
                    onChange={(event) => {
                        setEstado(event.target.value);
                        setLugar({ cidade: cidade, estado: estado, endereco: endereco });
                    }}
                    required
                    pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Endereço:
                </div>
                <input
                    type="text"
                    name="endereco"
                    className="form-control"
                    onChange={(event) => {
                        setEndereco(event.target.value);
                        setLugar({ cidade: cidade, estado: estado, endereco: endereco });
                    }}
                    required
                    pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
            </form>
            <hr />
            <form className='pocoyo'>
                <div className='texto'>
                    Cobra:
                </div>
                <input
                    type="text"
                    name="cobra"
                    className="form-control"
                    // onChange={(event) => {
                    //     setCobraS(Boolean(event.target.value));
                    //     setTaxaDeServico({ cobra: cobraS, valorPerDay: valorPerDay });
                    // }}
                    required
                    pattern="[0-9]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Valor por Dia:
                </div>
                <input
                    type="text"
                    name="valorperday"
                    className="form-control"
                    // onChange={(event) => {
                    //     setValorPerDay(parseInt(event.target.value));
                    //     setTaxaDeServico({ cobra: cobraS, valorPerDay: valorPerDay });
                    // }}
                    required
                    pattern="[0-9]+$" />
            </form>
            <hr />
            <form className='pocoyo'>
                <div className='texto'>
                    Cobra:
                </div>
                <input
                    type="text"
                    name="cobra"
                    className="form-control"
                    // onChange={(event) => {
                    //     setCobraT(Boolean(event.target.value));
                    //     setTaxaDeLimpeza({ cobra: cobrat, valor: valor });
                    // }}
                    required
                    pattern="[0-9]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Valor:
                </div>
                <input
                    type="text"
                    name="valor"
                    className="form-control"
                    // onChange={(event) => {
                    //     setValor(parseInt(event.target.value));
                    //     setTaxaDeLimpeza({ cobra: cobrat, valor: valor });
                    // }}
                    required
                    pattern="[0-9]+$" />
            </form>
            <form className='pocoyo'>
                <div className='texto'>
                    Price Per Night:
                </div>
                <input
                    type="text"
                    name="pricepernight"
                    className="form-control"
                    onChange={(event) => {
                        setPerNight(parseInt(event.target.value));
                    }}
                    required
                    pattern="[0-9]+$" />
            </form>
            <hr />
            <button
                className='btn btn-success'
                type="submit">
                Salvar</button><button
                    className='btn btn-danger'
                    type="reset">
                Limpar
            </button>
        </div>
    );
}


