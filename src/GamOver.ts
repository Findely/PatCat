module PatCat {
	export class GamOver extends eui.Component {
		private gameoverp: eui.Group;
		private sucesstext: eui.Label;
		private btnagin:eui.Image;
		private overrank:eui.Image;
		public constructor() {
			super();
			this.skinName = "gamover";
			if (myDate.sucesstag) {
				//游戏成功
				this.sucesstext.y=270;
				this.sucesstext.lineSpacing=10;
				this.sucesstext.textAlign="left";
				this.sucesstext.text = "恭喜您" + (myDate.timer / 10).toString() + 's通关!获得金币' + myDate.score.toString() + '枚！\n'+'金币量相同的情况下，通关时间决定排名哦，再挑战一次吧！'
			//Save(myDate.score,myDate.timer)
			} else {
				//游戏失败
				this.sucesstext.text = '很遗憾您通关失败！'
			}
			this.btnagin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnaginf,this);
			this.overrank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.overrankf,this);

		}
		private btnaginf(){
			this.parent.addChild(new PatCat.GameView());
			this.parent.removeChild(this);
		}
		private overrankf(){
			window.location.href='list.html'
		}

	}
}
