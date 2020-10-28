import { Injectable } from "@angular/core";

import { Pelicula } from '../models/pelicula'

@Injectable()
export class PeliculaService{

    public peliculas: Pelicula[];

    constructor(){
        this.peliculas = [
            new Pelicula("Spiderman 4", 2019, 'https://vignette.wikia.nocookie.net/marvelcomicsfanon/images/e/e3/Spiderman_film_poster.jpg/revision/latest?cb=20150214080714'),
            new Pelicula("Avengers Endgame", 2019, 'http://www.trespassmag.com/wp-content/uploads/2019/04/avengersendgame-poster.jpg'),
            new Pelicula("Batman vs Superman", 2015, 'https://comicnewbies.files.wordpress.com/2017/11/batman-vs-superman-earth-1-2.jpg'),
          ]
    }

    holaMundo(){
        return 'Hola Mundo desde un servicio de Angular!!';
    }

    getPeliculas(){
        return this.peliculas;
    }
}