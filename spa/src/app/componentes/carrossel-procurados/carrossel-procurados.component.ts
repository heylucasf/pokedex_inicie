import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'carrossel-procurados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrossel-procurados.component.html',
  styleUrl: './carrossel-procurados.component.scss'
})

export class CarrosselProcuradosComponent implements OnInit {

  pokemons: any[] = [];
  currentIndex = 0;
  codPokemon = '';

  constructor(
    private service: ApiService,
    private router: Router
  )
  {}

  ngOnInit(): void {
    this.service.getPokesMaisProcurados().subscribe((data) => {
      this.pokemons = data;
    })
  }

  showSlide(index: number): void {
    const carousel = document.querySelector('.carrousel-baixo') as HTMLElement;
    let itemsPerSet: number;
    if (window.innerWidth <= 600) {
        itemsPerSet = 1;
    } else if (window.innerWidth <= 900) {
      itemsPerSet = 2;
    } else if (window.innerWidth <= 1200) {
      itemsPerSet = 3;
    } else {
      itemsPerSet = 7;
    }

    const totalSlides = this.pokemons.length;
    const totalSets = Math.ceil(totalSlides / itemsPerSet);
  
    if (index >= totalSets) {
      this.currentIndex = 0;
    } else if (index < 0) {
      this.currentIndex = totalSets - 1;
    } else {
      this.currentIndex = index;
    }
  
    const translateValue = -this.currentIndex * (100) + '%';
    carousel.style.transform = 'translateX(' + translateValue + ')';
}

  nextSlide(): void {
    this.showSlide(this.currentIndex + 0.5);
  }

  prevSlide(): void {
    this.showSlide(this.currentIndex - 0.5);
  }

  redirectToPoke(id: number) {
    this.router.navigate([`/pokemon/${id}`]);
  }
}
