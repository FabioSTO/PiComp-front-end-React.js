// Función para mover la pantalla a una sección de la página

const scrollToSection = (elementRef) => {
    window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
    });
};

export default scrollToSection;
