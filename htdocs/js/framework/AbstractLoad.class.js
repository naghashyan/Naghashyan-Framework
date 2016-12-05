NGS.AbstractLoad = NGS.Class({
  ngsPermalink: null,
  _parentLoadName: null,
  _abort: false,
  _ngsUUID: "",

  /**
   * The main method, which invokes load operation, i.e. ajax call to the backend and then updates corresponding container with the response
   *
   * @param  params  http parameters which will be sent to the serverside Load, these parameters will be added to the ajax loader's default parameters
   * @param  replace indicates should container be replaced itself(true) with the load response or should be replaced container's content(false)

   */
  service: function (params) {
    if(this.getPermalink() != null){
      NGS.events.onUrlUpdate.data = {
        "load": this
      };
      document.dispatchEvent(NGS.events.onUrlUpdate);
    }

    var containerElem = this._getContentElem();
    if(containerElem){
      this._ngsUUID = NGS.guid();
      containerElem.setAttribute("data-ngs-uuid", this._ngsUUID);
    }

    this.afterLoad(params);
    //fire after load event
    NGS.events.onAfterLoad.data = {
      "load": this
    };
    document.dispatchEvent(NGS.events.onAfterLoad);
    this.onPageUpdateLoadHandler = function () {
      if(!this._getContentElem()){
        document.removeEventListener("ngs-onAfterLoad", this.onPageUpdateLoadHandler);
        this.onUnLoad();
        return;
      }
      if(this._getContentElem().getAttribute("data-ngs-uuid") != this.getLoadUUID()){
        document.removeEventListener("ngs-onAfterLoad", this.onPageUpdateLoadHandler);
        this.onUnLoad();
      }
    }.bind(this);
    document.addEventListener("ngs-onAfterLoad", this.onPageUpdateLoadHandler);
    var laodsArr = NGS.getNestedLoadByParent(this.getAction());
    if(laodsArr == null){
      return;
    }
    for (var i = 0; i < laodsArr.length; i++) {
      NGS.nestLoad(laodsArr[i].load, laodsArr[i].params, this.getAction());
    }
  },

  /**
   * The main method, which invokes load operation, i.e. ajax call to the backend and then updates corresponding container with the response
   *
   * @param  params  http parameters which will be sent to the serverside Load, these parameters will be added to the ajax loader's default parameters
   * @param  replace indicates should container be replaced itself(true) with the load response or should be replaced container's content(false)

   */
  load: function (params, replace) {

    this.beforeLoad();
    this.setParams(params);
    if(this.abort){
      return false;
    }
    this.runLoad();
  },

  runLoad: function () {
    NGS.Dispatcher.load(this, this.getParams());
  },

  /**
   * The main method, which invokes load operation without ajax sending
   *
   * @param  parent  loadName that will calling
   * @param  params http parameters which will be sent to the serverside Load, these parameters will be added to the ajax loader's default parameters

   */
  nestLoad: function (parent, params) {
    this.beforeLoad();
    this.setParentLoadName(parent);
    this.setArgs(params);
    this.service(params);

  },


  getPageTitle: function () {
    return "";
  },

  /**
   * Abstract method for returning container of the load, Children of the AbstractLoad class should override this method
   *
   * @return  The container of the load.

   */
  getContainer: function () {
    return "";
  },

  /**
   * In case of the pagging framework uses own containers, for indicating the container of the main content,
   * without pagging panels
   * @return  The own container of the load

   */
  getOwnContainer: function () {
    return "";
  },


  /**
   * Abstract function, Child classes should be override this function,
   * and should return the name of the server load, formated with framework's URL nameing convention
   * @return The name of the server load, formated with framework's URL nameing convention

   */
  getUrl: function () {
    return "";
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
   * Method is used for setting error indicator if it was sent from the server. Intended to be used internally
   *
   * @param  wasError boolean parameter, shows existence of the error

   */
  setError: function (wasError) {
    this.wasError = wasError;
  },


  setPermalink: function (permalink) {
    this.ngsPermalink = permalink;
  },

  getPermalink: function () {
    return this.ngsPermalink;
  },

  setParentLoadName: function (parent) {
    this._parentLoadName = parent;
  },

  getParentLoadName: function () {
    return this._parentLoadName;
  },


  _getContentElem: function () {
    if(typeof this.getContainer() == "object"){
      return this.getContainer();
    }
    var containerElem = document.getElementById(this.getContainer());
    if(!containerElem){
      containerElem = document.querySelector(this.getContainer());
    }
    return containerElem;
  },

  getInsertionMode: function () {
    return "override";
  },

  _updateContent: function (html, params) {
    //NGS.unLoad(this.getContainer());
    var containerElem = this._getContentElem();
    this.onUpdateConent(containerElem, html, function () {
      this.service(params);
    }.bind(this));
    document.dispatchEvent(NGS.events.onPageUpdate);
  },

  getLoadUUID: function () {
    return this._ngsUUID;
  },

  onUpdateConent: function (elem, content, callback) {
    switch (this.getInsertionMode()) {
      case "override":
        elem.innerHTML = content;
        break;
      case "beforebegin":
      case "afterbegin":
      case "beforeend":
      case "afterend":
        elem.insertAdjacentHTML(this.getInsertionMode(), content);
        break;
      case "none":
        break;
    }

    callback();
  },

  /**
   * Function, which is called before ajax request of the load. Can be overridden by the children of the class
   *

   */
  beforeLoad: function () {
    NGS.events.onBeforeLoad.data = {
      "load": this
    };
    document.dispatchEvent(NGS.events.onBeforeLoad);
  },

  /**
   * Function, which is called after load is done. Can be overridden by the children of the class
   * @transport  Object of the HttpXmlRequest class

   */
  afterLoad: function (params) {

  },

  onUnLoad: function () {

  },

  pauseLoad: function () {
    this.abort = true;
  }
}, NGS.AbstractRequest);
