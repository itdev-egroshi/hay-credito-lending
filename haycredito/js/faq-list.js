document.addEventListener('DOMContentLoaded', () => {
    const listOfListsItems = document.querySelectorAll('ul.faq-lists > li');
    const listItems = document.querySelectorAll('ul.faq-list > li');

    listOfListsItems.forEach(list => {
        const clickToggle = list.querySelector('.wrapper');
        clickToggle.addEventListener('click', (e) => {
            // Only trigger if clicking directly on the wrapper (not a nested item)
            if (e.target === clickToggle || clickToggle.contains(e.target)) {
                list.classList.toggle('open');
                list.querySelector('.content-to-show').classList.toggle('hide');
                list.querySelector('.plusminus').classList.toggle('active');
            }
        });
    });

    listItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up to parent
            item.classList.toggle('open');
            item.querySelector('.item-open-text').classList.toggle('hide');
            item.querySelector('.plusminus').classList.toggle('active');
        });
    });
});