

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
        //this.nombre = document.getElementById('inputNombre')
        
        /*this.precio = document.getElementById('inputPrecio')
        this.fecha = document.getElementById('inputFecha')
        this.descripcion = document.getElementById('areaDescripcion')
        this.rol = document.getElementById('selectFormulario')
        this.publicar = document.getElementById('selectPublicar')
        this.imagen = document.getElementById('imagenJuego')*/

        this.nombre = $('#inputNombre')
        this.precio = $('#inputFecha')
        this.fecha = $('#inputFecha')
        this.descripcion = $('#areaDescripcion')
        this.rol = $('#selectFormulario')
        this.publicar = $('#selectPublicar')
        this.imagen = $('#imagenJuego')

        //this.btnAceptar = document.getElementById('btnAnadir')
        //this.btnVolver = document.getElementById('volver')

        this.btnAceptar = $('#btnAnadir')
        this.btnVolver = $('#volver')
        
        /*this.btnModificar = document.getElementById('btnModificar')
        this.btnModificar.style.display = "none"*/

        this.btnModificar = $('#btnModificar')
        this.btnModificar.hide()

        //this.btnAceptar.addEventListener('click', this.anadirJuego.bind(this))
        //this.btnVolver.addEventListener('click', this.mostrarJuegos.bind(this))
        this.btnAceptar.click(this.anadirJuego.bind(this))
        this.btnVolver.click(this.mostrarJuegos.bind(this))

       // this.btnModificar.addEventListener('click', this.editarJuego.bind(this))
       this.btnModificar.click(this.editarJuego.bind(this))
    }

    /**
     * Mostrará la vista de los juegos mediante la pulsación de un button.
    */
     anadirJuego(){

        this.controlador.vistaJuegos()
        this.controlador.altaJuego(this.nombre.val(), this.precio.val(), this.fecha.val(), this.descripcion.val(), this.rol.val(), this.publicar.val(), this.imagen.val())
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
       /* this.nombre.value = ""
        this.precio.value = ""
        this.fecha.value = ""
        this.descripcion.value = ""
        this.rol.value = ""
        this.publicar.value = ""
        this.imagen = null;*/

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
        this.nombre.value = dato.nombre
        this.precio.value = dato.precio
        this.fecha.value = dato.fecha
        this.descripcion.value = dato.descripcion
        this.rol.value = dato.rol
        this.publicar.value = dato.publicar

        //this.btnAceptar.style.display = "none"
        //this.btnModificar.style.display = "block"        
        this.btnAceptar.hide()
        this.btnModificar.show()

    }

    /**
     * Método que envia los datos modificados del juego al controlador.
     */
    editarJuego(){

        this.controlador.editarJuego(this.id, this.nombre.value, this.precio.value, this.fecha.value, this.descripcion.value, this.rol.value, this.publicar.value, this.imagen.files[0])
        this.mostrarJuegos()

    }


   

}