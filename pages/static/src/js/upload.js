class Form {
  #formData;

  namespace = {
    file: 'file',
    sex: 'sex',
    filmType: 'film_type',
    personId: 'person_id'
  }

  isPushedFile = false;
  isPushedSex = false;

  constructor() {
    this.#formData = new FormData();
    const filmType = $(this).data("slug");
    this.#formData.append(this.namespace.filmType, filmType);

    if (filmType === 'selfie') {
      const personId = sessionStorage.getItem('person-id');
      this.#formData.append(this.namespace.personId, personId);
    }
  }

  pushFile(files) {
    for (let i = 0; i < files.length; i++) {
      this.#formData.append(this.namespace.file, files[i]);
    }
    this.isPushedFile = true;
  }

  pushSex(sex) {
    this.#formData.append(this.namespace.sex, sex);

    this.isPushedSex = true;
  }

  submit() {
    if (this.#isValidData()) {
      const csrftoken = getCookie('csrftoken');

      $.ajax({
        url: '/upload/',
        type: 'POST',
        data: this.#formData,
        processData: false,
        contentType: false,
        headers: { 'X-CSRFToken': csrftoken },
        success: function(response) {
          // Handle the successful response
          if (response.success) {
            // Redirect to the specified URL
            window.location.href = response.redirect_url; // Replace with the URL you want to redirect to
          } else {
            // Handle any errors or other cases
            console.log("Error occurred:", response.error);
          }
        },
        error: function(error) {
          // Handle the error case
          console.log("Error occurred:", error);
        }
      });
    } else {
      alert('성별을 입력해주세요');
    }
  }

  #isValidData() {
    return (
      this.isPushedFile &&
      this.isPushedSex
    )
  }
}

class FormSection {
  #dropBoxSection = $('#drop-box-section');
  #additionalSection = $('#additional-section');

  next() {
    this.#dropBoxSection.addClass('hidden');
    this.#additionalSection.removeClass('hidden');
  }
}

$(function () {
  const form = new Form();
  const formSection = new FormSection();

  const dropBox = $('#drop-box');

  dropBox.on('drop', handleFileDrop);

  dropBox.on('click', openFileInput);

  dropBox.on('dragover', function (event) {
    event.preventDefault();
  });

  dropBox.on('dragenter', function (event) {
    event.preventDefault();
  });

  function handleFileDrop(event) {
    event.preventDefault();
    const files = event.originalEvent.dataTransfer.files;
    form.pushFile(files);
    formSection.next();
  }

  function openFileInput() {
    const input = $('<input type="file">');
    input.attr('accept', '.jpg, .jpeg, .png');
    input.on('change', function (event) {
      form.pushFile(event.target.files);
      formSection.next();
    });

    // File input에 capture 속성을 추가하여 사진 촬영을 지정합니다.
    // capture 속성의 값으로 'user'를 사용하면 사용자가 카메라로 사진 촬영할 수 있습니다.
    // 'environment'를 사용하면 후면 카메라로 촬영할 수 있습니다.
    input.attr('capture', 'user');

    // input 요소를 화면에 표시하지 않고 숨겨둡니다.
    input.css('display', 'none');

    // body 요소에 input 요소를 추가합니다.
    $('body').append(input);

    input.trigger('click');
  }

  $('#submit-btn').on('click', function () {
    const sexValue = $('input[name="sex"]:checked').val();
    form.pushSex(sexValue);

    form.submit();
  });
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
