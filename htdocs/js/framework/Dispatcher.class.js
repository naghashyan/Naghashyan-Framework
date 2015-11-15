/**
 * @author Levon Naghashyan
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2013-2014
 * @version 6.0
 */
NGS.Dispatcher = {

  loadsObject: {},

  initialize: function () {
    if (NGS.getInitialLoad()) {
      NGS.nestLoad(NGS.getInitialLoad().load, NGS.getInitialLoad().params);
    }
  },

  load: function (loadObject, params) {
    var _url = "";
    if (loadObject.getUrl() != "") {
      _url = this.computeUrl(loadObject.getUrl());
    } else {
      _url = this.computeUrl(loadObject.getPackage(), loadObject.getName());
    }

    var options = {
      method: loadObject.getMethod(),
      params: params,
      onComplete: function (responseText) {
        try {
          var res = JSON.parse(responseText);
          if (typeof (res) == "object" && typeof (res.nl)) {
            for (var p in res.nl) {
              var nestedLoad = res.nl[p];
              for (var i = 0; i < nestedLoad.length; i++) {
                NGS.setNestedLoad(p, nestedLoad[i].load, nestedLoad[i].params);
              }
            }
          }
          loadObject.setArgs(res.params);
          loadObject.setPermalink(res.pl);
          loadObject._updateContent(res.html, res.params);
          loadObject.onComplate(res.params);
        } catch (e) {
          loadObject._updateContent(responseText, {});
        }

      }.bind(this),
      onError: function (responseText) {
        var res = JSON.parse(responseText);
        loadObject.onError(res);
      }.bind(this)
    };
    NGS.AjaxLoader.request(_url, options);
  },

  action: function (actionObject, params) {
    var _url = this.computeUrl(actionObject.getPackage(), "do_" + actionObject.getName());
    var options = {
      method: actionObject.getMethod(),
      params: params,
      onComplete: function (responseText) {
        var res = JSON.parse(responseText);
        actionObject.setArgs(res.params);
        actionObject.afterAction(res.params);
        actionObject.onComplate(res.params);
      }.bind(this),
      onError: function (responseText) {
        var res = JSON.parse(responseText);
        actionObject.onError(res);
      }.bind(this)
    };
    NGS.AjaxLoader.request(_url, options);
  },

  apiCall: function (_url, params, onSucces) {
    var _url = NGS.getConfig().apiUrl + "/" + _url.replace(".", "/");
    var options = {
      method: actionObject.getMethod(),
      params: params,
      onComplete: function (responseText) {
        var res = JSON.parse(responseText);
        onSucces(res);
      }.bind(this),
      onError: function (responseText) {
      }.bind(this)
    };
    NGS.AjaxLoader.request(_url, options);
  },

  /**
   * Method for computing request URLs depending on the current security level, baseUrl, package and command, mainly used internaly by the framework,
   *
   * @param  command  htto name of the load or action: SomeLoad: some, SomeAction: do_some
   * @return computedUrl computed URL of the request
   * @see
   */
  computeUrl: function () {
    var _package = arguments[0].replace(".", "_");
    var command = "";
    switch (arguments.length) {
      case 2:
        command = arguments[1];
        break;
    }
    var dynContainer = "";
    if (NGS.getConfig().dynContainer != "") {
      dynContainer = "/" + NGS.getConfig().dynContainer + "/";
    }
    var module = "";
    if (NGS.getModule() != null) {
      module = NGS.getModule() + "/";
    }
    return NGS.getHttpHost() + dynContainer + _package + "/" + command;
  }
};

