
import { Vista } from "./vista.js"

export class VistaCrud extends Vista{


    constructor(controlador, div){

        super(div)
        this.controlador = controlador

        /*Observamos al modelo*/
        this.modelo = this.controlador.getModelo()
        this.modelo.registrar(this.actualizar.bind(this))

        this.divJuegos = document.getElementById('divJuegos')
        
        this.btnAnadir = document.getElementById('anadirJuego')
   

        this.btnAnadir.addEventListener('click', this.mostrarFormulario.bind(this))
        
    }
  
    mostrarFormulario(){

        this.controlador.vistaFormulario()

    }


    actualizar(){

        this.limpiarPantalla()

        let datos = this.modelo.getDatos()
        
        console.log(datos)
       
        if (datos != null){
            for(let dato of datos){

                console.log('hay datos')
                //Div padre
                let div = document.createElement('div')
                div.classList.add('divPrueba')
                this.divJuegos.appendChild(div)

                //Imagen del div padre
                let img = document.createElement('img')
                
                if (dato.imagen){
                    img.classList.add('imagenJuego')
                    img.setAttribute('src', dato.imagen)
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
                rol.textContent = 'Acción'
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
            console.log('No hay datos en IndexedDB')
        }
    }


    limpiarPantalla(){

        while(this.divJuegos.firstElementChild){
            this.divJuegos.firstElementChild.remove()       
        }
    }

    borrarJuego(id){
        this.controlador.borrarJuego(id)
        this.actualizar()
    }

    modificarJuego(dato){
        this.controlador.modificarJuego(dato)
        this.actualizar()
    }

}