import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
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
    this.service.getPokemonByIdentifier(identifier).subscribe((data) => {
        this.pokemon = data;
        this.descPoke = data.poke_descricao;
        this.idPoke = data.poke_id;
        this.nomePoke = data.poke_nome;
        this.tipoPoke = data.poke_tipo;
        this.alturaPoke = data.poke_altura;
        this.pesoPoke = data.poke_peso;

        this.vidaProgressBarWidth = data.poke_vida + '%';
        this.ataqueProgressBarWidth = data.poke_ataque + '%';
        this.defesaProgressBarWidth = data.poke_defesa + '%';
        this.velocidadeProgressBarWidth = data.poke_velocidade + '%';
        this.loader = false;
      }, error => {
          this.router.navigate(['algo-deu-errado', {status: error.status}])
      }
    );
  }

}
