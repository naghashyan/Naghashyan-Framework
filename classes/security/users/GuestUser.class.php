<?php
/**
 *
 * User object for non authorized users.
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2009-2014
 * @package security.users
 * @version 6.0
 *
 */
namespace demo\security\users {
	use \demo\security\UserGroups;
	use \demo\managers\users\GuestUserManager;

	class GuestUser extends NgsUser{

		/**
		 * Constructs GUEST user object
		 */
		public function __construct() {
			parent::__construct();
		}
		
		/**
		 * register guest user
		 *
		 * @return int userId
		 */
		public function register(){
			$this->setCookieParam("ut", UserGroups::$GUEST);
			return true;
		}
				
		/**
		 * Returns user's level
		 *
		 * @return int
		 */
		public function getLevel() {
			return $this->getCookieParam("ut");
		}

		/**
		 * do validate geuest user by id and hash code
		 *
		 * @return true
		 */
		public function validate() {
			return true;
		}

	}
}
