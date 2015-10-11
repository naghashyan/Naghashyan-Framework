<?php
defined('__DIR__') or define('__DIR__', dirname(__FILE__));
$_dir = str_replace("/bin", "", __DIR__);
$_dir = str_replace("\bin", "", $_dir);
require_once ($_dir."/conf/constants.php");
require_once (CLASSES_PATH."/framework/NGS.class.php");

$config = json_decode(file_get_contents(NGS_CONFIG));
NGS()->registerAutoload();

?>
