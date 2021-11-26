import React, {useState, useEffect} from 'react';
import Imovel from './../backend/DTO/dtos';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { useNavigate, useParams } from 'react-router';

//npm i react-toastify
//https://wbruno.com.br/html/validando-formularios-apenas-com-html5/

export default function PaginaCadastro() {
  
  let parametros = useParams();
  let id: string = parametros.iId!;
  let navigate = useNavigate();
  const [dados, setDados] = useState<Imovel>();
  const [acao, setAcao] = useState('tabela');
  const [Id, setId] = useState(id);

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
  const [url, setUrl] = useState(`https://ws-airbnbclone-1226.herokuapp.com/${Id}`);
  const [urlInsertUpdate, setUrlInsertUpdate] = useState(`https://ws-airbnbclone-1226.herokuapp.com/${Id}`);
  const [search, setSearch] = useState('');
  
  const success = () => toast.success('Dados enviados!');
  const error = () => toast.error('Não foi possível!');
  const waiting= ()=> toast.info('Carregando...');
  const limpezaFormulario= ()=> toast.info('Formulário Limpo');

  async function putData() {
    const id: string = Id;
     const putData:Imovel ={
        iId: id,
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

      try{

        const resposta = await fetch(`https://ws-airbnbclone-1226.herokuapp.com/${Id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(putData)
      });
      if (resposta.ok) {
          const dadosjson: Imovel = await resposta.json();
          console.log('Dados:');
          console.log(dadosjson);
         success();
      } else {
          console.log('POST status:', resposta.status);
          console.log('POST statusText:', resposta.statusText);
          setErro(true);
        }

      } catch (error) {
        setErro(true);
      }
      navigate('/cadastro');
      setCarregando(false);
    }
  
  
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

    return (
        <>
          
          <div className="container">
          <div className="row">
          <form>
        {erro && <div>Não encontramos itens!</div>}
            {carregando ? (
              <div>Carregando...</div>
            ) : (
            dados && (
        
                
              <div className="col">
               <div className="card" style={{width: '80%'}}>
                <div className="card-body">
                  <div className="card-caption">   
                            <p className="form-control">
                                iId:
                                <input
                                    type="text"
                                    name="iId"
                                    value={dados.iId}
                                    className="form-control"
                                    onChange={(event) => {
                                       setiId(event.target.value);
                                    } }
                                required />
                            </p>
                            <p className="form-control">
                                Espaço: {dados.espaco}
                                <input
                                    type="text"
                                    name="espaco"
                                    value={dados.espaco}
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
                                    value={dados.label}
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
                                    value={dados.photo}
                                    className="form-control"
                                    onChange={(event) => {
                                       setphoto(event.target.value);
                                    } }
                                required/>
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
                                    value={dados.nHospedes}
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
                                    value={dados.nQuartos}
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
                                        value={dados.nCamas}
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
                                    value={dados.nBanheiros}
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
                                    value={Boolean(dados.arCond).toString()}
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
                                    value={Boolean(dados.wifi).toString()}
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
                                    value={Boolean(dados.cozinha).toString()}
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
                                    value={Boolean(dados.freeParking).toString()}
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
                                    value={Boolean(dados.piscina).toString()}
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
                                    value={dados.pricePerNight}
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
                                    value={dados.descricao}
                                    className="form-control"
                                    onChange={(event) => {
                                        setDescricao(event.target.value);
                                    } }
                                    required
                                pattern="[a-zA-Záãâéêíîóôõú\s]+$" />
                            </p>
                            <hr/>
                            <p className="form-control">
                                Cidade: [Ex: Hotel paulista]
                                    <input
                                        type="text"
                                        name="lugar"
                                        //value={//dados.lugar}
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
                                   // value={dados.lugar['estado']}
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
                                   // value={dados.lugar['endereco']}
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
                                    value={Boolean(dados.taxaDeServico).toString()}
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
                                    //value={dados.taxaDeServico['valorPerDay']}
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
                                    //value={dados.taxaDeLimpeza['cobra'].toString()}
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
                                    //value={dados.taxaDeLimpeza['valor']}
                                    className="form-control"
                                    onChange={(event) => {
                                       setValor(parseInt(event.target.value));
                                       setTaxaDeLimpeza({ cobra: cobrat, valor: valor });
                                    } }
                                    required
                                pattern="[0-9]+$" />
                            </p>
                            <hr/>
                            <button className="btn btn-sm btn-success"     
                             onClick={
                                (event=>{
                                 putData();
                               })}> Salvar</button>
                            <button onClick={limpezaFormulario}
                                className='btn btn-danger'
                                type="reset">
                                Limpar
                            </button>
                        </div>
                    </div>
                </div>
       </div>
   ))}
   </form>
    </div> 
    </div> 
    </> ) }