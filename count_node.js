function countTags(n){
	var numtags = 0;
	if(n.nodeType == 1 /* Node.ELEMENT_NODE */){
		numtags++;
		alert("nodeName=" + n.nodeName + " " + numtags);
	}

	var children = n.childNodes;
	var nagasa = children.length;
	alert("nagasa " + nagasa);
	
	for(var i=0; i<nagasa; i++){
		numtags += countTags(children[i]);
	}

	return numtags;
}