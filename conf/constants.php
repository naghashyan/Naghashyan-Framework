<?php
/**
 * default constants 
 * in this file should be store all constants
 *
 * @author Levon Naghashyan
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2015
 * @version 2.1.0
 * @copyright Naghashyan Solutions LLC
 *
 */



//defaining project version
NGS()->define("VERSION", "1.0.0");

NGS()->define("SESSION_MANAGER", 'demo\managers\SessionManager');

//define error show status
if (NGS()->getDefinedValue("ENVIRONMENT") != "production") {
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
}
