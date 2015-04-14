$(function () {
    /* help css select right element */
    $(".menu li:first-child").addClass("first-child");
    $(".menu").on("mouseover", "li", function () {
        $(this).addClass("hover");
    }).on("mouseout", "li", function () {
        $(this).removeClass("hover");
    }).on("click", "li", function () {
        $(this).addClass("clicked").siblings().removeClass("clicked");
    });

    /* ui handler */
    $(".menu").on("click", "li", function () {
        $(this).addClass("clicked").siblings().removeClass("clicked");
    });
});