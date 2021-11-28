export interface TaxaDeServico {
    cobra: boolean,
    valorPerDay?: number,
}

export interface TaxaDeLimpeza {
    cobra: boolean,
    valor?: number,
}

export interface Lugar {
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

export interface Locacao {
    iId: String,
    idImovel: String,
    checkin: Date,
    checkout: Date,
    nome: string,
    telefone: string,
    email: string,
    total: string,
}