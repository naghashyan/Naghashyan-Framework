NGS.eventsOpt = {
	'bubbles' : true,
	'cancelable' : true
};
NGS.events = {
	onAfterLoad : new CustomEvent("ngs-onAfterLoad", NGS.eventsOpt),
	onBeforeLoad : new CustomEvent("ngs-onBeforeLoad", NGS.eventsOpt),
	onPageUpdate : new CustomEvent("ngs-onPageUpdate", NGS.eventsOpt),
	onUrlChange : new CustomEvent("ngs-onUrlChange", NGS.eventsOpt),
	onUrlUpdate : new CustomEvent("ngs-onUrlUpdate", NGS.eventsOpt)
};
