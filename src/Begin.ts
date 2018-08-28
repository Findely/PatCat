//开始页面的制作
class Begin extends eui.Component {
	public btnstar: eui.Image;
	public rankbtn: eui.Image;
	public beA: egret.tween.TweenGroup;
	public btnrule: eui.Image;
	public rulepage: eui.Group;
	public constructor() {
		super();
		this.skinName = 'begin';
		this.beA.play();
		this.btnstar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnstarf, this);
		this.rankbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankbtnf, this);
		this.btnrule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnrulef, this);
	}
	private btnstarf() {
		this.addChild(new PatCat.GameView());
	}
	private rankbtnf() {
		window.location.href='list.html'
	}
	private btnrulef() {
		this.rulepage.visible = true;
	}
}