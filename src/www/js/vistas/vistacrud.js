
import { Vista } from "./vista.js"

export class VistaCrud extends Vista{


    constructor(controlador, div){

        super(div)
        this.controlador = controlador
        this.modelo = this.controlador.getModelo()
     
        
        this.btnAnadir = document.getElementById('anadirJuego')

        this.btnAnadir.addEventListener('click', this.mostrarFormulario.bind(this))
        
    }
  
    mostrarFormulario(){

        this.controlador.vistaFormulario()

    }

}