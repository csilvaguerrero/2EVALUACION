export class Modelo{
	constructor(){
		
		this.baseDatos
		this.lista = []
		this.callbacks = []
		this.conexionBD() 

	}

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

	insertar(juego, subirImagen){

		if (subirImagen){
		
			console.log(subirImagen)
			let reader = new FileReader()
			reader.readAsDataURL(subirImagen)
			reader.onload = () =>
			{
				let obj = {
					nombre: juego.nombre,
					precio: juego.precio,
					fecha: juego.fecha,
					descripcion: juego.descripcion,
					rol: juego.rol,
					publicar: juego.publicar,
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
				nombre: juego.nombre,
				precio: juego.precio,
				fecha: juego.fecha,
				descripcion: juego.descripcion,
				rol: juego.rol,
				publicar: juego.publicar,
				imagen: null			
			}
			const almacenar = this.baseDatos.transaction('juegos','readwrite').objectStore('juegos').add(obj);

			almacenar.onsuccess = () => {
				console.log('AÑADIDO SIN IMAGEN')
				this.obtenerDatos()
			}
			
		}
	
	}

	borrarJuego(juegos){

		const respuesta = this.baseDatos.transaction('juegos','readwrite').objectStore("juegos").delete(juegos.id)

		respuesta.onsuccess = () => {
			this.obtenerDatos()
			console.log('SE HA BORRADO')
		}

	}
	
	editarJuego(juego){
		
		const respuesta = this.baseDatos.transaction('juegos','readwrite').objectStore("juegos").get(juego.id)
			
		respuesta.onerror = (evento) => {

			console.log("Ha habido un error")

		}
		respuesta.onsuccess = (evento)=> {

			const juegos = evento.target.result
				
			juegos.nombre = juego.nombre
			juegos.precio = juego.precio
			juegos.fecha = juego.fecha
			juegos.descripcion = juego.descripcion
			juegos.rol = juego.rol
			juegos.publicar = juego.publicar
			//juegos.imagen = null

			const modificacion = this.baseDatos.transaction('juegos','readwrite').objectStore("juegos").put(juegos)
			this.obtenerDatos()

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

