function select(id) {
    return document.getElementById(id);
}

const form = select('form');
const username = select('username');
const email = select('email');
const password = select('password');
const password2 = select('password2');

const checkEmail = function () {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email.value).toLowerCase())) {
        console.log('true email')
        showSuccess(email);
    } else {
        showError(email, 'Email is not Valid');
    }
}

const checkPassword = function (input) {
    if (input.value.length > 5) {
        input.parentElement.classList.remove('error');
        showSuccess(input);
        return true
    } else {
        showError(input, `${password.id} must be at least 6 character.`);
        return false
    }
}
const checkPasswordMatch = function (password1, password2) {
    if (checkPassword(password1) && checkPassword(password2)) {
        if (password1.value === password2.value) {
            showSuccess(password1)
            showSuccess(password2)
        } else {
            showError(password1, 'password does not match')
            showError(password2, 'password does not match')
        }
    } else {
        if (password1.value.length < 6) {
            showError(password1, 'Password must at least 6 character')
        } else if (password2.value.length < 6) {
            showError(password2, 'Password must at least 6 character')
        } else {
            showError(password1, 'Password must at least 6 character')
            showError(password2, 'Password must at least 6 character')
        }
    }
}

const isRequired = function (inputArr) {
    inputArr.forEach((item) => {
        if (!item.value.length) {
            showError(item, `${item.id} is required`)
            return false
        }
        else {
            showSuccess(item)
            item.parentElement.classList.remove('error');
            return true
        }
    })
}
const showError = function (input, msg) {
    input.parentElement.classList.add('error');
    input.nextElementSibling.innerText = msg;

}
const showSuccess = function (input) {
    input.parentElement.classList.add('success')
}

form.addEventListener('submit', function (input) {
    if (!isRequired([username, email, password, password2])) {
        input.preventDefault()
    }
    checkEmail()
    checkPasswordMatch(password, password2);
});

const pass = [password, password2]

pass.forEach((item) => {
    item.addEventListener('input', () => {
        checkPasswordMatch(pass[0], pass[1]);
    })
})

