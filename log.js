function log(category, message, object){

	// ���̃J�e�S���̋L�^�������I�ɒ�~���Ă���ꍇ�A�������Ȃ��B��
	if(log.options[category + "Disabled"]){
		return;
	}

	var id = category + "_log";
	var c = document.getElementById(id);

	// �R���e�i�������A���̃J�e�S���̃��O�L�^���L���ȏꍇ�A�R���e�i�����B
	if(!c && log.options[category + "Enabled"]){
		c = document.createElement("div");
		c.id = id;
		c.className = "log";
		document.body.appendChild(c);
	}


	// ���̎��_�ŃR���e�i�������ꍇ�́A���b�Z�[�W�𖳎�����B
	if(!c){
		return;
	}

	// �^�C���X�^���v�@�\���L�\�̏ꍇ�A������ǉ�
	if(log.options.timestamp){
		message = new Date() + ":" + (message?message:"");
	}

	// �e���O���b�Z�[�W��ۑ�����div�v�f�쐬
	var entry = document.createElement("div");
	entry.className = category + "_message";

	if(message){
		// ���b�Z�[�W��ǉ�
		entry.appendChild(document.createTextNode(message));
	}

	if(object && typeof object == "object"){
		entry.appendChild(log.makeTable(object, 0));
	}

	// �Ōゔ��div�v�f���R���e�i�ɒǉ�
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


	// �I�u�W�F�N�g�̃v���p�e�B�����擾���A�A���t�@�x�b�g���Ƀ\�[�g
	var names = [];
	for(var name in object){
		names.push(name);
	}
	names.sort();

	// �v���p�e�B�����[�v�Œ���
	for(var i = 0; i < names.length; i++){
		var name;
		var value;
		var type;

		name = names[i];
		try{
			value = object[name];
			type = typeof value;

		}catch(e){//FireFox�Ŕ���
			value = "<unKnown value>";
			type = "unKnown";
		};

		//�t�B���^�[�ŏ��O���ꂽ�v���p�e�B�͋L�^���Ȃ�
		if(log.options.filter && !log.options.filter(name, value)){
			continue;
		}

		//�ꏊ���Ƃ肷����̂ŁA�֐��̃\�[�X�R�[�h�͕\�����Ȃ�
		if(type == "function"){
			value = "{/* �\�[�X�͏ȗ�}";
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

// ��̃I�v�V�����I�u�W�F�N�g
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
