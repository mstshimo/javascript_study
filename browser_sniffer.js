
var sniffer = {
	version: parseInt(navigator.appVersion),
	isNetscape: navigator.appName.indexOf("Netscape") != -1,
	isMicrosoft: navigator.appName.indexOf("Microsoft") != -1
}


alert(sniffer.version + "\n" + sniffer.isNetscape + "\n" + sniffer.isMicrosoft);

