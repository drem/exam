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
        var $this = $(this),
            linkId = $this.attr("data-linkId"),
            preventCache = "?_=" + (+new Date());

        $.get("template/" + linkId + ".html" + preventCache, function (fileContent) {
            var allContent = externalContent(linkId, preventCache) + fileContent;
            $("#content").html(allContent);
        });

        function externalContent(id, preventCache) {
            var returnValue = [
                '<link href="css/', id, 'Style.css', preventCache, '" rel="stylesheet" />',
                '<script type="text/javascript" src="js/', id, 'Controller.js"></script>'// jQuery().html() will handler it.
            ].join("");
            return returnValue;
        };
    });
});