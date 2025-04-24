document.addEventListener('DOMContentLoaded', () => {
    const calculators = document.querySelectorAll('.calculator'); // Select all calculators

    calculators.forEach((calculator) => {
        // Get the specific inputs and ranges within each calculator
        const inputAmountRange = calculator.querySelector('.calculator-amount-range-input');
        const inputAmount = calculator.querySelector('.calculator-amount-input');
        const inputDateRange = calculator.querySelector('.calculator-date-range-input');
        const inputDate = calculator.querySelector('.calculator-date-input');

        function changeInputMoneyColor() {
            if (!navigator.userAgent.includes("Firefox")) {
                const min = inputAmountRange.min;
                const max = inputAmountRange.max;
                const value = inputAmountRange.value;
                const percentage = ((value - min) / (max - min)) * 100; // Calculate percentage
                inputAmountRange.style.background = `linear-gradient(to right, #CCFF00 ${percentage}%, #909192 ${percentage}%)`;
            }
        }

        function changeInputDateColor() {
            if (!navigator.userAgent.includes("Firefox")) {
                const min = inputDateRange.min;
                const max = inputDateRange.max;
                const value = inputDateRange.value;
                const percentage = ((value - min) / (max - min)) * 100; // Calculate percentage
                inputDateRange.style.background = `linear-gradient(to right, #CCFF00 ${percentage}%, #909192 ${percentage}%)`;
            }
        }

        // Initialize values and colors
        inputDate.value = inputDateRange.value + ' días';
        inputAmount.value = inputAmountRange.value + ' €';
        changeInputMoneyColor();
        changeInputDateColor();

        // Event listeners for dynamic updates
        inputAmountRange.addEventListener('input', function () {
            inputAmount.value = this.value + ' €';
            changeInputMoneyColor();
        });

        inputAmount.addEventListener('change', function () {
            const sanitizedValue = this.value.replaceAll(' ', '').replace('€', '');
            inputAmountRange.value = sanitizedValue;
            changeInputMoneyColor();
        });

        inputDateRange.addEventListener('input', function () {
            inputDate.value = this.value + ' días';
            changeInputDateColor();
        });

        inputDate.addEventListener('change', function () {
            const sanitizedValue = this.value.replaceAll(' ', '').replace('días', '');
            inputDateRange.value = sanitizedValue;
            changeInputDateColor();
        });

        // Add masks for inputs
        IMask(inputAmount, {
            mask: [
                { mask: '' },
                {
                    mask: 'num €',
                    lazy: false,
                    blocks: {
                        num: {
                            mask: Number,
                            max: parseInt(inputAmountRange.max),
                            min: parseInt(inputAmountRange.min),
                            thousandsSeparator: ' ',
                        },
                    },
                },
            ],
        });

        IMask(inputDate, {
            mask: [
                { mask: '' },
                {
                    mask: 'num días',
                    lazy: false,
                    blocks: {
                        num: {
                            mask: Number,
                            max: parseInt(inputDateRange.max),
                            min: parseInt(inputDateRange.min),
                            thousandsSeparator: ' ',
                        },
                    },
                },
            ],
        });
    });

    // Calculate
    const amountText = document.getElementById('amount-text');
    const totalLoanAmount = document.getElementById('total-loan-amount');
    const returnDate = document.getElementById('return-date');

    const calculatorAmountInput = document.querySelectorAll('.calculator-amount-input');
    const calculatorDateInput = document.querySelectorAll('.calculator-date-input');
    const calculatorAmountRangeInput = document.querySelectorAll('.calculator-amount-range-input');
    const calculatorDateRangeInput = document.querySelectorAll('.calculator-date-range-input');
    const arrow = document.querySelectorAll('.arrow');

    calculatorAmountInput.forEach(input => {
        input.addEventListener('input', refreshCalculatorData);
    });
    calculatorDateInput.forEach(input => {
        input.addEventListener('input', refreshCalculatorData);
    });
    calculatorAmountRangeInput.forEach(input => {
        input.addEventListener('change', refreshCalculatorData);
    });
    calculatorDateRangeInput.forEach(input => {
        input.addEventListener('change', refreshCalculatorData);
    });
    arrow.forEach(input => {
        input.addEventListener('click', refreshCalculatorData);
    });

    setTimeout(() => {
        const btnCalcPagination = document.querySelectorAll('.btn-calc-pagination');
        btnCalcPagination.forEach(input => {
            input.addEventListener('click', refreshCalculatorData);
        });
    }, 1000);

    function refreshCalculatorData() {
        const activeSlide = document.querySelector('.swiper-slide.active');

        if (!activeSlide) {
            return false;
        }

        const id = parseInt(activeSlide.querySelector('input[name="cpId"]').value);
        let amount = activeSlide.querySelector('.calculator-amount-input').value;
        amount = parseInt(amount.replace(/[^0-9]/g, ''), 10);

        let date = activeSlide.querySelector('.calculator-date-input').value;
        date = parseInt(date.replace(/[^0-9]/g, ''), 10);

        $.ajax({
            url: '/get-product-calculate',
            method: 'post',
            dataType: 'json',
            data: {
                'details-credit-product': true,
                'id': id,
                'amount': amount,
                'term': date,
                _csrf : $('meta[name="csrf-token"]').attr("content")
            },
            success: function (data) {
                let loanServices = data.commissions_without_promo;
                let loanPercents = Math.floor(data.percent_without_promo);
                let cost = parseInt(amount);
                let loanClosing = (cost + loanPercents + loanServices);

                amountText.innerText = formatNumber(amount) + ' €';
                totalLoanAmount.innerText = formatNumber(loanClosing) + ' €';

                let finishDay = new Date(Date.now() + (((86400000) * date) - 86400000));
                let finishDayDate = finishDay.getDate() < 10 ? `0${finishDay.getDate()}` : finishDay.getDate();
                let finishDayMonth = finishDay.getMonth() + 1 < 10 ? `0${finishDay.getMonth() + 1}` : finishDay.getMonth() + 1;
                returnDate.innerText = `${finishDayDate}.${finishDayMonth}.${finishDay.getFullYear()}`;
            }
        });

        return true;
    }

    setTimeout(() => {
        refreshCalculatorData();
    }, 1000);

    function formatNumber(num) {
        if (!Number.isInteger(num)) {
            num = num.toFixed(2);
        }

        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

});
