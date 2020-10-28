import {Component} from '@angular/core';

@Component({
    selector: 'mi-componente',
    templateUrl: './mi-componente.component.html'
})

export class MiComponente{
    public titulo: string;
    public comentario: string;
    public year: number;
    public mostrarPeliculas: boolean;

    constructor(){
        this.titulo = "Hola mundo, soy mi Componente";
        this.comentario = "Este es mi primer componente"
        this.year = 2020;
        this.mostrarPeliculas = true;
        /*
         

        console.log("Componente Mi-Componente cargado");
        console.log(this.titulo, this.comentario, this.year); */   
    }

    ocultarPeliculas(){
        if(this.mostrarPeliculas){
            this.mostrarPeliculas = false;
        }else{
            this.mostrarPeliculas = true;
        }
        
    }

}