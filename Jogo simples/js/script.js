const astro = document.querySelector('.astro');
const alien = document.querySelector('.alien');

const jump = () => {
    astro.classList.add('jump');

    setTimeout(() => {
        astro.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const alienPosition = alien.offsetLeft; 
    const astroPosition = window.getComputedStyle(astro.bottom); 

    if (alienPosition <= 120 && alienPosition > 0) { 
        alien.style.animation = 'none'; 
        alien.style.left = `${alienPosition}px`; 

        clearInterval(loop)
        alert('Game Over!');
    }
}, 10);

document.addEventListener('keydown', jump);
