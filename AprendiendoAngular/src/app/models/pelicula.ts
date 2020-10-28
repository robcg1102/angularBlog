export class Pelicula{
   /*  public title: string;
    public year: number;
    public image: string;

    constructor(title, year, image){
        this.title = title;
        this.year = year;
        this.image = image;
    } */

    // Lo de arriba es lo mismo que el constructor de abajo
    constructor(
        public title: string,
        public year: number,
        public image: string,
    ){}
}