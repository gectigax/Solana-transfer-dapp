jQuery(document).ready(function($) {
    $("#mmenu").hide();
    $(".mtoggle").click(function() {
        $("#mmenu").slideToggle(500);
    });
});