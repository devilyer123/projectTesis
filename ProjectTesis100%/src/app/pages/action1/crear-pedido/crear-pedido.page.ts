import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Product, Client, Order, Distribution } from 'src/app/interfaces/interfaces';
import { ClientService } from 'src/app/services/client.service';
import { DataService } from 'src/app/services/data.service';
import { DistributionService } from 'src/app/services/distribution.service';
import { OrderService } from 'src/app/services/order.service';
import { UsuarioService } from '../../../services/usuario.service';

interface compInfProd {
  id: number,
  name: string,
  priceUnit: number
}

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.page.html',
  styleUrls: ['./crear-pedido.page.scss'],
})
export class CrearPedidoPage implements OnInit {

  /*infProd2: compInfProd[] = [
    {
      id: 1,
      name: 'BOLSA DE COLOSTOMIA PAQUETE 5 UDS',
      priceUnit: 85,
    },
    {
      id: 2,
      name: 'GUANTES DE LATEX TALLA L',
      priceUnit: 75,
    },
    {
      id: 3,
      name: 'CAJA PETRI DE PLASTICO MEDIANAS',
      priceUnit: 3,
    },
    {
      id: 4,
      name: 'GONIOMETRO',
      priceUnit: 50,
    },
    {
      id: 5,
      name: 'PAPEL PARA ELECTROCARDIOGRAMA 12 CANALES',
      priceUnit: 45,
    },
    {
      id: 6,
      name: 'TORNIQUETE  DE LIGA',
      priceUnit: 5,
    },
    {
      id: 7,
      name: 'VENDAS ELASTICAS 20 CM COLOR PIEL',
      priceUnit: 25,
    },
    {
      id: 8,
      name: 'GLUCOMETRO TRUEMETRIX EN ESTUCHE',
      priceUnit: 150,
    },
    {
      id: 9,
      name: 'BARBIJOS QUIRURGICOS PEDIATRICOS',
      priceUnit: 25,
    },
    {
      id: 10,
      name: 'OXIMETRO DE PULSO JUMPER -500D AMERICANO',
      priceUnit: 200,
    }
  ];*/

  cli: Client = {
    nomPriCli: '',
    apePatCli: '',
    apeMatCli: ''
  }

  prod: Product = {
    nomProd: '',
    cantDisp: 0,
    precio: 0
  }

  regisOrder: Order = {
    cliId: 0,
    nomPro: '',
    cantSolic: 0,
    montoTotal: 0
  }

  regisDistribution: Distribution = {
    cliId: 0,
    nomPro: '',
    cantSolic: 0,
    montoTotal: 0,
    estadoPedido: ''
  }

  infProd: Product[] = [];

  constructor(private router: Router,
    private dataService: DataService,
    private clientService: ClientService,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private distributionService: DistributionService) { }

  ngOnInit() {
    this.searchClient();
    this.loadInfProd();
  }

  searchClient() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('idcli')) {
        this.clientService.getOneClient(parseInt(paramMap.get('idcli')))
        .subscribe(res => {
          this.cli = res;
          console.log(this.cli);
        })
      }
    })
  }

  upClient() {
    this.clientService.updateClient(this.cli.idcli, {
      nomPriCli: this.cli.nomPriCli,
      apePatCli: this.cli.apePatCli,
      apeMatCli: this.cli.apeMatCli
    }).subscribe( res => {
      this.navCtrl.navigateRoot('/action1', {animated: true});
    })
  }

  regOrder() {
    this.orderService.registerOrder({
      cliId: this.cli.idcli,
      nomPro: this.prod.nomProd,
      cantSolic: this.regisOrder.cantSolic,
      montoTotal: this.regisOrder.montoTotal
    }). subscribe(
      (res) => {
        this.regDistribution();
        this.navCtrl.navigateRoot('/action1', {animated:true});
        console.log(res)
      },
      (err) => console.log(err)
    )
  }

  regDistribution() {
    this.distributionService.registerDistribution({
      cliId: this.cli.idcli,
      nomPro: this.prod.nomProd,
      cantSolic: this.regisOrder.cantSolic,
      montoTotal: this.regisOrder.montoTotal,
      estadoPedido: 'Pendiente'
    }). subscribe(
      (res) => {
        console.log(res)
      },
      (err) => console.log(err)
    )
  }

  searProduct(id) {
    this.dataService.getOneProduct(id)
    .subscribe(res => {
      this.prod = res;
    })
    this.saveOrder();
  }

  async saveOrder(){
    this.regisOrder.montoTotal = this.calcularMonto(this.prod.precio, this.regisOrder.cantSolic);
    const alert = await this.alertController.create({
      header: 'Esta por registrar este Pedido',
      inputs: [
        {
          placeholder: this.prod.nomProd,

        },
        {
          placeholder: 'Cantidad: ' + this.regisOrder.cantSolic.toString(),

        },
        {
          placeholder: 'Monto Total ' + (this.regisOrder.montoTotal).toString(),

        }
      ],
      buttons: ['Confirmar', 'Cancelar']
    });

    await alert.present();
  }

  calcularMonto(dis, add){
    const total =  parseInt(dis) * parseInt(add);
    return total;
  }

  loadInfProd() {
    this.dataService.getProducts()
    .subscribe( resp => {
      this.infProd.push(...resp.dataProds);
      console.log(this.infProd);
    });
  }

}
