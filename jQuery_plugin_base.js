;(function ($, window, undefined) {
	var defaultSettings = {
			nameSpace : "basePlugin",
			individualInstances: false,
			defaultOptions : {}
		},
		defaultProto = {
			init: $.noop
		};


	$.fn.pluginBuilder = function (settings, plugin) {
		var settings = $.extend(true, {}, defaultSettings, settings),
			_proto = $.extend(true, {}, defaultProto, plugin);

		if ($[settings.nameSpace]) {
			throw settings.nameSpace + " is already in use in jQuery. Please pick another nameSpace."
			return false;
		}


		function Plugin(el, options, initObj) {
			this.el = $(el);
			this.options = $.extend(true, {}, settings.defaultOptions, options);
			this.init.call(this, initObj);
		}

		_proto.constructor = Plugin;
		Plugin.prototype = _proto;

		function setGetData (el, options) {
			if (!el.data(settings.nameSpace)) {
				el.data(settings.nameSpace, new Plugin(el, options));
			}
			return el.data(settings.nameSpace);
		}

		$.fn[settings.nameSpace] = function (options, initObj) {
			var $this = $(this),
				_len = $this.length,
				_output = [],
				_i;

			if (settings.individualInstances) {
				for (_i = 0; _i < _len; _i += 1) {
					_output.push(setGetData($this[_i], options, initObj));
				}
			} else {
				return setGetData($this, options, initObj);
			}
			return _output;
		}

	}
})(jQuery, window);


$(function () {
	$.pluginBuilder({
			nameSpace: "testHello"
		},{
			init: function (opts) {
				console.log(opts);
				this.render.call(this);
			},
			render: function () {
				this.el.append('<p>Hello World</p>');
			}
		});

	$('body').testHello({
		param: "Test One"
	},"Init Argument! Loloz");
});