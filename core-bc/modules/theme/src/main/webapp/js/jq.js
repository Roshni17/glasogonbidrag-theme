(function( $ ) {
  $(function() {
    //do stuff with $ here

    //gbJs.bigSlide, gbJs.registeredHotkeys
    var gbJs = {};
    gbJs.registeredHotkeys = {};
    gbJs.debugMode = true;
    //gbJs.debugMode = false;

    initBigSlide();
    initHotkeys();

    function initBigSlide() {

      gbJs.bigSlide = $('.navigation-trigger').bigSlide({
        menu: '.side-panel-maximized',
        menuWidth: '20.0em'
      });

    }

    function initHotkeys() {

      // Register help
      $(document).bind('keydown', 'ctrl+h', function() {
        toggleHotkeyDialog();
      });


      // Register UI-nodes
      var hotkeyNodes = $('[data-hotkey]');

      $.each(hotkeyNodes, function(index, hotkeyNode) {
        var dataHotkey = $(hotkeyNode).data('hotkey');
        var dataHotkeyMethod = $(hotkeyNode).data('hotkeymethod');
        var titleAttr = $(hotkeyNode).data('hotkeytitle');

        //var hotkeyAvailable = ($.inArray(dataHotkey, gbJs.registeredHotkeys) < 0);

        if(!(dataHotkey in gbJs.registeredHotkeys)) {

          $(document).bind('keydown', dataHotkey, function() {
            if(dataHotkeyMethod == 'click') {
              $(hotkeyNode).trigger('click');
            } else if(dataHotkeyMethod == 'navigate') {
                window.location = $(hotkeyNode).attr('href');
            }

          });

          gbJs.registeredHotkeys[dataHotkey] = {};
        } else if (gbJs.debugMode) {
          console.log('hotkey "' + dataHotkey + '" is already registered');
        }

      });

    }

    function toggleHotkeyDialog() {

      if(!gbJs.hotkeyModalNode) {

        var modalDialogHtml = '<div id="hotkeyModal">Show hotkeys here.</div>'

        var modalNodeArr = $(modalDialogHtml).prependTo('body');
        var modalNode = modalNodeArr[0];
        gbJs.hotkeyModalNode = modalNode;

      } else {
        //console.log('DID find modal wrap:');
        //console.log(gbJs.hotkeyModalWrap);
      }

      $(gbJs.hotkeyModalNode).modal();

      if (gbJs.debugMode) {
        //console.log('toggleHotkeyDialog');
        //console.log(gbJs.registeredHotkeys);
      }
    }




  });
})(jQueryTheme);
