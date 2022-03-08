import { Component, OnInit } from '@angular/core';
import { addCantPro, Product } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {

  prod: Product = {
    nomProd: '',
    cantDisp: 0,
    precio: 0
  }

  upStockProduct: addCantPro = {
    cantAdd: 0
  }

  constructor(private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.searchProduct();
  }

  searchProduct() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('idpro')) {
        this.dataService.getOneProduct(parseInt(paramMap.get('idpro')))
        .subscribe(res => {
          this.prod = res;
          console.log(this.prod);
        })
      }
    })
  }

  upProduct() {
    this.prod.cantDisp = this.sumaProduct(this.prod.cantDisp, this.upStockProduct.cantAdd);
    this.dataService.updateProduct(this.prod.idpro, {
      nomProd: this.prod.nomProd,
      cantDisp: this.prod.cantDisp,
      precio: this.prod.precio
    }).subscribe( res => {
      this.navCtrl.navigateRoot('/products', {animated: true});
    })
  }

  sumaProduct(dis, add){
    const suma =  parseInt(dis) + parseInt(add);
    return suma;
  }

}
