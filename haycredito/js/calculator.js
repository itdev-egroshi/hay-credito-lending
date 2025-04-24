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
});
