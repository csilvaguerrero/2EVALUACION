

import { Vista } from "./vista.js"

/**
 * Vista del formulario del CRUD
 */

export class VistaFormulario extends Vista{


    constructor(controlador, div){

        super(div)
        this.controlador = controlador
        this.modelo = this.controlador.getModelo()
        

        this.id = null

        this.nombre = $('#inputNombre')
        this.precio = $('#inputFecha')
        this.fecha = $('#inputFecha')
        this.descripcion = $('#areaDescripcion')
        this.rol = $('#selectFormulario')
        this.publicar = $('#selectPublicar')
        this.imagen = $('#imagenJuego')


        this.btnAceptar = $('#btnAnadir')
        this.btnVolver = $('#volver')
        

        this.btnModificar = $('#btnModificar')
        this.btnModificar.hide()

        this.btnAceptar.click(this.anadirJuego.bind(this))
        this.btnVolver.click(this.mostrarJuegos.bind(this))

       this.btnModificar.click(this.editarJuego.bind(this))
    }

    /**
     * Mostrará la vista de los juegos mediante la pulsación de un button.
    */
     anadirJuego(){

        this.controlador.vistaJuegos()
        this.controlador.altaJuego(this.nombre.val(), this.precio.val(), this.fecha.val(), this.descripcion.val(), this.rol.val(), this.publicar.val(), this.imagen.prop("files")[0])
        this.vaciarCampos()
        
    }


    /**
     * Método que nos envía a la vista donde se encuentran los juegos.
     */
    mostrarJuegos(){

        this.controlador.vistaJuegos()
        this.vaciarCampos()
       
    }

    /**
     * Método que vacía los campos del formulario cuando cambiamos de vista.
     */
    vaciarCampos(){

        this.nombre.val("")
        this.precio.val("")
        this.fecha.val("")
        this.descripcion.val("")
        this.rol.val("")
        this.publicar.val("")
        this.imagen = null;
    }


    /**
     * Método que mediante un objeto rellena todos los inputs del formulario, según
     * los datos del juego a modificar
     * @param {*} dato 
     */
    rellenarFormulario(dato){

        this.id = dato.id
        this.nombre.val(dato.nombre)
        this.precio.val(dato.precio)
        this.fecha.val(dato.fecha)
        this.descripcion.val(dato.descripcion)
        this.rol.val(dato.rol)
        this.publicar.val(dato.publicar)

        this.btnAceptar.hide()
        this.btnModificar.show()

    }

    /**
     * Método que envia los datos modificados del juego al controlador.
     */
    editarJuego(){

        this.controlador.editarJuego(this.id, this.nombre.val(), this.precio.val(), this.fecha.val(), this.descripcion.val(), this.rol.val(), this.publicar.val(), this.imagen.prop("files")[0])
        this.mostrarJuegos()

    }


   

}