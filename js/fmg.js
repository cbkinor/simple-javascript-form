$("#country").on("change", function() {
    if ($(this).val() === "canada") {
        $("#subscribe").attr("disabled", "disabled");
    } else {
        $("#subscribe").removeAttr("disabled");
    }
});
