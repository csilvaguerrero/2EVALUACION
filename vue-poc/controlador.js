import { Menu } from './menu.js'
import { VistaInicio } from './vista1.js'
import { VistaJuegos } from './vista2.js'
import { VistaFormulario } from './vista3.js'
import { VistaModificar } from './vista4.js'
import { Modelo } from './modelo.js'

class Controlador {
	constructor(){

		window.onload = this.iniciar.bind(this)

	}
	iniciar(){

		this.modelo = new Modelo(this)
		
		this.menu = new Menu(this).mount('#nav')

		this.divPrincipal = new VistaInicio(this).mount('#divPrincipal')
		this.divJuegos = new VistaJuegos(this).mount('#divJuegos')
		this.divFormulario1 = new VistaFormulario(this).mount('#divFormulario1')
		this.divModificar = new VistaModificar(this).mount('#divModificar')

		this.cambiarAVista1()
		this.registrar()
		
	}

	
	ocultarVistas(){
		this.divFormulario1.mostrar(false)
		this.divJuegos.mostrar(false)
		this.divPrincipal.mostrar(false)
		this.divModificar.mostrar(false)
	}

	anadirJuego(juego, subirImagen){

		this.modelo.insertar(juego, subirImagen)

	}

	registrar(){

		this.modelo.registrar(this.enviarDatos.bind(this))

	}

	enviarDatos(){

		this.divJuegos.datos = this.modelo.getDatos()

	}

	cambiarAVista1(){

		this.ocultarVistas()
		this.divPrincipal.mostrar(true)
		
	}
	vistaJuegos(){

		this.ocultarVistas()
		this.divJuegos.mostrar(true)

	}

	borrarFila(juegos){

		this.modelo.borrarJuego(juegos)

	}
	modificarFila(juego){

		this.divModificar.juego = juego
		
		this.ocultarVistas()
		this.divModificar.mostrar(true)
		
		
	}

	cambiarJuego(juego){
		
		this.modelo.editarJuego(juego)
		this.ocultarVistas()
		this.divJuegos.mostrar(true)
		
	}

	cambiarAVista3(){
		
		this.ocultarVistas()
		this.divFormulario1.mostrar(true)
		
	}
	insertar(cosa){

		this.modelo.insertar(cosa)

	}


	getModelo(){

        return this.modelo
        
    }
}
new Controlador()
