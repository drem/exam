$(function () {
    $("#submitButton").on("click", function () {
        var reqUrl = "http://api.openweathermap.org/data/2.5/weather",
            allWeatherClass = "nan cloud rain clear",
            city = $("#city").val(),
            country = $("#country").val(),
            request = $.get(reqUrl, { q: [city, country].join(",") });
        $("#message").hide().html("");
        request.done(function (result) {
            if (result) {
                if (result.cod == 200) {
                    if (result.weather && result.weather.length > 0) {
                        var weather = result.weather[0],
                            weatherClass = "nan";
                        $("#weatherMain").html(weather.main);
                        $("#weatherDescription").html(weather.description);
                        if (/clear/gi.test(weather.description)) {
                            weatherClass = "clear";
                        }
                        else if (/cloud/gi.test(weather.description)) {
                            weatherClass = "cloud";
                        }
                        else if (/rain/gi.test(weather.description)) {
                            weatherClass = "rain";
                        }
                        $(".weatherIcon").removeClass(allWeatherClass).addClass(weatherClass);
                    }

                    if (result.main) {
                        var main = result.main;
                        $("#humidity").html(main.humidity);
                        $("#tempMin").html(convertKtoC(main.temp_min));
                        $("#tempMax").html(convertKtoC(main.temp_max));
                    }
                }
                else {
                    $("#message").show().html(result.message);
                }
            }
        });
        request.fail(function () {
            $("#message").show().html("request fail.");
        });

        function convertKtoC(k) {
            var diff = 273.15;
            return Math.round(k - diff, 0);
        }
    });

    $(document).mousemove(function (event) { $("#ajaxLoading").css({ left: event.pageX + 20, top: event.pageY }); })
        .ajaxStart(function () { $("#ajaxLoading").show(); })
        .ajaxStop(function () { $("#ajaxLoading").hide(); });
});