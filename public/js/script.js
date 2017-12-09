/* global $ */
$(document).ready(function(){
   $(".alert").delay(2000).fadeOut(3000, function(){
       $(this).remove();
   }); 
});