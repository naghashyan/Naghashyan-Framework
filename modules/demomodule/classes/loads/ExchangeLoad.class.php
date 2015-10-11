<?php
/**
 * main exchange load
 *
 * @author Vahagn Kirakosyan
 * @site http://naghashyan.com
 * @mail vahagn.kirakosyan@naghashyan.com
 * @year 2015
 * @package loads
 *
 */
namespace exchange\loads {

	use gos\security\RequestGroups;
	use ngs\framework\exceptions\NgsErrorException;
	/**
	 * General parent load for exchange loads
	 */
	abstract class ExchangeLoad extends \ngs\framework\AbstractLoad {

		public function __construct() {

		}

		//! A constructor.
		public function initialize() {
			parent::initialize();
		}

		public function getRequestGroup() {
			return RequestGroups::$guestRequest;
		}

	}

}
