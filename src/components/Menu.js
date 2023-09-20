import '../css/menu.css';
import casco1 from '../img/sotocasco_original.jpg';
import casco2 from '../img/sotocasco_2.jpg';
import casco3 from '../img/sotocasco_3.jpg';
import left from '../img/left.png'
import React, {useState, useRef, useEffect } from 'react';
import useCheckVisibility from '../hooks/useCheckVisibility';
import scrollToSection from '../hooks/scrollToSection';
import { controlMouseEnter, controlMouseLeave, controlArrow } from '../hooks/controlArrowFuncs';

function Menu(props) {
  const containerImgs = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const { isFullyVisible } = useCheckVisibility(containerImgs); // Para ver si se ven las 3 imágenes

  const handleMouseEnter = () => {
    controlMouseEnter(setMouseOver);
  };

  const handleMouseLeave = () => {
    controlMouseLeave(setMouseOver);
  };

  const handleArrow = (direction) => {
    controlArrow(direction, containerImgs);
  };


  return (
    <div className='MenuOptions'
    onMouseOver={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
      <div className='img-container' ref={containerImgs}>
        <img src={casco1} onClick={() => scrollToSection(props.topRef)} alt='casco1'/> {/* Referencia de la sección del top */}
        <img src={casco2} onClick={() => scrollToSection(props.compRef)} alt='casco2'/> {/* Referencia de la sección del comp */}
        <img src={casco3} onClick={() => scrollToSection(props.histRef)} alt='casco3'/> {/* Referencia de la sección del hist */}
      </div>
      {mouseOver && !isFullyVisible && (
      <>
        <img src={left} className='flecha flecha-izq' onMouseDown={() => handleArrow('izq')} alt='Flecha hacia izquierda'/>
        <img src={left} className='flecha flecha-der' onMouseDown={() => handleArrow('der')} alt='Flecha hacia derecha'/>
      </>
    )}
    </div>
  );
}

export default Menu;