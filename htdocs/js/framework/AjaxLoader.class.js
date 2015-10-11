/**
 *
 * this helper Object handle
 * all ajax request
 *
 * @author Levon Naghashyan
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2010-2015
 * @package ngs.framework
 * @version 2.0.0
 */
NGS.AjaxLoader = {

	/**
	 * Method for require js file
	 *
	 * @param  _fileUrl:String
	 * @param  options:Object
	 *
	 * return load script and do global eval
	 */
	require : function(_fileUrl, callback) {
		this.request(_fileUrl, {
			headers : {
				contentType : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"
			},
			onComplete : function(data) {
				NGS.globalEval(data);
				callback();
			}
		});
	},

	/**
	 * Method for ajax request handler
	 *
	 * @param  _url:String
	 * @param  options:Object
	 *
	 */

	request : function(_url, options) {
		NGS.showAjaxLoader();
		var defaultOptions = {
			method : "get",
			async : true,
			params : {},
			headers : {
				accept : null,
				contentType : "application/x-www-form-urlencoded"
			},
			crossDomain : false,
			onCreate : NGS.emptyFunction,
			onComplete : NGS.emptyFunction,
			on403 : NGS.emptyFunction
		};
		options = NGS.extend(defaultOptions, options);
		if (window.XMLHttpRequest) {
			var xmlhttp = new XMLHttpRequest();
		} else {
			var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 1) {
				options.onCreate();
			}
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					options.onComplete(xmlhttp.responseText);
				} else if (xmlhttp.status == 400) {
					options.onError(xmlhttp.responseText);
				}
				NGS.hideAjaxLoader();
			}

		}.bind(this);

		xmlhttp.onprogress = function(evt) {
		//TODO	var percentComplete = evt.loaded / evt.total;
		};

		var urlParams = this.serializeUrl(options.params);
		var sendingData = null;
		if (options.method.toUpperCase() == 'POST') {
			sendingData = urlParams;
		} else {
			if (urlParams) {
				_url = _url + "?" + urlParams;
			}
		}

		xmlhttp.open(options.method.toUpperCase(), _url, options.async);
		if (options.crossDomain == false) {
			xmlhttp.withCredentials = true;
			xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		} else {
			xmlhttp.setRequestHeader("Accept", "*");
		}
		xmlhttp.setRequestHeader("Content-type", options.headers.contentType);
		xmlhttp.send(sendingData);
	},

	/**
	 * serialize obejct to url string
	 *
	 * @param  obj:Object
	 *
	 **/
	serializeUrl : function(obj) {
		var str = [];
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				if (obj[p] instanceof Array) {
					str.push(this.serializeArrayToUrl(obj[p], p));
					continue;
				}
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		}
		return str.join("&");
	},

	/**
	 * serialize array to url string
	 *
	 * @param  urlArrayParams:Array
	 * @param  prefix:String
	 *
	 **/
	serializeArrayToUrl : function(urlArrayParams, prefix) {
		var str = [];
		for (var i = 0; i < urlArrayParams.length; i++) {
			if (urlArrayParams[i] instanceof Array) {
				str.push(this.serializeArrayToUrl(urlArrayParams[i], i));
				continue;
			}
			str.push(encodeURIComponent(prefix) + "[]=" + encodeURIComponent(urlArrayParams[i]));
		}
		return str.join("&");
	}
};
