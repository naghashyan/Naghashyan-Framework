<?php
/**
 * main load for imusic.am
 *
 * @author Levon Naghashyan
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2010-2015
 * @package loads.site.main
 * @version 6.0
 */

namespace ngs_demo\loads\main {

  use ngs_demo\security\RequestGroups;
  use ngs\request\AbstractLoad;

  class MainLoad extends AbstractLoad {

    public function load() {


    }

    public function getDefaultLoads() {
      $loads = [];
      $loads['content'] = [];
      $loads['content']['action'] = 'ngs_demo.loads.main.home';
      return $loads;
    }

    public function getTemplate() {
      return NGS()->getTemplateDir() . '/main/main.tpl';
    }
    public function getRequestGroup() {
      return RequestGroups::$guestRequest;
    }

  }

}
