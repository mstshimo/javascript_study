function log(category, message, object){

	// このカテゴリの記録が明示的に停止している場合、何もしない。ｓ
	if(log.options[category + "Disabled"]){
		return;
	}

	var id = category + "_log";
	var c = document.getElementById(id);

	// コンテナが無く、このカテゴリのログ記録が有効な場合、コンテナを作る。
	if(!c && log.options[category + "Enabled"]){
		c = document.createElement("div");
		c.id = id;
		c.className = "log";
		document.body.appendChild(c);
	}


	// この時点でコンテナが無い場合は、メッセージを無視する。
	if(!c){
		return;
	}

	// タイムスタンプ機構が有能の場合、日時を追加
	if(log.options.timestamp){
		message = new Date() + ":" + (message?message:"");
	}

	// 各ログメッセージを保存するdiv要素作成
	var entry = document.createElement("div");
	entry.className = category + "_message";

	if(message){
		// メッセージを追加
		entry.appendChild(document.createTextNode(message));
	}

	if(object && typeof object == "object"){
		entry.appendChild(log.makeTable(object, 0));
	}

	// 最後ｔにdiv要素をコンテナに追加
	c.appendChild(entry);
}

log.makeTable = function(object, level){

	if(level > log.options.maxRecursion){
		return document.createTextNode(object.toString());
	}

	var table = document.createElement("table");
	table.border = 1;
	var header = document.createElement("tr");
	var headerName = document.createElement("th");
	var headerType = document.createElement("th");
	var headerValue = document.createElement("th");

	headerName.appendChild(document.createTextNode("Name"));
	headerType.appendChild(document.createTextNode("Type"));
	headerValue.appendChild(document.createTextNode("Value"));

	header.appendChild(headerName);
	header.appendChild(headerType);
	header.appendChild(headerValue);
	table.appendChild(header);


	// オブジェクトのプロパティ命を取得し、アルファベット順にソート
	var names = [];
	for(var name in object){
		names.push(name);
	}
	names.sort();

	// プロパティをループで調査
	for(var i = 0; i < names.length; i++){
		var name;
		var value;
		var type;

		name = names[i];
		try{
			value = object[name];
			type = typeof value;

		}catch(e){//FireFoxで発生
			value = "<unKnown value>";
			type = "unKnown";
		};

		//フィルターで除外されたプロパティは記録しない
		if(log.options.filter && !log.options.filter(name, value)){
			continue;
		}

		//場所をとりすぎるので、関数のソースコードは表示しない
		if(type == "function"){
			value = "{/* ソースは省略}";
		}

		var row = document.createElement("tr");
		row.vAlign = "top";
		var rowName = document.createElement("td");
		var rowType = document.createElement("td");
		var rowValue = document.createElement("td");
		rowName.appendChild(document.createTextNode(name));
		rowType.appendChild(document.createTextNode(type));

		if(type == "object"){
			rowValue.appendChild(log.makeTable(value, level + 1));
		}else{
			rowValue.appendChild(document.createTextNode(value));
		}

		row.appendChild(rowName);
		row.appendChild(rowType);
		row.appendChild(rowValue);

		table.appendChild(row);
	}
	return table;
}

// 空のオプションオブジェクト
log.options = {};

log.debug = function(message, object){
	log("debug", message, object);
};

log.warn = function(message ,object){
	log("warn", message, object);
};



function alert(msg){
	log("alert", msg);
}
