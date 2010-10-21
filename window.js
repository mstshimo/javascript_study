window.onerror = function(msg, url, line){
	if(onerror.num++ < onerror.max){
		alert("ERROR:" + msg + "\n" + url + ":" + line);
		return true;
	}
}

onerror.max = 3;
onerror.num = 0;

var bounce = {
	x:0, y:0, // �E�B���h�E���W

	w:200, h:200, // �E�B���h�E�̑傫���w��

	dx:5, dy:5, // �ړ���

	interval:200, // �^�C�}�[ 100ms

	win:null, //��������E�C���h�E
	timer:null, //setInterval�̖߂�l(�^�C�}�[���ʎq)

	// �A�j���[�V�����J�n
	
	start:function(){
		// screen ���j�^�̍����A��
		bounce.x = (screen.width - bounce.w)/2; 
		bounce.h = (screen.height - bounce.h)/2;

		bounce.win = window.open('javascript:"<h1>BOUNCE!</h1>"', "",
								  "left=" + bounce.x + ",top=" + bounce.y +
								  ",width=" + bounce.w + ",height=" + bounce.h +
								  ",status=yes,resizable=yes,,scrollbars=yes");

		// setInterval�̓^�C�}�[���ʎq��Ԃ�
		bounce.timer = setInterval(bounce.nextFrame, bounce.interval);
	},

	// �A�j���[�V������~
	stop:function(){
		clearInterval(bounce.timer); // �^�C�}�[���ʎq���g���^�C�}�[�L�����Z��

		if(!bounce.win.closed){
			alert("window:closed");
			bounce.win.close(); // �E�B���h�E�N���[�Y
		}
	},

	// �A�j���[�V�����̎��̃t���[���ɕ\���BsetInterval()����Ăяo�����
	nextFrame:function(){

		// �E�C���h�E�������Ă邩�ǂ����H
		if(bounce.win.closed){
			clearInterval(bounce.timer);  // �^�C�}�[���ʎq���g���^�C�}�[�L�����Z��
			return;
		}

		// screen.availWidth ���j�^�̗L���̈�̍����A��

		// ��ʂ̍��[�E�[�ɐڐG�����ꍇ�͒��˕Ԃ�
		if( (bounce.x + bounce.dx > (screen.availWidth - bounce.w)) || (bounce.x + bounce.dx < 0) ){
			bounce.dx = -bounce.dx;
		}

		// ��ʂ̏�[���[�ɐڐG�����ꍇ�͒��˕Ԃ�
		if( (bounce.y + bounce.dy > (screen.availHeight - bounce.h)) || (bounce.y + bounce.dy < 0) ){
			bounce.dy = -bounce.dy;
		}

		// �E�B���h�E�̌��݈ʒu���X�V����B
		bounce.x += bounce.dx;
		bounce.y += bounce.dy;

		// �Ō�ɃE�B���h�E�����̈ʒu�Ɉړ�����
		bounce.win.moveTo(bounce.x, bounce.y);

		// �X�e�[�^�X�s�Ɍ��݈ʒu��\������
		//bounce.win.defaultStatus = '(' + bounce.x + ',' + bounce.y + ')';

		// �X�e�[�^�X�s�ɕ\������Ȃ��̂ŁAdocument��
		bounce.win.document.write("bounce.x" + bounce.x + ", bounce.y" + bounce.y);

	}
}

