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
  require: function (_fileUrl, callback) {
    this.request(_fileUrl, {
      headers: {
        contentType: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"
      },
      onComplete: function (data) {
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

  request: function (_url, options) {
    NGS.showAjaxLoader();
    var defaultOptions = {
      method: "get",
      async: true,
      paramsIn: "query",
      params: {},
      headers: {
        accept: null,
        contentType: "application/x-www-form-urlencoded"
      },
      crossDomain: false,
      onCreate: NGS.emptyFunction,
      onComplete: NGS.emptyFunction,
      on403: NGS.emptyFunction
    };
    options = NGS.extend(defaultOptions, options);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if(xmlhttp.readyState == 1){
        options.onCreate();
      }
      if(xmlhttp.readyState == 4){
        if(xmlhttp.status == 200){
          options.onComplete(xmlhttp.responseText);
        } else if(xmlhttp.status == 400){
          options.onError(xmlhttp.responseText);
        } else if(xmlhttp.status == 401){
          options.onInvalidUser(xmlhttp.responseText);
        } else if(xmlhttp.status == 403){
          options.onNoAccess(xmlhttp.responseText);
        }
        NGS.hideAjaxLoader();
      }

    }.bind(this);

    xmlhttp.onprogress = function (evt) {
      //TODO	var percentComplete = evt.loaded / evt.total;
    };


    var sendingData = null;
    var urlParams = "";
    if(options.method.toUpperCase() == 'DELETE' || options.method.toUpperCase() == 'GET' || options.paramsIn == "query"){
      urlParams = this.serializeUrl(options.params);
      if(urlParams){
        _url = _url + "?" + urlParams;
      }
    } else if(options.paramsIn == "formData"){
      urlParams = this.serializeUrl(options.params);
      sendingData = urlParams;
    } else if(options.paramsIn == "body"){
      sendingData = JSON.stringify(options.params);
    }

    xmlhttp.open(options.method.toUpperCase(), _url, options.async);
    xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if(options.crossDomain == true || NGS.getConfig().crossDomain == true){
      xmlhttp.setRequestHeader("Accept", "*");
    } else{
      xmlhttp.withCredentials = true;
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
  serializeUrl: function (a) {
    var prefix, s, add, name, r20, output;
    s = [];
    r20 = /%20/g;
    add = function (key, value) {
      // If value is a function, invoke it and return its value
      value = ( typeof value == 'function' ) ? value() : ( value == null ? "" : value );
      s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };
    if(a instanceof Array){
      for (name in a) {
        add(name, a[name]);
      }
    } else{
      for (prefix in a) {
        this.buildParams(prefix, a[prefix], add);
      }
    }
    output = s.join("&").replace(r20, "+");
    return output;
  },
  buildParams: function (prefix, obj, add) {
    var name, i, l, rbracket;
    rbracket = /\[\]$/;
    if(obj instanceof Array){
      for (i = 0, l = obj.length; i < l; i++) {
        if(rbracket.test(prefix)){
          add(prefix, obj[i]);
        } else{
          this.buildParams(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
        }
      }
    } else if(typeof obj == "object"){
      // Serialize object item.
      for (name in obj) {
        this.buildParams(prefix + "[" + name + "]", obj[name], add);
      }
    } else{
      // Serialize scalar item.
      add(prefix, obj);
    }
  }
};
