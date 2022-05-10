const slider = document.getElementById("slider");

// Get data from JSON file
testimonials = data;

// CREATE A SLIDE FOR EACH TESTIMONIAL
for(let i = 0; i < testimonials.length; i++) {
  const newLi = document.createElement("li");
  newLi.id = `slide-${i+1}`
  newLi.className = "slide";
  if(i > 0) {
    newLi.classList.add("slide-right", "fade");
  }
  newLi.innerHTML = `<div class="slide-container">
    <div class="slide-img">
      <div class="slide-img-container">
        <div class="img-shadow">
          <img class="profile" src="${testimonials[i].image}" alt="${testimonials[i].name}">
          <div class="slide-control" data-carousel>
            <span class="prev" data-carousel-button="prev">
              <img src="/images/icon-prev.svg" alt="">
            </span>
            <span class="next round" data-carousel-button="next">
              <img src="/images/icon-next.svg" alt="">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-text">
      <div class="slide-text-container">
        <img src="/images/pattern-quotes.svg" alt="">
        <p class="quote">“${testimonials[i].quote}”</p>
        <p class="citation">
          <span class="name">${testimonials[i].name}</span>
          <span class="title">${testimonials[i].profession}</span>
        </p>
      </div>
    </div>
  </div>

  <img class="pattern-curve" src="/images/pattern-curve.svg" alt="">`
  slider.appendChild(newLi);
}

// SLIDE CONTROLS
const slideControls = document.querySelectorAll(".slide-control");
const btnControls = document.querySelectorAll(".slide-control span");
const prevBtns = document.querySelectorAll(".slide-control span.prev");
const nextBtns = document.querySelectorAll(".slide-control span.next");
const slides = document.querySelectorAll(".slider .slide");
let slideIndex = 0;
let slideDirection;
let activeSlide;

slides[0].classList.add("active");

btnControls.forEach(function(button) {
  button.addEventListener("click", function() {

    // INCREMENT SLIDE
    if(button.dataset.carouselButton === "next"){
      if(slideIndex < slides.length - 1) {
        changeSlides(1);
        styleBtns()
      }
    } else if(button.dataset.carouselButton === "prev") {
      if(slideIndex > 0){
        changeSlides(0);
        styleBtns()
      }
    }

    function changeSlides(slideDirection) {
      slideDirection ? slideIndex++ : slideIndex--;
      // SET ACTIVE SLIDE
      activeSlide = slides[slideIndex];
      const deactivate = [];
      // DEACTIVATE SLIDE
      if(slides[slideIndex - 1]) {
        deactivate.push(slides[slideIndex - 1]);
      }
      if(slides[slideIndex + 1]) {
        deactivate.push(slides[slideIndex + 1]);
      }
      setTimeout(() => {
        deactivate.forEach(function(slide) {
          slide.classList.remove("active")
        })
      }, "1000");
        if(activeSlide) {
          activeSlide.classList.add("active")
        };

        for(let i = slideIndex; i >= 0; i--) {
          slides[i].classList.add("slide-left");
        }
        for(let i = slideIndex; i < slides.length; i++) {
          slides[i].classList.add("slide-right");
        }
        activeSlide.classList.remove("slide-left");
        activeSlide.classList.remove("slide-right");
      activeSlide.classList.remove("fade");
      deactivate.forEach(function(slide) {
        slide.classList.add("fade")
      })
    }
    function styleBtns() {
      slideControls.forEach(function(control) {
        control.style.opacity = "0";
        setTimeout(function() {
          control.style.opacity = "1";
        }, "600");
      })
      if(slideIndex === 0) {
        prevBtns.forEach(function(btn) {
          setTimeout(function() {
            btn.style.display = "none";
          }, "200");

        })
        nextBtns.forEach(function(btn) {
          setTimeout(function() {
            btn.classList.add("round");
          }, "200");
        })
      } else if(slideIndex === slides.length - 1) {
        nextBtns.forEach(function(btn) {
          setTimeout(function() {
            btn.style.display = "none";
          }, "200");
        })
        prevBtns.forEach(function(btn) {
          setTimeout(function() {
            btn.classList.add("round");
          }, "200");
        })
      } else {
        nextBtns.forEach(function(btn) {
          setTimeout(function() {
            btn.classList.remove("round");
          }, "200");
        })
        prevBtns.forEach(function(btn) {
          setTimeout(function() {
            btn.style.display = "block";
          }, "200");
        })
        prevBtns.forEach(function(btn) {
          setTimeout(function() {
            btn.classList.remove("round");
          }, "200");
        })
        nextBtns.forEach(function(btn) {
          setTimeout(function() {
            btn.style.display = "block";
          }, "200");
        })
      }
    }
    // ARROW KEY CONTROLS
    // document.addEventListener('keydown', function(e) {
    //   switch (e.keyCode) {
    //       case 37:
    //       // Right arrow key
    //           changeSlides(0);
    //           break;
    //       case 39:
    //       // Left arrow key
    //           changeSlides(1);
    //           break;
    //   }
    // });
  });
});
