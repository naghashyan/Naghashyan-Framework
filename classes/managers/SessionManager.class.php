<?php
/**
 *
 * NGS custom session manager
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2015
 * @package managers
 * @version 6.0
 *
 */
namespace demo\managers {

	use \demo\security\UserGroups;
	use \demo\security\RequestGroups;
	use \ngs\framework\exceptions\InvalidUserException;

	class SessionManager extends \ngs\framework\session\NgsSessionManager {

		private $user = null;

		private $customerManager;
		private $adminManager;

		public function __construct() {
		}

		/**
		 * return ngs current logined or not
		 * user object
		 *
		 * @return userObject
		 */
		public function getUser() {
			if ($this->user != null) {
				return $this->user;
			}
			try {
				if (!isset($_COOKIE["ut"])) {
					$user = new \demo\security\users\GuestUser();
					$user->register();
					$this->setUser($user, true, true);
				} else {
					$user = $this->getUserByLevel($_COOKIE["ut"]);
				}
				$user->validate();
			} catch(InvalidUserException $ex) {
				$this->deleteUser($user);
				NGS()->redirect(substr($_SERVER["REQUEST_URI"], 1));
				exit ;
			}
			if ($user->getLevel() != UserGroups::$GUEST) {
				$user->updateActivity();
				if ($user->getLevel() != UserGroups::$API) {
					$this->updateUserUniqueId($user);
				}
			}
			$this->user = $user;
			return $this->user;
		}

		/**
		 * login ngs customer to system
		 * set user hash and update user cookies
		 *
		 * @param userDto
		 *
		 * @return boolean
		 */
		public function login($userDto) {
			$user = $this->getUserByType($userDto->getUserLevel());
			$user->login($userDto->getId());
			$this->setUser($user, true, true);
			return true;
		}

		public function logout() {
			$this->deleteUser($this->getUser());
			return true;
		}

		/**
		 * create and return user object by user level
		 *
		 * @param bool $ut
		 *
		 * @return userObject
		 */
		public function getUserByLevel($ut) {
			switch ($ut) {
				case UserGroups::$GUEST :
					return new \demo\security\users\GuestUser();
					break;
				default :
					throw new InvalidUserException("user not found");
					break;
			}
		}

		/**
		 * create and return user object by user level text
		 *
		 * @param string $ut
		 *
		 * @return userObject
		 */
		public function getUserByType($ut) {
			switch ($ut) {
				case UserGroups::$GUEST :
					return new \demo\security\users\GuestUser();
					break;
				default :
					throw new InvalidUserException("user not found");
					break;
			}
		}

		public function getUserId() {
			if ($this->getUser() == null) {
				return null;
			}
			return $this->getUser()->getId();
		}

		/**
		 * validate all ngs request
		 * by user
		 *
		 * @param object $request
		 *
		 * @return userObject
		 */
		public function validateRequest($request, $user = null) {
			if ($user == null) {
				$user = $this->getUser();
			}
			switch ($request->getRequestGroup()) {
				case RequestGroups::$guestRequest :
					return true;
					break;
			}

			return false;
		}

		private function updateUserHash($uId) {
			$customerManager = UserManager::getInstance($this->config, null);
			return $customerManager->updateUserHash($uId);
		}

	}

}
