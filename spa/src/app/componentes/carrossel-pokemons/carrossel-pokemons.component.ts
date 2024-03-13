import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'carrossel-pokemons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrossel-pokemons.component.html',
  styleUrl: './carrossel-pokemons.component.scss'
})
export class CarrosselPokemonsComponent implements OnInit{

  selectedIndex = 0;
  pokemons: any[] = [];

  constructor(
    private service: ApiService,
    private router: Router,
  ){}

  ngOnInit() {
    this.service.obterTodosPokes().subscribe((data) => {
      this.pokemons = data;
    })
  }

  carrosselVoltar() {
    this.selectedIndex--;
    if (this.selectedIndex < 0) {
        this.selectedIndex = this.pokemons.length - 1;
    }
  }

  carrosselProx() {
    this.selectedIndex++;
    if (this.selectedIndex >= this.pokemons.length) {
        this.selectedIndex = 0;
    }
  }

  redirectToPoke(id: number) {
    this.router.navigate([`/pokemon/${id}`]);
  }
}
