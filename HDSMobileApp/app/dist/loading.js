jQuery(document).ajaxStart(function () {
    jQuery("#content").hide();
    jQuery(window.document.body).append(jQuery(
        "<div class='container loading'>" +
            "<div class='row'>" +
                "<div class='col-md-3 col-md-offset-5'>" +
                    "<img class='img-responsive run' src='/app/images/loading.gif'>" +
                    "<p class='devour'>...............Loading</p>" +
                "</div>" +
            "</div>" +
        "</div>"
        ));

    jQuery("img").load(function() {
          jQuery(function () {
            var jQuerydevour = jQuery('.devour');
            var timer = setInterval(function () {
                var ln = jQuerydevour.text().length;
                if (ln == 0) clearInterval(timer);

                jQuery('.devour').text(function (i, v) {
                    return v.substring(1);
                });
            }, 150);
        });
    });

    }).ajaxStop(function () {
        jQuery(".loading").remove();
        jQuery("#content").show();
    });
