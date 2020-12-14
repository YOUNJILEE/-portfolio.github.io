

    var text = document.getElementsByClassName('text-switch');
var array = [].slice.call(text);

var options = [ 'Understand needs', 'Upgrade donation', 'Upgrade perception'];

array.forEach(function(element) {
   var optCount = 0;
   var removing = true;
   var selected = options[0];
   var newString = selected.split("");

   var interval = setInterval(function() {
    // console.log(selected);
     var currentString = element.innerHTML.split("");
     if (removing) {
     delete currentString[currentString.length - 1]
     element.innerHTML = currentString.join("");
       if (currentString.length === 0) removing = false;
   } else {
     if (newString.length > 0) {
       element.innerHTML += newString[0];
       newString.shift()
     } else {
       removing = true;
       var currentString = element.innerHTML.split("");
       if (optCount + 1 >= options.length) {
         optCount = 0
       } else {
       optCount++
       }
       selected = options[optCount]
       newString = selected.split("");
       if (currentString.length === 0) removing = false;
     }
     
   }
         
   }, 500);
    
})

console.log(window.innerWidth, window.outerWidth );

