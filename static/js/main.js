$(document).ready(function () {});

function postArticle() {
  let url = $("#post-url").val();
  let comment = $("#post-comment").val();

  $.ajax({
    type: "POST",
    url: "/memo",
    data: { url_give: url, comment_give: comment },
    success: function (response) {
      // 성공하면
      alert(response["msg"]);
      window.location.reload();
    },
  });
}
