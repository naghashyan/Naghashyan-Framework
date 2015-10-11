NGS = {
	namespace : "",
	loadsContainer : {}, //private attribute for collect all loads
	actionsContainer : {}, //private attribute for collect all actions
	nestedLoads : {}, //private attribute for collect all actions
	initialLoads : {
		"load" : null,
		"params" : {}
	}, //private attribute for collect initial loads (used in ngs mode)
	module : null,
	tmstDiff : 0,
	inited : false,

	/**
	 * Method for creating load object
	 *
	 * @param  loadName:String
	 * @param  loadObj:Object
	 * @param  parentLoad:String
	 *
	 */
	getConfig : function() {
		if ( typeof (NGS.config) != "undefined") {
			return NGS.config;
		}
		return {};
	},

	/**
	 * Method for creating load object
	 *
	 * @param  loadName:String
	 * @param  loadObj:Object
	 * @param  parentLoad:String
	 *
	 */
	createLoad : function(loadName, loadObj, parentLoad) {
		this.createNGSItem("load", loadName, loadObj, parentLoad);
	},

	/**
	 * Method for run selected load
	 *
	 * @param  loadName:String
	 * @param  params:Object
	 *
	 */
	load : function(loadName, params, onComplate) {
		try {
			this.nestedLoads = {};
			var laodObj = this.getNGSItemObjectByNameAndType("load", loadName);
			if ( typeof (onComplate) == "function") {
				laodObj.onComplate = onComplate;
			}
			laodObj.load(params);
		} catch(e) {
			throw e;
		}

	},

	/**
	 * Method for running nested loads
	 *
	 * @param  loadName:String
	 * @param  params:Object
	 *
	 */
	nestLoad : function(loadName, params, parent) {
		try {
			var laodObj = this.getNGSItemObjectByNameAndType("load", loadName);
			laodObj.nestLoad(parent, params);
			this.nestLoads();
		} catch(e) {
			throw e;
		}
	},

	/**
	 * Method for running nested loads
	 *
	 * @param  loadName:String
	 * @param  params:Object
	 *
	 */
	nestLoads : function() {
		try {
			for (var i = 0; i < this.nestedLoads.length; i++) {
				var nestLoad = this.nestedLoads[i];
				this.getNGSItemObjectByNameAndType("load", nestLoad["load"]).nestLoad(nestLoad["parent"], nestLoad["params"]);
			}
		} catch(e) {
			throw e;
		}
	},

	/**
	 * Method for running nested loads
	 *
	 * @param  loadName:String
	 * @param  params:Object
	 *
	 */
	setNestedLoad : function(parent, loadName, params) {
		if ( typeof (this.nestedLoads[parent]) == "undefined") {
			this.nestedLoads[parent] = [];
		}
		this.nestedLoads[parent].push({
			"parent" : parent,
			"load" : loadName,
			"params" : params
		});
	},

	/**
	 * Method for running nested loads
	 *
	 * @param  loadName:String
	 * @param  params:Object
	 *
	 */
	getNestedLoadByParent : function(parent) {
		if ( typeof (this.nestedLoads[parent]) != "undefined") {
			return this.nestedLoads[parent];
		}
		return null;
	},

	/**
	 * Method for creating action object
	 *
	 * @param  actionName:String
	 * @param  inheritAction:Object
	 * @param  actionObj:Object
	 *
	 */
	createAction : function(actionName, actionObj, parentAction) {
		this.createNGSItem("action", actionName, actionObj, parentAction);
	},

	/**
	 * Method for sending single request
	 *
	 * @param  urlPath:String
	 * @param  params:Object
	 * @param  callBack:Function
	 *
	 */
	action : function(action, params, onComplate) {
		try {
			var actionObject = this.getNGSItemObjectByNameAndType("action", action);
			if ( typeof (onComplate) == "function") {
				actionObject.onComplate = onComplate;
			}
			actionObject.action(params);
		} catch(e) {
			console.error(e);
		}
	},

	/**
	 * create NGS Item object by type
	 *
	 * @param  type:String
	 * @param  itemName:String
	 * @param  itemObject:Object
	 * @param  parentItem:Function|String
	 *
	 */
	createNGSItem : function(type, itemName, itemObject, parentItem) {
		var _parentItem = null;
		if ( typeof (parentItem) == "function") {
			var tmpObj = Object.create(null);
			var parenItemObject = new parentItem();
			for (var i in parenItemObject) {
				if (i == "initialize") {
					continue;
				}
				tmpObj[i] = parenItemObject[i];
			}
			_parentItem = this.Class(tmpObj, this.getDefaultNGSParentClassByType(type));
		} else if ( typeof (parentItem) == "string") {
			_parentItem = this.getNGSItemClassByNameAndType(type, parentItem);
		} else if ( typeof (parentItem) == "object") {
			_parentItem = this.Class(parentItem, this.getDefaultNGSParentClassByType(type));
		} else {
			_parentItem = this.getDefaultNGSParentClassByType(type);
		}
		
		var item = this.getNGSItemPackageAndName(itemName);
		item["item_name"] = itemName;
		item["klass"] = NGS.Class(itemObject, _parentItem);
		this.getContainerByType(type)[itemName] = item;
	},

	/**
	 * Method for getting NGS item container Object
	 *
	 * @param  type:String
	 *
	 * return Object container
	 */
	getContainerByType : function(type) {
		switch(type) {
		case "action":
			return this.actionsContainer;
			break;
		case "load":
			return this.loadsContainer;
			break;
		default:
			throw new Error("type of container not found");
		}
	},

	/**
	 * Method for getting NGS default parent Objects
	 *
	 * @param  type:String
	 *
	 * return Object container
	 */
	getDefaultNGSParentClassByType : function(type) {
		switch(type) {
		case "action":
			return NGS.AbstractAction;
			break;
		case "load":
			return NGS.AbstractLoad;
			break;
		default:
			throw new Error("type of container not found");
		}
	},

	/**
	 * Method for getting NGS item object
	 *
	 * @param  type:String
	 * @param  itemName:String
	 *
	 * return Object loadObject
	 */
	getNGSItemObjectByNameAndType : function(type, itemName) {
		if ( typeof (itemName) != "string") {
			throw new Error(itemName + " " + type + " not found");
		}
		if ( typeof (this.getContainerByType(type)[itemName]) !== "object") {
			throw new Error(itemName + " " + type + " not found");
		}
		var item = this.getContainerByType(type)[itemName];
		if (!item) {
			throw new Error(itemName + " " + type + " not found");
		}
		var itemObject = new item["klass"];
		itemObject.setPackage(item["package"]);
		itemObject.setName(item["action"]);
		itemObject.setAction(item["item_name"]);
		return itemObject;
	},

	/**
	 * Method for getting NGS item Class
	 *
	 * @param  type:String
	 * @param  itemName:String
	 *
	 * return Object loadObject
	 */
	getNGSItemClassByNameAndType : function(type, itemName) {
		if ( typeof (itemName) != "string") {
			throw new Error(itemName + " " + type + " not found");
		}
		if ( typeof (this.getContainerByType(type)[itemName]) !== "object") {
			throw new Error(itemName + " " + type + " not found");
		}
		return this.getContainerByType(type)[itemName]["klass"];
	},

	/**
	 * Method for getting NGS item and package from itemName

	 * @param  itemName:String
	 *
	 * return Object loadObject
	 */

	getNGSItemPackageAndName : function(actionName) {
		var matches = actionName.match(/[a-zA-Z\_\-]+/g);
		var action = matches[matches.length - 1];
		var myRegExp = new RegExp('([A-Z])', 'g');
		action = action.replace(myRegExp, "_$1").toLowerCase().replace(new RegExp('^_'), "");
		var packges = matches.slice(2, matches.length - 1);
		var _package = "";
		if (packges.length > 0) {
			var deilm = "";
			for (var i = 0; i < packges.length; i++) {
				_package += deilm + packges[i];
				deilm = ".";
			}
		}
		return {
			"package" : _package,
			"action" : action
		};
	},

	/**
	 * global function for setting Initial load
	 *
	 * @param  loadName:String
	 * @param  params:Object
	 *
	 */
	setInitialLoad : function(loadName, params) {
		this.initialLoads["load"] = loadName;
		if (params) {
			this.initialLoads["params"] = params;
		}
	},

	/**
	 * Initial load getter function
	 *
	 * @return  namespace:String
	 *
	 */
	getInitialLoad : function() {
		return this.initialLoads;
	},

	/**
	 * module setter function
	 *
	 * @param  module:String
	 *
	 */
	setModule : function(module) {
		this.module = module;
	},
	/**
	 * module getter function
	 *
	 * @return  module:String
	 *
	 */
	getModule : function() {
		return this.module;
	},

	setTmst : function(tmst) {
		this.tmstDiff = new Date().getTime() - tmst;
	},

	getTmst : function() {
		return new Date().getTime() - this.tmstDiff;
	},

	Class : (function() {
		var subclass = new Function;
		function create() {
			var properties = arguments[0];
			var parent = null;
			if ( typeof (arguments[1]) == "function") {
				parent = arguments[1];
			}
			function IMklass() {
				this.initialize.apply(this, arguments);
			}


			IMklass.addMethods = addMethods;
			IMklass.superclass = parent;
			IMklass.subclasses = [];
			if (parent) {
				subclass.prototype = parent.prototype;
				IMklass.prototype = new subclass;
				parent.subclasses.push(IMklass);
			}
			IMklass.addMethods(properties);
			if (!IMklass.prototype.initialize)
				IMklass.prototype.initialize = new Function;
			IMklass.prototype.constructor = IMklass;
			return IMklass;
		}

		function addMethods(source) {
			var ancestor = this.superclass && this.superclass.prototype,
			    properties = Object.keys(source);
			for (var i = 0,
			    length = properties.length; i < length; i++) {
				var property = properties[i],
				    value = source[property];
				if (!value) {
					continue;
				}
				if (ancestor && value.toString() == '[object Function]' && value.argumentNames()[0] == "$super") {
					var method = value;
					value = (function(m) {
						return function() {
							return ancestor[m].apply(this, arguments);
						};
					})(property).wrap(method);
					value.valueOf = (function(method) {
						return function() {
							return method.valueOf.call(method);
						};
					})(method);
					value.toString = (function(method) {
						return function() {
							return method.toString.call(method);
						};
					})(method);
				}
				this.prototype[property] = value;
			}
			return this;
		}

		return function() {
			return create.apply(this, arguments);
		};
	})(),

	ErrorException : function(message) {
		this.message = message;
		this.name = "UserException";
	},

	/**
	 * Hellper method for extend one object from other
	 *
	 * @param  obj:Object
	 * @param  inheritObject:Object
	 *
	 */
	extend : function(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	},
	/**
	 * Hellper method for getting empty function
	 *
	 */
	emptyFunction : function() {
		return;
	},
	/**
	 * Hellper method for geglobal scope eval
	 * We use an anonymous function so that context is window
	 *
	 */
	globalEval : function(data) {
		var rnotwhite = /\S/;
		if (data && rnotwhite.test(data)) {
			(window.execScript ||
			function(data) {
				window["eval"].call(window, data);
			} )(data);
		}
	},
	showAjaxLoader : function() {
		if (NGS.getConfig().ajaxLoader) {
			document.getElementById(NGS.getConfig().ajaxLoader).style.display = "block";
		}
	},

	hideAjaxLoader : function() {
		if (NGS.getConfig().ajaxLoader) {
			document.getElementById(NGS.getConfig().ajaxLoader).style.display = "none";
		}
	},
	onAjaxProgress : function() {

	}
};
