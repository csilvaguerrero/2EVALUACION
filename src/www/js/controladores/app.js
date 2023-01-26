


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

        $(document).ready(this.iniciar.bind(this))

    }

    /**
     * Se ejecuta cada vez que se inicia la aplicación. Muestra la primera vista y declara todos los elementos.
     */

    iniciar(){
        
        this.modelo = new Modelo(this)

        this.divInicio = $('#divPrincipal')
        this.divCRUD = $('#divJuegos')
        this.divFormulario = $('#divFormulario')
       
        
        this.btnVolver = $('#volver')
        this.btnAnadir = $('#anadirJuego')

        this.btnVolver = new VistaCrud(this, this.btnVolver)
        this.btnAnadir = new VistaCrud(this, this.btnAnadir)


        this.divInicio = new VistaInicio(this, this.divInicio)
        this.divCRUD = new VistaCrud(this, this.divCRUD)
        this.divFormulario = new VistaFormulario(this, this.divFormulario)

        this.divInicio.mostrar(true)
        this.fechaUI()
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


    /**
     * Envía los datos captados en el formulario al modelo, para que este los inserte en
     * la base de datos.
     * @param {*} nombre 
     * @param {*} precio 
     * @param {*} fecha 
     * @param {*} descripcion 
     * @param {*} rol 
     * @param {*} publicar 
     * @param {*} imagen 
     */
    altaJuego(nombre, precio, fecha, descripcion, rol, publicar, imagen){

        this.modelo.anadirDatos(nombre, precio, fecha, descripcion, rol, publicar, imagen)
       
    }

    /**
     * Envía el id de la fila que queremos borrar, para que el modelo actúe sobre ella y la borre.
     * @param {*} id 
     */
    borrarJuego(id){
        this.modelo.borrarJuego(id)
    }

    /**
     * Manda un objeto a la vista del formulario para rellenar los campos que queremos modificar
     * con sus valores anteriores.
     * @param {*} dato 
     */
    modificarJuego(dato){
        this.ocultarVistas()
        this.divFormulario.mostrar(true)
        this.btnVolver.mostrar(true)
        this.divFormulario.rellenarFormulario(dato)
    }

    /**
     * Método que envía al modelo todos los datos modificados para editar
     * la información del juego seleccionado.
     * @param {*} id 
     * @param {*} nombre 
     * @param {*} precio 
     * @param {*} fecha 
     * @param {*} descripcion 
     * @param {*} rol 
     * @param {*} publicar 
     * @param {*} imagen 
     */
    editarJuego(id, nombre, precio, fecha, descripcion, rol, publicar, imagen){
        
        this.modelo.editarJuego(id, nombre, precio, fecha, descripcion, rol, publicar, imagen)

    }

    fechaUI(){
        this.fecha = $('#inputFecha')
        this.fecha.datepicker()
    }

    getModelo(){

        return this.modelo
        
    }

}

const app = new Controlador()