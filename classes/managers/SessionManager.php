<?php
/**
 *
 * handle all imusic.am session requests
 *
 * @author Levon Naghashyan
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2009-2016
 * @package IM.managers
 * @version 6.0.0
 *
 */

namespace ngs_demo\managers {

  use ngs\exceptions\DebugException;
  use ngs\session\AbstractSessionManager;
  use ngs\util\NgsDynamic;
  use ngs_demo\security\RequestGroups;
  use ngs_demo\security\users\GuestUser;

  class SessionManager extends AbstractSessionManager {

    private $user = null;
    private $sessionUser = null;

    private $isCrawler = false;
    private $token = null;
    private $decodedToken = null;

    /**
     * set imusic.am  user data into cookie
     *
     * @return void
     */

    public function setUser($user, $remember = true) {
      $sessionTimeout = time();
      if ($remember){
        $sessionTimeout = $remember ? 2078842581 : null;
      }
      $_COOKIE['_ngs_token'] = $user;
      setcookie('_ngs_token', $user, $sessionTimeout, '/', false, true, true);
    }

    /**
     * delete user info from cookie
     *
     * @return void
     */
    public function deleteUser() {
      $sessionTimeout = time() - 42000;
      setcookie('_ngs_token', '', $sessionTimeout, '/', false, true, true);
    }

    /**
     * return imusic.am current logined or not
     * user object
     *
     * @return mixed
     * @throws
     */
    public function getUser($force = false) {

      //if user pre defined it will return user object
      if ($this->user != null && $force == false){
        return $this->user;
      }
      $this->user = new GuestUser();
      return $this->user;
    }


    public function getUserId() {
      if ($this->getUser() == null){
        return null;
      }
      return $this->getUser()->getId();
    }

    public function getSessionUserId() {
      return $this->getUser()->getSessionUserId();
    }

    /**
     * validate all imusic.am request
     * by user
     *
     * @param object $request
     *
     * @return bool
     */

    public function validateRequest($request, $user = null) {
      switch ($request->getRequestGroup()){
        case RequestGroups::$guestRequest :
          return true;
          break;
      }

      return false;
    }


  }

}
