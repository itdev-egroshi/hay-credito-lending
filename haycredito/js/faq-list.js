document.addEventListener('DOMContentLoaded', () => {

    const listItems = document.querySelectorAll('ul.faq-list li');
    listItems.forEach(item => {
        item.addEventListener('click', () => {

            item.classList.toggle('open');
            item.querySelector('.item-open-text').classList.toggle('hide');
            item.querySelector('.plusminus').classList.toggle('active');

        })
    })


})