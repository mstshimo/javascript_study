window.onerror = function(msg, url, line){
	if(onerror.num++ < onerror.max){
		alert("ERROR:" + msg + "\n" + url + ":" + line);
		return true;
	}
}

onerror.max = 3;
onerror.num = 0;

var bounce = {
	x:0, y:0, // ウィンドウ座標

	w:200, h:200, // ウィンドウの大きさ指定

	dx:5, dy:5, // 移動幅

	interval:200, // タイマー 100ms

	win:null, //生成するウインドウ
	timer:null, //setIntervalの戻り値(タイマー識別子)

	// アニメーション開始
	
	start:function(){
		// screen モニタの高さ、幅
		bounce.x = (screen.width - bounce.w)/2; 
		bounce.h = (screen.height - bounce.h)/2;

		bounce.win = window.open('javascript:"<h1>BOUNCE!</h1>"', "",
								  "left=" + bounce.x + ",top=" + bounce.y +
								  ",width=" + bounce.w + ",height=" + bounce.h +
								  ",status=yes,resizable=yes,,scrollbars=yes");

		// setIntervalはタイマー識別子を返す
		bounce.timer = setInterval(bounce.nextFrame, bounce.interval);
	},

	// アニメーション停止
	stop:function(){
		clearInterval(bounce.timer); // タイマー識別子を使いタイマーキャンセル

		if(!bounce.win.closed){
			alert("window:closed");
			bounce.win.close(); // ウィンドウクローズ
		}
	},

	// アニメーションの次のフレームに表示。setInterval()から呼び出される
	nextFrame:function(){

		// ウインドウが閉じられてるかどうか？
		if(bounce.win.closed){
			clearInterval(bounce.timer);  // タイマー識別子を使いタイマーキャンセル
			return;
		}

		// screen.availWidth モニタの有効領域の高さ、幅

		// 画面の左端右端に接触した場合は跳ね返る
		if( (bounce.x + bounce.dx > (screen.availWidth - bounce.w)) || (bounce.x + bounce.dx < 0) ){
			bounce.dx = -bounce.dx;
		}

		// 画面の上端下端に接触した場合は跳ね返る
		if( (bounce.y + bounce.dy > (screen.availHeight - bounce.h)) || (bounce.y + bounce.dy < 0) ){
			bounce.dy = -bounce.dy;
		}

		// ウィンドウの現在位置を更新する。
		bounce.x += bounce.dx;
		bounce.y += bounce.dy;

		// 最後にウィンドウを次の位置に移動する
		bounce.win.moveTo(bounce.x, bounce.y);

		// ステータス行に現在位置を表示する
		//bounce.win.defaultStatus = '(' + bounce.x + ',' + bounce.y + ')';

		// ステータス行に表示されないので、documentに
		bounce.win.document.write("bounce.x" + bounce.x + ", bounce.y" + bounce.y);

	}
}

