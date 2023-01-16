
export class Modelo{

    constructor(){

        this.baseDatos
        this.lista = []
		this.callbacks = [] 
        this.conexionBD()
    }

    /*Conexión con la base de datos*/
    conexionBD(){

        const bd = window.indexedDB

		if(window.indexedDB){

			const respuesta = indexedDB.open("DatosJuegos",1);
		
			respuesta.onsuccess = (event) => {
				
				this.baseDatos = event.target.result		
				//this.obtenerRegistro()
                console.log('Conectado')

			}
			respuesta.onerror = () => {

				console.log('ERROR');

			}
			respuesta.onupgradeneeded = (evt) => {
				
				this.baseDatos=evt.target.result
				this.baseDatos.createObjectStore('Juegos',{keyPath:'id', autoIncrement:true})
                console.log('Creada')
				
			}
		}	
    }

    /*Sacamos todos los datos presentes en la base de datos*/
    obtenerRegistro(){
        
		const peticion = this.baseDatos.transaction('DatosJuegos', 'readonly').objectStore('Juegos').getAll();
		
		peticion.onsuccess = () => {
			this.lista = peticion.result;
			this.avisar()
		}
		peticion.onerror = () => {
			console.error("No se ha podido conectar")
		}
	}

    registrar(callback){

        this.callbacks.push(callback)

	}

	avisar(){

		for(let callback of this.callbacks)
		callback()

	}

    getDatos(){

        return this.lista

     }
}