document.addEventListener('DOMContentLoaded', () => {

    const
        list = document.querySelectorAll('ul.contact-list > li'),
        leftBtn = document.querySelector('.arrow-container .left-arrow'),
        rightBtn = document.querySelector('.arrow-container .right-arrow');

    let currentIndex = 0; // Track the current visible list item

    // Initialize: show the first item and disable the left button

    function showListItem() {
        list.forEach(item => item.classList.add('hide'));
        list[currentIndex].classList.remove('hide');
    }

    function initialize() {
        showListItem();
        updateButtonStates();
    }

    // Update the active class for the buttons
    function updateButtonStates() {
        leftBtn.classList.toggle('active', currentIndex > 0); // Active only if not at the first item
        leftBtn.classList.toggle('disable-btn', currentIndex === 0);
        rightBtn.classList.toggle('active', currentIndex < list.length - 1); // Active only if not at the last item
        rightBtn.classList.toggle('disable-btn', currentIndex >= list.length - 1);
    }

    // Add click events to the buttons
    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            if (!(currentIndex - 1 <= -1)) {
                currentIndex--; // Move to the previous item
                updateButtonStates();
                showListItem();
            }
        }
    });

    rightBtn.addEventListener('click', () => {
        if (currentIndex < list.length - 1) {
            currentIndex++; // Move to the next item
            updateButtonStates();
            showListItem();
        }
    });

    // Initialize the functionality

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1300) {
            initialize();
        } else {
            list.forEach(item => item.classList.remove('hide'));
        }
    })

    if (window.innerWidth <= 1300) {
        initialize();
    }

})