import { Component, OnInit } from '@angular/core';
import { Client, Credit, Distribution, selecTypPage } from '../../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { DistributionService } from 'src/app/services/distribution.service';
import { AlertController, NavController } from '@ionic/angular';
import { CreditService } from 'src/app/services/credit.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-entregar-distribucion',
  templateUrl: './entregar-distribucion.page.html',
  styleUrls: ['./entregar-distribucion.page.scss'],
})
export class EntregarDistribucionPage implements OnInit {

  distribution: Distribution[] = [];

  cli: Client = {
    nomPriCli: '',
    apePatCli: '',
    apeMatCli: ''
  }

  dist: Distribution = {
    nomPro: '',
    cantSolic: 0,
    montoTotal: 0,
    estadoPedido: ''
  }

  cred: Credit = {
    cliId: 0,
    nomPro: '',
    cantVend: 0,
    tipoPago: '',
    montoCred: 0,
    montoCredPend: 0,
    estadoCred: ''
  }

  upTypPage: selecTypPage = {
    typPage: ''
  }

  constructor(private activatedRoute: ActivatedRoute,
    private distributionService: DistributionService,
    private alertController: AlertController,
    private creditService: CreditService,
    private clientService: ClientService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.searchClient();
    this.loadDistributionByClient();
  }

  loadDistributionByClient() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('idcli')) {
        this.distributionService.getDistributionsByClient(parseInt(paramMap.get('idcli')))
        .subscribe(resp => {
          this.distribution.push(...resp.dataDistributions);
          console.log(this.distribution);
        })
      }
    })
  }

  searchClient() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('idcli')) {
        this.clientService.getOneClient(parseInt(paramMap.get('idcli')))
        .subscribe(res => {
          this.cli = res;
          //console.log(this.cli);
        })
      }
    })
  }

  upDist() {
    this.distributionService.updateDistribution(this.dist.iddis, {
      nomPro: this.dist.nomPro,
      cantSolic: this.dist.cantSolic,
      montoTotal: this.dist.montoTotal,
      estadoPedido: this.dist.estadoPedido
    }).subscribe(
      (res) => {
        
        this.navCtrl.navigateRoot('/action2', {animated: true});
        console.log(res);
      },
      (err) => console.log(err)
    )
    this.regSegCredit();
  }

  traspas(any) {
    return this.cred = any;
  }

  regSegCredit() {
    this.creditService.registerCredit({
      cliId: this.cli.idcli,
      nomPro: this.dist.nomPro,
      cantVend: this.dist.cantSolic,
      tipoPago: this.upTypPage.typPage,
      montoCred: this.dist.montoTotal,
      montoCredPend: this.dist.montoTotal,
      estadoCred: 'Pendiente'
    }).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => console.log(err)
    )
      /*resp => {
      console.log(resp)
      if(resp['ok']){
        console.log(resp);
      } else {
        this.traspas(resp);
        console.log(this.cred);
        //this.moreCredit();
        this.upCredit();
      }*
    },*/    
  }

  /*upCredit() {
    this.cred.montoCred = this.sumarMonto(this.cred.montoCred, this.dist.montoTotal);
    this.creditService.updateCredit(this.cred.idsegcre, {
      tipoPago: this.cred.tipoPago,
      montoCred: this.cred.montoCred,
      estadoCred: 'Pendiente'
    }).subscribe( res => {
      console.log(res);
    })
  }*/

  sumarMonto(ant, act){
    const total = parseInt(ant) + parseInt(act);
    return total;
  }

  async saveDist(id){
    const alert = await this.alertController.create({
      header: 'Seleccione el estado del pedido',
      buttons: [
        {
          text: 'Entregado',
          handler: () => {
            //this.dist.estadoPedido = "Entregado"
            this.distributionService.getOneDistribution(id).subscribe(
              (res) => {
                this.dist = res;
                this.dist.estadoPedido = 'Entregado';
                console.log(this.dist);
              }
            )
          }
        },
        {
          text: 'Pendiente',
          handler: () => {
            //this.distribution.estadoPedido = "Pendiente"
            this.distributionService.getOneDistribution(id).subscribe(
              (res) => {
                this.dist = res;
                this.dist.estadoPedido = 'Pendiente';
                console.log(this.dist);
              }
            )
          }
        }
      ]
    })
    await alert.present();
  }

  async savetypPage(){
    const alert = await this.alertController.create({
      header: 'Seleccione el tipo de Pago',
      buttons: [
        {
          text: 'A Credito',
          handler: () => {
            this.upTypPage.typPage = 'A Credito'
          }
        },
        {
          text: 'Al Contado',
          handler: () => {
            this.upTypPage.typPage = 'Al Contado'
          }
        }
      ]
    })
    await alert.present();
  }

  compare(est: string){
    if (est === 'Pendiente'){
      return true;
    } else {
      return false;
    }
  }

}
