export function VistaFormulario(controlador){

    
    

    return Vue.createApp({
    data() {
        return {
            controlador: controlador,
            titulo: 'Vista 3',        
            clase: 'inactivo',
            subirImagen: null,
            juego: {
                nombre: null,
                precio: null,
                fecha: null,
                descripcion: null,
                rol: null,
                publicar: null
            }
        }
    },
    template:
    `
    <div id=divFormulario :class=clase>
        <h2 id="tituloFormulario">AÑADIR JUEGOS</h2>
        <input type="file" v-on:change="imagen" id="imagenJuego"/>
        <label for="imagenJuego" id="labelImagen">
            <img src="img/imagen.svg" class="imagenLabel">
            Selecciona una imagen
            <img src="img/imagen.svg" class="imagenLabel">
        </label>
        <label for=inputNombre class="labelFormulario">
            Nombre
            <input type=text v-model=juego.nombre id="inputNombre"/>
        </label>
        <br><br>
        <label for="inputPrecio" class="labelFormulario">
            Precio de venta
            <input type=number v-model=juego.precio id="inputPrecio"/>
        </label>
        <br><br>
        <label class="labelFormulario" for="inputFecha">
            Fecha de lanzamiento
            <input type=date v-model=juego.fecha id="inputFecha"/>
        </label>
        <br><br>
        <label class="labelFormulario" for="areaDescripcion">
            Descripción
            <textarea id=areaDescripcion v-model=juego.descripcion></textarea>
        </label>
        <br><br>
        <label class="labelFormulario">
            Rol del juego
            <select id="selectFormulario" v-model=juego.rol>
                <option value="Acción">Acción</option>
                <option value="Aventura">Aventura</option>
                <option value="Misterio">Misterio</option>
                <option value="Miedo">Miedo</option>
                <option value="Ficción">Ficción</option>
            </select>
        </label>
        <br><br>
        <label class="labelFormulario" for="selectPublicar">
            ¿Quieres publicar tu juego ahora?
            <select id="selectPublicar" v-model=juego.publicar>
                <option value="Si">Si</option>
                <option value="No">No</option>
            </select>
        </label>
        <br><br><br><br>
        <button id="btnAnadir" class="btnFormulario" @click="crearJuego">Añadir</button>
    </div>
    `,
    methods: {
        mostrar(activo){
            if (activo)
                this.clase = 'activo'
            else
                this.clase = 'inactivo'
        },
        crearJuego(){
            
            this.controlador.anadirJuego(this.juego, this.subirImagen[0])
            this.controlador.vistaJuegos()

        },
        imagen(e){

            console.log('imagen')
            this.subirImagen = e.target.files || e.dataTransfer.files;
            
        }
    }
})
}