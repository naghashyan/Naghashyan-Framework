<?php
/**
 * Contains definitions for all participant roles in system.
 *
 * @author Levon Naghashyan <levon@naghashyan.com>
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2009-2014
 * @package security
 * @version 6.0
 *
 */
namespace demo\security {
	class UserGroups {
		
		/**
		 * @var System administrator
		 */
		public static $ADMIN = 0;

		/**
		 * @var Non authorized user with minimum privileges
		 */
		public static $GUEST = 11;
	}

}