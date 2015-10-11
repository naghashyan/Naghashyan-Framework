/**
 * this function handle framework
 * load url changes using history object
 *
 * @author Levon Naghashyan
 * @site http://naghashyan.com
 * @mail levon@naghashyan.com
 * @year 2015
 * @version 6.0
 */
(function(NGS) {
	NGS.FileUtil = {
		load : null,
		encodeImageFileAsURL : function(filesSelected, onload, onerror) {
			if(typeof(onload) == "undefined"){
				var onload = function(){};
			}
			if(typeof(onerror) == "undefined"){
				var onerror = function(){};
			}
			var filesSelected = document.getElementById("itemPhoto").files;
			if (filesSelected.length > 0) {
				var fileToLoad = filesSelected[0];
				if (fileToLoad.type.indexOf("image/") == -1) {
					onerror();
					return;
				}
				var fileReader = new FileReader();
				fileReader.onload = function(fileLoadedEvent) {
					onload(fileLoadedEvent.target.result);
				};
				fileReader.readAsDataURL(fileToLoad);
			}
		}
	};
})(NGS); 