import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { collectCredit, Credit } from 'src/app/interfaces/interfaces';
import { ClientService } from 'src/app/services/client.service';
import { CreditService } from 'src/app/services/credit.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cobrar-credito',
  templateUrl: './cobrar-credito.page.html',
  styleUrls: ['./cobrar-credito.page.scss'],
})
export class CobrarCreditoPage implements OnInit {

  credit: Credit = {
    tipoPago: '',
    montoCred: 0,
    estadoCred: ''
  };

  upCreditCollet: collectCredit = {
    credAdd: 0
  }

  constructor(private activatedRoute: ActivatedRoute,
    private creditService: CreditService,
    private clientService: ClientService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.loadCreditByClient();
  }

  loadCreditByClient() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('idcli')) {
        this.creditService.getCreditsByClient(parseInt(paramMap.get('idcli')))
        .subscribe(resp => {
          this.credit = resp;
          console.log(this.credit);
        })
      }
    })
  }

  upCredit() {
    this.credit.montoCred = this.restCredit(this.credit.montoCred, this.upCreditCollet.credAdd);
    this.creditService.updateCredit(this.credit.idsegcre, {
      tipoPago: this.credit.tipoPago,
      montoCred: this.credit.montoCred,
      estadoCred: this.credit.estadoCred
    }).subscribe( res => {
      this.navCtrl.navigateRoot('/action3', {animated:true} )
    })
  }


  restCredit(monT, cobC) {
    const resta = parseInt(monT) - parseInt(cobC);
    return resta;
  }

}
