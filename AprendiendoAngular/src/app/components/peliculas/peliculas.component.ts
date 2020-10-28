import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from "../../models/pelicula";
import { PeliculaService } from "../../services/pelicula.service";

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})

export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;
  public peliculas: Array<Pelicula>;
  public favorita: Pelicula;
  public fecha: any;

  constructor(
    private _peliculaService: PeliculaService
  ) {
    this.titulo = "Componente peliculas"
    this.peliculas = this._peliculaService.getPeliculas()
    this.fecha = new Date(2020, 8, 12);
   }

  ngOnInit(): void {
    console.log("oninit lanzado");
    console.log(this._peliculaService.holaMundo());
  }

  ngDoCheck(): void {
    console.log("DoCheck Lanzado");
  }

  cambiarTitulo(){
    if(this.titulo === "Componente peliculas"){
      this.titulo = "El título ha sido cambiado"
    }else{
      this.titulo = "Componente peliculas"
    }
  }

  ngOnDestroy(): void {
    console.log("El componente se va a eliminar");
  }

  mostrarFavorita(event){
    this.favorita = event.pelicula;
  }

}
