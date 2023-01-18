
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

			const respuesta = indexedDB.open("playgame",1);
		
			respuesta.onsuccess = (event) => {
				
				this.baseDatos = event.target.result		
				this.obtenerDatos()
                console.log('Conectado')

			}
			respuesta.onerror = () => {

				console.log('ERROR');

			}
			respuesta.onupgradeneeded = (evt) => {
				
				this.baseDatos=evt.target.result
				this.baseDatos.createObjectStore('juegos',{keyPath:'id', autoIncrement:true})
                console.log('Creada')
				
			}
		}	
    }

    /*Sacamos todos los datos presentes en la base de datos*/
    obtenerDatos(){
        
		const peticion = this.baseDatos.transaction('juegos', 'readonly').objectStore('juegos').getAll();
		
		peticion.onsuccess = () => {
			this.lista = peticion.result;
			this.avisar()
		}
		peticion.onerror = () => {
			console.error("No se ha podido conectar")
		}
	}

	/*Añade el juego creado a la base de datos*/
	anadirDatos(nombre, precio, fecha, descripcion, publicar, imagen){

		if (imagen)
		{
			let reader = new FileReader()
			reader.readAsDataURL(imagen)
			reader.onload = () =>
			{
				let obj = {
					nombre: nombre,
					precio: precio,
					fecha: fecha,
					descripcion: descripcion,
					publicar: publicar, 
					imagen : reader.result
				}
				const almacenar = this.baseDatos.transaction('juegos','readwrite').objectStore('juegos').add(obj);
	
				almacenar.onsuccess = () => {
					console.log('AÑADIDO CON IMAGEN')
					this.obtenerDatos()
				}
					
			}
		}
		else
		{
			let obj = {
				nombre: nombre,
				precio: precio,
				fecha: fecha,
				descripcion: descripcion,
				publicar: publicar				
			}
			const almacenar = this.baseDatos.transaction('juegos','readwrite').objectStore('juegos').add(obj);

			almacenar.onsuccess = () => {
				console.log('AÑADIDO SIN IMAGEN')
				this.obtenerDatos()
			}
			
		}
	

	}
	
	borrarJuego(id){

		const respuesta = this.baseDatos.transaction('juegos','readwrite').objectStore("juegos").delete(id)

		respuesta.onsuccess = () => {
			this.obtenerDatos()
			console.log('SE HA BORRADO')
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
