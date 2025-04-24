document.addEventListener('DOMContentLoaded', () => {

    const
        listItems = document.querySelectorAll('.violations-list > li'),
        btnItems = document.querySelectorAll('.btns-wrapper .btn'),
        selectItems = document.querySelectorAll('select'),
        changeBtnList = document.querySelectorAll('.violations-detail .btns-wrapper button'),
        userData = document.querySelector('#user-data'),
        violationData = document.querySelector('#violation-data'),
        continueBtn = document.querySelector('#continue-btn'),
        itemsToHideContinueBtn = document.querySelectorAll('.to-hide-continue-btn'),
        itemsToShowContinueBtn = document.querySelectorAll('.to-show-continue-btn');

    changeBtnList.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            if(i === 0) {
                userData.classList.remove('hide');
                violationData.classList.add('hide');
            } else {
                userData.classList.add('hide');
                violationData.classList.remove('hide');
            }
        })
    })

    continueBtn.addEventListener('click', () => {
        itemsToHideContinueBtn.forEach(item => item.classList.add('hide'));
        itemsToShowContinueBtn.forEach(item => item.classList.remove('hide'));
        userData.classList.add('hide');
        violationData.classList.remove('hide');
    })

    selectItems.forEach(item => {
        item.addEventListener('change', () => {
            item.classList.add('selected');
        })
    })

    btnItems.forEach(item => {
        item.addEventListener('click', () => {
            btnItems.forEach(item => item.classList.remove('active'));
            item.classList.add('active');
        })
    })

    function hideListItems() {
        listItems.forEach(item => {
            item.querySelector('.show-more').classList.add('hide');
        })
    }
    hideListItems();

    listItems.forEach(item => {
        item.querySelector('.wrapper').addEventListener('click', () => {
            item.querySelector('.show-more').classList.toggle('hide');
            item.querySelector('.more').classList.toggle('active');
        })
    })

    var phoneNumberInput1Mask = IMask(
        document.getElementById('phone-number'),
        {
            mask: Number,
        });

})