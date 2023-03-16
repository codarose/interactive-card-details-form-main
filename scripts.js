const form = document.getElementById("credit-card-form");
const namefield = document.getElementsByClassName("card-holder-name")[0];
const creditcardfield =
  document.getElementsByClassName("credit-card-number")[0];
const expirationfield = document.getElementsByClassName("expiry-date")[0];
const cvvfield = document.getElementsByClassName("cvv-code")[0];
const completedState = document.getElementById("completed-state");

const userNameField = document.getElementById("cardholdername");
const cardNumberField = document.getElementById("cardnumber");
const expirationMonthField = document.getElementById("month");
const expirationYearField = document.getElementById("year");
const cvvField = document.getElementById("cvv");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const userName = document.getElementById("cardholdername").value;
  const cardNumber = document.getElementById("cardnumber").value;

  const expirationMonth = document.getElementById("month").value;
  const expirationYear = document.getElementById("year").value;
  const cvv = document.getElementById("cvv").value;
  const errors = document.querySelectorAll(".input-error-styling");
  if (errors.length === 0) {
    form.style.display = "none";
    completedState.style.display = "block";
    namefield.textContent = userName.match(/.{1,4}/g).join(" ");
    creditcardfield.textContent = cardNumber
      .toString()
      .replace(/\d{4}(?=.)/g, "$& ");
    expirationfield.textContent = `${expirationMonth}/${expirationYear}`;
    cvvfield.textContent = cvv;
  }
});

const resetStateButton = document.getElementById("reset-form");
resetStateButton.addEventListener("click", function () {
  form.style.display = "block";
  completedState.style.display = "none";
});
// Validation Functions
//name validation

const userNameError = document.getElementById("name-error");
// namefield.addEventListener("blur", validationFunction(validateUserName,userName,userNameError));
userNameField.addEventListener("blur", function () {
  const enteredText = userNameField.value;
  if (enteredText.length == 0) {
    userNameError.textContent = "Can't be blank";
    userNameField.classList.add("input-error-styling");
  } else if (!validateUserName(enteredText)) {
    userNameError.textContent = "please enter a valid username";
    userNameField.classList.add("input-error-styling");
  } else {
    userNameError.textContent = "";
    userNameField.classList.remove("input-error-styling");
  }
});
//Event Listeners for Credit Card Number Input
const cardNumberError = document.getElementById("card-number-error");
cardNumberField.addEventListener("blur", function () {
  const enteredText = cardNumberField.value;
  if (enteredText.length == 0) {
    cardNumberError.textContent = "Can't be blank";
    cardNumberField.classList.add("input-error-styling");
  } else if (!validateCardNumber(enteredText)) {
    cardNumberError.textContent = "wrong format, numbers only";
    cardNumberField.classList.add("input-error-styling");
  } else {
    cardNumberError.textContent = "";
    cardNumberField.classList.remove("input-error-styling");
  }
  let format = [...enteredText]
    .map((d, i) => (i % 4 == 0 ? " " + d : d))
    .join("")
    .trim();
  cardNumberField.value = format;
});

const monthError = document.getElementById("month-error");
expirationMonthField.addEventListener("blur", function () {
  enteredText = expirationMonthField.value;
  if (enteredText.length == 0) {
    monthError.textContent = "Can't be blank";
    expirationMonthField.classList.add("input-error-styling");
  } else if (!validateMonthDate(enteredText)) {
    monthError.textContent = "Must be a valid month";
    expirationMonthField.classList.add("input-error-styling");
    return;
  } else {
    monthError.textContent = "";
    expirationMonthField.classList.remove("input-error-styling");
  }
});

const yearError = document.getElementById("year-error");
expirationYearField.addEventListener("blur", function () {
  const enteredText = expirationMonthField.value;
  if (enteredText.length == 0) {
    yearError.textContent = "Can't be blank";
    expirationYearField.classList.add("input-error-styling");
  } else if (!validateMonthDate(enteredText)) {
    yearError.textContent = "Must be a valid year";
    expirationYearField.classList.add("input-error-styling");
    return;
  } else {
    yearError.textContent = "";
    expirationYearField.classList.remove("input-error-styling");
  }
});

const cvvError = document.getElementById("cvv-error");
cvvField.addEventListener("blur", function () {
  const enteredText = cvvField.value;
  if (enteredText.length == 0) {
    cvvError.textContent = "Can't be blank";
    cvvField.classList.add("input-error-styling");

    cvvField;
  } else if (!validateCvv(enteredText)) {
    cvvError.textContent = "Please enter a valid CVV";
    cvvField.classList.add("input-error-styling");

    return;
  } else {
    cvvError.textContent = "";
    cvvField.classList.remove("input-error-styling");
  }
});

function validateCardNumber(cardNumber) {
  // validate the card number using a regular expression
  const regex = /^[0-9]{13,16}$/;
  return regex.test(cardNumber);
}

function validateCvv(cvv) {
  // validate the cvv using a regular expression
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
}

function validateUserName(userName) {
  const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  return regex.test(userName);
}

function validateMonthDate(month) {
  const regex = /^(0?[1-9]|1[012])$/;
  return regex.test(month);
}
