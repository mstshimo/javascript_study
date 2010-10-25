function maketoc(){

	// コンテナを取得。なければ、終了。
	var container = document.getElementById('toc');
	if(!container){
		return;
	}

	var sections = [];
	findSections(document, sections);

	// コンテナ要素の前にアンカーを挿入。戻る為のリンクを追加
	var anchor = document.createElement("a");
	anchor.name = "TOCtop";
	anchor.id = "TOCtop";
	container.parentNode.insertBefore(anchor, container);

	// 節番号を記録する配列を初期化
	var sectionNumbers = [0, 0, 0, 0, 0, 0];

	for(var s = 0; s < sections.length; s++){
		var section = sections[s];

		// 見出しのレベルを判定
		var level = parseInt(section.tagName.charAt(1));
		if(isNaN(level) || level < 1 || level > 6){
			continue;
		}

		// 見出しの番号を増加
		sectionNumbers[level-1]++;
		for(var i = level; i < 6; i++){
			sectionNumbers[i] = 0;
		}

		// 「2.3.1」のような節番号を生成
		var sectionNumber = "";
		for(i = 0; i < level; i++){
			sectionNumber += sectionNumbers[i];
			if(i < level -1){
				sectionNumber += ".";
			}
		}

		// 見出しの前に節番号とスペースを追加
		var frag = document.createDocumentFragment();
		var span = document.createElement("span");
		span.className = "TOCSectNum";
		span.appendChild(document.createTextNode(sectionNumber));
		frag.appendChild(span);
		frag.appendChild(document.createTextNode(" "));
		section.insertBefore(frag, section.firstChild);

		// 節の先頭にアンカーを作成
		var anchor = document.createElement("a");
		anchor.name = "TOC" + sectionNumber;
		anchor.id = "TOC" + sectionNumber; // IEはid属性が必要

		// 目次に戻るリンクを
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
	 * ノードnをルーﾄとするツリー構造を探索し
	 * <h1>から<h6>までのタグを探し、配列に追加する。
	 *
	 */
	function findSections(n, sects){
		for(var m = n.firstChild; m != null; m = m.nextSibling){
			// 要素以外は読み飛ばす
			if(m.nodeType != 1 /* Node.ELEMENT_NODE */){
				continue;
			}

			// コンテナ要素の場合も、コンテナが見出しを持つ場合もあるので、読み飛ばす
			if(m == container){
				continue;
			}

			// <p>タグも読み飛ばす
			if(m.tagName == "p"){
				continue;
			}

			// <h>タグを配列に追加
			if(m.tagName.length ==2 && m.tagName.charAt(0) == "H"){
				sects.push(m);
			}else{
				findSections(m, sects);
			}
		}
	}

}

maketoc.backlinkText = "Contets";


// ドキュメント読み込み完了時に実行されるように、maketocを登録
if(window.addEventListener){
	window.addEventListener("load", maketoc, false);
}else if(window.attachEvent){
	window.attachEvent("onload", maketoc);
}
