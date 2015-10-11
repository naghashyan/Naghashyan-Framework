(function($) {
  $.fn.imFormValidator = function(options) {
    var defaults = {
      showError : imValidator.showError,
      hideError : imValidator.hideError
    };
    var options = $.extend(defaults, options);
    var passwordFieald = false;
    var emailReFieald = false;
    var formValidateStatus = true;
    $(this).find(":input").each(function(key, item) {
      var status = true;
      if ($(item).attr("data-ngs-validate")) {
        var validateType = $(item).attr("data-ngs-validate");
        switch(validateType) {
          case "number":
            var status = imValidator.validateNumber($(item).val());
            break;
          case "float-number":
            var status = imValidator.validateFloatNumber($(item).val());
            break;  
          case "string":
            var status = imValidator.validateString($(item).val(), 1, false);
            break;
          case "text":
            var status = imValidator.validateText($(item).val());
            break;
          case "email":
            var status = imValidator.validateEmail($(item).val());
            if (emailReFieald && status) {
              status = imValidator.validateEmail($(item).val(), emailReFieald.val());
            }
            emailReFieald = $(item);
            break;
          case "username":
            var status = imValidator.validateString($(item).val(), 2, true);
            break;
          case "username-email":
            var status = imValidator.validateString($(item).val(), 2, true, true);
            break;
          case "password":
            var status = imValidator.validateString($(item).val(), 0, false);

            if (passwordFieald && status == true) {
              status = imValidator.validatePasswords($(item).val(), passwordFieald.val());
            }
            passwordFieald = $(item);
            break;
          case "mobile-number":
            var status = imValidator.validateMobileNumber($(item).val());
            break;
          case "policy":
            var status = imValidator.validatePolicy(item);
            break;
          case "cc_expiration_date":
            var status = imValidator.validateCCExpirationDate($(item).val());
            break;
          case "ccv":
            var status = imValidator.validateCCV($(item).val());
            break;
        }
        if (status !== true) {
          formValidateStatus = false;
          options.showError(item, status);
        } else {
          options.hideError(item);
        }
      }
    });
    return formValidateStatus;
  };

  $.fn.imFormValidatorByJson = function(jsonArr) {
    var passwordFieald = false;
    var formValidateStatus = true;
    $(this).find(":input").each(function(key, item) {
      if ($(item).attr("validate")) {
        var validateType = $(item).attr("validate");
        imValidator.hideError(item);
        if (jsonArr[validateType]) {
          formValidateStatus = false;
          imValidator.showError(item, jsonArr[validateType]);
        }
      }
    });
    return formValidateStatus;
  };
  var imValidator = {

    validateEmail : function(str, str1) {
      var str = str.trim();
      filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!filter.test(str)) {
        return "Please enter valid email";
      }
      if (str1) {
        var str1 = str1.trim();
        if (str != str1) {
          return "These emails don't match. Try again?";
        }
      }
      return true;
    },
    validateNumber : function(str) {
      var str = str.trim();
      var filter = /^[0-9]*$/;
      if (!filter.test(str)) {
        return "Please use only numbers.";
      }
      if (!str) {
        return "You can't leave this empty.";
      }
      return true;
    },
    validateFloatNumber : function(str) {
      var str = str.trim();
      var filter = /^-?\d*(\.\d+)?$/;
      if (!filter.test(str)) {
        return "Please use only numbers.";
      }
      if (!str) {
        return "You can't leave this empty.";
      }
      return true;
    },
    validateMobileNumber : function(str) {
      var str = str.trim();
      var filter = /^[0-9\+\.\-]*$/;
      if (!filter.test(str)) {
        return "Please use only numbers.";
      }
      if (!str) {
        return "You can't leave this empty.";
      }
      var str1 = str.replace(/\-/g, "");
        var str2 = str1.replace(/\./g, "");
        if (str2.length != 10 && str2.length != 11) {
            return "invalid phone number";
        }
      return true;
    },
    validateString : function(str, len, allowChars, email) {
      var str = str.trim();
      if (!str) {
        return "You can't leave this empty.";
      }
      if (len) {
        if (str.length < len || str.length > 60) {
          return "Please use between " + len + " and 60 characters.";
        }
      }
      if (allowChars) {
        var filter = /^[A-Za-z0-9\_\-\.\s]*$/;
        if (email) {
          filter = /^[A-Za-z0-9\_\-\.\@]*$/;
        }
        if (!filter.test(str)) {
          return "Please use only letters (a-z), numbers, and periods.";
        }
      }
      return true;
    },
    validateText : function(str) {
      var str = str.trim();
      if (!str) {
        return "You can't leave this empty.";
      }
      var filter = /^[A-Za-z0-9\_\-\.\@\s\,\+\%\$\&]*$/;
      if (!filter.test(str)) {
        return "Please use only letters (a-z), numbers, and periods.";
      }

      return true;
    },
    validateCCExpirationDate : function(str) {
      var str = str.trim();
      if (!str) {
        return "You can't leave this empty.";
      }
      var filter = /^\d{2}\/{0,1}\d{2}$/;
      if (!filter.test(str)) {
        return "Please use mm/yy format for date";
      }

      return true;
    },
    validateCCV : function(str) {
      var str = str.trim();
      if (!str) {
        return "Please enter your card's CCV";
      }
      var filter = /^\d{3,4}$/;
      if (!filter.test(str)) {
        return "Please enter correct CCV";
      }

      return true;
    },
    validatePasswords : function(str, str1) {
      var str = str.trim();
      var str1 = str1.trim();
      filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (str !== str1) {
        return "You passwords don't match. Can you please try again?";
      }
      return true;
    },
    validatePolicy : function(elem) {
      if (!$(elem).is(':checked')) {
        return "In order to use our services, you must agree to our Terms of Use and Privacy Policy.";
      }
      return true;
    },
    showError : function(elem, msg) {
      $(elem).parent().append($("<div class='ilyov_validate'>" + msg + "</div>"));
      $(elem).css({
        "border-color" : "#FC5458",
        "border-width" : "1px",
        "border-style" : "solid"
      });
    },
    hideError : function(elem) {
      $(elem).parent().find(".ilyov_validate").remove();
      $(elem).css("border", "none");
    }
  };
})(jQuery);

(function($) {
  return $.fn.serializeObject = function(trim) {
    var json,
        patterns,
        push_counters,
        _this = this;
    json = {};
    push_counters = {};
    patterns = {
      validate : /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
      key : /[a-zA-Z0-9_]+|(?=\[\])/g,
      push : /^$/,
      fixed : /^\d+$/,
      named : /^[a-zA-Z0-9_]+$/
    };
    this.build = function(base, key, value) {
      base[key] = value;
      return base;
    };
    this.push_counter = function(key) {
      if (push_counters[key] ===
      void 0) {
        push_counters[key] = 0;
      }
      return push_counters[key]++;
    };
    $.each($(this).serializeArray(), function(i, elem) {
      var k,
          keys,
          merge,
          re,
          reverse_key;
      if (!patterns.validate.test(elem.name)) {
        return;
      }
      keys = elem.name.match(patterns.key);
      if (trim) {
        merge = elem.value.trim();
      } else {
        merge = elem.value;
      }
      reverse_key = elem.name;
      while (( k = keys.pop()) !==
      void 0) {
        if (patterns.push.test(k)) {
          re = new RegExp("\\[" + k + "\\]$");
          reverse_key = reverse_key.replace(re, '');
          merge = _this.build([], _this.push_counter(reverse_key), merge);
        } else if (patterns.fixed.test(k)) {
          merge = _this.build([], k, merge);
        } else if (patterns.named.test(k)) {
          merge = _this.build({}, k, merge);
        }
      }
      return json = $.extend(true, json, merge);
    });
    return json;
  };
})(jQuery); ( function($) {
    'use strict';

    var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
        meta = {
      '\b' : '\\b',
      '\t' : '\\t',
      '\n' : '\\n',
      '\f' : '\\f',
      '\r' : '\\r',
      '"' : '\\"',
      '\\' : '\\\\'
    },
        hasOwn = Object.prototype.hasOwnProperty;

    /**
     * jQuery.toJSON
     * Converts the given argument into a JSON representation.
     *
     * @param o {Mixed} The json-serializable *thing* to be converted
     *
     * If an object has a toJSON prototype, that will be used to get the representation.
     * Non-integer/string keys are skipped in the object, as are keys that point to a
     * function.
     *
     */
    $.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function(o) {
      if (o === null) {
        return 'null';
      }

      var pairs,
          k,
          name,
          val,
          type = $.type(o);

      if (type === 'undefined') {
        return undefined;
      }

      // Also covers instantiated Number and Boolean objects,
      // which are typeof 'object' but thanks to $.type, we
      // catch them here. I don't know whether it is right
      // or wrong that instantiated primitives are not
      // exported to JSON as an {"object":..}.
      // We choose this path because that's what the browsers did.
      if (type === 'number' || type === 'boolean') {
        return String(o);
      }
      if (type === 'string') {
        return $.quoteString(o);
      }
      if ( typeof o.toJSON === 'function') {
        return $.toJSON(o.toJSON());
      }
      if (type === 'date') {
        var month = o.getUTCMonth() + 1,
            day = o.getUTCDate(),
            year = o.getUTCFullYear(),
            hours = o.getUTCHours(),
            minutes = o.getUTCMinutes(),
            seconds = o.getUTCSeconds(),
            milli = o.getUTCMilliseconds();

        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        if (hours < 10) {
          hours = '0' + hours;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        if (milli < 100) {
          milli = '0' + milli;
        }
        if (milli < 10) {
          milli = '0' + milli;
        }
        return '"' + year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + '.' + milli + 'Z"';
      }

      pairs = [];

      if ($.isArray(o)) {
        for ( k = 0; k < o.length; k++) {
          pairs.push($.toJSON(o[k]) || 'null');
        }
        return '[' + pairs.join(',') + ']';
      }

      // Any other object (plain object, RegExp, ..)
      // Need to do typeof instead of $.type, because we also
      // want to catch non-plain objects.
      if ( typeof o === 'object') {
        for (k in o) {
          // Only include own properties,
          // Filter out inherited prototypes
          if (hasOwn.call(o, k)) {
            // Keys must be numerical or string. Skip others
            type = typeof k;
            if (type === 'number') {
              name = '"' + k + '"';
            } else if (type === 'string') {
              name = $.quoteString(k);
            } else {
              continue;
            }
            type = typeof o[k];

            // Invalid values like these return undefined
            // from toJSON, however those object members
            // shouldn't be included in the JSON string at all.
            if (type !== 'function' && type !== 'undefined') {
              val = $.toJSON(o[k]);
              pairs.push(name + ':' + val);
            }
          }
        }
        return '{' + pairs.join(',') + '}';
      }
    };

    /**
     * jQuery.evalJSON
     * Evaluates a given json string.
     *
     * @param str {String}
     */
    $.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(str) {
      /*jshint evil: true */
      return eval('(' + str + ')');
    };

    /**
     * jQuery.secureEvalJSON
     * Evals JSON in a way that is *more* secure.
     *
     * @param str {String}
     */
    $.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(str) {
      var filtered = str.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '');

      if (/^[\],:{}\s]*$/.test(filtered)) {
        /*jshint evil: true */
        return eval('(' + str + ')');
      }
      throw new SyntaxError('Error parsing JSON, source is not valid.');
    };

    /**
     * jQuery.quoteString
     * Returns a string-repr of a string, escaping quotes intelligently.
     * Mostly a support function for toJSON.
     * Examples:
     * >>> jQuery.quoteString('apple')
     * "apple"
     *
     * >>> jQuery.quoteString('"Where are we going?", she asked.')
     * "\"Where are we going?\", she asked."
     */
    $.quoteString = function(str) {
      if (str.match(escape)) {
        return '"' + str.replace(escape, function(a) {
          var c = meta[a];
          if ( typeof c === 'string') {
            return c;
          }
          c = a.charCodeAt();
          return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
        }) + '"';
      }
      return '"' + str + '"';
    };

  }(jQuery));
