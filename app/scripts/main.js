;(function ($, window, undefined) {
	// Helper / Old Browser Support scripts
    if (!Array.indexOf) {
        Array.prototype.indexOf = function (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return i;
                }
            }
            return -1;
        }
    }

    var defaultSettings = {
		individualInstances: false
    };

	var defaultPlugin = {
			options : {},
			init: $.noop,
			// Bindings
	        on: function (target, event, callback, scope) {
	            var self = this,
	                _i, _ev, tempcall,
	                _id;
	            event = event.split(" ");
	            for (_i = 0; _i < event.length; _i += 1) {
	                _ev = event[_i];
	                if (!this._bindings[_ev]) {
	                    this._bindings[_ev] = [];
	                }
	                if (target.selector) {
	                    target = target.selector;
	                }
	                if (scope) {
	                    tempcall = callback;
	                    callback = function () { tempcall.apply(scope, arguments); };
	                }

	                this._bindings[_ev].push({
	                    target: target,
	                    callback: callback
	                });

	                if ($().on) {
	                    $(target).on(_ev, callback);
	                } else {
	                    $(target).bind(_ev, callback);
	                }
	            }
	        },
	        off: function (target, event, callback) {
	            var _event,
	                self = this;

	            if (target && target.selector) {
	                target = target.selector;
	            }

	            function processEvent(_ev) {
	                var _len,
	                    _i,
	                    _item,
	                    _target,
	                    _callback;
	                if (self._bindings[_ev]) {
	                    _len = self._bindings[_ev].length;

	                    for (_i = 0; _i < self._bindings[_ev].length; _i += 1) {
	                        _item = self._bindings[_ev][_i];
	                        _target = (target) ? false : true;
	                        _callback = (callback) ? false : true;

	                        if (target && _item.target === target) {
	                            _target = true;
	                        }
	                        if (callback && _item.callback === callback) {
	                            _callback = true;
	                        }
	                        if (_callback && _target) {
	                            if ($().off) {
	                                $(_item.target).off(_ev, _item.callback);
	                            } else {
	                                $(_item.target).off(_ev, _item.callback);
	                            }
	                            self._bindings[_ev].splice(_i, 1);
	                            _i -= 1;
	                            //  console.log("target: ", _item.target, "event: ", _ev);
	                        }
	                    }
	                    //console.log(_len, self._bindings[_ev].length);
	                }
	            }

	            if (!event) {
	                for (_event in this._bindings) {
	                    processEvent(_event);
	                }
	            } else {
	                event = event.split(" ");
	                for (var _i = 0; _i < event.length; _i += 1) {
	                    processEvent(event[_i]);
	                }
	            }
			},

	        hasClass: function (cssClass) {
	            var classPresent = true;
	            if (!cssClass) {
	                return false;
	            }
	            cssClass = cssClass.split(" ");
	            for (var i = 0; i < cssClass.length; i += 1) {
	                if (!this.el.hasClass(cssClass[i])) {
	                    classPresent = false;
	                }
	            }
	            return classPresent;
	        }
		},
		originalMethod = $.pb;


	$.pb = function (nameSpace, plugin, settings) {
		/* =========================================== */
		/* Edit arguments to honor new creation method */
		/* =========================================== */
		var _plug = $.extend(true, {}, defaultPlugin, plugin),
			_set = $.extend(true, {}, defaultSettings, settings),
			_ns = nameSpace;

		if ($.fn[_ns]) {
			console.log(_ns + " is already in use in jQuery. Please pick another nameSpace.");
			return false;
		}

		function Plugin(el, options) {
			this.el = $(el);
			this.options = $.extend(true, {}, this.options, options);
			this._bindings = {};
			this.initialize.call(this);
		}

		_plug.constructor = Plugin;
		Plugin.prototype = _plug;

		function setGetData (el, options) {
			if (!el.data(_ns)) {
				el.data(_ns, new Plugin(el, options));
			}
			return el.data(_ns);
		}

		/* Bind the Plugin */
		$.fn[_ns] = function (options) {
			var $this = $(this),
				_len = $this.length,
				_output = [],
				_i;

			if (_set.individualInstances) {
				for (_i = 0; _i < _len; _i += 1) {
					_output.push(setGetData($this[_i], options));
				}
			} else {
				return setGetData($this, options);
			}
			return _output;
		}
		/* End: Bind the Plugin */
	}
	$.pb.compatibilityMode = function (nameSpace) {
		var currentBuild = $.pb;

		if ($[nameSpace]) {
			console.log(nameSpace + ' is already reserved, please pick a new nameSpace.');
			return false;
		}
		$[nameSpace] = currentBuild;
		$.pb = originalMethod;
		return $[nameSpace];
	}
	$.pb.extend = function (nameSpace, data) {
		var nameSpace = nameSpace || "methodName",
			data = data || $.noop;
		
		if ($.pb[nameSpace]) {
			console.log("$.pb." + nameSpace + " already exists, please pick a new nameSpace.");
			return false;
		}
		$.pb[nameSpace] = data;
	}

})(jQuery, window);


$(function () {
	/* Sample Plugin */

	/*	$.pb({
			settings: {
				nameSpace: "testHello",
				options: {

				}
			},
			plugin: {
				init: function () {
					this.render.call(this);
				},
				render: function () {
					this.el.empty();
					this.el.append('<h1>Hello World AGAGAGA</h1>');
				}
			}
		});



		$.pb("testHello", {
			options: {

			},
			init: function () {
				this.render.call(this);
			},
			render: function () {
				this.el.empty();
				this.el.append('<h1>Hello World AGAGAGA</h1>');
			}
		});



		$('body').testHello({
			param: "Test One"
		}); */
});


