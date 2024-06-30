document.querySelectorAll(".js-scroll-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.getAttribute("href").substring(1);
    const scrollTarget = document.getElementById(href);
    const elementPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
      top: elementPosition,
      behavior: "smooth",
    });
  });
});

const swiperOne = new Swiper(".reviews__swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  breakpoints: {
    735: {
      slidesPerView: 2,
      spaceBetween: 60,
    },
  },
  pagination: {
    el: ".reviews__swiper-pagination",
    clickable: true,
  },
});

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent ="00 : " + minutes + " : " + seconds;

      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}

window.onload = function () {
  var display = document.querySelector('#timer');
  var duration = 1800;
  startTimer(duration, display);
};

["name", "phone"].forEach(id => {
  const element = document.getElementById(id);
  element.addEventListener('input', event => {
    event.target.parentNode.classList.add("form__label--help")
  })
})

let viewingInput = (event, regex) => {
  const newValue = event.target.value + event.key;
  if (!regex.test(newValue)) {
    event.preventDefault();
  }
}

let resultName = false;
let resultPhone = false;

const inputName = document.querySelector('#name');
let regexName = /[А-Яа-я\- ]+/;
inputName.addEventListener('keypress', event => {
  viewingInput(event, regexName)
})
inputName.addEventListener('blur', event => {
  let valueEl = event.target.value;
  if (valueEl.length > 40 || valueEl.length < 2) {
    inputName.parentNode.classList.add("form__label--error")
    resultName = false;
  } else {
  str = valueEl.trim().replace(/-+/g, '-').replace(/ +/g, ' ').replace(/(^s*-s*|s*-s*$)/g, '').replace(/[^а-яА-Я\-]/g, '');
  let newString = '';
  for(let i = 0; i < str.length; i++) {
    if(i === 0) {
      newString += str[i].toUpperCase();
    } else {
      newString += str[i].toLowerCase();
    } 
  }
  event.target.value = newString
  inputName.parentNode.classList.remove("form__label--help")
  inputName.parentNode.classList.remove("form__label--error")
  resultName = true;
  }
})

const inputPhone = document.querySelector("#phone");
let regexPhone = /^[0-9]+$/;
inputPhone.addEventListener('keypress', event => {
  viewingInput(event, regexPhone)
})
inputPhone.addEventListener('blur', event => {
  let valueElPhone = event.target.value;
  if (valueElPhone.length === 11) {
    let phoneNumber = valueElPhone.replace(/\D/g, '');
    let formattedNumber = phoneNumber.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '8($2)$3-$4-$5');
    event.target.value = formattedNumber
    inputPhone.parentNode.classList.remove("form__label--help")
    inputPhone.parentNode.classList.remove("form__label--error")
    resultPhone = true;
  } else {
    inputPhone.parentNode.classList.add("form__label--error")
    resultPhone = false;
  }
})

const submit = document.querySelector('#submit');
submit.addEventListener('click', event => {
  event.preventDefault();
  if (resultName === false || resultPhone === false) {
    if (inputName.value === "") {
      inputName.parentNode.classList.add("form__label--error")
    }
    if (inputPhone.value === "") {
      inputPhone.parentNode.classList.add("form__label--error")
    }
  } else if (resultName === true && resultPhone === true) {
    inputName.value = "";
    inputPhone.value = "";
    alert('Успешно отправлено')
  }
})

const btnTop = document.querySelector('#btnTop');
btnTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

window.addEventListener('scroll', event => {
  if(window.pageYOffset >= 700) {
    btnTop.classList.add('form__btn-top--active')
  } else if (window.pageYOffset < 700) {
    btnTop.classList.remove('form__btn-top--active')
  }
}, { passive: true });

function onStopScroll() {
  const body = document.querySelector('body')
  body.classList.toggle('stop-scroll')
}

function offStopScroll() {
  const body = document.querySelector('body')
  body.classList.remove('stop-scroll')
}

function offnav() {
  burger.classList.toggle('burger__btn--active');
  document.querySelector('#nav').classList.toggle('header__nav--active');
  offStopScroll()
}

const burger = document.querySelector('#burger');
burger.addEventListener('click', () => {
  burger.classList.toggle('burger__btn--active');
  document.querySelector('#nav').classList.toggle('header__nav--active');
  onStopScroll()
});

const linkNav = document.querySelectorAll('.header__link');

linkNav.forEach(function (elem) {
  elem.addEventListener('click', function() {
    offnav()
    offStopScroll()
  })
});