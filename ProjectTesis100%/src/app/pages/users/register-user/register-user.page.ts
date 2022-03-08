import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  registerUser: User = {
    priNombre: '',
    secNombre: '',
    apPaterno: '',
    apMaterno: '',
    nrocelular: 0,
    username: '',
    email: '',
    password: ''
  }

  constructor(private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService) { }

  ngOnInit() {
  }

  async register( fRegister: NgForm ){
    
    if( fRegister.invalid ) { return; }

    const valido = await this.usuarioService.registro( this.registerUser );

    if(valido) {
      // Ingresar al sistema
      this.navCtrl.navigateRoot('/users', { animated: true });
    } else {
      // Muestra de alerta de usuario y constraseña incorrectos
      this.uiService.alertaInformativa('Ese nombre de usuario ya existe.');
    }

  }

}
