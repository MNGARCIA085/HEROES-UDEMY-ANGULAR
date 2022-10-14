import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc:'DC'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel'
    }
  ]

  heroe: Hero = {
    superhero:'',
    publisher:Publisher.DCComics,
    alter_ego:'',
    characters:'',
    first_appearance:''
  }


  // ActivatedRouted lo voy a usar para obtener params de la URL (el id en este caso)
  // Router para la navegación (voy a de agregar a editar dsp. de añadir exitosamente)

  constructor(private heroeService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

  ngOnInit(): void {
      

      
      console.log(this.router.url);

      if (!this.router.url.includes('editar')){
        return
      }


      // sólo se llama si estoy en editar
      this.activatedRoute.params
          .pipe(
            switchMap( ({id}) => this.heroeService.getHeroePorId(id))
          )
          .subscribe(heroe => this.heroe = heroe) // cargo los datos del héroe
  }


  guardar(){
    console.log(this.heroe);
    // validación simple
    if (this.heroe.superhero.trim().length === 0){
      return
    }


    // si hay id => edito, sino agrego
    if (this.heroe.id){
      // edito
      this.heroeService.actualizarHeroe(this.heroe)
          .subscribe(heroe => console.log('actualizar'))
    } else {
      // actualizo
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
           // redirecciono a editar
          this.router.navigate(['/heroes/editar',heroe.id]);
        })
     
    }


  }

}
