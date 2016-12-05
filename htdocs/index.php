<?php if (php_sapi_name() == "cli"){
defined('__DIR__') or define('__DIR__', dirname(__FILE__));
chdir(__DIR__ . "/");
}
require_once("../vendor/autoload.php");
//require_once ("../classes/framework/NGS.class.php");
$dispatcher = new ngs\Dispatcher();
NGS()->setDispatcher($dispatcher);
$dispatcher->dispatch();