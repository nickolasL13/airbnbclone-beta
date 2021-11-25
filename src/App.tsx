import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/index.css";


function App() {
  const [minPrice, setMinPrice] = useState<String>();
  const [maxPrice, setMaxPrice] = useState<String>();
  const [espaco, setEspaco] = useState<String>();
  const [lugar, setLugar] = useState<String>();
  const [dropdown, setDropdown] = useState<String>('Cidade');
  const [mode, setMode] = useState<Boolean>(true);
  let navigate = useNavigate();

  return (
    <>
      <header>
        <Navbar bg="light" expand="lg" className=".navbar-light .navbar-brand">
          <Navbar.Brand
            as={NavLink}
            to="/">
            <img
              src="/images/Airbnb-logo.png"
              width="100"
              height="55"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav>
            <NavDropdown title="Preço" autoClose="outside">
              <NavDropdown.Item>
                {
                  <input
                    type="search"
                    onChange={event => {
                      setMinPrice(event.target.value);
                    }}
                    placeholder="Preço Mínimo"
                  />
                }
              </NavDropdown.Item>
              <NavDropdown.Item>
                {
                  <input type="search"
                    onChange={event => {
                      setMaxPrice(event.target.value);
                    }}
                    placeholder="Preço Máximo"
                  />
                }
              </NavDropdown.Item>
              <NavDropdown.Item>
                {
                  <Button
                    onClick={() => {
                      navigate(`/preco/${minPrice}/${maxPrice}`);
                    }
                    }
                  >Pesquisar</Button>
                }
              </NavDropdown.Item>
            </NavDropdown>


            <NavDropdown title="Espaço" autoClose="outside">
              <NavDropdown.Item>
                {
                  <input
                    type="search"
                    onChange={event => {
                      setEspaco(event.target.value);
                    }}
                    placeholder="Tipo de Imóvel"
                  />
                }
              </NavDropdown.Item>
              <NavDropdown.Item>
                {
                  <Button
                    onClick={() => {
                      navigate(`/espaco/${espaco}`);
                    }
                    }
                  >Pesquisar</Button>
                }
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/arCond">Ar Condicionado</Nav.Link>

            <Nav.Link as={NavLink} to="/wifi">Wi-Fi</Nav.Link>

            <Nav.Link as={NavLink} to="/cozinha">Cozinha</Nav.Link>

            <Nav.Link as={NavLink} to="/freePark">Estacionamento Gratuito</Nav.Link>

            <Nav.Link as={NavLink} to="/piscina">Piscina</Nav.Link>

            <Nav.Link as={NavLink} to="/cadastro">Cadastro</Nav.Link>

          </Nav>
        </Navbar>
      </header>
      <main className="main">
        <h5 className="welcome">Bem-vindo ao Airbnb Clone!</h5>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title={`${dropdown}`}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item>
              {
                <Button className="dropButton" onClick={() => {
                  setDropdown('Cidade');
                  setMode(true);
              }}>Cidade</Button>
              }
              </Dropdown.Item>

            <Dropdown.Item >
              {
                <Button className="dropButton" onClick={() => {
                  setDropdown('Estado');
                  setMode(false);
              }}>Estado</Button>}
              </Dropdown.Item>

          </DropdownButton>
          <FormControl
            placeholder="Para onde você quer ir?"
            onChange={event => {
              setLugar(event.target.value);
            }}
          />
          <Button 
          variant="outline-secondary" 
          id="button-addon2"
          onClick={() => {
            (mode ? navigate(`/cidade/${lugar}`) : 
            (navigate(`/estado/${lugar}`)));
            
          }}
          >
            Pesquisar
          </Button>
        </InputGroup>
        <Outlet></Outlet>
      </main>
      <footer className="main">
        <h6 className="vyn"> Airbnb Clone v.yn </h6>
      </footer>
    </>
  );
}

export default App;
