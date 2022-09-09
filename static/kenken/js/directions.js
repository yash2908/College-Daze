$(function() {

  var currentTemplate = $("#six");
  var currentChoice = $("#6");
  // var convert = ["blank", "one", "two", "three", "four", "five", "six"];
  var convert = ["six"];


  $(document).ready(function(){
    $(".templates").hide();
    currentTemplate.show();
  })

  $(".choices").click(function() {
    currentTemplate.hide();
    currentChoice.removeClass("active");
    currentTemplate = $("#" + convert[($(this).attr("id")).toString()]);
    currentChoice = $(this);
    $(this).addClass("active");
    currentTemplate.show();
  })
})
