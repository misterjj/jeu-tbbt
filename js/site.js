var canPlay = false;
var scorePlayer = 0;
var scoreBot = 0;
var winnable = {
  "hand-rock-o" : ["hand-scissors-o","hand-lizard-o"],
  "hand-paper-o" : ["hand-spock-o","hand-rock-o"],
  "hand-scissors-o" : ["hand-lizard-o","hand-paper-o"],
  "hand-lizard-o" : ["hand-spock-o","hand-paper-o"],
  "hand-spock-o" : ["hand-scissors-o","hand-rock-o"]
}
$(function(){
  $("#etape2 *").hide();
  $("#goEtape2").click(function(){
    $("#etape1").addClass("animated zoomOutRight");
    $("#etape2 *").attr("style","");
    setTimeout(function(){
      $("#etape2 p.h2").addClass("animated fadeInUp");
      displayCarte(0);
      displayCarte(1);
      displayCarte(2);
      displayCarte(3);
      displayCarte(4);
      $("#game").addClass("animated fadeInUp");
      canPlay = true;
    },1000)
  })

  $(".carte").click(function(){
    if(canPlay){
      canPlay = false;
      chosePlayer = $(this).attr("id");
      $("#encartPlayer").html('<i class="fa fa-'+chosePlayer+'"></i>')
      keys = Object.keys(winnable);
      choseBot = keys[Math.floor((Math.random() * 4))];
      $("#encartBot").html('<i class="fa fa-'+choseBot+'"></i>');
      switch(whoWin(chosePlayer,choseBot)){
        case "player" :
          $("#encartPlayer").css("background-color","#6DD480");
          $("#encartBot").css("background-color","#F26C5E");
          scorePlayer ++;
          $("#scorePlayer").text(scorePlayer)
          break;
        case "bot" :
          $("#encartPlayer").css("background-color","#F26C5E")
          $("#encartBot").css("background-color","#6DD480")
          scoreBot++;
          $("#scoreBot").text(scoreBot)
          break;
        case "nul":
          $("#encartPlayer").css("background-color","#F2B95E")
          $("#encartBot").css("background-color","#F2B95E")
          break;
      };
      canPlay = true;
    }
  });
});

function whoWin(chosePlayer,choseBot){
  if(chosePlayer==choseBot)
    return "nul";
  for(i in winnable[chosePlayer]){
    if(choseBot==winnable[chosePlayer][i])
      return "player";
  }
  for(i in winnable[choseBot]){
    if(chosePlayer==winnable[choseBot][i])
      return "bot";
  }
}

function displayCarte(x){
  setTimeout(function(){
    $(".carte:eq("+x+")").addClass("animated fadeInDown");
  },x*100)
}