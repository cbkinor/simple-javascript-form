$("#country").on("change", function() {
    if ($(this).val() === "canada") {
        $(".enable").attr("disabled", "disabled");
    } else {
        $(".enable").removeAttr("disabled");
    }
});
