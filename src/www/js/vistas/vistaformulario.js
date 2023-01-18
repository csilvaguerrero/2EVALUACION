

import { Vista } from "./vista.js"

/**
 * Vista del formulario del CRUD
 */

export class VistaFormulario extends Vista{


    constructor(controlador, div){

        super(div)
        this.controlador = controlador
        this.modelo = this.controlador.getModelo()
        

        this.nombre = document.getElementById('inputNombre')
        this.precio = document.getElementById('inputPrecio')
        this.fecha = document.getElementById('inputFecha')
        this.descripcion = document.getElementById('areaDescripcion')
        this.publicar = document.getElementById('selectPublicar')
       // this.rol = document.getElementById('Accion')
        this.imagen = document.getElementById('imagenJuego')

        this.btnAceptar = document.getElementById('btnAnadir')
        this.btnVolver = document.getElementById('volver')

        this.btnAceptar.addEventListener('click', this.anadirJuego.bind(this))
        this.btnVolver.addEventListener('click', this.mostrarJuegos.bind(this))
    }

    /**
     * Mostrará la vista de los juegos mediante la pulsación de un button.
     */
     anadirJuego(){

        this.controlador.vistaJuegos()
        this.controlador.altaJuego(this.nombre.value, this.precio.value, this.fecha.value, this.descripcion.value, this.publicar.value, this.imagen.files[0])
    
        
    }

    mostrarJuegos(){
        this.controlador.vistaJuegos()
    }

    rellenarFormulario(dato){

        this.nombre.value = dato.nombre
        this.precio.value = dato.precio
        this.fecha.value = dato.fecha
        this.descripcion.value = dato.descripcion
        this.publicar.value = dato.publicar
        this.imagen.value = dato.imagen

        

    }

}