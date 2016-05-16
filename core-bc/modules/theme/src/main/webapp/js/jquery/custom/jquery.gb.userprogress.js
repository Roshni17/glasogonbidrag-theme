// Plugin based on jQuery Boilerplate https://jqueryboilerplate.com/
;( function( $, window, document, undefined ) {

	'use strict';

		// Create the defaults once
		var pluginName = 'userProgress',
			defaults = {
        textTodaysGoal: 'Dagens m&aring;l',
        progressUrl: ''
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
      this.userProgress = 0;
      this.userGoal = 0;
      this.userPercentage = 0;
      this.progressSimpleElement = null;
      this.progressDetailsElement = null;
      this.loadMask = null;
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {

      init: function() {
        var instance = this;

        instance.initUI();
        instance.getProgress();
			},

      getProgress: function() {

        var instance = this;

        $(instance.loadMask).show();

        $.getJSON(this.settings.progressUrl)
          .done(function(data) {
            var dataUserProgress = parseInt(data.progress);
            var dataUserGoal = parseInt(data.goal);

            var userProgress = dataUserProgress/100;
            var userGoal = dataUserGoal/100;

            var userPercentage = Math.round(userProgress/userGoal*100);

            instance.userProgress = userProgress;
            instance.userGoal = userGoal;
            instance.userPercentage = userPercentage;

            var simpleHtml = instance.userPercentage + '%';

            $(instance.progressSimpleElement).html(simpleHtml);

            var detailsHtml = '<div class="">' + instance.settings.textTodaysGoal + '</div>';
            detailsHtml = detailsHtml + '<div class="progress-bar"><div class="progress-bar-inner" style="width: ' + instance.userPercentage + '%"></div></div>'
            detailsHtml = detailsHtml + '<div class="progress-info">' + instance.userProgress.toLocaleString('sv') + ' av ' + instance.userGoal.toLocaleString('sv') + ' (' + instance.userPercentage + '%)' + "</div>";

            $(instance.progressDetailsElement).html(detailsHtml);

            //var userPercentageFake = 99;

            if(userPercentage >= 100) {
              $(instance.element).addClass('complete');
            } else {
              $(instance.element).removeClass('complete');
            }

            $(instance.loadMask).hide();

          })
          .fail(function(data) {
            console.log('Fail');
          });

      },

      initUI: function() {
        var instance = this;
        //$( this.element ).text( text );

        var html = '<div class="user-progress-simple"></div>';
        html = html + '<div class="user-progress-details"></div>';
        html = html + '<div class="user-progress-loading-mask" style="display: none"></div>';

        $(instance.element).html(html);

        var progressSimpleElements = $(instance.element).find('.user-progress-simple');
        var progressSimpleElement = $(progressSimpleElements[0]);

        var progressDetailsElements = $(instance.element).find('.user-progress-details');
        var progressDetailsElement = $(progressDetailsElements[0]);

        var loadMaskElements = $(instance.element).find('.user-progress-loading-mask');
        var loadMask = $(loadMaskElements[0]);

        instance.progressSimpleElement = progressSimpleElement;
        instance.progressDetailsElement = progressDetailsElement;
        instance.loadMask = loadMask;
      },

			someFunction: function() {
        var instance = this;
        console.log('userProgress someFunction');
			}

		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, 'plugin_' + pluginName ) ) {
					$.data( this, 'plugin_' +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
