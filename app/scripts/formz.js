
;(function () {
	var instance = "formz";


    var baseObj = {
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
    }

    /* Input Police */

    function Police(el, form) {
        this.el = $(el);
        this.formz = form;
        this.initialize.call(this);
    }
    Police.prototype = $.extend(true, {}, baseObj, {
        constructor: Police,
        initialize: function () {
            var reg;
            this.pattern = (reg = this.el.attr(this.formz.options.attr.allowedKeys)) ? new RegExp(reg) : false;
            if (!this.pattern) {
                if (this.hasClass('frm-digits')) {
                    this.pattern = /\d/;
                } else if (this.hasClass('frm-letters')) {
                    this.pattern = /[a-zA-Z]/;
                }
                if (this.hasClass('frm-digits frm-letters')) {
                    this.pattern = /[a-zA-Z\d]/;
                }
            }
            if (this.pattern) {
                this.bind.call(this);
            }
        },
        bind: function () {
            var self = this;

            this.el.on('keypress', function (e) {
                self.validate.call(self, e);
            });
        },
        validate: function (e) {
            var _key = this.getKeyPress.call(this, e),
                _char = String.fromCharCode(_key);

            if (_key === 0 || this.pattern.test(_char)) {
                return true; // If key pressed is a F key (ex: F5) - allow it through
            }
            e.preventDefault();
            return false;

        },
        getKeyPress: function (e) {
            var _ref;
            return (_ref = e.which) != null ? _ref : e.keyCode;
        }
    });










    function TextInput(el, form) {
        this.el = $(el);
        this.formz = form;
        this.initialize.call(this);
    }



    TextInput.prototype = $.extend(true, {}, baseObj, {
        constructor: TextInput,
        options: {
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            url: /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
        },
        initialize: function () {
            var opts = this.formz.options,
                tmp;
            this.pattern = (tmp = this.el.attr(opts.attr.validation)) ? new RegExp(tmp) : false;
            this.required = this.el.attr('required') ? true : false;
            this.stateObj = (tmp = this.el.parents(opts.stateSelector)).length > 0 ? tmp : this.el;

            if (this.hasClass("frm-email")) {
                this.pattern = new RegExp(this.options.email);
            }

            // Set Default Text
            tmp = this.el.attr('placeholder');
            if (tmp) {
                this.el.attr(opts.attr.placeholder, tmp);
                this.el.removeAttr('placeholder');
            }
            this.defaultText = (tmp = this.el.attr(opts.attr.placeholder)) ? tmp : false;
            if (this.defaultText) {
                this.el.val(this.defaultText);
                this.el.addClass(opts.classes.defaultText);
            }
            
            // Set Input Police
            this.police = new Police(this.el, this.formz);
            this.bind.call(this);
        },
        bind: function () {
            var self = this;
            this.el.on('blur', function () {
                self.validate.call(self);
            });
            this.el.on('focus', function () {
                var value = self.el.val();
                if (value === self.defaultText) {
                    self.el.val("");
                }
            });
        },
        setStateClass: function (valid) {
            var opts = this.formz.options;
            if (valid) {
                this.stateObj.removeClass(opts.classes.error).addClass(opts.classes.valid);
            } else {
                this.stateObj.addClass(opts.classes.error).removeClass(opts.classes.valid);
            }
            if (this.defaultText && this.el.val() === "") {
                this.el.val(this.defaultText).addClass(opts.classes.defaultText);
            } else {
                this.el.removeClass(opts.classes.defaultText);
            }
        },
        validate: function () {
            var self = this,
                _value = this.el.val(),
                _valid;

            if (!this.required && _value === "") {
                _valid = true;
            } else if (this.required && _value === this.defaultText) {
                _valid = false;
            } else {
                _valid = this.pattern.test(_value);
            }
            if (_valid) {
                this.el.off('keypress');
            } else {
                this.el.on('keypress', function (e) {
                    self.validate.call(self);
                });
            }
            this.setStateClass.call(this, _valid);
            return _valid;
        },
        prepareSubmit: function () {
            var _value = this.el.val();

            if (_value === this.defaultText) {
                _value = "";
                this.el.val(_value);
            }
            return _value;
        }
    });


	$.pb(instance, {
		options: {
			// Callbacks
	        onValid: $.noop,
	        onInvalid: $.noop,
	        initialize: $.noop,

            // Selectors
            submit: ".js-submit",
            stateSelector: ".js-inputState",

            classes: {
                error: "error",
                valid: "valid",
                defaultText: "defaultText"
            },
            attr: {
                placeholder: "data-placeholder",
                validation: "data-pattern",
                allowedKeys: "data-allowedKeys"
            },
            rules: {
                email: {

                }
            }
		},
        form: {},
		initialize: function () {
            var self = this,
                _inputs,
                _i;

            this.$submit = $(this.options.submit);

            _inputs = this.el.find('input[type="text"]');
            for (_i = 0; _i < _inputs.length; _i += 1) {
                this.initTxtInput.call(this, _inputs[_i]);
            }

            this.$submit.on('click', function () {self.validateForm.call(self);});

    		this.options.initialize.call(this);
		},
		validateForm: function () {
            var _form = this.form,
                _valid = true,
                _key;

            for (_key in _form) {
                if (!_form[_key].validate()) {
                    _valid = false;
                }
            }
            if (_valid) {
                this.submit.call(this);
            } else {
                console.log("Form Not Valid");
            }
        },
        submit: function () {
            var output = {},
                _key;

            for (_key in this.form) {
                output[_key] = this.form[_key].prepareSubmit();
            }
            console.log('submit form', output);
        },
        initTxtInput: function (el) {
            var _el = $(el),
                _name = _el.attr('name') || "txtInput_" + new Date().valueOf();
            this.form[_name] = new TextInput(_el, this);
        }
	});
})();

$(function () {
	$('#TestForm').formz({
		onValid: function () {
            console.log("Valid: ", arguments);
        },
        onInvalid: function () {
            console.log("Invalid: ", arguments);
        }
	});
});