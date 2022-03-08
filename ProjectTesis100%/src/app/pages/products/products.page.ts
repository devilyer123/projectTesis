import { Component, Input, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MenuCompenente, Product } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  activities: Observable<MenuCompenente[]>

  products: Product[] = [];

  constructor(private router: Router,
    private dataService: DataService,
    public menuCtrl: MenuController,
    private navCtrl: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.activities = this.dataService.getMenuOpts();
    this.loadProducts();
  }

  loadProducts() {
    this.dataService.getProducts()
    .subscribe( resp => {
      this.products.push(...resp.dataProds);
      console.log(this.products);
      console.log(resp);
    });
  }

  regisProd(){
    this.navCtrl.navigateRoot('/products/register-product');
  }

  /*ionViewWillEnter() {
    this.activities = this.dataService.getMenuOpts();
    this.loadProducts();
  }*/

  async delProd(id){
    const alert = await this.alertController.create({
      header: 'Mensaje de Alerta',
      subHeader: 'Esta por eliminar este producto',
      message: 'Desea eliminarlo?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            console.log(id);
            this.dataService.getDelete(id).subscribe(
              (res) => {
                this.loadProducts();
                console.log(res);
              },
              (err) => console.log(err)
            );
          }
        },'Cancelar']
    });

    await alert.present();

  }

}
