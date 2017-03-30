$(document).ready(function() {


      /***********************************************

                              MENU SCRIPT

      ***********************************************/

  var button1 = $("#button1");
  var button2 = $("#button2");
  var button3 = $("#button3");
  var menu = $("#menu");
  var retour = $(".back");


retour.css("display","none");

  button1.click(function(){
    if (button1.hasClass("menu1")) {
        button1.fadeOut("300", function(){
          button1.removeClass("menu1");
          button2.removeClass("menu2");
          button3.removeClass("menu3");
          button1.addClass("play1");
          button2.addClass("play2");
          button3.addClass("play3");
          retour.css("display","inline-block");
          button1.text("easy").fadeIn("slow",function(){});
        });
        button2.fadeOut("300", function(){
          button2.text("medium").fadeIn("slow",function(){});
        });
        button3.fadeOut("300", function(){
          button3.text("hard").fadeIn("slow",function(){});
        });
      } else if(button1.hasClass("play1")) {
        button1.click(function() {
          $('#musicEasy')[0].play();
          menu.fadeOut("900", function(){});
          init();
        });
        button2.click(function() {
          $('audio').attr('src','music_normal.1.mp3');
          });
           $('#musicEasy')[0].play();
          $('a').click(function() {
          menu.fadeOut("900", function(){});
          init();
        });
        button3.click(function() {
          $('audio').attr('src','music_hard.1.mp3');
          });
          $('#musicEasy')[0].play();
          menu.fadeOut("900", function(){});
          init();
	      
      };
    });

  button2.click(function(){
    if (button2.hasClass("menu2")) {
      button1.fadeOut("300", function(){
        button1.removeClass("menu1");
        button2.removeClass("menu2");
        button3.removeClass("menu3");
        button1.addClass("option1");
        button2.addClass("option2");
        button3.addClass("option3");
        retour.css("display","block");
        button1.text("Configurer touches").fadeIn("slow",function(){});
      });
      button2.fadeOut("300", function(){
        button2.text("Pute").fadeIn("slow",function(){});
      });
      button3.fadeOut("300", function(){
        button3.text("Tchoin").fadeIn("slow",function(){});
      });
    } else if(button2.hasClass("play2")){
      menu.fadeOut("900", function(){})
    };
  })
  button3.click(function(){
    if (button3.hasClass("menu3")) {
        button3.attr( "href", "lien vers site" );
    } else if(button2.hasClass("play2")){
      menu.fadeOut("900", function(){})
    };
  })
  retour.click(function(){
    if (button1.hasClass("option1")) {
      button1.fadeOut("300", function(){
        button1.removeClass("option1");
        button2.removeClass("option2");
        button3.removeClass("option3");
        button1.addClass("menu1");
        button2.addClass("menu2");
        button3.addClass("menu3");
        retour.css("display","none");
        button1.text("play").fadeIn("slow",function(){});
      });
      button2.fadeOut("300", function(){
        button2.text("options").fadeIn("slow",function(){});
      });
      button3.fadeOut("300", function(){
        button3.text("quit").fadeIn("slow",function(){});
      });
    }else if (button1.hasClass("play1")) {
      button1.fadeOut("300", function(){
        button1.removeClass("play1");
        button2.removeClass("play2");
        button3.removeClass("play3");
        button1.addClass("menu1");
        button2.addClass("menu2");
        button3.addClass("menu3");
        retour.css("display","none");
        button1.text("play").fadeIn("slow",function(){});
      });
      button2.fadeOut("300", function(){
        button2.text("options").fadeIn("slow",function(){});
      });
      button3.fadeOut("300", function(){
        button3.text("quit").fadeIn("slow",function(){});
      });
    }
  })

  /***********************************************

                          GAME SCRIPT        $('.musicEasy')[0].play();

  ***********************************************/

var posY=0, //Position des notes change grâce à la fonction deplacementNote
    dirY=3, //Vitesse des notes
    manqué=0, //Compteur des coups ratés change grâce à la fonction deplacementNote
    bien=0, //Compteur des coups réussis change grâce à la fonction deplacementNote
    touche = 0, //Enregistre le code ASCII de la touche donnée et le compare avec la div
    perfect=0,
    pasMal=0;
    var highScore = perfect + bien+ pasMal;

function init(){
        update(player);
        setInterval(function () {
          duration = document.getElementById("musicEasy");
          totalDuration = parseInt(duration.duration);
          time = document.getElementById("musicEasy");
          currentTime = parseInt(time.currentTime);
        }, 1000);
        noteAlea();
        var divAscii = parseInt($('body').attr('data-ascii'));
        setInterval(function () {
            deplacementNote()
        }, 1);
        setInterval(function () {
            if (currentTime === totalDuration-2) {
                end();
            }
        }, 1000);
};
    //Permet de générer aléatoirement une "note" parmi les 4 possibles
    var noteAlea = function noteAlea(){
        var number=Math.floor(Math.random()*4);
        if(number === 0){
            $('#touche1').append('<div class="note color1" data-ascii="68"></div>');
        }
        else if(number === 1){
            $('#touche2').append('<div class="note color2" data-ascii="70"></div>');
        }
        else if(number === 2){
            $('#touche3').append('<div class="note color3" data-ascii="75"></div>');
        }
        else{
            $('#touche4').append('<div class="note color4" data-ascii="76"></div>');
        }
        return 0;
    };

    // Permet de récupérer le code ASCII d'une lettre tapée et de supprimer les notes
    $("body").on("keydown",function(event){
        var touche = (event.which);
        var divAscii = parseInt($('.note').attr('data-ascii'));
        if(divAscii === touche && posY<=475 && posY>=400){
            $('.note').remove();
            parseInt(perfect = perfect +1);
            $('.perfect').text("Perfect : "+perfect);
            posY =0;
            $("#zoneDeValidation").css("background-color", "#75CA00");
            $("#zoneDeValidation span").text('Perfect');
            noteAlea();
        }
        else if(divAscii === touche && posY<=475 && posY>=375){
            $('.note').remove();
            parseInt(bien = bien +1);
            $('.bien').text("Bien : "+bien);
            posY =0;
            $("#zoneDeValidation").css("background-color", "#FFC300");
            $("#zoneDeValidation span").text('Good');
            noteAlea();
        }
        else if(divAscii === touche && posY<=475 && posY>=350){
            $('.note').remove();
            parseInt(pasMal = pasMal +1);
            $('.pasMal').text("Pas mal : "+pasMal);
            posY =0;
            $("#zoneDeValidation").css("background-color", "red");
             $('#zoneDeValidation span').text("Not Bad");
            noteAlea();
        }
        else {
            parseInt(manqué = manqué +1);
            $('.manqué').text("Ratées : "+manqué);
            $("#zoneDeValidation").css("background-color", "black");
            $('#zoneDeValidation span').text("Miss");
        }
    });

    function deplacementNote(){
        $('.note').css({
            "top": posY
        });
        posY = posY + dirY;
        if(posY>=475){
            parseInt(manqué = manqué +1);
            $('.manqué').text("Ratées : "+manqué);
            $( ".note" ).remove();
            posY =0;
            $("#zoneDeValidation").css("background-color", "black");
            $('#zoneDeValidation span').text("Miss");
            noteAlea();
          
        }
    };
 
    var player= document.getElementById("musicEasy");
    var playhead = document.createElement("progress"),
    audioTrack= document.getElementById("audioTrack"),
    progressBar = document.getElementById("progressBar");
    function update() {
        var duration = player.duration;    // Durée totale
        var time     = player.currentTime; // Temps écoulé
        var fraction = time / duration;
        var percent  = Math.ceil(fraction * 100);

        var progress = document.querySelector('#progressBar');

        progress.style.width = percent + '%';
        player.addEventListener('timeupdate', updatePlayhead, false);
        player.addEventListener('ended', finish, false);
    };
    function finish() {
            player.currentTime = 0;
            setText(playButton,"Play");
    };
    function updatePlayhead() {
    playhead.value = player.currentTime;
    var s = parseInt(player.currentTime % 60);
    var m = parseInt((player.currentTime / 60) % 60);
    s = (s >= 10) ? s : "0" + s;
    m = (m >= 10) ? m : "0" + m;
    };

function end(){
    dirY =0;
    $(".note").remove();
    $(".end_screen").css('display','block');
    $(".final_score").text("Your Score is :" + highScore);
}
});
