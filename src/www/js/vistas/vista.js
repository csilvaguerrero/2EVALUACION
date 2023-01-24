
export class Vista{



	constructor(div){

		this.div = div

	}

	/**
	 *  Método utilizado para mostrar y ocultar vistas.
	 * @param {*} ver 
	 */
	mostrar(ver){

		if(ver){

			this.div.show()
			
		}
		else{
	
			this.div.hide()
		}
        
	}
}