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

    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [endereco, setEndereco] = useState('');

    const [cobraS, setCobraS] = useState(false);
    const [valorPerDay, setValorPerDay] = useState(0);
    const [cobrat, setCobraT] = useState(false);
    const [valor, setValor] = useState(0);

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

    return (
        <div className="d-flex justify-content-center lista">
            <div>
                <div className="row">
                    {dados && (
                        <div>
                            <form onSubmit={event => {
                                setUrl(`https://ws-airbnbclone-1226.herokuapp.com`);
                                navigate('cadastro');
                                success();
                                event.preventDefault();
                            }}
                                className="d-flex justify-content-center form">
                                <button
                                    className='btn btn-success botaonovo'
                                    type="submit">
                                    Novo
                                </button>
                            </form>

                            <div className="d-flex justify-content-center col">
                                <div className="card" style={{ width: '80%' }}>
                                    <div className="card-body">
                                        <div className="card-caption">
                                            <table width={'98%'} className='table'>
                                                <tr>
                                                    <th scope="col">Label</th>
                                                    <th scope="col">Espaço</th>
                                                    <th scope="col">Acomodações</th>
                                                    <th scope="col">Oferecimentos</th>
                                                    <th scope="col">Ação</th>
                                                </tr>
                                                {dados.map((dados: Imovel) => {
                                                    return (
                                                        <tr className='evenRow'>
                                                            <td scope="row" className='label'>{dados.label}</td>
                                                            <td scope="row" className='espaco'>{dados.espaco}</td>
                                                            <td scope="row" className='acomodacoes'>
                                                                <div className='p'>
                                                                    {dados.nHospedes} Hóspedes
                                                                </div>
                                                                <div className='p'>
                                                                    {dados.nQuartos} Quartos
                                                                </div>
                                                                <div className='p'>
                                                                    {dados.nBanheiros} Banheiros
                                                                </div>
                                                                <div className='p'>
                                                                    {dados.nCamas} Camas
                                                                </div>

                                                            </td>
                                                            <td scope="row" className='oferecimentos'>
                                                                {(dados.arCond) && (<div className='o'> Ar Condicionado </div>)}
                                                                {(dados.wifi) && (<div className='o'> Wifi </div>)}
                                                                {(dados.cozinha) && (<div className='o'> Cozinha </div>)}
                                                                {(dados.piscina) && (<div className='o'> Piscina </div>)}
                                                                {(dados.freeParking) && (<div className='o'> Estacionamento Gratuito </div>)}

                                                            </td>
                                                            <td scope="row">
                                                                <form onSubmit={event => {
                                                                    setUrl(`https://ws-airbnbclone-1226.herokuapp.com/`);
                                                                    event.preventDefault();
                                                                }}
                                                                    style={
                                                                        {
                                                                            float: 'left',
                                                                            display: 'inline-block'
                                                                        }}>
                                                                    <button
                                                                        className='btn btn-danger botaoexcluir'
                                                                        type="submit">
                                                                        Excluir
                                                                    </button>
                                                                </form>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


