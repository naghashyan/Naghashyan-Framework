<?php
/**
 * TracksDto mapper class
 * setter and getter generator
 * for ilyov_tracks table
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2009-2015
 * @package dal.dto.tracks
 * @version 6.0
 *
 */
namespace demo\dal\dto {
	use \ngs\framework\dal\dto\AbstractDto;

	class DemoDto extends AbstractDto {


		// constructs class instance
		public function __construct() {
		}

		// Map of DB value to Field value
		private $mapArray = array("id" => "id", "name" => "name", "added_date" => "addedDate");

		// returns map array
		public function getMapArray() {
			return $this->mapArray;
		}

	}

}
