
import { Vista } from "./vista.js";

/**
 * Vista de inicio de la página. 
 */


export class VistaInicio extends Vista{

    constructor(controlador, div){

        super(div)
        this.controlador = controlador
        this.modelo = this.controlador.getModelo()

        //this.btnCRUD = document.getElementById('consultarJuegos')
        this.btnCRUD = $('#consultarJuegos')
        //this.btnCRUD.addEventListener('click', this.mostrarJuegos.bind(this))
        this.btnCRUD.click(this.mostrarJuegos.bind(this))

        //this.header = document.getElementById('cabeceraPagina')
        this.header = $('#cabeceraPagina')
        
    }
    
    /**
     * Mostrará la vista de los juegos cuando se ejecute mediante la pulsación de un button.
     */
    mostrarJuegos(){

        this.controlador.vistaJuegos()
        //this.header.style.display = "block"
        this.header.show()
    }

}