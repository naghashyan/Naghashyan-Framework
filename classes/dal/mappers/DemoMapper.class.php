<?php
/**
 *
 * Demo mysql mapper class is extended class from AbstractMysqlMapper.
 * It contatins all read and write functions which are working with demo table.
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2009-2015
 * @package demo.dal.mappers
 * @version 2.0.0
 *
 */
namespace demo\dal\mappers {
	use \ngs\framework\dal\mappers\AbstractMysqlMapper;
	use \demo\dal\dto\DemoDto;

	class DemoMapper extends AbstractMysqlMapper {

		//! Private members.

		private static $instance;
		public $tableName = "demo";
		//! A constructor.
		/*!	\brief	Brief description.
		 *			Initializes DBMC pointers and table name private
		 *			class member.
		 */
		function __construct() {
			// Initialize the dbmc pointer.
			AbstractMysqlMapper::__construct();
		}

		/**
		 * Returns an singleton instance of this class
		 *
		 * @return TracksMapper
		 */
		public static function getInstance() {
			if (self::$instance == null) {
				self::$instance = new DemoMapper();
			}
			return self::$instance;
		}

		/**
		 * @see AbstractMysqlMapper::createDto()
		 */
		public function createDto() {
			return new DemoDto();
		}

		/**
		 * @see AbstractMysqlMapper::getPKFieldName()
		 */
		public function getPKFieldName() {
			return "id";
		}

		/**
		 * @see AbstractMysqlMapper::getTableName()
		 */
		public function getTableName() {
			return $this->tableName;
		}

		/**
		 * get demo record by id
		 *
		 * @param int $id
		 *
		 * @return array demoDto
		 */
		private $GET_DEMO_RECORD_ID = "SELECT * FROM `%s` WHERE id = :id;";

		public function getDemoById($id) {
			$sqlQuery = sprintf($this->GET_DEMO_RECORD_ID, $this->getTableName());
			return $this->fetchRow($sqlQuery, array("id" => $id));
		}

	}

}
