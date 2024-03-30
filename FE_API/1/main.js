const validators = document.querySelectorAll(".validator");
const passwordInput = document.querySelector("#password");
const generateBtn = document.querySelector("#generateBtn");
const eyeBtn = document.querySelector("#eyeBtn");
const ProgressBar =document.getElementById("ProgressBar")
const validatorIcons = {
  check: '<i class="bi bi-check-lg"></i>',
  xMark: '<i class="bi bi-x-lg"></i>',
};

const config ={
  countTrue:0,
}

const icon = {
  open: '<i class="bi bi-eye-slash"></i>',
  closed: '<i class="bi bi-eye"></i>',
};

eyeBtn.addEventListener("click", () => {
  const isEyeOpen = passwordInput.type === "text";
  passwordInput.type = isEyeOpen ? "password" : "text";
  eyeBtn.innerHTML = isEyeOpen ? icon.closed : icon.open;
});

generateBtn.addEventListener("click", () => {
  let randomPassword = getRandomPassword(12);
  passwordInput.value = randomPassword;

  if (passwordInput.type === "password") {
    eyeBtn.click();
  }

  let isGoodPassword = false;

  while (!isGoodPassword) {
    randomPassword = getRandomPassword(12);
    validatePassword(randomPassword);
    for (const [index, validator] of validators.entries()) {
      if (validator.innerHTML === validatorIcons.xMark) {
        isGoodPassword = false;
        break;
      }
      if (index + 1 === validators.length) {
        isGoodPassword = true;
      }
    }
  }
});

passwordInput.addEventListener("keyup", function () {
  validatePassword(this.value);
});

function validatePassword(password) {
  const validations = [password.length >= 8,
    password.length <= 22,
    /\w/.test(password),
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^\w\s]/g.test(password)
  ]
  // validators[0].innerHTML = getValidatorIcon(password.length >= 8);
  // validators[1].innerHTML = getValidatorIcon(password.length <= 22);
  // validators[2].innerHTML = getValidatorIcon(/\w/.test(password));
  // validators[3].innerHTML = getValidatorIcon(/[a-z]/.test(password));
  // validators[4].innerHTML = getValidatorIcon(/[A-Z]/.test(password));
  // validators[5].innerHTML = getValidatorIcon(/\d/.test(password));
  // validators[6].innerHTML = getValidatorIcon(/[^\w\s]/g.test(password));

  validators.forEach((el,index)=>{
    el.innerHTML = getValidatorIcon(validations[index])
    config.countTrue = validations.reduce((acc, currentValue) => currentValue ? acc + 1 : acc, 0);
    // if (validations[index]){
    //   console.log(validations[index])
    //   ProgressBar.style.width = `${Number(ProgressBar.style.width.split('%')[0]) + 100/7}%`
    // }
    // if validations[index]{
    //   ProgressBar.style.width = `${Number(ProgressBar.style.width.split('%')[0])-100/7}%`
    // }
  })

  if (password.length === 0) {
    validators.forEach((validator) => {
      validator.innerHTML = "•";
      config.countTrue = 0
    });
  }
  bar()
}

function getValidatorIcon(condition) {
  return condition ? validatorIcons.check : validatorIcons.xMark;
}

function getRandomPassword(length = 12) {
  const passwordCharSet =
    "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&";
  let password = "";
  for (let i = 0; i < length; i++) {
    password +=
      passwordCharSet[Math.floor(Math.random() * passwordCharSet.length)];
  }
  return password;
}

function bar(){
  ProgressBar.style.width = `${(Math.floor(config.countTrue)/7)*100}%`
  return ProgressBar.style.width
}

/*
  დავამატოთ bootstrap progress bar
  https://getbootstrap.com/docs/5.3/components/progress/
*/
