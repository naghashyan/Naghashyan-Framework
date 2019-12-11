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

namespace ngs_demo\security\users {

  use ngs\security\users\AbstractNgsUser;

  class GuestUser extends AbstractNgsUser {

    private $id = -1;

    /**
     * Constructs GUEST user object
     */
    public function __construct() {
    }

    public function setId(int $id) {
      $this->id = $id;
    }

    public function getId() {
      return $this->id;
    }

    public function getLevel() {
      return null;
    }

    public function getUserDto() {
      return null;
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
