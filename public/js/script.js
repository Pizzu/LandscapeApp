/* global $ */
$(document).ready(function(){
   $(".alert").delay(4000).fadeOut(4000, function(){
       $(this).remove();
   }); 
});