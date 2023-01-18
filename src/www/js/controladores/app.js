


import { Vista } from "../vistas/vista.js"
import { VistaInicio } from "../vistas/vistainicio.js"
import { VistaCrud } from "../vistas/vistacrud.js"
import { VistaFormulario } from "../vistas/vistaformulario.js"

import { Modelo } from "../modelos/modelo.js"


/**
 * Aplicación PlayGame
 * Controlador de la aplicación
 */

class Controlador{


    constructor(){

        window.onload = this.iniciar.bind(this)

    }

    /**
     * Se ejecuta cada vez que se inicia la aplicación. Muestra la primera vista y declara todos los elementos.
     */

    iniciar(){
        
        this.modelo = new Modelo(this)

        this.divInicio = document.getElementById('divPrincipal')
        this.divCRUD = document.getElementById('divJuegos')
        this.divFormulario = document.getElementById('divFormulario')


        this.btnVolver = document.getElementById('volver')
        this.btnAnadir = document.getElementById('anadirJuego')

        this.btnVolver = new VistaCrud(this, this.btnVolver)
        this.btnAnadir = new VistaCrud(this, this.btnAnadir)


        this.divInicio = new VistaInicio(this, this.divInicio)
        this.divCRUD = new VistaCrud(this, this.divCRUD)
        this.divFormulario = new VistaFormulario(this, this.divFormulario)

        this.divInicio.mostrar(true)

    }

    /**
     * Oculta todas las vistas cada vez que se cambia de vista.
     */
    ocultarVistas(){

        this.divCRUD.mostrar(false)
        this.divFormulario.mostrar(false)
        this.divInicio.mostrar(false)
        this.btnVolver.mostrar(false)
        this.btnAnadir.mostrar(false)
    }

    /**
     * Muestra la vista de los juegos, y oculta las demás
     */
    vistaJuegos(){

        this.ocultarVistas()
        this.btnVolver.mostrar(false)
        this.btnAnadir.mostrar(true)
        this.divCRUD.mostrar(true)
        
    }

    /**
     * Muestra la vista inicio, y oculta las demás vistas
     */
    vistaInicio(){
        this.ocultarVistas()
        this.btnVolver.mostrar(false)
        this.divInicio.mostrar(true)
    }

    /**
     * Muestra la vista del formulario, y oculta las demás vistas
     */
    vistaFormulario(){
        this.ocultarVistas()
        this.divFormulario.mostrar(true)
        this.btnVolver.mostrar(true)
    }


    //, descripcion, publicar, imagen
    altaJuego(nombre, precio, fecha, descripcion, publicar, imagen){

        console.log('llego al controlador')
        this.modelo.anadirDatos(nombre, precio, fecha, descripcion, publicar, imagen)
       
    }

    borrarJuego(id){
        this.modelo.borrarJuego(id)
    }

    modificarJuego(dato){
        this.ocultarVistas()
        this.divFormulario.mostrar(true)
        this.btnVolver.mostrar(true)
        this.divFormulario.rellenarFormulario(dato)
    }


    getModelo(){

        return this.modelo
        
    }

}

const app = new Controlador()