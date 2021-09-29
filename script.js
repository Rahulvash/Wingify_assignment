const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const form = document.querySelector('#signup');


//clearAll
const clearAll = () => {
    const formField = document.querySelectorAll('.inputField');
    const datePlaceholder = document.querySelector('#datePlaceholder');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    const individual = document.querySelector('#individual');
    const agency = document.querySelector('#agency');
    const yesValue = document.querySelector('#yesValue');
    const noValue = document.querySelector('#noValue');
    emailEl.value = '';
    passwordEl.value = '';
    datePlaceholder.value = '';
    month.value = '03';
    year.value = '1995';
    individual.checked = true;
    agency.checked = false;
    yesValue.checked = true;
    noValue.checked = false;
    formField[0].classList.remove('success');
    formField[1].classList.remove('success');
}



//validate email
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Please add a valid email address.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Please add a valid email address.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}


//check password
const checkPassword = () => {

    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};


//to check email address is valid or not
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


//to check if the password is strong or not
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};



//isRequired function:-
const isRequired = value => value === '' ? false : true;

//IsBetween function to check the length
const isBetween = (length, min, max) => length < min || length > max ? false : true;


//error function
const showError = (input, message) => {
    // get the form-field element
    
    const nextSib = input.nextSibling.nextElementSibling;

    nextSib.classList.remove('hide')

    // input.classList.remove('hide');
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('span');
    error.textContent = message;
};


//success function:-
const showSuccess = (input) => {
    // get the form-field element

    const nextSib = input.nextSibling.nextElementSibling;

    nextSib.classList.add('hide')

    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('span');
    error.textContent = '';
}

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();

    let isFormValid = isEmailValid && isPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        alert('form submitted');
        clearAll();
    }
});


const debounce = (fn, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));


