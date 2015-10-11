<?php
/**
 * main site action for all ngs site's actions
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2009-2014
 * @package actions.site
 * @version 6.0
 *
 */
namespace actions\site {

	abstract class SiteAction extends \actions\Action {

		public function __construct() {
		}

		/**
		 * Return a logined user id
		 *
		 * @return integer|userId|null
		 */
		public function getUserId() {
			if ($this->getUser() !== null) {
				return $this->getUser()->getId();
			}
			return null;
		}

		/**
		 * Return a ngs logined user dto
		 *
		 * @return UserDto|userDto|null
		 */
		public function getUser() {
			return null;
		}

		/**
		 * Return a ngs guest user id
		 *
		 * @return integer|userId|null
		 */
		public function getGuestUserId() {
			if ($this->getGuestUser() !== null) {
				return $this->getGuestUser()->getId();
			}
			return null;
		}

		/**
		 * Return a ngs guest user dto
		 *
		 * @return GuestUserDto|userDto|null
		 */
		public function getGuestUser() {
			return null;
		}

	}

}
