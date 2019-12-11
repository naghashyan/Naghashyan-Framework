<?php
/**
 * Home Page of imusic.am
 *
 * @author Levon Naghashyan
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2010-2015
 * @package loads.site.main
 * @version 6.0
 */

namespace ngs_demo\loads\main {

  use ngs\request\AbstractLoad;
  use ngs_demo\security\RequestGroups;

  class HomeLoad extends AbstractLoad {


    public function load() {
    }

    public function getTemplate() {
      return NGS()->getTemplateDir() . '/main/home.tpl';
    }

    public function getRequestGroup() {
      return RequestGroups::$guestRequest;
    }
  }

}
