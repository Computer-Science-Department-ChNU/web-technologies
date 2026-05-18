'use strict';

/* Функція приймає об’єкт із даними форми, наприклад:
const formData = {
    name: 'Artem',
    email: 'test@gmail.com',
    username: 'artem',
    password: 'Qwerty123!',
    repassword: 'Qwerty123!',
    year: '2000',
    month: '5',
    day: '10',
    phone: '+380999999999'
};

 */

function validateRegistrationData(formData) {
    // 1. Створюється об’єкт помилок
    const errors = {};

    // 2. Описуються правила валідації
    // Для кожного поля задаються:
    // - регулярні вирази (regExp)
    // - текст помилки (errMsg)
    // - чи поле обов’язкове (required)
    // - куди записувати помилку (carrier)
    const criterions = {
        name: {
            matchTests: [
                {
                    regExp: /^[a-zа-я\u0451\u0491\u0454\u0456\u0457\u2019]*$/i,
                    errMsg: 'Should contain only letters latin/cyrillic'
                }
            ],
            carrier: 'name',
            required: true
        },

        email: {
            matchTests: [
                {
                    regExp: /^[a-z0-9_-]+@[a-z0-9.-]+\.[a-z0-9.-]{2,}$/ig,
                    errMsg: 'Wrong email format'
                }
            ],
            carrier: 'email',
            required: true
        },

        username: {
            matchTests: [
                {
                    regExp: /^[a-zа-я\u0451\u0491\u0454\u0456\u0457\u2019]*$/i,
                    errMsg: 'Should contain only letters latin/cyrillic'
                }
            ],
            carrier: 'username',
            required: true
        },

        password: {
            matchTests: [
                {
                    regExp: /[A-Z]/,
                    errMsg: 'Should contain at least one uppercase letter'
                },
                {
                    regExp: /[^a-z0-9]+/i,
                    errMsg: 'Should contain at least one special character'
                },
                {
                    regExp: /\d+/i,
                    errMsg: 'Should contain at least one digit'
                },
                {
                    regExp: /.{8,}/i,
                    errMsg: 'Should contain at least 8 characters'
                }
            ],
            carrier: 'password',
            required: true
        },

        repassword: {
            matchTests: [
                {
                    regExp: /^(?!\s*$).+/,
                    errMsg: 'Require'
                }
            ],
            carrier: 'repassword',
            required: true
        },

        year: {
            matchTests: [
                {
                    regExp: /^\d{4}$|^$/,
                    errMsg: 'Invalid date'
                }
            ],
            carrier: 'birthday',
            required: false
        },

        month: {
            matchTests: [
                {
                    regExp: /^\d{0,2}$/,
                    errMsg: 'Invalid date'
                }
            ],
            carrier: 'birthday',
            required: false
        },

        day: {
            matchTests: [
                {
                    regExp: /^\d{0,2}$/,
                    errMsg: 'Invalid date'
                }
            ],
            carrier: 'birthday',
            required: false
        },

        phone: {
            matchTests: [
                {
                    regExp: /^[0-9+()-\s]*$/,
                    errMsg: 'Wrong number'
                }
            ],
            carrier: 'phone',
            required: false
        }
    };

    // Перебір усіх полів - функція проходиться по всіх полях форми.
    for (const field in formData) {
        // Виконуються перевірки
        if (criterions[field]) {
            const matchTestsArr = criterions[field].matchTests;
            const carrier = criterions[field].carrier;
            const required = criterions[field].required;

            matchTestsArr.forEach( claim => {
                const isTestOk = claim.regExp.test(formData[field]);
                if (!isTestOk) errors[carrier] = claim.errMsg;
                if (required && !formData[field]) errors[carrier] = 'Required';
            });
        }
    }

    if (formData.password !== formData.repassword) {
        errors.repassword = 'Should be equal to password';
    }

    const grantedDate = new Date(formData.year, formData.month, formData.day);
    if (grantedDate > Date.now()) {
        errors.birthday = 'Date should not be in future';
    }

    return errors;
}
