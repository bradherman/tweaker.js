tweaker.js
==========

tweaker is a super simple plugin for inline editing in your web app

Usage
-----

Require jQuery, require tweaker.js

    $(function(){
      $("button.edit").live("click", function(){
        $(".editable").tweaker(); // defaults method to post, action to current page url
        // or to specify the method, action to send data:
        $(".editable").tweaker({method: "post", action: "/page/1/edit"});
      });
      $("button.finish").live("click", function(){
        $(".editable").data("tweaker").destroy();
      });
    });
    
    .........
    
    <h1 class="editable" id="title">My Editable Title</h1>
    
To Do
-----

* Add support for image uploads
* Clean up code
* DRY it up
* More configurable
* Better CSS selectors
* Better default behavior for save/cancel buttons