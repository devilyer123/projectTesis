import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.page.html',
  styleUrls: ['./register-product.page.scss'],
})
export class RegisterProductPage implements OnInit {

  regisProduct: Product = {
    nomProd: '',
    cantDisp: 0,
    precio: 0
  }

  constructor(private dataService: DataService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  regProduct() {
    this.dataService.registerProduct(this.regisProduct)
    .subscribe(
      (res) => {
        this.navCtrl.navigateRoot('/products', { animated: true });
        console.log(res)
      },
      (err) => console.log(err)
    )
  }

}
