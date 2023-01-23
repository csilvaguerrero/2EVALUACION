
import { Vista } from "./vista.js"

export class VistaCrud extends Vista{


    constructor(controlador, div){

        super(div)
        this.controlador = controlador

        this.modelo = this.controlador.getModelo()
        this.modelo.registrar(this.actualizar.bind(this))

        this.divJuegos = document.getElementById('divJuegos')

        //this.divJuegos = $('#divJuegos')

        //this.header = document.getElementById('cabeceraPagina')
        
        this.header = $('#cabeceraPagina')

        //this.btnAnadir = document.getElementById('anadirJuego')
        //this.imgLogo = document.getElementById('logo')

        this.btnAnadir = $('#anadirJuego')
        this.imgLogo = $('#logo')
   
        //this.imgLogo.addEventListener('click', this.volverInicio.bind(this))
        //this.btnAnadir.addEventListener('click', this.mostrarFormulario.bind(this))

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

        let buscador = document.createElement('input')
        buscador.type = "text"
        buscador.placeholder = "🔍︎   Buscar juego"
        buscador.setAttribute('id', 'buscadorJuegos')
        this.divJuegos.appendChild(buscador)

        let datos = this.modelo.getDatos()
       
        if (datos != null){
            for(let dato of datos){

                let div = document.createElement('div')
                div.classList.add('divPrueba')
                div.style.border = "5px solid white"
                this.divJuegos.appendChild(div)

                let img = document.createElement('img')
                
                if (dato.imagen){
                    img.classList.add('imagenJuego')
                    img.setAttribute('src', dato.imagen)
                    div.appendChild(img)
                }
                else{
                    img.classList.add('imagenJuego')
                    img.setAttribute('src', '../../img/vacio.png')
                    div.appendChild(img)
                }

                let pNombre = document.createElement('p')
                pNombre.classList.add('pNombre')
                pNombre.textContent = dato.nombre
                div.appendChild(pNombre)

                let fecha = document.createElement('p')
                fecha.classList.add('pFecha')
                fecha.textContent = dato.fecha
                div.appendChild(fecha)


                let rol = document.createElement('p')
                rol.classList.add('pRol')
                rol.textContent = dato.rol
                div.appendChild(rol)


                let divBotones = document.createElement('div')
                divBotones.classList.add('divBotones')
                div.appendChild(divBotones)


                let spanBorrar = document.createElement('span')

                spanBorrar.onclick = this.borrarJuego.bind(this, dato.id)

                let imgBorrar = document.createElement('img')
                imgBorrar.classList.add('botones')
                imgBorrar.setAttribute('src', '../../../../../2EVALUACION/src/www/img/borrar.svg')
                spanBorrar.appendChild(imgBorrar)
                divBotones.appendChild(spanBorrar)

                let spanJugar = document.createElement('span')
                spanJugar.classList.add('jugar')
                spanJugar.textContent = 'JUGAR'
                divBotones.appendChild(spanJugar)


                let spanModificar = document.createElement('span')

                spanModificar.onclick = this.modificarJuego.bind(this, dato)

                let imgModificar = document.createElement('img')
                imgModificar.classList.add('botones')
                imgModificar.setAttribute('src', '../../../../../2EVALUACION/src/www/img/modificar.svg')
                spanModificar.appendChild(imgModificar)
                divBotones.appendChild(spanModificar)
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

        while(this.divJuegos.firstElementChild){
            this.divJuegos.firstElementChild.remove()       
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