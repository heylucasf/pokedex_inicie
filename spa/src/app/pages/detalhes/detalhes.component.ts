import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CarrosselProcuradosComponent } from "../../componentes/carrossel-procurados/carrossel-procurados.component";
import { LoaderComponent } from "../../componentes/loader/loader.component";

@Component({
    selector: 'app-detalhes',
    standalone: true,
    templateUrl: './detalhes.component.html',
    styleUrl: './detalhes.component.scss',
    imports: [CommonModule, CarrosselProcuradosComponent, LoaderComponent]
})
export class DetalhesComponent implements OnInit{

  pokemon: any[] = [];
  idPoke = 0;
  nomePoke = '';
  descPoke = '';
  ataquePoke = '';
  defesaPoke = '';
  tipoPoke = '';
  vidaPoke = '';
  veloPoke = '';
  alturaPoke = ''
  pesoPoke = '';
  vidaProgressBarWidth: string = '';
  ataqueProgressBarWidth: string = '';
  defesaProgressBarWidth: string = '';
  velocidadeProgressBarWidth: string = '';
  loader: boolean = true;
  
  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private title: Title
    )
  {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const identifier = params['identifier'];
      this.getPokemonDetails(identifier);
    });
  }

  getPokemonDetails(identifier: string): void {
    this.service.getPokemonByIdentifier(identifier).subscribe(
      (data) => {
        this.pokemon = data;
        this.ataquePoke = data.ataque;
        this.defesaPoke = data.defesa;
        this.descPoke = data.descricao;
        this.idPoke = data.id;
        this.nomePoke = data.nome;
        this.tipoPoke = data.tipo;
        this.alturaPoke = data.altura;
        this.pesoPoke = data.peso;

        this.vidaProgressBarWidth = data.vida + '%';
        this.ataqueProgressBarWidth = data.ataque + '%';
        this.defesaProgressBarWidth = data.defesa + '%';
        this.velocidadeProgressBarWidth = data.velocidade + '%';
        this.loader = false;
      }
    );
  }

}
