import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ClientService } from 'src/app/services/client.service';

interface compCred {
  name: string,
  montoTotal: number,
  fechaRegistro: Date,
  tipoPago: string
}

@Component({
  selector: 'app-action3',
  templateUrl: './action3.page.html',
  styleUrls: ['./action3.page.scss'],
})
export class Action3Page implements OnInit {

  clients: Client[] = [];

  listCred: compCred[] = [
    {
      name: 'Alfredo Ramirez',
      montoTotal: 16200,
      fechaRegistro: new Date("2021-11-30"),
      tipoPago: 'Credito'
    },
    {
      name: 'Luciana Pereira',
      montoTotal: 24620,
      fechaRegistro: new Date("2021-11-29"),
      tipoPago: 'Contado'
    },
    {
      name: 'Daniel Guzman',
      montoTotal: 32640,
      fechaRegistro: new Date("2021-11-28"),
      tipoPago: 'Credito'
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
    })
  }

  entrPed(){
    
  }

}
