var slideIndex = 1;
timer = setInterval(autoSlide,5000);
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function autoSlide(){
    showSlides(slideIndex += 1);
}

function currentSlide(n) {
    showSlidses(slideIndex = n);
}

function showSlides(n) {
    clearInterval(timer);
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    timer = setInterval(autoSlide,5000);
}
