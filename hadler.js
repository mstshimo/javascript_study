var Handler = {};

if(document.addEventlistener){
	Handler.add = function(element, eventType, handler){
		element.addEventlistener(eventType, hadler, false);
	};

	Handler.remove = function(element, eventType, handler)[
		element.removeEventListener(eventType, handler, false);
	};

// IE5以降
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

				//マウス座標
				clientX:e.clientX,
				clientY:e.clientY,
				screenX:e.screenX,
				screenY:e.screenY,

				//キーの状態
				altKey:e.altKey,
				ctrlKey:e.ctrlKey,
				shiftKey:e.shiftKey,
				carCode:e.keyCode,

				//イベント管理関数
				stopPropagation:function(){
					this._event.cancelBubble = true;
				},

				preventDefalut:function(){
					this._event.returnValue = false;
				}
			}

			//ハンドラ関数を要素のメソッドとして呼び出す。
			if(Function.prototype.call){
				handler.call(element, event);
			}else{
				element._currentHandler = handler;
				element._currentHandler(evetn);
				element._currentHandler = null;
			}
		};

		//入れ子型の関数をイベントハンドラとして登録する。
		element.attachEvent("on" + eventType, wrapperHandler);

		//ユーザが指定したハンドラ関数と、そのハンドラ関数を呼び出す入れ子型の
		//関数を関連付けて管理する必要がある。

		//このハンドラについて全ての情報をオブジェクトに格納する。
		var h = {
			element:element,
			eventType:eventType,
			handler:handler,
			wrapperHandler:wrapperHandler
		};

		//このハンドラがどのドキュメントに含まれるものか判定する
		var d = element.document || element;

		var w = d.parentWindow;

		//このハンドラとウィンドウを関連付けて、ウィンドウがアンロードされるとき、
		//ハンドラを削除できるようにする。
		var id = Handler._uid();
		if(!w._allHandlers){
			w._allHandlers = {};
		}
		w._allHandlers[id] = h;

		if(!element._handlers){
			element._handlers = [];
		}
		element._handlers.push(id);

		//ウィンドウにonunloadハンドラが登録されていない場合は、ハンドラを登録
		if(!w._onunloadHandlerRegisterd){
			w._onunloadHandlerRegisterd = true;
			w.attacEvent("onunload", Handler._removeAllHandlers);
		}
	};

	Handler.remove = function(element, eventType, handler){
		var i = Handler._find(element, eventType, handler);

		//ハンドラが登録されていない場合、何もしない
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

	//element._handlers配列中からハンドラを探す、ユーティリティ関数
	Handler._find = function(element, eventType, handler){
		var handlers = element._handlers;
		if(!handlers){
			return -1; //ハンドラ無し
		}

		var d = element.document || element;
		var w = d.parentWindow;

		//この要素に関連付けられたハンドラをループで捜査して、
		//適切なイベントタイプと関数を持つものを探す
		for(var i = handlers.length-1; i>=0; i--){
			var handlerId = handlers[i];
			var h = w._allHandlers[handlerId];

			//ハンドラ情報とイベントタイプとハンドラ関数が一致する場合は検索終了
			if(h.eventType == eventType && h.handler = handler){
				return i;
			}
		
			return -1;
		}
	};


	//ハンドラを削除する
	Handler._removeAllHandlers = function(){
		var w = this;

		//すべての登録されたハンドラをループで調べる。
		for(id in w._allHandlers){
			var h = w._allHandlers[id];
			h.element.detachEvent("on" + h.eventType, h.wrapperHandler);
			
			delete.w._allHandlers[id];
		}
	}

	//一意なハンドラidを生成する関数。
	Handler._counter =0;
	Handler._uid = function(){
		return "h" + Handler._counter++;
	};
	
}
