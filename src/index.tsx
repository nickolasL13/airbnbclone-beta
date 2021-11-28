import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PaginaNaoEncontrada from './Pages/PáginaNãoEncontrada';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PaginaPrincipal from './Pages/PáginaPrincipal';
import PaginaImovel from './Pages/PaginaImovel';
import PaginaPreco from './Pages/PaginaPreco';
import PaginaEspaco from './Pages/PaginaEspaco';
import PaginaArCond from './Pages/PaginaArCond';
import PaginaWifi from './Pages/PaginaWifi';
import PaginaCozinha from './Pages/PaginaCozinha';
import PaginaFreePark from './Pages/PaginaFreePark';
import PaginaPiscina from './Pages/PaginaPiscina';
import PaginaCidade from './Pages/PaginaCidade';
import PaginaEstado from './Pages/PaginaEstado';
import PaginaCadastro from './Pages/PaginaCadastro';
import PaginaTabela from './Pages/PaginaTabela';
import PaginaReserva from './Pages/PaginaReserva';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path= "/" element={<App />}>
        <Route index element={< PaginaPrincipal />}/>
        <Route path= "*" element= {<PaginaNaoEncontrada />}/>
        <Route path="arCond" element= {< PaginaArCond/>} />
        <Route path="wifi" element= {< PaginaWifi/>} />
        <Route path="cozinha" element= {< PaginaCozinha/>} />
        <Route path="freePark" element= {< PaginaFreePark/>} />
        <Route path="piscina" element= {< PaginaPiscina/>} /> 
        <Route path="imovel/:id" element= {<PaginaImovel />} />
        <Route path="preco/:minPrice/:maxPrice" element= {<PaginaPreco />} />
        <Route path="espaco/:espaco" element= {<PaginaEspaco />} />
        <Route path="cidade/:cidade" element= {<PaginaCidade />} />
        <Route path="estado/:estado" element= {<PaginaEstado />} />
        <Route path="tabelaCadastro/cadastro" element= {<PaginaCadastro />} />
        <Route path="tabelaCadastro" element= {<PaginaTabela />} />
        <Route path="tabelaReserva" element= {<PaginaReserva />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
