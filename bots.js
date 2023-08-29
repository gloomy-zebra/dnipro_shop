$("#checkout_form").on("submit", function (event) {
  event.preventDefault();

  let form = this;
  let submitButton = $("#simplecheckout_button_confirm", form);
  let data = new FormData();
  let files = $("input[type=file]", form);

  submitButton.text("Оформлення замовлення").attr("disabled", true);
  $("input, textarea", form).attr("disabled", false);

  data.append("name", $('[name="customer[firstname]"]', form).val());
  data.append("phone", $('[name="customer[telephone]"]', form).val());
  data.append("email", $('[name="customer[email]"]', form).val());

  files.each(function (key, fileInput) {
    let filesList = fileInput.files;
    if (filesList.length > 0) {
      $.each(filesList, function (key, file) {
        data.append("files[]", file);
      });
    }
  });

  $.ajax({
    url: "ajax.php",
    type: "POST",
    data: data,
    cache: false,
    dataType: "json",
    processData: false,
    contentType: false,
    xhr: function () {
      let myXhr = $.ajaxSettings.xhr();

      if (myXhr.upload) {
        myXhr.upload.addEventListener(
          "progress",
          function (e) {
            if (e.lengthComputable) {
              let percentage = (e.loaded / e.total) * 100;
              percentage = percentage.toFixed(0);
              submitButton.html("Оформлення замовлення: " + percentage + "%");
            }
          },
          false
        );
      }

      return myXhr;
    },
    error: function (jqXHR, textStatus) {
      alert("Помилка");
    },
    success: function (data) {
      alert("Успішно");
    },
    complete: function () {
      submitButton.text("Оформити замовлення").attr("disabled", false);
      form.reset();
    },
  });
});
