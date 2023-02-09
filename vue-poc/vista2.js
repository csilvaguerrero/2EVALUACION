export function VistaJuegos(controlador){
	return Vue.createApp({
		data() {
			return {
				controlador: controlador,
				titulo: 'Lista',
				clase: 'inactivo',
				datos: []
			}
		},
		template:
		`
		<div :class=clase>
			<header id="cabeceraPagina">
				<img src="img/logopg.PNG" id="logo">
				<button id="volver">Volver</button>
				<button id="anadirJuego" @click="formularioJuego">+</button>
			</header>
			<div>
				<input type="text" id="buscadorJuegos" placeholder="🔍︎   Buscar juego"/>
				<div class="divPrueba" v-for="juego in datos">
                    <img :src="juego.imagen" class="imagenJuego">
                    <p class="pNombre">
                        {{juego.nombre}}
                    </p>
                    <p class="pFecha">
                        {{juego.fecha}}
                    </p>
                    <p class="pRol">
                        {{juego.rol}}
                    </p>
                    <div class="divBotones">
                        <span>
                            <img src="img/borrar.svg" class="botones" v-on:click="borrarJuego(juego)">
                        </span>                     
                        <span class="jugar">JUGAR</span>
                        <span>
                            <img src="img/modificar.svg" class="botones" v-on:click="modificarJuego(juego)">
                        </span>                        
                    </div>
                </div>
			</div>
		</div>
		`,
		methods: {
			mostrar(activo){
				if (activo)
					this.clase = 'activo'
				else
					this.clase = 'inactivo'
			},
			formularioJuego(){

				this.controlador.cambiarAVista3()

			},
			borrarJuego(juegos){

				this.controlador.borrarFila(juegos)

			},
			modificarJuego(juego){
	
				this.controlador.modificarFila(juego)
				
			}
		}
	})
}