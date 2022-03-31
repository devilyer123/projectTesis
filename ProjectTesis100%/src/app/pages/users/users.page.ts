import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[] = [];

  constructor(private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.usuarioService.getUsers()
    .subscribe(resp => {
      this.users.push(...resp.dataUsers);
      console.log(resp);
    })
  }

  regisUser(){
    this.navCtrl.navigateRoot('/users/register-user');
  }

  async delUser(id){
    const alert = await this.alertController.create({
      header: 'Mensaje de Alerta',
      subHeader: 'Esta por eliminar este usuario',
      message: 'Desea eliminarlo?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            console.log(id);
            this.usuarioService.getDelete(id).subscribe(
              (res) => {
                this.loadUsers();
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
