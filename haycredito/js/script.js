document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.querySelector('.calc-swiper-next');
    const prevBtn = document.querySelector('.calc-swiper-prev');

    let swiperStepSize;

    if (window.innerWidth <= 361) {
        swiperStepSize = 275;
    } else if (window.innerWidth <= 430) {
        swiperStepSize = 285;
    } else {
        swiperStepSize = 375
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 430) {
            swiperStepSize = 285
        } else if (window.innerWidth <= 361) {
            swiperStepSize = 280
        }else if (window.innerWidth <= 320) {
            swiperStepSize = 270
        } else {
            swiperStepSize = 375
        }
    });

    var mySwiper = new Swiper('.swiper-container', {
        on: {
            slideChangeTransitionStart() {
                const wrapper = this.wrapperEl;
                const currentTransform = window.getComputedStyle(wrapper).transform;
                const match = currentTransform.match(/matrix.*\((.+)\)/);

                if (match) {
                    const matrixValues = match[1].split(', ');
                    const currentX = parseFloat(matrixValues[4]); // Extract current translateX value

                    // Dynamically set step size based on screen width

                    // Calculate the new translateX value
                    const newX = currentX + (this.activeIndex > this.previousIndex ? -swiperStepSize : swiperStepSize);
                    wrapper.style.transitionDuration = '400ms';
                    wrapper.style.transform = `translate3d(${newX}px, 0, 0)`;
                }
            },
        },
        preventInteractionOnTransition: true,
        speed: 400,
        spaceBetween: 60,
        initialSlide: 0,
        autoHeight: false, // Optional: Adjusts height to fit active slide
        direction: 'horizontal',
        effect: 'slide', // Optional: Slide effect
        slidesPerView: 1, // Number of visible slides
        centeredSlides: true,
        slidesOffsetBefore: 0,
        allowTouchMove: false, // Disable swipe interaction
        // Updated Pagination
        pagination: {
            el: '.calc-pagination',
            clickable: true, // Enable click functionality for bullets
            bulletClass: 'btn-calc-pagination',
            bulletActiveClass: 'active',
        },
        // Updated Navigation
        navigation: {
            nextEl: '.calc-swiper-next',
            prevEl: '.calc-swiper-prev',
        },
    });
    // Listen for slide changes to apply 'active' class to the center slide
    mySwiper.on('slideChange', function () {
        // Remove 'active' class from all slides
        mySwiper.slides.removeClass('active');

        // Add 'active' class to the centered slide
        let centerIndex = mySwiper.realIndex;  // Get the index of the centered slide
        let centerSlide = mySwiper.slides[centerIndex];
        centerSlide.classList.add('active');
        updateNavButtons();
    });

    // Initial setting of the 'active' class for the first centered slide
    let initialCenterSlide = mySwiper.slides[mySwiper.realIndex];
    initialCenterSlide.classList.add('active');

    // Function to update the 'active' class on navigation buttons
    function updateNavButtons() {


        // Remove 'active' class from both buttons
        nextBtn.classList.remove('active');
        prevBtn.classList.remove('active');

        // Add 'active' class to the appropriate button based on the current slide
        if (mySwiper.isEnd) {
            prevBtn.classList.add('active');
        } else if (mySwiper.isBeginning) {
            nextBtn.classList.add('active');
        } else {
            nextBtn.classList.add('active');
            prevBtn.classList.add('active');
        }
    }

    updateNavButtons();

});
