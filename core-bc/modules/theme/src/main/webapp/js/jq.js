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
      _initMainMenu();
      _initUserGoal();
      _initToggleDockbar();
      _registerViewPartialReloadListener();

      refreshUI();


      //$('body').userGoal();
    }

    // Run when data is loaded
    // i.e. when event 'viewReloaded' topic us broadcast on radio
    function refreshUI() {
      //_focusOnLoad();
      _initBoxCollapsible();
      _initHotkeys();
      _initInputMask();
      _initSelectReplace();
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

      var focusCandidates = $(parentNode).find('[autofocus="true"]');

      if(focusCandidates.size() > 0) {
        focusElement = $(focusCandidates[0]);
        focusElement.focus();
      }
    }


    function _focusNodeOld(parentNode) {

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

    function _initBoxCollapsible() {

      $('.js-box-collapsible .box-title').on('click', function(e) {
        //var box = $(this).closest('.js-box-collapsible');
        //console.log('box: ', box);
        $(this).closest('.js-box-collapsible').toggleClass('box-collapsed');

      });


      $('.js-box-collapsible').addClass('box-collapsible');

    }

    function _initHotkeys() {

      // Register UI-nodes
      var hotkeyNodes = $('[data-hotkey]');

      // If keys are already registered, unbind them
      var keys = Object.keys(gbJs.registeredHotkeys).join(', ');
      if(keys != '') {
        hotkeys.unbind(keys);
        gbJs.registeredHotkeys = {};
      }

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

      // Start by unmasking all
      $('.js-input-mask').unmask();

      // Personnumber
      $('.js-input-mask.js-input-mask-personnumber').mask('00000000-0000');

      // Date
      $('.js-input-mask.js-input-mask-date').mask('0000-00-00');

    }

    function _initMainMenu() {

      $('.gb-menu-wrapper').hover(function(){
        $(this).toggleClass('gb-menu-open');
      });

      // // Use of menu debug is only for development purpose
      // var menuDebug = false;
      //
      // if(menuDebug) {
      //   $('.gb-menu-wrapper').addClass('gb-menu-open');
      // } else {
      //
      //   $('.gb-menu-wrapper').hover(function(){
      //     $(this).toggleClass('gb-menu-open');
      //   });
      //
      // }

    }

    function _initUserGoal() {

      //console.log(Liferay);
      //console.log(Liferay.ThemeDisplay);

      var userProgressWrap = $('.js-user-progress');
      var userId = Liferay.ThemeDisplay.getUserId();
      // Temp
      //userId = 20159;
      var progressUrlBase = '/glasogonbidrag-user-progress-web/user-progress';
      var progressUrl = progressUrlBase + '/' + userId;
      //Temp
      //progressUrl = progressUrl + '/on/2016-05-02';


      $('.js-user-progress').userProgress({
        pollerMillis: 100000,
        progressUrl: progressUrl
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

    function _initSelectReplace() {
      // Start by destroying all potentially already created chosen
      // Commented out. Not sure if this is really needed
      //$('.js-select-replace').chosen({'destroy'});
      $('.js-select-replace').chosen({});
    }

    function _onViewPartialReload() {
      //console.log('_onViewPartialReload');
      refreshUI();
      _focusNode($('#content'));
    }

    function _registerViewPartialReloadListener() {
        radio('viewPartialReload').subscribe(_onViewPartialReload);
    }


  });
})(jQueryTheme);
