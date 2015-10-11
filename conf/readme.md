# constants.php
### Version
2.1

In constants php you can use NGS()->define(name, value) function for setting global params, default params name and value please find in bellow

  - ENVIRONMENT - default set developents / isset $_SERVER["ENVIRONMENT"] then use it (development/production)
  - JS_FRAMEWORK_ENABLE - true (true/false)
  - NGS_ROOT - root folder
  - CLASSES_DIR - classes
  - PUBLIC_DIR - htdocs
  - PUBLIC_OUTPUT_DIR - out (public output dir for css/js compiles files)
  - CSS_DIR - css (defining css dir in public folder)
  - LESS_DIR - less (defining less dir in public folder)
  - JS_DIR - js (defining js dir in public folder)
  - CONF_DIR - conf
  - DATA_DIR - data
  - TEMP_DIR - temp
  - BIN_DIR - bin
  - TEMPLATES_DIR - templates
  - LOADS_DIR - loads (in classes folder)
  - ACTIONS_DIR - actions (in classes folder)
  - NGS_ROUTS - routes.json
  - MODULES_ENABLE - TRUE
  - MODULES_DIR - modules
  - NGS_MODULS_ROUTS - modules.json
  - LOAD_MAPPER - ngs\framework\routes\NgsLoadMapper
  - SESSION_MANAGER - ngs\framework\session\NgsSessionManager
  - TEMPLATE_ENGINE - ngs\framework\templater\NgsTemplater
  - NGS_EXCEPTION_DEBUG - ngs\framework\exceptions\DebugException
  - NGS_EXCEPTION_INVALID_USER - ngs\framework\exceptions\InvalidUserException
  - NGS_EXCEPTION_NGS_ERROR - ngs\framework\exceptions\NgsErrorException
  - NGS_EXCEPTION_NO_ACCESS - ngs\framework\exceptions\NoAccessException
  - NGS_EXCEPTION_NOT_FOUND - ngs\framework\exceptions\NotFoundException