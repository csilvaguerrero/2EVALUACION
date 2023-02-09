export function VistaInicio(controlador){

		return Vue.createApp({
		data() {
			return {
				controlador: controlador,
				titulo: 'Vista 1',
				clase: 'inactivo'
			}
		},
		template: 
		`	
		<div :class=clase>	
			<div>
			<img src="img/logo.png" id="piepagina">
			</div>
			<div id="divIntroduccion">
			<button id="consultarJuegos" @click="vistaJuegos">Comenzar</button>
			</div>
		</div>		
		`,
		methods: {
			mostrar(activo){
				console.log('llego')
				if (activo)
					this.clase = 'activo'
				else
					this.clase = 'inactivo'
			},
			vistaJuegos(){
				this.controlador.vistaJuegos()
			}
		}
	})
}