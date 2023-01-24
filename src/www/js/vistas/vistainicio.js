
import { Vista } from "./vista.js";

/**
 * Vista de inicio de la página. 
 */


export class VistaInicio extends Vista{

    constructor(controlador, div){

        super(div)
        this.controlador = controlador
        this.modelo = this.controlador.getModelo()

        this.btnCRUD = $('#consultarJuegos')
        this.btnCRUD.click(this.mostrarJuegos.bind(this))

        this.header = $('#cabeceraPagina')
        
    }
    
    /**
     * Mostrará la vista de los juegos cuando se ejecute mediante la pulsación de un button.
     */
    mostrarJuegos(){

        this.controlador.vistaJuegos()
        this.header.show()
    }

}