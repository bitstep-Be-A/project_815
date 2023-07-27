$(function () {
  $(".person-link-btn").click(function(event) {
    event.preventDefault();

    const personId = $(this).data("person-id");
    sessionStorage.setItem("person-id", personId);
    window.location.href = $(this).attr("href");
  });
});
