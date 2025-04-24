document.addEventListener('DOMContentLoaded', () => {

    const
        headerMenuBtn = document.querySelector('.header-menu-btn'),
        headerMenuBtnLines = document.querySelector('.header-menu-btn .lines-button'),
        sideMenu = document.querySelector('.side-menu'),
        header = document.querySelector('header');

    function handleSideMenuBtn() {
        headerMenuBtn.classList.toggle('close');
        headerMenuBtnLines.classList.toggle('close');
        header.classList.toggle('open');
        sideMenu.classList.toggle('hide');
        document.querySelector('body').classList.toggle('disable-body');
    }

    headerMenuBtn.addEventListener('click', () => handleSideMenuBtn())

})