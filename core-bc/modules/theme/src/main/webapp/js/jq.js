(function( $ ) {
  $(function() {
    //do stuff with $ here

    if(typeof gbJs == 'undefined') {
      gbJs = {};
    }

    gbJs.registeredHotkeys = {};
    gbJs.debugMode = true;
    //gbJs.debugMode = false;

    initBigSlide();
    //focusOnLoad();
    //initHotkeys();
    initHotkeys2();
    initInputMask();
    initTabs();
    initToggleDockbar();
    selectReplace();
    updateTopBar();


    function focusOnLoad() {

      var focusCandidates = $('[data-focus="true"]');

      if(focusCandidates.size() > 0) {
        focusElement = $(focusCandidates[0]);

        if(focusElement.is('form')) {
          focusElement.find(':input:not(:hidden)').get(0).focus();
        } else {
          focusElement.focus();
        }

      }
    }

    function focus(parentNode) {

      var focusCandidates = $(parentNode).find('[data-focus="true"]');

      if(focusCandidates.size() > 0) {
        focusElement = $(focusCandidates[0]);

        if(focusElement.is('form')) {
          focusElement.find(':input:not(:hidden)').get(0).focus();
        } else {
          focusElement.focus();
        }

      }
    }


    function initBigSlide() {

      gbJs.bigSlide = $('.navigation-trigger').bigSlide({
        menu: '.side-panel-maximized',
        menuWidth: '20.0em'
      });

    }

    function initHotkeys2() {

      // Register help
      hotkeys('h', function(event, handler){
        //toggleHotkeyDialog();
        console.log('You pressed h');
      });

      // Register UI-nodes
      var hotkeyNodes = $('[data-hotkey]');

      $.each(hotkeyNodes, function(index, hotkeyNode) {
        var dataHotkey = $(hotkeyNode).data('hotkey');
        var dataHotkeyMethod = $(hotkeyNode).data('hotkeymethod');
        var titleAttr = $(hotkeyNode).data('hotkeytitle');

        if(!(dataHotkey in gbJs.registeredHotkeys)) {

          hotkeys(dataHotkey, function(event, handler){
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

    function initInputMask() {

      // Register UI-nodes
      var maskInputs = $('[data-mask="true"]');

      $.each(maskInputs, function(index, maskInput) {
        var dataMaskType = $(maskInput).data('masktype');

        if(dataMaskType == 'personnumber') {
          $(maskInput).mask('00000000-0000');
        }

      });

    }

    function initTabs() {

      var tabContainers = $('.tabs');

      $.each(tabContainers, function(index, tabContainer) {
        var activeTabIndex = $(tabContainer).data('activetab');

        if(typeof activeTabIndex == 'undefined') {
          activeTabIndex = 0;
        }

        $(tabContainer).tabs({
          active: activeTabIndex,
          activate: function( event, ui ) {
            //focus(ui.newPanel);
          },
          create: function( event, ui ) {
            //focus(ui.panel);
          }
        });


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

    function initToggleDockbar() {

      $('.toggle-dockbar').on('click', function(e) {
        var body = $('body');

        if(body.hasClass('dockbar-visible')) {
          body.removeClass('dockbar-visible');
          Liferay.Store('toggle_dockbar', 'hidden');
        } else {
          body.addClass('dockbar-visible');
          Liferay.Store('toggle_dockbar', 'visible');
        }

        return false;
      });

    }

    function selectReplace() {
      $('select[data-selectreplace="true"]').chosen({});
    }

    function updateTopBar() {

      if(gbJs.topBarHeading) {
        $('#topBar h1.page-title').html(gbJs.topBarHeading);
      }

    }


  });
})(jQueryTheme);
