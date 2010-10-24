function sortkids(e){

	if(typeof e == "string"){
		e = document.getElementById(e);
	}

	var kids = [];
	for(var x=e.firstChild; x!=null; x=x.nextSibling){
		if(x.nodeType == 1 /* Node.ELEMENT_NODE */){
			kids.push(x);
		}

		//子要素の持つテキストに応じて配列をソート
		kids.sort(function(n, m){
					var s = n.firstChild.data; //ノードnのテキスト
					var t = m.firstChild.data; //ノードmのテキスト

					if(s < t){
						return -1; //nはmの前
					}else if(s>t){
						return 1;  //nはmの後ろ
					}else{
						return 0;  //nとmは同じ
					}
		});

		//
		for(var i = 0; i < kids.length; i++){
			e.appendChild(kids[i]);
		}
	}

}