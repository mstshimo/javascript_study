var Handler = {};

if(document.addEventlistener){
	Handler.add = function(element, eventType, handler){
		element.addEventlistener(eventType, hadler, false);
	};

	Handler.remove = function(element, eventType, handler)[
		element.removeEventListener(eventType, handler, false);
	};

// IE5�ȍ~
}else if(document.attachEvent){
	Handler.add = function(element, eventType, handler){
		if(Handler._find(element, eventType, handler) != -1){
			return;
		}

		var wrapperHandler = function(e){
			if(!e){
				e = window.event;
			}

			var event = {
				_event:e,
				type:e.type;
				target:e.srcElement,
				currentTarget:element,
				relatedTarget:e.fromElement?e.fromElement:e.toElement,
				eventPhase:(e.srcElement==element)?2:3

				//�}�E�X���W
				clientX:e.clientX,
				clientY:e.clientY,
				screenX:e.screenX,
				screenY:e.screenY,

				//�L�[�̏��
				altKey:e.altKey,
				ctrlKey:e.ctrlKey,
				shiftKey:e.shiftKey,
				carCode:e.keyCode,

				//�C�x���g�Ǘ��֐�
				stopPropagation:function(){
					this._event.cancelBubble = true;
				},

				preventDefalut:function(){
					this._event.returnValue = false;
				}
			}

			//�n���h���֐���v�f�̃��\�b�h�Ƃ��ČĂяo���B
			if(Function.prototype.call){
				handler.call(element, event);
			}else{
				element._currentHandler = handler;
				element._currentHandler(evetn);
				element._currentHandler = null;
			}
		};

		//����q�^�̊֐����C�x���g�n���h���Ƃ��ēo�^����B
		element.attachEvent("on" + eventType, wrapperHandler);

		//���[�U���w�肵���n���h���֐��ƁA���̃n���h���֐����Ăяo������q�^��
		//�֐����֘A�t���ĊǗ�����K�v������B

		//���̃n���h���ɂ��đS�Ă̏����I�u�W�F�N�g�Ɋi�[����B
		var h = {
			element:element,
			eventType:eventType,
			handler:handler,
			wrapperHandler:wrapperHandler
		};

		//���̃n���h�����ǂ̃h�L�������g�Ɋ܂܂����̂����肷��
		var d = element.document || element;

		var w = d.parentWindow;

		//���̃n���h���ƃE�B���h�E���֘A�t���āA�E�B���h�E���A�����[�h�����Ƃ��A
		//�n���h�����폜�ł���悤�ɂ���B
		var id = Handler._uid();
		if(!w._allHandlers){
			w._allHandlers = {};
		}
		w._allHandlers[id] = h;

		if(!element._handlers){
			element._handlers = [];
		}
		element._handlers.push(id);

		//�E�B���h�E��onunload�n���h�����o�^����Ă��Ȃ��ꍇ�́A�n���h����o�^
		if(!w._onunloadHandlerRegisterd){
			w._onunloadHandlerRegisterd = true;
			w.attacEvent("onunload", Handler._removeAllHandlers);
		}
	};

	Handler.remove = function(element, eventType, handler){
		var i = Handler._find(element, eventType, handler);

		//�n���h�����o�^����Ă��Ȃ��ꍇ�A�������Ȃ�
		if(i == -1){
			return;
		}

		var d = element.document || element;
		var w = d.parentWindow;

		var handlerId = element._handlers[i];

		var h = w._allHandlers[handlerId];

		element.detachEvent("on" + eventType, h.wrapperhandler);

		element._handlers.splice(i, 1);

		delete w._allHandlers[handlerId];
	};

	//element._handlers�z�񒆂���n���h����T���A���[�e�B���e�B�֐�
	Handler._find = function(element, eventType, handler){
		var handlers = element._handlers;
		if(!handlers){
			return -1; //�n���h������
		}

		var d = element.document || element;
		var w = d.parentWindow;

		//���̗v�f�Ɋ֘A�t����ꂽ�n���h�������[�v�ő{�����āA
		//�K�؂ȃC�x���g�^�C�v�Ɗ֐��������̂�T��
		for(var i = handlers.length-1; i>=0; i--){
			var handlerId = handlers[i];
			var h = w._allHandlers[handlerId];

			//�n���h�����ƃC�x���g�^�C�v�ƃn���h���֐�����v����ꍇ�͌����I��
			if(h.eventType == eventType && h.handler = handler){
				return i;
			}
		
			return -1;
		}
	};


	//�n���h�����폜����
	Handler._removeAllHandlers = function(){
		var w = this;

		//���ׂĂ̓o�^���ꂽ�n���h�������[�v�Œ��ׂ�B
		for(id in w._allHandlers){
			var h = w._allHandlers[id];
			h.element.detachEvent("on" + h.eventType, h.wrapperHandler);
			
			delete.w._allHandlers[id];
		}
	}

	//��ӂȃn���h��id�𐶐�����֐��B
	Handler._counter =0;
	Handler._uid = function(){
		return "h" + Handler._counter++;
	};
	
}
