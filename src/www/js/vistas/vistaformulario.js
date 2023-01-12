

import { Vista } from "./vista.js"

/**
 * Vista del formulario del CRUD
 */

export class VistaFormulario extends Vista{


    constructor(controlador, div){

        super(div)
        this.controlador = controlador
        
        this.btnAceptar = document.getElementById('btnAnadir')
        this.btnVolver = document.getElementById('volver')

        this.btnAceptar.addEventListener('click', this.mostrarJuegos.bind(this))
        this.btnVolver.addEventListener('click', this.mostrarJuegos.bind(this))
    }
    /**
     * Mostrará la vista de los juegos mediante la pulsación de un button.
     */
    mostrarJuegos(){

        this.controlador.vistaJuegos()
    }


}