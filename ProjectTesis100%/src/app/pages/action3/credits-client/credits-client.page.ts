import { Component, OnInit } from '@angular/core';
import { Client, Credit } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CreditService } from 'src/app/services/credit.service';
import { ClientService } from 'src/app/services/client.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-credits-client',
  templateUrl: './credits-client.page.html',
  styleUrls: ['./credits-client.page.scss'],
})
export class CreditsClientPage implements OnInit {

  credit: Credit[] = [];
  
  cli: Client = {
    nomPriCli: '',
    apePatCli: '',
    apeMatCli: ''
  }
  
  /*credit: Credit = {
    nomPro: '',
    cantVend: 0,
    tipoPago: '',
    montoCred: 0,
    estadoCred: ''
  };*/
  
  constructor(private activatedRoute: ActivatedRoute,
    private creditService: CreditService,
    private clientService: ClientService,
    private navCtrl: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.searchClient();
    this.loadCreditByClient();
  }

  loadCreditByClient() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('idcli')) {
        this.creditService.getCreditsByClient(parseInt(paramMap.get('idcli')))
        .subscribe(resp => {
          this.credit.push(...resp.dataCredits);
          console.log(this.credit);
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

}
