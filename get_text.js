function getText(n){

	var strings = [];
	getStrings(n, strings);
	return strings.join("");

//	alert("n.nodeType: " + n.nodeType);
//	alert("n.nodeName: " + n.nodeName);
//	alert("children.length: " + children.length);


	function getStrings(n, strings){

		if(n.nodeType == 3 /* Node.TEXT_NODE */){
			strings.push(n.data);
		}else if(n.nodeType == 1 /* Mpde.ELEMENT_NODE */){
			alert("n.nodeType: " + n.nodeType);
			alert("n.nodeName: " + n.nodeName);
			for(var m = n.firstChild; m != null; m=m.nextSibling){
				alert("for m: " + m);
				getStrings(m, strings);
			}
		}else{
			alert("n.nodeType: " + n.nodeType);
			alert("n.nodeName: " + n.nodeName);
			getStrings(n.firstChild, strings);
		}
	}


}