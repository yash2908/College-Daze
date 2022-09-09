var $, TweenLite, con = console, z = 50, x, y = z/2;
con.log(x,y,z)

$ ? con.log('jquery ready') : con.log('jquery failed');
TweenLite ? con.log('gsap ready') : con.log('gsap failed')
/////////////////////////////////////////////////////////////
//--------------------------------------------------

var sh = 0;

$('.start-button').click(function(){
  // return scor
  if (sh === 0){
    var x = $('.main-screen');
    h = x.height();h2=0-h;
    TweenLite.to(x,1,{top:h2,ease:Power3.easeInOut,onComplete:theGame})
    sh += 1
  }
  else if (sh ===1){

    scor = $('.score .current').text();
    callfunc(scor)
  }
  

  
})

//--------------------------------------------------
function theGame(){

  setTimeout(function(){
    clearInterval(a);
  },30000)
  var x = $('.col');  
  var i = 0;
  go(i);
  function go(){

      a = setInterval(function(){
      var n = Math.ceil(Math.random()*80);
      TweenLite.to(x[n],0.1, {background:'#88ff88'})
      TweenLite.to(x[n],0.1, {background:'rgb(0, 34, 0)',delay:1}) 
    },260);
  }
    function backTo(){
      go();
    } 

  $('.col').mouseout(function(){
    i=0;
  })
  $('.pop').mouseenter(function(){
    i=1;
  })
  $('.pop').mouseleave(function(){
    i=1;
  })
  var curmp = new Object();

  function scorePopUp(x,y,val,plusminus){
    $('.pop').remove();
    $('.wrapper').append('<div class="pop">'+plusminus+val+'</div>');  
    $('.pop').css({'top':y,'left':x,'font-size':'1.5em'});
    if(plusminus=='-')
    TweenLite.to('.pop', 1, {top:y+20,opacity:0,onComplete:clearIt});
    else
      TweenLite.to('.pop', 1, {top:y-20,opacity:0,onComplete:clearIt});
    function clearIt(){
      $('.pop').remove();
    }
  }
  
//---------------------------------------------------------  
  var popCount = 0;
  $('.col').click(function(event){

    curmp.x = event.pageX;
    curmp.y = event.pageY;
    console.log(curmp.x,curmp.y)
    if(i==0){
      i=1;
      var c = $(this).css('background-color');
      if(c!='rgb(0, 34, 0)'){
        console.log('got it');
        scorePopUp(curmp.x,curmp.y,2,'+');
        var x = Number($('.score span.current').text());
        x++,x++;      
        $('.score span .current').text(x)
        logScore(x);
      }
      else{
        console.log('missed');
        scorePopUp(curmp.x,curmp.y,4,'-');
        var x = Number($('.score span.current').text());
        if(x>4){x-=4;}
        $('.score span .current').text(x);
        logScore(x);
      }
    }

  });

//-------------------------------------------------------
  //localStorage.getItem
  //localStorage.setItem('score', 0);
  function logScore(score){
    if(score>localStorage.getItem('score'))
      localStorage.setItem('score', score);
    $('.score span.current').text(score);
  }
  loadScore()
  function loadScore(){
    $('.score span.high').text(localStorage.getItem('score') ? localStorage.getItem('score') : 0);
    $('.score span.current').text(0);
  }

//------------------------------------------------------

  timer(30);
  function timer(t){
    $('.time span').text(t);
    var a = setInterval(function(){

      t--;
      if(t==0){
        clearInterval(a)
        endScreen();
      }
      $('.time span').text(t)
    },1000);
  }
};

function endScreen(){
  $('.start-group').css('display','none');
  $('.end-group').show();
  setTimeout(function(){
    TweenLite.to($('.main-screen'),0.5, {top:0});
    $('.score-recap .high-score').html(
      'Your High Score: <br />'+localStorage.getItem('score')
    )
    $('.score-recap .your-score').html(
      "This Round's Score: <br />"+$('.score .current').text()+'<br /><br />'
    )
  },1000);


}


