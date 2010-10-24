function sortkids(e){

	if(typeof e == "string"){
		e = document.getElementById(e);
	}

	var kids = [];
	for(var x=e.firstChild; x!=null; x=x.nextSibling){
		if(x.nodeType == 1 /* Node.ELEMENT_NODE */){
			kids.push(x);
		}

		//�q�v�f�̎��e�L�X�g�ɉ����Ĕz����\�[�g
		kids.sort(function(n, m){
					var s = n.firstChild.data; //�m�[�hn�̃e�L�X�g
					var t = m.firstChild.data; //�m�[�hm�̃e�L�X�g

					if(s < t){
						return -1; //n��m�̑O
					}else if(s>t){
						return 1;  //n��m�̌��
					}else{
						return 0;  //n��m�͓���
					}
		});

		//
		for(var i = 0; i < kids.length; i++){
			e.appendChild(kids[i]);
		}
	}

}