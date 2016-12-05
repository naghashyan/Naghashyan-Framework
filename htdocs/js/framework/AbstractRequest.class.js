NGS.AbstractRequest = NGS.Class({
  ngsPackage: "",
  ngsName: "",
  ngsAction: "",

  /**
   * The main method, which invokes load operation, i.e. ajax call to the backend and then updates corresponding container with the response
   *
   * @param  params  http parameters which will be sent to the serverside Load, these parameters will be added to the ajax loader's default parameters
   * @param  replace indicates should container be replaced itself(true) with the load response or should be replaced container's content(false)

   */
  service: function (params) {
  },


  getMethod: function () {
    return "POST";
  },

  getParamsIn: function () {
    return "body";
  },

  /**
   * Abstract function, Child classes should be override this function,
   * and should return the name of the server action, formated with framework's URL nameing convention
   * @return The name of the server action, formated with framework's URL nameing convention
   */
  getUrl : function() {
    return "";
  },

  /**
   * Method returns security level of the action, by default it is false(http), children classes can override it
   *
   * @return  security level of the action
   */
  isSecure : function() {
    return false;
  },


  /**
   * Abstract function, Child classes should be override this function,
   * and should return the name of the server load, formated with framework's URL nameing convention
   * @return The name of the server load, formated with framework's URL nameing convention

   */
  setAction: function (action) {
    this.ngsAction = action;
  },

  /**
   * Returns the server side package of the load, if there are included packages, "_" delimiter should be used
   *
   * @return  The server side package of the load

   */
  getAction: function () {
    return this.ngsAction;
  },

  /**
   * Abstract function, Child classes should be override this function,
   * and should return the name of the server load, formated with framework's URL nameing convention
   * @return The name of the server load, formated with framework's URL nameing convention

   */
  setName: function (name) {
    this.ngsName = name;
  },

  /**
   * Returns the server side package of the load, if there are included packages, "_" delimiter should be used
   *
   * @return  The server side package of the load

   */
  getName: function () {
    return this.ngsName;
  },

  /**
   * Abstract function, Child classes should be override this function,
   * and should return the name of the server load, formated with framework's URL nameing convention
   * @return The name of the server load, formated with framework's URL nameing convention

   */
  setPackage: function (_package) {
    this.ngsPackage = _package;
  },

  /**
   * Returns the server side package of the load, if there are included packages, "_" delimiter should be used
   *
   * @return  The server side package of the load

   */
  getPackage: function () {
    return this.ngsPackage;
  },

  /**
   * Method returns Load's http parameters
   *
   * @return  http parameters of the load

   */
  getUrlParams: function () {
    return false;
  },

  /**
   * Method is used for setting load's response parameters
   *
   * @param  args  The http parameters of the load, which will be sent to the server side load

   */
  setArgs: function (args) {
    this.ngsArgs = args;
  },

  /**
   * Method returns Load's response parameters
   *
   * @return  http parameters of the load

   */
  getArgs: function () {
    return this.args();
  },

  args: function(){
    if(!this.ngsArgs){
      return {};
    }
    return this.ngsArgs;
  },

  /**
   * Method is used for setting load's http parameters
   *
   * @param  params  The http parameters of the load, which will be sent to the server side load

   */
  setParams: function (params) {
    this.ngsParams = params;
  },


  /**
   * Method returns Load's http parameters
   *
   * @return  http parameters of the load

   */
  getParams: function () {
    if(!this.ngsParams){
      return {};
    }
    return this.ngsParams;
  },


  onComplate: function (params) {

  },

  /**
   * Function, which is called after load is returned exception. Can be overridden by the children of the class
   * @errorArr  Array of error messages, with key values pairs: [error => {code: 1, message: 'some message'}]
   */
  onError : function(errorArr) {

  },

  onNoAccess: function (response) {
    if(response.redirect_to){
      window.location.href = response.redirect_to;
      return;
    }
    if(response.redirect_to_load){
      NGS.load(response.redirect_to_load, {});
    }
  },
  onInvalidUser: function (response) {
    if(response.redirect_to){
      window.location.href = response.redirect_to;
      return;
    }
    if(response.redirect_to_load){
      NGS.load(response.redirect_to_load, {});
    }
  }
});
