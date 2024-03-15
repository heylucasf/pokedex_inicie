import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-algo-deu-errado',
  standalone: true,
  imports: [],
  templateUrl: './algo-deu-errado.component.html',
  styleUrl: './algo-deu-errado.component.scss'
})
export class AlgoDeuErradoComponent implements OnInit {
  
  status: number = 0

  constructor(private route: ActivatedRoute)
  {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.status = +params['status'];
    });
  }
}
