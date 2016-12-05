/**
 * @fileoverview
 * @class parrent class for all actions
 *
 * @author Levon Naghashyan
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2010-2016
 * @package ngs.framwork
 * @version 2.5.0
 */
NGS.AbstractAction = NGS.Class({


  /**
   * The main method, which invokes action operation, i.e ajax call to the backend
   *
   */
  action: function (params) {
    this.beforeAction();
    this.setParams(params);
    NGS.Dispatcher.action(this, params);
  },


  /**
   * Function, which is called before ajax request of the action. Can be overridden by the children of the class
   *
   */
  beforeAction: function () {

  },

  /**
   * Function, which is called after action is done. Can be overridden by the children of the class
   * @param transport  Object of the HttpXmlRequest class
   */
  afterAction: function (params) {

  },


  /**
   * Corresponds to the serverside Action's redirectToLoad function, i.e if action returns some load content
   * corresponding load's html container will updated with it and load's afterLoad method will be called.
   * @param loadObj  Object of the load, to which action will be redirected
   * @param responseText  response content which is returned by the server side load, to which action was
   * redirected
   */
  redirectToLoad: function (loadObj, responseText, redirectOnError) {
    if(this.wasError && !redirectOnError){
      return;
    }
    var container = loadObj.getComputedContainer(false);
    var content = responseText;
    Element.update(container, content);
    if(this.params){
      loadObj.setParams(this.params);
    }
    this.ajaxLoader.afterLoad(loadObj, true);
  }
}, NGS.AbstractRequest);