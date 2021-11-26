interface TaxaDeServico {
    cobra: boolean,
    valorPerDay?: number,
}

interface TaxaDeLimpeza {
    cobra: boolean,
    valor?: number,
}

interface Lugar {
    cidade: string,
    estado: string,
    endereco: string,
}

export default interface Imovel {
    iId: string,
    espaco: string
    label: string,
    nHospedes: number,  
    nQuartos: number,
    nCamas: number,
    nBanheiros: number,
    arCond: boolean,
    wifi: boolean,
    cozinha: boolean,
    freeParking: boolean,
    piscina: boolean, 
    pricePerNight: number,
    descricao: string,
    lugar: Lugar,
    taxaDeServico: TaxaDeServico,
    taxaDeLimpeza: TaxaDeLimpeza,
    photo: string,
}

export interface Locacao{
    [x: string]: any;
    idImovel:    Number;
    checkin:     Date;
    checkout:    Date;
    nome:        string;
    telefone:    number,
    email:       string,
    total:       Number
}