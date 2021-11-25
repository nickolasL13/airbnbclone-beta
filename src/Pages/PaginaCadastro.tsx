import React, {useState, useEffect} from 'react';
//import './App.css';
import Imovel from './../backend/DTO/dtos';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { useNavigate, useParams } from 'react-router';

//npm i react-toastify
//https://wbruno.com.br/html/validando-formularios-apenas-com-html5/

export default function PaginaCadastro() {
  let navigate = useNavigate();
  const [dados, setDados] = useState<Imovel>();
  const [acao, setAcao] = useState('tabela');
  const [Id, setId] = useState('0');

  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [endereco, setEndereco] = useState('');

  const [cobraS, setCobraS] = useState(false);
  const [valorPerDay, setValorPerDay] = useState(0); 
  const [cobrat, setCobraT] = useState(false);
  const [valor, setValor]= useState(0); 
  
  const [iId, setiId] = useState('');
  const [espaco, setEspaco]= useState('');
  const [label, setLabel]= useState('');
  const [nHospedes, setnHospedes]= useState(0); 
  const [nQuartos, setnQuartos]= useState(0);
  const [nCamas, setnCamas]= useState(0);
  const [ nBanheiros, setnBanheiros]= useState(0);
  const [ arCond, setArcond]= useState(false);
  const [ wifi, setWifi]= useState(false);
  const [ cozinha, setCozinha]= useState(false);
  const [ freeParking, setFreeParking]= useState(false);
  const [piscina, setPiscina]= useState(false); 
  const [ pricePerNight, setPerNight]= useState(0);
  const [ descricao, setDescricao]= useState('');
  const [ lugar, setLugar]= useState({cidade:cidade, estado:estado, endereco:endereco}); 
  const [ taxaDeServico, setTaxaDeServico]= useState({cobra: cobraS, valorPerDay: valorPerDay}); 
  const [ taxaDeLimpeza, setTaxaDeLimpeza]= useState({cobra: cobrat, valor: valor}); 
  const [ photo, setphoto]= useState(''); 
  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const [url, setUrl] = useState(`https://ws-airbnbclone-1226.herokuapp.com`);
  const [urlInsertUpdate, setUrlInsertUpdate] = useState('https://ws-airbnbclone-1226.herokuapp.com');
  const [search, setSearch] = useState('');
  
  const success = () => toast.success('Dados enviados!');
  const error = () => toast.error('Não foi possível!');
  const waiting= ()=> toast.info('Carregando...');

  useEffect(() => { 
    async function consulta() {
       setErro(false);
       setCarregando(true);
       try {
         const resultado = await fetch(url);
         if (resultado.ok) {
           const dados: Imovel = await resultado.json();
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
   },[url]);

  useEffect(() => { 
      async function insertUpdate() {
        setErro(false);
        setCarregando(true);
        
    try {
      
    const post:Imovel ={
    iId: iId,
    espaco: espaco,
    label: label,
    nHospedes: nHospedes,  
    nQuartos: nQuartos,
    nCamas: nCamas,
    nBanheiros: nBanheiros,
    arCond:arCond,
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

    },[urlInsertUpdate]);

  return (
<>

<div className="container">
<div className="row">


{(acao=='tabela') &&
 dados && (
  

<div>
  <form onSubmit={event => {
    setUrl(`https://ws-airbnbclone-1226.herokuapp.com`);
    setAcao('inserir');
     event.preventDefault();
 }}
  >
    <button
        className='btn btn-success'
            type="submit">
            Novo
    </button>
    </form>
        
        <div className="col">
        <div className="card" style={{width: '80%'}}>
          <div className="card-body">
            <div className="card-caption">
    
    <table  width={'98%'} className='table'>
              <tr>
                <th scope="col">Espaço</th>
                <th scope="col">Label</th>
                <th scope="col">Acomodações</th>
                <th scope="col">Oferecimentos</th>
                <th scope="col">Ação</th>
              </tr>

              {dados.map((dados: Imovel) =>{

                return(
                 
                <tr className='evenRow'>
                  <td scope="row">{dados.espaco}</td>
                  <td scope="row">{dados.label}</td>
                  <td scope="row">
                  {dados.nHospedes} Hóspedes | 
                  {dados.nQuartos} Quartos | 
                  {dados.nCamas} Camas | 
                  {dados.nBanheiros} Banheiros
                  </td>
                  <td scope="row">
                  {dados.arCond} Ar Condicionado | 
                  {dados.wifi} Wifi | 
                  {dados.cozinha} Cozinha | 
                  {dados.freeParking} Estacionamento | 
                  {dados.piscina} Piscina
                  </td>
                  <td scope="row">
                  
                  <button
                    className='btn btn-warning'
                    
                    onClick={() => {
                      navigate(`/cadastroEdicao/${dados.iId}`);
                   }}>
                    Editar
                  
                  </button>
                  
                  <form onSubmit={event => {
                      setAcao('tabela')
                      setUrl(`https://ws-airbnbclone-1226.herokuapp.com/`);
                      event.preventDefault();
                  }}
                  
                  style={
                  { 
                    float: 'left' , 
                    display: 'inline-block'
                  }}
                   >
                  
                  <button
                    className='btn btn-danger'
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
      )
}


{(acao=='inserir') && (
  <><form onSubmit={event => {
                          setAcao('tabela');
                          setUrlInsertUpdate(`https://ws-airbnbclone-1226.herokuapp.com/`);
                          <ToastContainer>
                              success();
                          </ToastContainer>
                          event.preventDefault();
                      } }>

                          <div className="col">
                              <div className="card" style={{ width: '80%' }}>
                                  <div className="card-body">
                                      <div className="card-caption">


                                          <p className="form-control">
                                              iId:
                                              <input
                                                  type="text"
                                                  name="iId"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setiId(event.target.value);
                                                  } }
                                                  required />
                                          </p>

                                          <p className="form-control">
                                              Espaço:
                                              <input
                                                  type="text"
                                                  name="espaco"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setEspaco(event.target.value);
                                                  } }
                                                  required
                                                  pattern="[a-zA-Záãâéêíîóôõú\s]+$" />

                                          </p>

                                          <p className="form-control">
                                              Label:
                                              <input
                                                  type="text"
                                                  name="Label"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setLabel(event.target.value);
                                                  } }
                                                  required
                                                  pattern="[a-zA-Záãâéêíîóôõú\s]+$" />

                                          </p>

                                          <p className="form-control">
                                              Url da Foto:
                                              <input
                                                  type="text"
                                                  name="Label"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setphoto(event.target.value);
                                                  } }
                                                  required
                                                />

                                          </p>

                                          <p className="form-control">
                                              <a href="#" className="card-link"><img src={photo} width="98%" height="320px" /></a>
                                          </p>
                                          <hr />

                                          <p className="form-control">
                                              Hóspedes:
                                              <input
                                                  type="text"
                                                  name="nhospedes"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setnHospedes(parseInt(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                          </p>

                                          <p className="form-control">
                                              <label className="form-label">Quartos: </label>
                                              <input
                                                  type="text"
                                                  name="nquartos"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setnQuartos(parseInt(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                              <div className="valid-feedback">
                                                  Ok!
                                              </div>
                                          </p>

                                          <p className="form-control">
                                              Camas:
                                              <input
                                                  type="text"
                                                  name="ncamas"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setnCamas(parseInt(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                          </p>
                                          <p className="form-control">
                                              Banheiros:
                                              <input
                                                  type="text"
                                                  name="nbanheiros"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setnBanheiros(parseInt(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                          </p>

                                          <p className="form-control">
                                              Ar Condicionado: [1=sim/0=não]
                                              <input
                                                  type="text"
                                                  name="arcond"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setArcond(Boolean(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                          </p>
                                          <p className="form-control">
                                              wifi: [sim/não]
                                              <input
                                                  type="text"
                                                  name="wifi"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setWifi(Boolean(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                          </p>

                                          <p className="form-control">
                                              Cozinha: [sim/não]
                                              <input
                                                  type="text"
                                                  name="cozinha"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setCozinha(Boolean(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                          </p>

                                          <p className="form-control">
                                              FreeParking: [sim/não]
                                              <input
                                                  type="text"
                                                  name="freeparking"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setFreeParking(Boolean(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                          </p>


                                          <p className="form-control">
                                              Piscina: [sim/não]
                                              <input
                                                  type="text"
                                                  name="piscina"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setPiscina(Boolean(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                          </p>

                                          <p className="form-control">
                                              Price Per Night: [Ex: 100,00]
                                              <input
                                                  type="text"
                                                  name="pricepernight"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setPerNight(parseInt(event.target.value));
                                                  } }
                                                  required
                                                  pattern="[0-9]+$" />
                                          </p>

                                          <p className="form-control">
                                              Descrição: [Ex: com quarto...]
                                              <input
                                                  type="text"
                                                  name="descricao"

                                                  className="form-control"
                                                  onChange={(event) => {
                                                      setDescricao(event.target.value);
                                                  } }
                                                  required
                                                  pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
                                          </p>

                                      <hr/>
                                      <p className="form-control">
                                          Lugar: [Ex: Hotel paulista]
                                          <input
                                              type="text"
                                              name="lugar"

                                              className="form-control"
                                              onChange={(event) => {
                                                  setCidade(event.target.value);
                                                  setLugar({cidade: cidade,estado: estado, endereco: endereco});
                                              } }
                                              required
                                              pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
                                      </p>

                                      <p className="form-control">
                                          Estado: [Ex: RS]
                                          <input
                                              type="text"
                                              name="estado"

                                              className="form-control"
                                              onChange={(event) => {
                                                setEstado(event.target.value);
                                                setLugar({cidade: cidade,estado: estado, endereco: endereco});
                                              } }
                                              required
                                              pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
                                      </p>

                                      <p className="form-control">
                                          Endereço: [Ex: Rua das Flores]
                                          <input
                                              type="text"
                                              name="endereco"

                                              className="form-control"
                                              onChange={(event) => {
                                                setEndereco(event.target.value);
                                                setLugar({cidade: cidade,estado: estado, endereco: endereco});
                                              } }
                                              required
                                              pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
                                      </p>
                                <hr/>
                                  <p className="form-control">
                                      Cobra: [sim/não]
                                      <input
                                          type="text"
                                          name="cobra"

                                          className="form-control"
                                          onChange={(event) => {
                                              setCobraS(Boolean(event.target.value));
                                              setTaxaDeServico({ cobra: cobraS, valorPerDay: valorPerDay });
                                          } }
                                          required
                                          pattern="[0-9]+$" />
                                  </p>

                                  <p className="form-control">
                                      Valor por Dia: [Ex: 100,00]
                                      <input
                                          type="text"
                                          name="valorperday"

                                          className="form-control"
                                          onChange={(event) => {
                                            setValorPerDay(parseInt(event.target.value));
                                            setTaxaDeServico({ cobra: cobraS, valorPerDay: valorPerDay });
                                          } }
                                          required
                                          pattern="[0-9]+$" />
                                  </p>

                              <hr/>

                              <p className="form-control">
                                  Cobra: [sim/não]
                                  <input
                                      type="text"
                                      name="cobra"

                                      className="form-control"
                                      onChange={(event) => {
                                        setCobraT(Boolean(event.target.value));
                                        setTaxaDeLimpeza({ cobra: cobrat, valor: valor });
                                      } }
                                      required
                                      pattern="[0-9]+$" />
                              </p>

                              <p className="form-control">
                                  Valor: [Ex: 100,00]
                                  <input
                                      type="text"
                                      name="valor"

                                      className="form-control"
                                      onChange={(event) => {
                                        setValor(parseInt(event.target.value));
                                        setTaxaDeLimpeza({ cobra: cobrat, valor: valor });
                                      } }
                                      required
                                      pattern="[0-9]+$" />
                              </p>

                        <hr/>


                     
                      <button
                          className='btn btn-success'
                          type="submit">
                              Salvar</button><button
                                  className='btn btn-danger'
                                  type="reset">
                              Limpar</button>
        </div>
        </div>
      </div>
    </div>
    </form>
    </>
)}




</div>
    </div>

    </>


);
}


