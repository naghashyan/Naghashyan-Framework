/**
 * @fileoverview
 * @class parrent class for all actions
 *
 * @author Levon Naghashyan
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2010-2014
 * @package loads.site.main
 * @version 6.0
 */
NGS.AbstractAction = NGS.Class({

  _name: null,
  _package: null,
  _action: "",
  _args : {},
  /**
   * The main method, which invokes action operation, i.e ajax call to the backend
   *
   * @see
   */
  action : function(params) {
    this.beforeAction();
    NGS.Dispatcher.action(this, params);
  },

  /**
   * Method returns security level of the action, by default it is false(http), children classes can override it
   *
   * @return  security level of the action
   * @see
   */
  isSecure : function() {
    return false;
  },
  
  /**
	 * Abstract function, Child classes should be override this function,
	 * and should return the name of the server load, formated with framework's URL nameing convention
	 * @return The name of the server load, formated with framework's URL nameing convention
	 * @see
	 */
	setAction : function(action) {
		this._action = action;
	},

	/**
	 * Returns the server side package of the load, if there are included packages, "_" delimiter should be used
	 *
	 * @return  The server side package of the load
	 * @see
	 */
	getAction : function() {
		return this._action;
	},
  
  /**
   * Abstract function, Child classes should be override this function,
   * and should return the name of the server load, formated with framework's URL nameing convention
   * @return The name of the server load, formated with framework's URL nameing convention
   * @see
   */
  setName : function(name) {
    this._name = name;
  },

  /**
   * Returns the server side package of the load, if there are included packages, "_" delimiter should be used
   *
   * @return  The server side package of the load
   * @see
   */
  getName : function() {
    return this._name;
  },

  /**
   * Abstract function, Child classes should be override this function,
   * and should return the name of the server load, formated with framework's URL nameing convention
   * @return The name of the server load, formated with framework's URL nameing convention
   * @see
   */
  setPackage : function(_package) {
    this._package = _package;
  },

  /**
   * Returns the server side package of the action, if there are included packages, "_" delimiter should be used
   *
   * @return  The server side package of the action
   * @see
   */
  getPackage : function() {
    return this._package;
  },

  /**
   * HTTP request method of the action, by default it is POST, Children  of the AbstractAction class
   * can override this method, action will be tracked via URL masking only if HTTP GET is used
   * @return  HTTP request method of the action
   * @see
   */
  getMethod : function() {
    return "POST";
  },

  /**
   * Abstract function, Child classes should be override this function,
   * and should return the name of the server action, formated with framework's URL nameing convention
   * @return The name of the server action, formated with framework's URL nameing convention
   * @see
   */
  getUrl : function() {
    return "";
  },

  /**
   * Method is used for setting action's http parameters
   *
   * @param  params  The http parameters of the action, which will be sent to the server side action
   * @see
   */
  setParams : function(params) {
    this.params = params;
  },
  
  /**
   * Method is used for setting action's response parameters
   *
   * @param  params  The http parameters of the load, which will be sent to the server side load
   * @see
   */
  setArgs : function(args) {
    this._args = args;
  },

  /**
   * Method is used for setting error indicator if it was sent from the server. Intended to be used internally
   *
   * @param  wasError boolean parameter, shows existence of the error
   * @see
   */
  setError : function(wasError) {
    this.wasError = wasError;
  },

  /**
   * Method returns Action's http parameters
   *
   * @return  http parameters of the action
   * @see
   */
  getParams : function() {
    return this.params;
  },
  
  /**
   * Method returns Actions's response parameters
   *
   * @return  http parameters of the load
   * @see
   */
  getArgs : function() {
    return this._args;
  },

  /**
   * Function, which is called before ajax request of the action. Can be overridden by the children of the class
   *
   * @see
   */
  beforeAction : function() {

  },

  /**
   * Function, which is called after action is done. Can be overridden by the children of the class
   * @param transport  Object of the HttpXmlRequest class
   * @see
   */
  afterAction : function(transport) {
    if (transport.status > 200 && transport.status < 300) {
      if (this["onException" + transport.status]) {
        this["onException"+transport.status]();
      }
    }
  },

  /**
   * Function, which is called after load is returned exception. Can be overridden by the children of the class
   * @errorArr  Array of error messages, with key values pairs: [error => {code: 1, message: 'some message'}]
   * @see
   */
  onError : function(errorArr) {
  },

  /**
   * Corresponds to the serverside Action's redirectToLoad function, i.e if action returns some load content
   * corresponding load's html container will updated with it and load's afterLoad method will be called.
   * @param loadObj  Object of the load, to which action will be redirected
   * @param responseText  response content which is returned by the server side load, to which action was
   * redirected
   * @see
   */
  redirectToLoad : function(loadObj, responseText, redirectOnError) {
    if (this.wasError && !redirectOnError) {
      return;
    }
    var container = loadObj.getComputedContainer(false);
    var content = responseText;
    Element.update(container, content);
    if (this.params) {
      loadObj.setParams(this.params);
    }
    this.ajaxLoader.afterLoad(loadObj, true);
    loadObj.initPagging();
    NGS.LanguageManager.onLoad(loadObj.getName(), loadObj);
  },

	onComplate : function(params) {

	}
}); 