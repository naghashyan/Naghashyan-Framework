<?php
/**
 * default constants
 * in this file should be store all constants
 *
 * @author Naghashyan Solutions
 * @site https://naghashyan.com
 * @mail info@naghashyan.com
 * @year 2019
 * @version 2.0.0
 * @copyright Naghashyan Solutions LLC
 *
 */


//defaining project version
NGS()->define('VERSION', '1.0.0');

NGS()->define('SESSION_MANAGER', 'ngs_demo\managers\SessionManager');
NGS()->define('JS_FRAMEWORK_ENABLE', true);
NGS()->define('JS_BUILDER', 'ngs\util\JsBuilderV2');

//define error show status
if (NGS()->getDefinedValue('ENVIRONMENT') !== 'production'){
  error_reporting(E_ALL);
  ini_set('display_errors', '1');
}
