export function Menu(controlador){

	return Vue.createApp({
		data() {
			return {
				controlador: controlador
			}
		},
		template: '<p><span @click=handler1>Vista 1</span> <span @click=handler2>Vista 2</span> <span @click=handler3>Vista 3</span></p>',
		methods: {
			handler1(evento){
				console.log('handler1')
				this.controlador.cambiarAVista1()
			},
			handler2(evento){
				console.log('handler2')
				this.controlador.cambiarAVista2()
			},
			handler3(evento){
				console.log('handler3')
				this.controlador.cambiarAVista3()
			}
		}
	})	
}