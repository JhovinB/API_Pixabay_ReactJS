import React ,{useState,useEffect}from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //State de busqueda
  const [busqueda, getBusqueda] = useState('');
  const [imagenes, getImagenes] = useState([]);

  //Paginador
  const [paginaActual, getPaginaActual] = useState(1);
  const [totalPaginas, getTotalPaginas] = useState(5);

  //Vuelva a ejecutar
  useEffect(() => {
    
    const consultarApi= async()=>{
      if(busqueda==='') return;
      const imagenesPorPagina=30;
      const key=`22226552-b03e0b74a8ffc5538228e5b7a`;
      const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}
      &per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      getImagenes(resultado.hits);

      //Calcular Total de paginas
      const calTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina);
      getTotalPaginas(calTotalPaginas);

      //Mover la pantalla hacia arriba cada q doy el button siguiente o anterior
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'})
      
    }
    consultarApi();

  }, [busqueda,paginaActual])


  const paginaAnterior=()=>{
    const nuevaPaginaActual = paginaActual-1;
    //Validar pagina nosea negativo
    if (nuevaPaginaActual===0)return;

    getPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente=()=>{
    const nuevaPaginaActual = paginaActual+1;
    //Validar pagina nosea negativo
    if (nuevaPaginaActual>totalPaginas)return;

    getPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imágenes
        </p>
        <Formulario
          getBusqueda={getBusqueda} getPaginaActual={getPaginaActual}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        {(paginaActual===1)?null: 
        (<button type="button" 
        className="btn btn-info mr-1"
        onClick={paginaAnterior}>
          Anterior &laquo;
        </button>)}

        {(paginaActual===totalPaginas||imagenes.length===0)?null:(
          <button type="button" className="btn btn-info"
          onClick={paginaSiguiente}>
           Siguiente &raquo;
         </button>
        )}
        
      </div>
    </div>
  );
}
export default App;
