import { Component, OnInit } from '@angular/core';
import { Order, Product } from '../../../interfaces/interfaces';
import { DataService } from '../../../services/data.service';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-orders-client',
  templateUrl: './orders-client.page.html',
  styleUrls: ['./orders-client.page.scss'],
})
export class OrdersClientPage implements OnInit {
  
  order: Order[] = [];

  prod: Product = {
    nomProd: '',
    cantDisp: 0,
    precio: 0
  }

  constructor(private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private orderService: OrderService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.loadOrderByCliente();
  }

  loadOrderByCliente() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('idcli')) {
        this.orderService.getOrdersByClient(parseInt(paramMap.get('idcli')))
        .subscribe(resp => {
          this.order.push(...resp.dataOrders);
          console.log(this.order);
        })
      }
    })
  }

  async delPed(id, proId, cantCan) {
    const alert = await this.alertController.create({
      header: 'Mensaje de Alerta',
      subHeader: 'Esta por eliminar este pedido',
      message: 'Desea eliminarlo?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            console.log(id);
            this.upProduct(proId, cantCan);
            this.orderService.getDelete(id).subscribe(
              (res) => {
                this.loadOrderByCliente();
                console.log(res);
              },
              (err) => console.log(err)
            );
          }
        },'Cancelar']
    });

    await alert.present();
  }

  upProduct(proId, cantCan) {
    this.dataService.updateProduct(proId, {
      nomProd: this.prod.nomProd,
      cantDisp: this.sumaProduct(this.prod.cantDisp, cantCan),
      precio: this.prod.precio
    }).subscribe(res => {
      console.log(res);
    })
  }

  searchProduct(id, proId, cantCan) {
    this.dataService.getOneProduct(proId)
    .subscribe(res => {
      this.prod = res;
      console.log(this.prod);
      this.delPed(id, proId, cantCan);
    })
  }

  sumaProduct(dis, add){
    const suma =  parseInt(dis) + parseInt(add);
    return suma;
  }

}
