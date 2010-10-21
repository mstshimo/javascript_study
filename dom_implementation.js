
for(var i=1; i<=3; i++){

	alert("-----Version " + i + ".0-----");

	if(document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("Core", i + ".0")){
		alert("Core" + i + ".0");
	}

	if(document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("XML", i + ".0")){
		alert("XML" + i + ".0");
	}

	if(document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("HTML", i + ".0")){
		alert("HTML" + i + ".0");
	}

	if(document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("CSS", i + ".0")){
		alert("CSS" + i + ".0");
	}
	
	if(document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("CSS2", i + ".0")){
		alert("CSS2" + i + ".0");
	}

}


