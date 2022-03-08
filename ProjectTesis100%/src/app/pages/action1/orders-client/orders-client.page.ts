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

  async delPed(id) {
    const alert = await this.alertController.create({
      header: 'Mensaje de Alerta',
      subHeader: 'Esta por eliminar este producto',
      message: 'Desea eliminarlo?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            console.log(id);
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

}
