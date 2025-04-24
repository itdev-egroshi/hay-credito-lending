document.addEventListener('DOMContentLoaded', () => {
    const
        list = document.querySelectorAll('ul.best-blog-list > li'),
        leftBtn = document.querySelector('.arrow-container .left-arrow'),
        rightBtn = document.querySelector('.arrow-container .right-arrow');

    let currentIndex = 0; // Track the first visible item index
    let itemsPerPage = 3; // Default number of items to show per view

    // Show the current range of items
    function showListItems() {
        list.forEach((item, index) => {
            if (index >= currentIndex && index < currentIndex + itemsPerPage) {
                item.classList.remove('hide'); // Show items in the current range
            } else {
                item.classList.add('hide'); // Hide others
            }
        });
    }

    // Initialize: Show the first range and update buttons
    function initialize() {
        showListItems();
        updateButtonStates();
    }

    // Update button states based on the current index
    function updateButtonStates() {
        leftBtn.classList.toggle('active', currentIndex > 0); // Active only if not at the first range
        leftBtn.classList.toggle('disable-btn', currentIndex === 0);
        rightBtn.classList.toggle('active', currentIndex + itemsPerPage < list.length); // Active only if not at the last range
        rightBtn.classList.toggle('disable-btn', currentIndex + itemsPerPage >= list.length);
    }

    // Handle left button click
    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex = Math.max(0, currentIndex - itemsPerPage); // Move to the previous range
            updateButtonStates();
            showListItems();
        }
    });

    // Handle right button click
    rightBtn.addEventListener('click', () => {
        if (currentIndex + itemsPerPage < list.length) {
            currentIndex = Math.min(list.length - itemsPerPage, currentIndex + itemsPerPage); // Move to the next range
            updateButtonStates();
            showListItems();
        }
    });

    // Handle resizing and adjust items per page
    function handleResize() {
        if (window.innerWidth <= 1300) {
            itemsPerPage = 1; // Show 1 item per view for smaller screens
        } else {
            itemsPerPage = 3; // Default: Show 3 items per view
        }
        currentIndex = 0; // Reset to the first item
        initialize(); // Reinitialize to apply changes
    }

    // Attach resize event listener
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize(); // Call on load to set up based on the current screen size






    // List number pagination

    const paginationNumbers = document.getElementById("pagination-numbers");
    const paginatedList = document.getElementById("paginated-list");
    const listItems = paginatedList.querySelectorAll("li");
    const nextButton = document.getElementById("blog-list-next");
    const prevButton = document.getElementById("blog-list-prev");

    let paginationLimit = 8;
    const maxDisplayedPages = 4; // Максимальное количество отображаемых страниц пагинации
    let pageCount = Math.ceil(listItems.length / paginationLimit);
    let currentPage = 1;

    const disableButton = (button) => {
        button.classList.add("disabled");
        button.setAttribute("disabled", true);
    };

    const enableButton = (button) => {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
    };

    const handlePageButtonsStatus = () => {
        if (currentPage === 1) {
            disableButton(prevButton);
        } else {
            enableButton(prevButton);
        }

        if (currentPage === pageCount) {
            disableButton(nextButton);
        } else {
            enableButton(nextButton);
        }
    };

    const handleActivePageNumber = () => {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            button.classList.remove("active-pagination-number");
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex === currentPage) {
                button.classList.add("active-pagination-number");
            }
        });
    };

    const appendPageNumber = (index) => {
        const pageNumber = document.createElement("button");
        pageNumber.className = "pagination-number";

        pageNumber.innerHTML = index;

        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);

        paginationNumbers.appendChild(pageNumber);
    };

    const addEllipsis = () => {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.innerHTML = "...";

        paginationNumbers.appendChild(ellipsis);
    };

    const getPaginationNumbers = () => {
        paginationNumbers.innerHTML = ""; // Очищаем существующие кнопки пагинации

        if (pageCount <= maxDisplayedPages) {
            for (let i = 1; i <= pageCount; i++) {
                appendPageNumber(i);
            }
        } else {
            if (currentPage <= Math.ceil(maxDisplayedPages / 2)) {
                for (let i = 1; i <= maxDisplayedPages - 1; i++) {
                    appendPageNumber(i);
                }
                addEllipsis();
                appendPageNumber(pageCount);
            } else if (currentPage >= pageCount - Math.floor(maxDisplayedPages / 2)) {
                appendPageNumber(1);
                addEllipsis();
                for (let i = pageCount - maxDisplayedPages + 2; i <= pageCount; i++) { // Исправлено: изменено maxDisplayedPages + 3 на maxDisplayedPages + 2
                    appendPageNumber(i);
                }
            } else {
                appendPageNumber(1);
                addEllipsis();
                for (let i = currentPage - Math.floor(maxDisplayedPages / 3); i <= currentPage + Math.floor(maxDisplayedPages / 3); i++) {
                    appendPageNumber(i);
                }
                addEllipsis();
                appendPageNumber(pageCount);
            }
        }

        // Добавляем обработчики событий для новых кнопок пагинации
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));
            button.addEventListener("click", () => {
                setCurrentPage(pageIndex);
            });
        });
    };

    const setCurrentPage = (pageNum) => {
        if(pageNum > pageCount || pageNum < 1) return;
        currentPage = pageNum;

        handlePageButtonsStatus();

        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;

        listItems.forEach((item, index) => {
            item.classList.add("hide");
            if (index >= prevRange && index < currRange) {
                item.classList.remove("hide");
            }
        });

        paginationNumbers.innerHTML = "";
        getPaginationNumbers();
        document.querySelectorAll(".pagination-number").forEach((button) => {
            button.addEventListener("click", () => {
                const pageIndex = Number(button.getAttribute("page-index"));
                setCurrentPage(pageIndex);
            });
        });
        handleActivePageNumber();

    };

    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener("click", () => {
        setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
    });

    function handleBlogListOnResize() {
        if (window.innerWidth <= 800) {
            paginationLimit = 4; // Show 1 item per view for smaller screens
        } else {
            paginationLimit = 8; // Default: Show 3 items per view
        }
        pageCount = Math.ceil(listItems.length / paginationLimit);
        getPaginationNumbers();
        setCurrentPage(1);
    }

    // Attach resize event listener
    window.addEventListener('resize', handleBlogListOnResize);

    // Initial setup
    handleBlogListOnResize(); // Call on load to set up based on the current screen size
});
