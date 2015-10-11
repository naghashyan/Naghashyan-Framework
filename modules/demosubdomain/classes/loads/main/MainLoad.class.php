<?php
/**
 * NGS demo load for demostration subdomain module structure
 * this class extends from AbstractLoad class
 *
 * this load can called from browser using demosubdomain.*
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @year 2015
 * @version 2.0.0
 * @package loads.demomodule.main
 * @copyright Naghashyan Solutions LLC
 *
 */

namespace demosubdomain\loads\main {
	use demo\security\RequestGroups;

	class MainLoad extends \ngs\framework\AbstractLoad {

		public function load() {

		}

		public function getTemplate() {
			return NGS()->getTemplateDir()."/main/index.tpl";
		}

		public function getRequestGroup() {
			return RequestGroups::$guestRequest;
		}

	}

}
