
import { Vista } from "./vista.js"

export class VistaCrud extends Vista{


    constructor(controlador, div){

        super(div)
        this.controlador = controlador

        this.modelo = this.controlador.getModelo()
        this.modelo.registrar(this.actualizar.bind(this))

        this.divJuegos = $('#divJuegos')     
        
        this.header = $('#cabeceraPagina')

        this.btnAnadir = $('#anadirJuego')
        this.imgLogo = $('#logo')
   

        this.imgLogo.click(this.volverInicio.bind(this))
        this.btnAnadir.click(this.mostrarFormulario.bind(this))
        
    }
  
    /**
     * Método que nos envía a la vista del formulario.
     */
    mostrarFormulario(){

        this.controlador.vistaFormulario()

    }

    /**
     * Método que nos envía a la vista inicio de la página.
     */
    volverInicio(){

        this.controlador.vistaInicio()      
        this.header.hide()
    }

    /**
     * Método que actualiza las vistas.
     */
    actualizar(){

        this.limpiarPantalla()

        let buscador = $('<input type=text id=buscadorJuegos placeholder="🔍︎   Buscar juego "/>')
        this.divJuegos.append(buscador)
       

        let datos = this.modelo.getDatos()
       
        if (datos != null){
            for(let dato of datos){

                let div = $('<div>')
                div.addClass("divPrueba")
                this.divJuegos.append(div)


                let img = $('<img>')
                
                if (dato.imagen){
                    img.addClass("imagenJuego")
                    img.attr("src", dato.imagen)
                    div.append(img)
                }
                else{
                    img.addClass("imagenJuego")
                    img.attr("src", '../../../../../2EVALUACION/src/www/img/vacio.png')
                    div.append(img)
                }

                let pNombre = $('<p>')
                pNombre.addClass("pNombre")
                pNombre.text(dato.nombre)
                div.append(pNombre)

                let fecha = $('<p>')
                fecha.addClass("pFecha")
                fecha.text(dato.fecha)
                div.append(fecha)


                let rol = $('<p>')
                rol.addClass("pRol")
                rol.text(dato.rol)
                div.append(rol)

                let divBotones = $('<div>')
                divBotones.addClass("divBotones")
                div.append(divBotones)


                let spanBorrar = $('<span>')
                spanBorrar.click(this.borrarJuego.bind(this, dato.id))
 
                let imgBorrar = $('<img>')
                imgBorrar.addClass("botones")
                imgBorrar.attr("src", '../../../../../2EVALUACION/src/www/img/borrar.svg')
                spanBorrar.append(imgBorrar)
                divBotones.append(spanBorrar)
                
                let spanJugar = $('<span>')
                spanJugar.addClass("jugar")
                spanJugar.text("JUGAR")
                divBotones.append(spanJugar)


                let spanModificar = $('<span>')
                spanModificar.click(this.modificarJuego.bind(this, dato))

                let imgModificar = $('<img>')
                imgModificar.addClass("botones")
                imgModificar.attr("src", '../../../../../2EVALUACION/src/www/img/modificar.svg')
                spanModificar.append(imgModificar)
                divBotones.append(spanModificar)
            }
        }
        else{
            console.log('no hay na')
        }
    }

    /**
     * Método que borra todos los elementos presentes en la vista CRUD.
     */
    limpiarPantalla(){

        if (!this.divJuegos.empty()){
            this.divJuegos.empty()       
        }
    }

    /**
     * Método que envía el id del juego que queremos borrar al controlador.
     * @param {*} id 
     */
    borrarJuego(id){
        this.controlador.borrarJuego(id)
        this.actualizar()
    }

    /**
     * Método que envia un objeto con todos los datos del juego a modificar.
     * @param {*} dato 
     */
    modificarJuego(dato){
        this.controlador.modificarJuego(dato)
        this.actualizar()
    }

}