function maketoc(){

	// �R���e�i���擾�B�Ȃ���΁A�I���B
	var container = document.getElementById('toc');
	if(!container){
		return;
	}

	var sections = [];
	findSections(document, sections);

	// �R���e�i�v�f�̑O�ɃA���J�[��}���B�߂�ׂ̃����N��ǉ�
	var anchor = document.createElement("a");
	anchor.name = "TOCtop";
	anchor.id = "TOCtop";
	container.parentNode.insertBefore(anchor, container);

	// �ߔԍ����L�^����z���������
	var sectionNumbers = [0, 0, 0, 0, 0, 0];

	for(var s = 0; s < sections.length; s++){
		var section = sections[s];

		// ���o���̃��x���𔻒�
		var level = parseInt(section.tagName.charAt(1));
		if(isNaN(level) || level < 1 || level > 6){
			continue;
		}

		// ���o���̔ԍ��𑝉�
		sectionNumbers[level-1]++;
		for(var i = level; i < 6; i++){
			sectionNumbers[i] = 0;
		}

		// �u2.3.1�v�̂悤�Ȑߔԍ��𐶐�
		var sectionNumber = "";
		for(i = 0; i < level; i++){
			sectionNumber += sectionNumbers[i];
			if(i < level -1){
				sectionNumber += ".";
			}
		}

		// ���o���̑O�ɐߔԍ��ƃX�y�[�X��ǉ�
		var frag = document.createDocumentFragment();
		var span = document.createElement("span");
		span.className = "TOCSectNum";
		span.appendChild(document.createTextNode(sectionNumber));
		frag.appendChild(span);
		frag.appendChild(document.createTextNode(" "));
		section.insertBefore(frag, section.firstChild);

		// �߂̐擪�ɃA���J�[���쐬
		var anchor = document.createElement("a");
		anchor.name = "TOC" + sectionNumber;
		anchor.id = "TOC" + sectionNumber; // IE��id�������K�v

		// �ڎ��ɖ߂郊���N��
		var link = document.createElement("a");
		link.href = "#TOCtop";
		link.className = "TOCBacklink";
		link.appendChild(document.createTextNode(maketoc.backlinkText));
		anchor.appendChild(link);

		section.parentNode.insertBefore(anchor, section);

		var link = document.createElement("a");
		link.href = "#TOC" + sectionNumber;
		link.innerHTML = section.innerHTML;


		var entry = document.createElement("div");
		entry.className = "TOCEntry TOCLevel" + level;
		entry.appendChild(link);

		container.appendChild(entry);

	}

	/**
	 * �m�[�hn�����[ĂƂ���c���[�\����T����
	 * <h1>����<h6>�܂ł̃^�O��T���A�z��ɒǉ�����B
	 *
	 */
	function findSections(n, sects){
		for(var m = n.firstChild; m != null; m = m.nextSibling){
			// �v�f�ȊO�͓ǂݔ�΂�
			if(m.nodeType != 1 /* Node.ELEMENT_NODE */){
				continue;
			}

			// �R���e�i�v�f�̏ꍇ���A�R���e�i�����o�������ꍇ������̂ŁA�ǂݔ�΂�
			if(m == container){
				continue;
			}

			// <p>�^�O���ǂݔ�΂�
			if(m.tagName == "p"){
				continue;
			}

			// <h>�^�O��z��ɒǉ�
			if(m.tagName.length ==2 && m.tagName.charAt(0) == "H"){
				sects.push(m);
			}else{
				findSections(m, sects);
			}
		}
	}

}

maketoc.backlinkText = "Contets";


// �h�L�������g�ǂݍ��݊������Ɏ��s�����悤�ɁAmaketoc��o�^
if(window.addEventListener){
	window.addEventListener("load", maketoc, false);
}else if(window.attachEvent){
	window.attachEvent("onload", maketoc);
}
