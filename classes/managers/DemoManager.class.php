<?php
/**
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2010-2015
 * @package managers
 * @version 6.0
 *
 */
namespace demo\managers {
	use \ngs\framework\AbstractManager;

	class DemoManager extends AbstractManager {

		/**
		 * @var $instance
		 */
		public static $instance;

		public function __construct() {
		}

		/**
		 * Returns an singleton instance of this class
		 *
		 * @param object $config
		 * @param object $args
		 * @return
		 */
		public static function getInstance() {
			if (self::$instance == null) {
				self::$instance = new DemoManager();
			}
			return self::$instance;
		}

		/**
		 * insert demo data into demo table
		 *
		 * @param array $name
		 *
		 * @return true if process success or false if something go wrong
		 */

		public function insertDemoRecord($name) {
			$demoDto = \demo\dal\mappers\DemoMapper::getInstance()->createDto();
			$demoDto->setName($name);
			return \demo\dal\mappers\DemoMapper::getInstance()->insertDto($demoDto);
		}
		
		/**
		 * update demo data into demo table
		 *
		 * @param array $name
		 *
		 * @return true if process success or false if something go wrong
		 */

		public function updateDemoRecord($id, $name) {
			$demoDto = \demo\dal\mappers\DemoMapper::getInstance()->createDto();
			$demoDto->setId($id);
			$demoDto->setName($name);
			return \demo\dal\mappers\DemoMapper::getInstance()->updateByPK($demoDto);
		}
		
		/**
		 * update demo data into demo table
		 *
		 * @param array $name
		 *
		 * @return true if process success or false if something go wrong
		 */

		public function seletDemoRecord($id) {
			return \demo\dal\mappers\DemoMapper::getInstance()->getDemoById($id);
		}
		
		
	}

}
