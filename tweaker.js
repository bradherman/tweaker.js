;(function($){
    $.fn.getStyleObject = function(){
        var dom = this.get(0);
        var style;
        var returns = {};
        if(window.getComputedStyle){
            var camelize = function(a,b){
                return b.toUpperCase();
            }
            style = window.getComputedStyle(dom, null);
            for(var i=0;i<style.length;i++){
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[camel] = val;
            }
            return returns;
        }
        if(dom.currentStyle){
            style = dom.currentStyle;
            for(var prop in style){
                returns[prop] = style[prop];
            }
            return returns;
        }
        return this.css();
    }
})(jQuery);

;(function($) {

    $.tweaker = function(element, options) {

        var defaults = {
            method: 'post',
            action: window.location.pathname
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            $el = $(element);$css = $el.getStyleObject();

            $el.addClass("tweaker-hidden").css("display", "none");
            
            $inputEl = $('<input/>', {
              type: "text",
              name: $el.attr("id"),
              value: $el.text(),
              class: "tweaker-input",
              id: "tweaker_"+$el.attr("id"),
              "data-original": $el.text(),
              "data-action": plugin.settings.action,
              "data-method": plugin.settings.method
            });
            
            $inputEl.css($css);
            $inputEl.appendTo($el.parent());
            
            $button = $('<button/>', {
              id: "tweaker_"+$el.attr("id")+"_"+"save",
              text: 'Save',
              class: 'tweaker-save',
              "data-target": "tweaker_"+$el.attr("id")
            });

            $button2 = $('<button/>', {
              id: "tweaker_"+$el.attr("id")+"_"+"cancel",
              text: 'Cancel',
              class: 'tweaker-cancel',
              "data-target": "tweaker_"+$el.attr("id")
            });

            $button.appendTo($el.parent());
            $button2.appendTo($el.parent());
            
            if ($(".tweaker-save").length < 2){
              $(".tweaker-save").live("click", function(){
                $target = $(this).attr("data-target");$target = $("#"+$target);
                var action, method, paramName, param;
                action = $target.attr("data-action");
                method = $target.attr("data-method");
                param = $target.val();
                paramName = $target.attr("name");
                
                $.ajax({
                  type: method,
                  url: action,
                  data: { paramName: param },
                  success: function(){
                    console.log("Successfully saved");
                  },
                  error: function(){
                    console.log("Error");
                  }
                });
                
              });
              
              $(".tweaker-cancel").live("click", function(){
                $target = $(this).attr("data-target");
                $target = $("#"+$target);
                $orig = $target.attr("data-original");
                $target.val($orig);
              });
            }
        }

        plugin.destroy = function() {
          // sub in the newest text if saved
          $(".tweaker-save, .tweaker-input, .tweaker-cancel").remove();
          $(".tweaker-hidden").removeClass("tweaker-hidden").css("display", "block");
        }

        var foo_private_method = function() {
            // code goes here
        }

        plugin.init();

    }

    $.fn.tweaker = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('tweaker')) {
                var plugin = new $.tweaker(this, options);
                $(this).data('tweaker', plugin);
            }
        });

    }

})(jQuery);