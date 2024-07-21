// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor effect
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
        cursorBlur.style.top = `${e.clientY}px`;
        cursorBlur.style.left = `${e.clientX}px`;
    });

    // Smooth scrolling to sections
    const navLinks = document.querySelectorAll('#nav h4');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = e.target.innerText.toLowerCase().replace(' ', '-');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});