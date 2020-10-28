import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public user: any;
  public campo: string;
  constructor() { 
    this.user = {
      nombre: '',
      apellidos: '',
      bio: '',
      genero: ''
    };
  }

  ngOnInit(): void {
  }


  onSubmit(){
    if(!this.user.nombre || !this.user.apellidos || !this.user.bio || !this.user.genero){
      return alert("Es necesario rellenar todos los campos")
    }else{
      
    console.log(this.user);
    alert("Formulario enviado!!");
    }
  }

  hasDadoClick(){
    alert("Has dado click")
  }
  hasSalido(){
    alert("Has salido del campo")
  }

}
