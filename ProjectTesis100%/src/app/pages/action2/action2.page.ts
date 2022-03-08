import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { ClientService } from 'src/app/services/client.service';

interface compDis {
  name: string,
  numberProducts: number,
  fechaRegistro: Date,
  estadoPedido: string
}

interface compOpt2 {
  name: string,
  redirectTo: string
}

@Component({
  selector: 'app-action2',
  templateUrl: './action2.page.html',
  styleUrls: ['./action2.page.scss'],
})
export class Action2Page implements OnInit {

  clients: Client[] = [];

  distrPed: compDis[] = [
    {
      name: 'Alfredo Ramirez',
      numberProducts: 16,
      fechaRegistro: new Date("2021-11-30"),
      estadoPedido: 'Pendiente'
    },
    {
      name: 'Luciana Pereira',
      numberProducts: 24,
      fechaRegistro: new Date("2021-11-29"),
      estadoPedido: 'Pendiente'
    },
    {
      name: 'Daniel Guzman',
      numberProducts: 32,
      fechaRegistro: new Date("2021-11-28"),
      estadoPedido: 'Entregado'
    }
  ];

  options2: compOpt2[] = [
    {
      name: 'Asignar Estado de Pedido',
      redirectTo: '/crear-distribucion'
    },
    {
      name: 'Cancelar Distribucion',
      redirectTo: '/eliminar-distribucion'
    }
  ];

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private clientService: ClientService) { }

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

  entrPed(){
    this.router.navigate(['/crear-distribucion'])
  }

}
