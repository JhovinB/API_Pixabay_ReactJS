import React,{useState} from 'react';
import Error from './Error';

const Formulario = ({getBusqueda,getPaginaActual}) => {

    const [termino,getTermino]=useState('');
    const [error,getError]=useState(false);

    const buscarImagenes=e=>{

        e.preventDefault();

        //Validar
        if (termino.trim()==='') {
            getError(true);
            return;
        }
        getError(false);
        //Envio al componente principal+
        getBusqueda(termino);

        //Vuelve ala pagina inicial de la misma busqueda
        getPaginaActual(1);


    }

    return (
        <form onSubmit={buscarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={ e => getTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error?<Error mensaje="Agrega un término de búsqueda"/>:null}
        </form>
    );
}
 
export default Formulario;