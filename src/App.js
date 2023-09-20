import './App.css';
import Banner from './components/Banner';
import Menu from './components/Menu';
import Top from './components/Top';
import Comp from './components/Comp';
import Hist from './components/Hist';
import { useRef, useState } from "react";
 

function App() {

  const topRef = useRef(null);
  const compRef = useRef(null);
  const histRef = useRef(null);

  return (
    
      <div className='App'>
        <Banner/>
        <Menu topRef={topRef} compRef={compRef} histRef={histRef} /> {/* Enviamos al menú estas referencias como argumento */}
        <div ref={topRef}><Top /></div>   {/* Guardamos la referencia (posición) del top */}
        <div ref={compRef}><Comp /></div>   {/* Guardamos la referencia (posición) del comp */}
        <div ref={histRef}><Hist /> </div>   {/* Guardamos la referencia (posición) del hist */}
      </div>
  );
}

export default App;
