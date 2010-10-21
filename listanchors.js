function listanchors(d){
	var newwin = window.open("", "navwin","menubar=yes, scrollbars=yes, resizable=yes, width=500, height=300");
	newwin.document.write("<h1>Navigation Window:" + d.title + "</h1>");

	for(var i=0; i<d.anchors.length; i++){
		var a = d.anchors[i];
		var text = null;
		if(a.text){
			text = a.text;
		}else if(a.innerText){
			text = a.innerText;
		}else{
			text = a.name;
		}

		newwin.document.write('<a href="#' + a.name + '"' + 'onclick="opener.location.hash=\'' + a.name + '\'; return false;">');
		newwin.document.write(text);
		newwin.document.write('</><br />');
	}

	newwin.document.close();

}