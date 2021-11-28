import React, { useState, useEffect } from 'react';
import Imovel, {Locacao} from '../backend/DTO/dtos';
import 'react-toastify/dist/ReactToastify.min.css';
import { useNavigate, useParams } from 'react-router';

export default function PaginaCadastro() {
    let navigate = useNavigate();
    const [dados, setDados] = useState<Locacao[]>();
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(false);
    const [url, setUrl] = useState('http://localhost:5000/reserva');
    const [urlInsertUpdate, setUrlInsertUpdate] = useState('http://localhost:5000/reserva');

    useEffect(() => {
        async function consulta() {
            setErro(false);
            setCarregando(true);
            try {
                const resultado = await fetch(url);
                if (resultado.ok) {
                    const dados: Locacao[] = await resultado.json();
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

    async function deleteLocacao(id: string) {
        setErro(false);
        setCarregando(true);
        try {
            const resposta = await fetch(`${urlInsertUpdate}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
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

    return (
        <div className="d-flex justify-content-center tabela">
            <div>
                <div className="row">
                    {dados && (
                        <div>
                            <div className="d-flex justify-content-center col">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-caption">
                                            <table className='table'>
                                                <tr>
                                                    <th scope="col">Check-In</th>
                                                    <th scope="col">Check-Out</th>
                                                    <th scope="col">Nome</th>
                                                    <th scope="col">Telefone</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                                {dados.map((dados: Locacao) => {
                                                    return (
                                                        <tr className='evenRow'>
                                                            <td scope="row" className='espaco'>{dados.checkin}</td>
                                                            <td scope="row" className='label'>{dados.checkout}</td>
                                                            <td scope="row" className='label'>{dados.nome}</td>
                                                            <td scope="row" className='acomodacoes'>{dados.telefone}</td>
                                                            <td scope="row" className='oferecimentos'>{dados.email}</td>
                                                            <td scope="row" className='oferecimentos'>{dados.total}</td>      
                                                                                                           
                                                            <td scope="row">
                                                                <form onSubmit={event => {
                                                                    event.preventDefault();
                                                                }}
                                                                    style={
                                                                        {
                                                                            float: 'left',
                                                                            display: 'inline-block'
                                                                        }}>
                                                                    <button
                                                                        onClick={() => {
                                                                            deleteLocacao(dados.iId);
                                                                            window.location.reload();
                                                                        }}
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


