$(document).ready(function () {
  let modal = $(".modal"); //помещаем модальное окно
  let modal2 = $(".modalFoto"); //помещаем модальное окно
  let modal3 = $(".modalSend"); //помещаем модальное окно



  modalBtn = $("[data-toggle = modal]"); //
  modalBtnFoto = $("[data-toggle = modalFoto]"); //

  closeBtn = $(".modal__close"); //
  closeBtnFoto = $(".modalFoto__close"); //
  closeBtnSend = $(".modalSend__close"); //



  modalBtn.on("click", function () {
    //присваееваем класс
    modal.toggleClass("modal--visible");
  });

  closeBtn.on("click", function () {
    //присваееваем класс
    modal.toggleClass("modal--visible");
  });
  //закрытие по esc
  $(document).keyup("click", function (event) {
    if (event.which == "27") {
      $(".modal").removeClass("modal--visible");
    }
  });
  // закрытие по клику вне окна
  $(document).click(function (e) {
    if ($(e.target).is(".modal")) {
      modal.toggleClass("modal--visible");
    }
  });

  //открытие модального окна Фото 
  modalBtnFoto.on("click", function () {
    //присваееваем класс
    modal2.toggleClass("modalFoto--visible");
  });

  closeBtnFoto.on("click", function () {
    //присваееваем класс
    modal2.toggleClass("modalFoto--visible");
  });
  //закрытие по esc
  $(document).keyup("click", function (event) {
    if (event.which == "27") {
      $(".modalFoto").removeClass("modalFoto--visible");
    }
  });
  // закрытие по клику вне окна
  $(document).click(function (e) {
    if ($(e.target).is(".modalFoto")) {
      modal2.toggleClass("modalFoto--visible");
    }
  });
  ///закрытие модалтного окна Фото





  //открытие модального окна ПОДПИСКИ
  $(".modalSend-btn").on("click", function (event) {
    event.preventDefault();
    $(".modalSend").fadeIn();
  });
  //закрытие по esc окна ПОДПИСКИ
  $(document).keyup("click", function (event) {
    if (event.which == "27") {
      $(".modalSend").fadeOut();
    }
  });
  // закрытие по клику вне окна  ПОДПИСКИ
  $(document).on("click", function (e) {
    $(".modalSend").fadeOut();
  });
  closeBtnSend.on("click", function () {
    //присваееваем класс
    modal3.toggleClass("modalSend--visible");
  });



  //Слайдер 
  var gallerySwiper = new Swiper('.slider-gallery', {
    cssMode: true,
    navigation: {
      nextEl: '.slider-gallery__next',
      prevEl: '.slider-gallery__prev',
    },
    mousewheel: true,
    keyboard: true,
  });

  //валидация форм
  $(".price__form").validate({
    errorClass: "invalid",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 30
      },
      userMessage: {
        required: true,
        minlength: 10,
        maxlength: 50
      },
      // правило- обьект
      userEmail: {
        required: true,
        email: true
      },
      userPhone: {
        required: !0,
        minlength: 16
      },
    },
    //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Имя не короче 2 символов",
        maxlength: "Имя не длиньше 15 символов"
      },

      userPhone: {
        required: "Телефон обязателен",
        minlength: "Некорректно введен номер"
      },
      userEmail: {
        required: "Обязательно укажите email",
        email: "Введите в формате: ivanov@gmail.com"
      },
      userMessage: {
        required: "Сообщение обязателено",
        minlength: "Сообщение не короче 10 символов",
        maxlength: "Сообщение не длиньше 30 символов"
      }
    },
    //отправка формы через аякс
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "sendPrice.php",
        data: $(".price__form").serialize(), //Преобразует данные формы в строку, пригодную для использования в URL
        success: function (response) {
          //modal.on('.modalSend');
          $(form)[0].reset(); // чистит поля после отправки формы
          modal.removeClass("modal--visible");
          $(".modalSend").fadeIn();
        }
      });
    }
  });

  $(".modal__form").validate({
    errorClass: "invalid",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 30
      },
      userPhone: {
        required: !0,
        minlength: 16
      },
    },
    //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Имя не короче 2 символов",
        maxlength: "Имя не длиньше 15 символов"
      },
      userPhone: {
        required: "Телефон обязателен",
        minlength: "Некорректно введен номер"
      }
    },
    //отправка формы через аякс
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "sendModal.php",
        data: $(".modal__form").serialize(), //Преобразует данные формы в строку, пригодную для использования в URL
        success: function (response) {
          $(form)[0].reset(); // чистит поля после отправки формы
          $(".modalSend").fadeIn();
        }
      });
    }
  });

  //маска для номера телефона
  $("[type=tel]").mask("+7(000)000-00-00", {
    placeholder: "Ваш номер телефона:"
  });

  new WOW().init();
});

//data-src
[].forEach.call(document.querySelectorAll("img[data-src]"), function (img) {
  img.setAttribute("src", img.getAttribute("data-src"));
  img.onload = function () {
    img.removeAttribute("data-src");
  };
});