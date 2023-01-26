
export class Modelo{

    constructor(){

        this.baseDatos
        this.lista = []
		this.callbacks = [] 
        this.conexionBD()
		this.iniciar()
    }

    /**
	 * Método que realiza la conexión con la base de datos.
	 */
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

    /**
	 * Método que obtiene todos los datos guardados en IndexedDB.
	 */
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

	/**
	 *  Método que inserta en la base de datos un juego.
	 * @param {*} nombre 
	 * @param {*} precio 
	 * @param {*} fecha 
	 * @param {*} descripcion 
	 * @param {*} rol 
	 * @param {*} publicar 
	 * @param {*} imagen 
	 */
	anadirDatos(nombre, precio, fecha, descripcion, rol, publicar, imagen){

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
					rol: rol,
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
				rol: rol,
				publicar: publicar				
			}
			const almacenar = this.baseDatos.transaction('juegos','readwrite').objectStore('juegos').add(obj);

			almacenar.onsuccess = () => {
				console.log('AÑADIDO SIN IMAGEN')
				this.obtenerDatos()
			}
			
		}
	

	}
	/**
	 *  Método que borra el juego que hemos seleccionado a partir de su id.
	 * @param {*} id 
	 */
	borrarJuego(id){

		const respuesta = this.baseDatos.transaction('juegos','readwrite').objectStore("juegos").delete(id)

		respuesta.onsuccess = () => {
			this.obtenerDatos()
			console.log('SE HA BORRADO')
		}

	}

	/**
	 *  Método que edita el juego según los nuevos valores introduccidos.
	 * @param {*} id 
	 * @param {*} nombre 
	 * @param {*} precio 
	 * @param {*} fecha 
	 * @param {*} descripcion 
	 * @param {*} rol 
	 * @param {*} publicar 
	 * @param {*} imagen 
	 */
	editarJuego(id, nombre, precio, fecha, descripcion, rol, publicar, imagen){
		
		const respuesta = this.baseDatos.transaction('juegos','readwrite').objectStore("juegos").get(id)
			
		respuesta.onerror = (evento) => {

			console.log("Ha habido un error")

		}
		respuesta.onsuccess = (evento)=> {

			const juegos = evento.target.result
				
			if (imagen)
			{
				let reader = new FileReader()
				reader.readAsDataURL(imagen)
			
				reader.onload = () => {
				
					juegos.nombre = nombre
					juegos.precio = precio
					juegos.fecha = fecha
					juegos.descripcion = descripcion
					juegos.rol = rol
					juegos.publicar = publicar
					juegos.imagen = reader.result

					const modificacion = this.baseDatos.transaction('juegos','readwrite').objectStore("juegos").put(juegos)
					this.obtenerDatos()
				}
			
			}
			else{

				juegos.nombre = nombre
				juegos.precio = precio
				juegos.fecha = fecha
				juegos.descripcion = descripcion
				juegos.rol = rol
				juegos.publicar = publicar
				juegos.imagen = null

					const modificacion = this.baseDatos.transaction('juegos','readwrite').objectStore("juegos").put(juegos)
					this.obtenerDatos()

			}
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


	 iniciar(){

		iniciarAEMET()

		function iniciarAEMET(){

			let myArr
		
			/**** Parte de AEMET ****/
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/06015?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbnRvbmlvY2FybG9zbW9ydW5vZ29tZXouZ3VhZGFsdXBlQGFsdW1uYWRvLmZ1bmRhY2lvbmxveW9sYS5uZXQiLCJqdGkiOiI2YjEzOWY1OS0xYmYyLTQ2ZDItYWQwMS0yYTdkMTJlMTVjZWYiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY3MDI2NTU4NywidXNlcklkIjoiNmIxMzlmNTktMWJmMi00NmQyLWFkMDEtMmE3ZDEyZTE1Y2VmIiwicm9sZSI6IiJ9.P8lK0K7lft9YT96TkgvU_ywD2TdxQ51MXqLAR8C-Uc4",
				"method": "GET",
				"headers": {
				"cache-control": "no-cache"
				}
			}
		
			console.log(settings)
			
			$.ajax(settings).done(function (response) {
		
				var settings2 = {
				"async": true,
				"crossDomain": true,
				"url": response.datos,
				"method": "GET",
				"headers": {
					"cache-control": "no-cache"
				}
		
				}
		
				$.ajax(settings2).done(function (response2) {
				console.log(response2)
				myArr = JSON.parse(response2);
				
				AEMET()
				
				});
		
			});
		
			function AEMET(){

				let dialogo = $('#dialogo')
				let td1 = document.getElementsByTagName('td')[0]
				td1.appendChild(document.createTextNode(myArr[0].provincia))
				let td2 = document.getElementsByTagName('td')[1]
				td2.appendChild(document.createTextNode(myArr[0].prediccion.dia[0].estadoCielo[0].descripcion))
				let td3 = document.getElementsByTagName('td')[2]
				td3.appendChild(document.createTextNode(myArr[0].prediccion.dia[0].temperatura.minima+' ºC'))
				let td4 = document.getElementsByTagName('td')[3]
				td4.appendChild(document.createTextNode(myArr[0].prediccion.dia[0].temperatura.maxima+' ºC'))
		
				if (myArr[0].prediccion.dia[0].estadoCielo[0].descripcion == ''){
					td2.style.color = 'red'
					td2.appendChild(document.createTextNode('No hay datos registrados'))
				}
			}
			
		}
	
	}
	
		
}
	

	


