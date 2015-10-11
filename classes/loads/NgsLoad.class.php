<?php
/**
 * main site load for all ngs site's loads
 * this class provide methods
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2009-2015
 * @package loads
 * @version 6.0
 *
 */
namespace demo\loads {
	use \demo\security\RequestGroups;
	/**
	 * General parent for a ngs demo loads
	 */
	abstract class NgsLoad extends \ngs\framework\AbstractLoad {
		/**
		 * Initializes translations array for selected language.
		 *
		 * @return
		 */
		public function __construct() {
		}

		//! A constructor.
		public function initialize() {
			parent::initialize();
		}

	}

}
