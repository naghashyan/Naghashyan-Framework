<?php
/**
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2010-2015
 * @package loads.site.main
 * @version 2.0.0
 */
namespace demo\loads\demo {
	
	use \demo\security\RequestGroups;

	class MainLoad extends \demo\loads\NgsLoad {

		public function load() {
			
		}
		
		public function getDefaultLoads(){
			$loads = array();
			$loads["nested_home"]["action"] = "demo.loads.demo.home";
			$loads["nested_home"]["args"] = array();
			return $loads;
		}

		public function getTemplate() {
			return NGS()->getTemplateDir()."/main/index.tpl";
		}

		public function getRequestGroup() {
			return RequestGroups::$guestRequest;
		}

	}

}
