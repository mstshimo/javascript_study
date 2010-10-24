function upcase(n){

	if(typeof n == "string"){
		n = document.getElementById(e);
	}

	if(n.nodeType == 3 /* Node.TEXT_NODE */){
		n.data = n.data.toUpperCase();
	}else{
		var kids = n.childNodes;

		for(var i=0; i < kids.length; i++){
			upcase(kids[i]);
		}
	}
}