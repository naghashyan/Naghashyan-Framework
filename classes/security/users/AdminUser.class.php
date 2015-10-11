<?php
/**
 *
 * Creates en instance of admin user class and
 * initializes class members necessary for validation.
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2010-2014
 * @package security.users
 * @version 6.0
 *
 */
namespace demo\security\users {
	use \demo\security\UserGroups;
	use \demo\managers\users\UserManager;

	class AdminUser extends NgsUser {

		
		public function __construct() {
			parent::__construct();
		}
		
		/**
		 * register guest user
		 *
		 * @return int userId
		 */
		public function register(){
			$this->setCookieParam("ut", UserGroups::$ADMIN);
			$user = AdminManager::getInstance()->register();
			$this->setUniqueId($user->getHashcode());
			$this->setId($user->getId());
			return $user->getId();
		}
		
		/**
		 * register guest user
		 *
		 * @return int userId
		 */
		public function login($id){
			$userHashcode = UserManager::getInstance()->login($id);
			$this->setCookieParam("ut", UserGroups::$ADMIN);
			$this->setUniqueId($userHashcode);
			$this->setId($id);
			return $id;
		}

		/**
		 * Validates user credentials
		 *
		 * @return TRUE - if validation passed, and FALSE - otherwise
		 */
		public function validate() {
			if(UserManager::getInstance()->validate($this->getId(), $this->getUniqueId(), "admin")){
				return true;
			}
			throw new \ngs\framework\exceptions\InvalidUserException("wrong user");
		}
	}

}