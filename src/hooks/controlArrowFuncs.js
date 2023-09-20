const controlMouseEnter = (setMouseOver) => {
    setMouseOver(true);
}

const controlMouseLeave = (setMouseOver) => {
    setMouseOver(false);
}

const controlArrow = (direction, containerImgs) => {
    const menu = containerImgs.current;
    const scrollAmount = 1000; // Distancia desplazada
    if (menu) {
        if (direction === 'izq') {
            menu.scrollLeft -= scrollAmount;
        } else if (direction === 'der') {
            menu.scrollLeft += scrollAmount;
        }
    }
}

export { controlMouseEnter, controlMouseLeave, controlArrow };