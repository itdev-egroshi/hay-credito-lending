document.addEventListener("DOMContentLoaded", () => {

    var phoneNumberRegistrationInputMask = IMask(
        document.getElementById('phone-number-giveaway-modal-input'),
        {
            mask: "+{34} 00 000 0000",
        }
    );
})