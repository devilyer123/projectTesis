import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Client, User } from 'src/app/interfaces/interfaces';
import { ClientService } from 'src/app/services/client.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PopoverInfoComponent } from '../../components/popover-info/popover-info.component';

interface compPed {
  name: string,
  numberProducts: number,
  fechaRegistro: Date
}

@Component({
  selector: 'app-action1',
  templateUrl: './action1.page.html',
  styleUrls: ['./action1.page.scss'],
})
export class Action1Page implements OnInit {

  clients: Client[] = []; 

  /*pedidos: compPed[] = [
    {
      name: 'Alfredo Ramirez',
      numberProducts: 16,
      fechaRegistro: new Date("2021-11-30")
    },
    {
      name: 'Luciana Pereira',
      numberProducts: 24,
      fechaRegistro: new Date("2021-11-29")
    },
    {
      name: 'Daniel Guzman',
      numberProducts: 32,
      fechaRegistro: new Date("2021-11-28")
    }
  ];*/

  constructor(private popoverCtrl: PopoverController,
    private router: Router,
    private usuarioService: UsuarioService,
    private clientService: ClientService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.loadClientByUser();
  }

  async loadClientByUser() {
    const iduser = await this.usuarioService.obtenerUserByToken();
    this.clientService.getClientsByUser(iduser)
    .subscribe(resp => {
      this.clients.push(...resp.dataClients);
      console.log(resp);
      console.log(this.clients);
    });
  }

  /*async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverInfoComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    //const { url } = await popover.onWillDismiss();
  }*/

  crePedido(){
    this.router.navigate(['/action1/register-client']);
  }

  async delCli(id) {
    const alert = await this.alertController.create({
      header: 'Mensaje de Alerta',
      subHeader: 'Esta por eliminar este Cliente',
      message: 'Desea eliminarlo?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            console.log(id);
            this.clientService.getDelete(id).subscribe(
              (res) => {
                this.loadClientByUser();
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
