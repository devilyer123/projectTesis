export interface MenuCompenente {
    icon: string;
    name: string;
    redirectTo: string;
}

export interface RespuestaProds {
    dataProds: Product[];
}

export interface RespuestaUsers {
    dataUsers: User[];
}

export interface RespuestaClients {
    dataClients: Client[];
}

export interface RespuestaOrders {
    dataOrders: Order[];
}

export interface RespuestaCredits {
    dataCredits: Credit[];
}

export interface RespuestaDistributions {
    dataDistributions: Distribution[];
}

export interface Product {
    idpro?: number,
    nomProd: string,
    cantDisp: number,
    precio: number
}

export interface addCantPro {
    cantAdd: number
}

export interface selecTypPage {
    typPage: string
}

export interface collectCredit {
    credAdd: number
}

export interface User {
    iduser?: number,
    priNombre: string,
    secNombre: string,
    apPaterno: string,
    apMaterno: string,
    nrocelular: number,
    rolUser: string,
    username: string,
    email: string,
    password: string
}

export interface upUser {
    iduser?: number,
    priNombre: string,
    secNombre: string,
    apPaterno: string,
    apMaterno: string,
    nrocelular: number,
    rolUser: string,
    username: string,
    email: string
}

export interface Client {
    idcli?: number,
    userId?: number,
    nomPriCli: string,
    apePatCli: string,
    apeMatCli: string,
    /*createdAt?: Date,
    updatedAt?: Date*/
}

export interface Order {
    idped?: number,
    cliId?: number,
    nomPro: string,
    cantSolic: number,
    montoTotal: number
}

export interface Distribution {
    iddis?: number,
    cliId?: number,
    nomPro: string,
    cantSolic: number,
    montoTotal: number,
    estadoPedido: string
}

export interface Credit {
    idsegcre?: number,
    cliId?: number,
    nomPro: string,
    cantVend: number,
    tipoPago: string,
    montoCred: number,
    estadoCred: string
}

/*export interface ListCredit {
    nomProduct: string,

}*/