<?php
/**
 * Smarty util class extends from main smarty class
 * provides extra features for ngs
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @package util
 * @version 6.0
 * @year 2010-2015
 */
namespace util {
	class NgsTemplater extends \framework\templater\NgsTemplater {

		/**
		 * constructor
		 * reading Smarty config and setting up smarty environment accordingly
		 */
		public $smarty = null;
		private $params = array();
		public function __construct() {
			parent::__construct();
		}
		/**
		 * example function
		 * this function add global js param in fronend
		 */
		public function getCustomJsParams(){
			return array("SOME_PARAMS"=>"some js param");
		}

	}

}
