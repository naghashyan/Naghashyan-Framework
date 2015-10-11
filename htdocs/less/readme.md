# NGS LESS
### Version
2.1

In less builder we have 4 types of sections

  - VARIABLES - first building section and there we set variables.
  - MIXINS - this sections less building after variables and there we should store functions
  - COMPONENTS - this sections less building after mixins and there we should store global elements styles
  - MODULES - finial building section and there we should store all others styles :)
  
NGS ADDITIONAL VARIABLES
	- @NGS_HOST - public host for example //ngsframework.com 
	- @NGS_MODULE_PATH - module host connected which moduls less loaded
  
EXAMPLE of builder.json
```json
[
	{
		"output_file": "styles.css",
		"compress": true,
		"builders": [
			{
				"output_file": "global_variables.css",
				"module": "schoolprogram",
				"type": "variables",
				"files": ["variables/base.less", "variables/structure.less"]
			}, {
				"output_file": "variables.css",
				"type": "variables",
				"files": ["variables/structure.less"]
			}, {
				"output_file": "global_mixins.css",
				"module": "schoolprogram",
				"type": "mixins",
				"files": ["mixins/border-radius.less", "mixins/crop_text.less", "mixins/linear-gradient.less", "mixins/transition.less", "mixins/unitize.less"]
			}, {
				"output_file": "global_components.css",
				"module": "schoolprogram",
				"type": "components",
				"files": ["components/fonts.less", "components/loading-indicator.less", "components/linear-gradient.less", "components/overlay.less"]
			}, {
				"output_file": "modules.css",
				"type": "modules",
				"files": ["home.less"]
			}
		]
	}
]
```