document.addEventListener('DOMContentLoaded', function() {
    let logos = document.querySelectorAll('.logo');

    logos.forEach(function(logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});
