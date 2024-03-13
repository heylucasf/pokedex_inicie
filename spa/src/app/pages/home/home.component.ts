import { Component } from '@angular/core';
import { CarrosselProcuradosComponent } from "../../componentes/carrossel-procurados/carrossel-procurados.component";
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HammerModule } from '@angular/platform-browser';
import { CarrosselPokemonsComponent } from "../../componentes/carrossel-pokemons/carrossel-pokemons.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
      CarrosselProcuradosComponent, 
      CommonModule, 
      FormsModule, 
      HammerModule, 
      CarrosselPokemonsComponent
    ]
})
export class HomeComponent {
    
    procurandoPoke = false;
    pokeNome = '';
    pokeIdEncontrado!: number;
    pokeNomeEncontrado = '';
    pokeAlturaEncontrado = '';
    pokePesoEncontrado = ''
    msgPokeNaoEncontrado = '';

    constructor(
      private service: ApiService,
      private router: Router,
    )
    {}

    procuraPoke() {
      this.service.getProcurarPoke(this.pokeNome.toLowerCase()).subscribe((data) => {
        this.pokeIdEncontrado = data.id
        this.pokeNomeEncontrado = data.nome
        this.pokeAlturaEncontrado = data.altura
        this.pokePesoEncontrado = data.peso
        this.procurandoPoke = true;
        this.msgPokeNaoEncontrado = ''
      }, () => {
        this.msgPokeNaoEncontrado = "Pokemon não encontrado";
      });
    }

    redirectToPoke(id: number) {
      this.router.navigate([`/pokemon/${id}`]);
    }
}
