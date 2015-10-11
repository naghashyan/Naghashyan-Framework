<?php
/**
 *
 * This class is a template for all authorized user classes.
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
	use \ngs\framework\AbstractUser;
	class NgsUser extends AbstractUser {

		/**
		 * @var - unique identifier per session
		 */
		protected $uniqueId;

		/**
		 * @var - user's invariant identifier
		 */
		protected $id;

		/**
		 * @var - user's invariant identifier
		 */
		protected $userDto = null;

		/**
		 * Each authorized user should have a identifier,
		 * which will be passed to constructor when creating instance.
		 *
		 * @param object $id - user identifier
		 * @return
		 */
		public function __construct() {
			parent::__construct();
		}

		/**
		 * Set unique identifier
		 *
		 * @param object $uniqueId
		 * @return
		 */
		public function setUniqueId($uniqueId) {
			$this->setCookieParam("uh", $uniqueId);
		}

		/**
		 * Set permanent identifier
		 *
		 * @param object $id
		 * @return
		 */
		public function setId($id) {
			$this->setCookieParam("ud", $id);
		}

		/**
		 * Returns unique identifier
		 *
		 * @return
		 */
		public function getUniqueId() {
			return $this->getCookieParam("uh");
		}

		/**
		 * Returns permanent identifier
		 *
		 * @return
		 */
		public function getId() {
			return $this->getCookieParam("ud");
		}

		public function updateActivity() {
			$userHash = \managers\users\UserManager::getInstance()->updateActivity($this->getId());
			$this->setUniqueId($userHash);
		}

		/**
		 * Returns ADMIN level.
		 *
		 * @return int
		 */
		public function getLevel() {
			return $this->getCookieParam("ut");
		}

		/**
		 * Returns ADMIN level.
		 *
		 * @return int
		 */
		public function validate() {
			return false;
		}


		public function updateUserHash() {
			return null;
		}

		public function getUserStatus() {
			return null;
		}
		public function getDto() {
			if ($this->userDto != null) {
				return $this->userDto;
			}
			$this->userDto = \managers\users\UserManager::getInstance()->getUserById($this->getId());
			return $this->userDto;
		}

	}

}
