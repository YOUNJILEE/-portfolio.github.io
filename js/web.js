
var 
$card = $('.card'),
$cardTitle = $('.card-title'),
$cardSubtitle = $('.card-subtitle'),
$cardShine = $('.card-shine'),
$cardShadow = $('.card-shadow'),
currentMousePos = { x: 0, y: 0 },
mouseFromCenter = { x: 0, y: 0 };

$(document).mousemove(function(event) {
   var
   wHeight= $(window).height(),
   wWidth= $(window).width();

   currentMousePos.x = event.pageX;
   currentMousePos.y = event.pageY;
   mouseFromCenter.x = currentMousePos.x - (wWidth / 2);
   mouseFromCenter.y = currentMousePos.y - (wHeight / 2);
   
   var 
   around1 = -1 * (currentMousePos.y * 100 / wHeight * 0.2 - 10) + 'deg',
   around2 = 1 * (currentMousePos.x * 100 / wWidth * 0.2 - 10) + 'deg',
   trans1 = (currentMousePos.x * 100 / wHeight * 0.3 ) + 'px',
   trans2 = (currentMousePos.y * 100 / wHeight * 0.3 ) + 'px',
   dy = event.pageY - wHeight / 2, //@h/2 = center of poster
   dx = event.pageX - wWidth / 2, //@w/2 = center of poster
   theta = Math.atan2(dy, dx), // angle between cursor and center of poster in RAD
   angle = theta * 180 / Math.PI - 90,  
   mousePositionX = ( currentMousePos.x / wWidth) * 100,
   mousePositionY = 50+( currentMousePos.y / wHeight)*10;

   // gradient angle and opacity for card shine effect
   $cardShine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (currentMousePos.y / wHeight) * .7 + ') 0%,rgba(255,255,255, 0) 80%)');
   // card pos and angle
   $card.css({
   "-webkit-transform": "translate3d(" + trans1 + ", " + trans2 +", 0) scale(1) rotatex(" + around1 + ") rotatey(" + around2 + ")",'background-position': mousePositionX + '%' + ' ' + (currentMousePos.y / wHeight) * 50  + '%'
   });
   // card shadow pos and angle
   $cardShadow.css({"transform": "scale(.9,.9) translateX(" + ((mouseFromCenter.x * -0.02) + 12) + "px) translateY(" + ((mouseFromCenter.y * -0.02) + 12 ) + "px) scale(1.0) rotateY(" + (mouseFromCenter.x / 25) * 0.5 + "deg) rotateX(" + ((mouseFromCenter.y / -25) ) + "deg)" });

   $cardTitle.css({"transform": "translateX(" + ((mouseFromCenter.x / 25) * 0.7) + "px) translateY(" + ((mouseFromCenter.y / 25) * 1.65) + "px)"
   });

   $cardSubtitle.css({"transform": "translateX(" + ((mouseFromCenter.x / 25) * 0.5) + "px) translateY(" + ((mouseFromCenter.y / 25) * 1.15) + "px) translateZ(60px)"
   });
});



var btn = document.querySelector("#circle");
           var ctx;  
           
           var colorInfoElem = document.querySelector("#colorInfo");
           html2canvas(btn).then(canvas => {
            ctx = canvas.getContext("2d");
            
            createParticleCanvas();
            
            btn.addEventListener("click", e => {
              // Get our color data like before
              let localX = e.offsetX;
              let localY = e.offsetY;
              let rgbaColorArr = ctx.getImageData(localX, localY, 1, 1).data;
           
              // Get the button's positioning in terms of the window
              let bcr = btn.getBoundingClientRect();
              let globalX = bcr.left + localX;
              let globalY = bcr.top + localY;
           

   // Create a particle using the color we obtained at the window location
   // that we calculated
   createParticleAtPoint(globalX, globalY, rgbaColorArr);
 });
});


/* An "exploding" particle effect that uses circles */
var ExplodingParticle = function() {
 // Set how long we want our particle to animate for
 this.animationDuration = 1000; // in ms

 // Set the speed for our particle
 this.speed = {
   x: -5 + Math.random() * 10,
   y: -5 + Math.random() * 10
 };
 
 // Size our particle
 this.radius = 5 + Math.random() * 5;
 
 // Set a max time to live for our particle
 this.life = 30 + Math.random() * 10;
 this.remainingLife = this.life;
 
 // This function will be called by our animation logic later on
 this.draw = ctx => {
   let p = this;

   if(this.remainingLife > 0
   && this.radius > 0) {
     // Draw a circle at the current location
     ctx.beginPath();
     ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 2);
     ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ", 1)";
     ctx.fill();
     
     // Update the particle's location and life
     p.remainingLife--;
     p.radius -= 0.25;
     p.startX += p.speed.x;
     p.startY += p.speed.y;
   }
 }
}

var particles = [];
function createParticleAtPoint(x, y, colorData) {
 let particle = new ExplodingParticle();
 particle.rgbArray = colorData;
 particle.startX = x;
 particle.startY = y;
 particle.startTime = Date.now();
 
 particles.push(particle);
}


var particleCanvas, particleCtx;
function createParticleCanvas() {
 // Create our canvas
 particleCanvas = document.createElement("canvas");
 particleCtx = particleCanvas.getContext("2d");
 
 // Size our canvas
 particleCanvas.width = window.innerWidth;
 particleCanvas.height = window.innerHeight;
 
 // Position out canvas
 particleCanvas.style.position = "absolute";
 particleCanvas.style.top = "0";
 particleCanvas.style.left = "0";
 
 // Make sure it's on top of other elements
 particleCanvas.style.zIndex = "1001";
 
 // Make sure other elements under it are clickable
 particleCanvas.style.pointerEvents = "none";
 
 // Add our canvas to the page
 document.body.appendChild(particleCanvas);
}



function update() {
 // Clear out the old particles
 if(typeof particleCtx !== "undefined") {
   particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
 }

 // Draw all of our particles in their new location
 for(let i = 0; i < particles.length; i++) {
   particles[i].draw(particleCtx);
   
   // Simple way to clean up if the last particle is done animating
   if(i === particles.length - 1) {
     let percent = (Date.now() - particles[i].startTime) / particles[i].animationDuration;
     
     if(percent > 1) {
       particles = [];
     }
   }
 }
 
 // Animate performantly
 window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
var test = $('#name');
var test2 = $('#space');
var test3 = $('#name_pro');
var test4 = $('.moving-grad');

var test5 = $('#design');
var test6 = $('#video');
var test7 = $('#programming');
var test8 = $('#button');
var test9 = $('#circle');
var test10   = $('#name_19');

test.animate({opacity: "0"}, 0);
test2.animate({opacity: "0"}, 0);
test3.animate({opacity: "0"}, 0);
test4.animate({opacity: "0"}, 0);
test5.animate({opacity: "0"}, 0);
test6.animate({opacity: "0"}, 0);
test7.animate({opacity: "0"}, 0);
test8.animate({opacity: "0"}, 0);
test9.animate({opacity: "0"}, 0);
test10.animate({opacity: "0"}, 0);

setTimeout(function() {test.animate({opacity: "1"}, 2000);}, 500);
setTimeout(function() {test2.animate({opacity: "1"}, 2000);}, 500);
//   testEle.fadeIn();
setTimeout(function() {test3.animate({opacity: "1"}, 1500);}, 600);
setTimeout(function() {test4.animate({opacity: "1"}, 1000);}, 100);

setTimeout(function() {test5.animate({opacity: "1"}, 1700);}, 100);
setTimeout(function() {test6.animate({opacity: "1"}, 1700);}, 100);
setTimeout(function() {test7.animate({opacity: "1"}, 1700);}, 100);
setTimeout(function() {test8.animate({opacity: "1"}, 2000);}, 900);

setTimeout(function() {test9.animate({opacity: "1"}, 1000);}, 90);
setTimeout(function() {test10.animate({opacity: "1"}, 2000);}, 500);

   $(document).ready(function () {
     var $scope = $(".scope"),
       scopeWHalf = $scope.width() / 2;
     $(document).on("mousemove", function (e) {
       $scope.css({ "left": e.pageX - scopeWHalf, "top": e.pageY - scopeWHalf });
     });
   });
   
 </script>


   var _gaq = _gaq || [];
   _gaq.push(['_setAccount', 'UA-36251023-1']);
   _gaq.push(['_setDomainName', 'jqueryscript.net']);
   _gaq.push(['_trackPageview']);

   (function () {
     var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
     ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
   })();






    $(document).ready(function () {
      var $scope = $(".scope"),
        scopeWHalf = $scope.width() / 2;
      $(document).on("mousemove", function (e) {
        $scope.css({ "left": e.clientX - scopeWHalf, "top": e.clientY - scopeWHalf });
      });
    });


    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-36251023-1']);
    _gaq.push(['_setDomainName', 'jqueryscript.net']);
    _gaq.push(['_trackPageview']);

    (function () {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();