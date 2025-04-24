document.addEventListener('DOMContentLoaded', () => {

    const listItems = document.querySelectorAll('ul.faq-list li');
    const showAllBtn = document.querySelector('#show-all-questions');

    listItems.forEach(item => {
        item.addEventListener('click', () => {

            item.classList.toggle('open');
            item.querySelector('.item-open-text').classList.toggle('hide');
            item.querySelector('.plusminus').classList.toggle('active');

        })
    })

    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            const allQuestions = document.querySelectorAll('ul.faq-list li');
            allQuestions.forEach((question) => {
                question.classList.remove('hide');
            });
            showAllBtn.classList.add('hide');
        })
    }

})