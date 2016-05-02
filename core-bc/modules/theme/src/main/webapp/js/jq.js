(function( $ ) {
  $(function() {
    //do stuff with $ here

    if(typeof gbJs == 'undefined') {
      gbJs = {};
    }

    gbJs.registeredHotkeys = {};
    gbJs.debugMode = true;
    //gbJs.debugMode = false;

    // Run init
    init();

    // Public methods

    // Run only once
    function init() {
      _initBigSlide();
      _initToggleDockbar();
      _registerViewReloadListener();

      refreshUI();
    }

    // Run when data is loaded
    // i.e. when event 'viewReloaded' topic us broadcast on radio
    function refreshUI() {
      //_focusOnLoad();
      _initHotkeys();
      _initInputMask();

      _initSelectReplace();
      _initUpdateTopBar();
    }

    // Private methods

    function _focusOnLoad() {

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

    function _focusNode(parentNode) {

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


    function _initBigSlide() {

      gbJs.bigSlide = $('.navigation-trigger').bigSlide({
        menu: '.side-panel-maximized',
        menuWidth: '20.0em'
      });

    }

    function _initHotkeys() {

      // Register help
      hotkeys('h', function(event, handler){
        //_toggleHotkeyDialog();
        //console.log('You pressed h');
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

    function _initInputMask() {

      // Register UI-nodes
      var maskInputs = $('[data-usemask="true"]');

      // Start by unmasking all
      maskInputs.unmask();

      $.each(maskInputs, function(index, maskInput) {
        var dataMaskType = $(maskInput).data('masktype');

        if(dataMaskType == 'personnumber') {
          $(maskInput).mask('00000000-0000');
        }

        if(dataMaskType == 'date') {
          $(maskInput).mask('1111-11-11');
        }

      });

    }

    function _initToggleDockbar() {

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

    function _initUpdateTopBar() {

      if(gbJs.topBarHeading) {
        $('#topBar h1.page-title').html(gbJs.topBarHeading);
      }

    }

    function _initSelectReplace() {
      $('select[data-selectreplace="true"]').chosen({});
    }

    function _onViewReload() {
      console.log('_onViewReload');
      _initInputMask();
      _focusNode();
    }

    function _registerViewReloadListener() {
        radio('viewReloaded').subscribe(_onViewReload);
    }

    function _toggleHotkeyDialog() {

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
