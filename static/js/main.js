$(document).ready(function () {
});

function searchBtn() {
    $("#cards-box").empty();

    let area_data = $("#post-area").val();
    let search_data = $("#post-search").val();

    $.ajax({
        type: "GET",
        url: `/search?area_give=${area_data}&search_give=${search_data}`,
        data: {},
        success: function (response) {
            let list = response["documents"];
            let loop_len = list.length;
            for (let i = 0; i < loop_len; i++) {
                let id = list[i]["id"];
                let area = list[i]["area"];
                let title = list[i]["title"];
                let comment = list[i]["comment"];
                let dese = list[i]["dese"];
                let camp_env = list[i]["camp_env"];
                let camp_type = list[i]["camp_type"];
                let views = list[i]["views"];
                let address = list[i]["address"];
                let img = list[i]["img"];
                let url = list[i]["url"];

                if (img === "https://www.gocamping.or.kr/img/2018/layout/noimg.jpg")
                    img =
                        "https://img.etoday.co.kr/pto_db/2019/10/600/20191001173327_1372185_787_590.jpg";
                let temp_html = `          <div class="mb-4 col-4">
                            <div class="camp__card">
                                <a href="/detail/${id}" target="_blank">
                                        <img class="card__img" src="${img}">
                                    <div class="card__description">
                                        <h5>${title}</h5>
                                        <span>${comment}</span>
                                        <p>조회수 :
                                            ${views}</p>
                                    </div>
                                </a>
                            </div>
                        </div>`;

                $("#cards-box").append(temp_html);
            }
        },
    });
}

function login() {
    window.location.href = "/login";
}

// navbar 스크롤시 class 추가
const navbar = document.querySelector("#navbar");
console.log(navbar);
const navbarHeight = navbar.getBoundingClientRect().height;
console.log(navbarHeight);
document.addEventListener("scroll", () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add("navbar--dark");
    } else {
        navbar.classList.remove("navbar--dark");
    }
});
document.addEventListener("scroll", () => {
});


//로그아웃
function cookieRemove() {

// 변수를 선언한다.
    var date = new Date();
    date.setDate(date.getDate() - 1);

    var willCookie = "";
    willCookie += "mytoken=Value;";
    willCookie += "Expires=" + date.toUTCString();

// 쿠키를 집어넣는다.
    document.cookie = willCookie;

// 출력한다.
    alert("로그아웃되었습니다.");

    window.location.replace("/")

}