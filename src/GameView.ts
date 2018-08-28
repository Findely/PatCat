module PatCat {
	export class GameView extends eui.Component {
		/**bg图片数量*/
		private rowCount: number;
		/**stage宽*/
		private stageW: number;
		/**stage高*/
		private stageH: number;
		/**背景图层*/
		public bgcolor: eui.Group;
		public storybg: eui.Group;
		/**背景图层*/
		public flowway: eui.Group;
		/** 食物容器*/
		public foodcont: eui.Group;
		public foodanimal: eui.Group;
		public cathouse: eui.Group;
		public catflows: eui.Group;
		/**纹理本身的高度*/
		private textureHeight: number;
		/**纹理本身的宽度*/
		private textureWidth: number;
		/**向左按钮 */
		public catleft: eui.Image;
		/**向上按钮 */
		public catup: eui.Image;
		/**向右按钮 */
		public catright: eui.Image;
		public catman: eui.Image;
		/**时间标签*/
		public timertext: eui.Label;
		/**金币数量*/
		public money: eui.Label;
		/**生命值*/
		public life: eui.Label;
		//判断是否闯关成功
		public sucesstag: boolean = false;
		/*设置计时器*/
		private creatTimer: egret.Timer;
		/*计时时间*/
		private timers: number = 0;
		private tishi: eui.Image;
		//private ceshi: eui.Label;
		public constructor() {
			super();
			this.skinName = "gamesence";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.inte, this);
			this.catleft.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.catleftf, this);
			this.catright.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.catrightf, this);
			this.catleft.addEventListener(egret.TouchEvent.TOUCH_END, this.catendtge, this);
			this.catright.addEventListener(egret.TouchEvent.TOUCH_END, this.catendtge, this);
			this.catup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.catupf, this);
			//this.catup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.catendtge, this);
			this.tishi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tishif, this);

		}
		private tishif() {
			this.tishi.visible = false;
		}
		//游戏初始化建立
		private inte() {
			let tishithis = this;
			setTimeout(function () {
				tishithis.tishi.visible = false;
			}, 2000)
			myDate.score = 0;
			myDate.timer = 0;
			myDate.lifenum = 3;
			myDate.sucesstag = false;
			this.money.text = myDate.score.toString();
			this.life.text = myDate.lifenum.toString();
			this.timertext.text = myDate.timer.toString();
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.inte, this);

			this.start();
			this.stageW = this.flowway.width;
			this.stageH = this.flowway.height;
			//添加背景色
			/*var shape: egret.Shape = new egret.Shape();
			shape.graphics.beginFill(0x672699);
			shape.graphics.drawRect(0, 0, 1040, 640);
			shape.graphics.endFill();
			this.bgcolor.addChild(shape);*/
			//添加背景图山云
			for (var i = 1; i <= this.storybg.width / 450; i++) {
				if (i % 2 != 0) {
					var story = PatCat.createBitmapByName("ele-1_png");
				} else {
					var story = PatCat.createBitmapByName("ele-2_png");
				}
				story.width = story.texture.textureWidth;
				story.height = story.texture.textureHeight;
				story.x = 450 * i - 450;
				story.y = this.storybg.height - story.height + 3;
				this.storybg.addChild(story);
			}
			//底部墙铺满算法(叫什么瓦块平铺的效果)
			var texturewall: egret.Texture = RES.getRes('ele-wall3_x_png');
			var texturewallHeight = texturewall.textureHeight;//保留原始纹理的高度，用于后续的计算
			var texturewallWidth = texturewall.textureWidth;//保留原始纹理的宽度，用于后续的计算
			var listwall = Number(Math.ceil(this.stageW / texturewallWidth));
			var rowCountwall = Number(Math.ceil(this.stageH / texturewallHeight));
			for (var k: number = 0; k < listwall; k++) {
				for (var m: number = 0; m < rowCountwall; m++) {
					var bgwall: egret.Bitmap = PatCat.createBitmapByName("ele-wall3_x_png");
					bgwall.y = texturewallHeight * m - (texturewallHeight * rowCountwall - this.stageH);
					bgwall.x = texturewallWidth * k - (texturewallWidth * listwall - this.stageW);
					this.flowway.addChild(bgwall);
				}
			}
			//创建碰撞物体(创建垃圾桶)
			var foodcontnum = Math.floor(this.foodcont.width / 580);
			egret.log(foodcontnum)
			for (var i = 1; i <= foodcontnum; i++) {
				var food: PatCat.FoodUtile;
				if (i == foodcontnum) {
					food = new PatCat.FoodUtile(4, true);
					food.y = 640 - (64 + 496);// 旗帜的位置
				} else {
					food = new PatCat.FoodUtile(3, true);
					food.y = 580 - (50 + Math.ceil(Math.random() * 28) + 96);//垃圾桶的位置
				}
				food.x = i * 580;
				this.foodcont.addChild(food);
				//创建小动物
				var wallanm: PatCat.FoodUtile;
				if (i == 1) {
					wallanm = new PatCat.FoodUtile(5, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 3) {
					wallanm = new PatCat.FoodUtile(6, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 5) {
					wallanm = new PatCat.FoodUtile(5, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 7) {
					wallanm = new PatCat.FoodUtile(5, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 8) {
					wallanm = new PatCat.FoodUtile(6, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 10) {
					wallanm = new PatCat.FoodUtile(6, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 11) {
					wallanm = new PatCat.FoodUtile(6, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 12) {
					wallanm = new PatCat.FoodUtile(6, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 14) {
					wallanm = new PatCat.FoodUtile(6, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 18) {
					wallanm = new PatCat.FoodUtile(6, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 19) {
					wallanm = new PatCat.FoodUtile(6, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
				if (i == 16) {
					wallanm = new PatCat.FoodUtile(6, true);
					wallanm.y = 532 - 96;
					wallanm.x = 580 * i + 100;
					this.foodanimal.addChild(wallanm);
				}
			}
			//碰撞(创建顶部的墙)
			for (var i = 1; i <= foodcontnum; i++) {
				var wally = 440 + 30 * (Math.floor(Math.random() * 2)) - 96;
				var wallynum = Number(3 + Math.floor(Math.random() * 3));
				var wallyrount = Number(150 + Math.floor(Math.random() * 55));
				var jackunm = Math.floor(Math.random() * 3 + 1);
				var jacktag = Math.floor(Math.random() * 2);//随机高度
				for (var n = 1; n <= wallynum; n++) {
					var foodwall: PatCat.FoodUtile;
					if (wallynum >= 3) {
						if (n == jackunm) {
							foodwall = new PatCat.FoodUtile(2, true);
							if (jacktag) {
								foodwall.y = wally - 120;
							} else {
								foodwall.y = wally;
							}
						} else {
							foodwall = new PatCat.FoodUtile(1, true);
							foodwall.y = wally;
						}
					} else {
						foodwall = new PatCat.FoodUtile(1, true);
						foodwall.y = wally;
					}
					//最后一个空一个方块&&设置方块的位置
					if (n == wallynum) {
						foodwall.x = n * 31 + (i - 1) * 580 + 31 + wallyrount;
					} else {
						foodwall.x = n * 31 + (i - 1) * 580 + wallyrount;
					}
					if (i == 1) {
						foodwall.x = n * 31 + (i - 1) * 580 + wallyrount;
					}
					this.foodcont.addChild(foodwall);
				}
			}
		}

		private _lastTime: number = 0;
		public foodanimal_cun;
		private animaltagenumn: number = 0;
		private animaltage: boolean = false;
		private animaltagep: boolean = true;
		private moneynum: number = 0;
		private mycatanimaltag: boolean = true;//检测是否可以添加碰撞与小动物
		/**逐帧运动*/
		private enterFrameHandler(event: egret.Event): void {
			//为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快。
			var nowTime: number = egret.getTimer();
			var fps: number = 1000 / (nowTime - this._lastTime);
			this._lastTime = nowTime;
			var speedOffset: number = 300 / fps;
			this.money.text = myDate.score.toString();
			this.life.text = myDate.lifenum.toString();
			this.timertext.text = (myDate.timer / 10).toString();
			//this.ceshi.text = this.catmovex.toString();
			//检测碰撞
			if (this.catman.x <= 0) {
				this.catman.x = 0
			}
			for (var k = this.foodcont.numChildren - 1; k >= 0; k--) {
				var kfood = <PatCat.FoodUtile>this.foodcont.getChildAt(k);
				var rect = new egret.Rectangle(kfood.x, kfood.y, kfood.width, kfood.height);
				var check_cat1 = new egret.Rectangle(this.catman.x - 25, this.catman.y - 1, this.catman.width - 10, 2);//碰撞的顶部
				var check_cat2 = new egret.Rectangle(this.catman.x - 15, this.catman.y + this.catman.height, this.catman.width - 30, 1);//碰撞底部
				var check_cat3 = new egret.Rectangle(this.catman.x + 30, this.catman.y - 10, 2, this.catman.height - 20)//左边碰撞
				var check_cat4 = new egret.Rectangle(this.catman.x - 30, this.catman.y - 10, 2, this.catman.height - 20)//右边碰撞
				var check_cat6 = new egret.Rectangle(this.catman.x - 30, this.catman.y, this.catman.width, this.catman.height);// 
				//下落检查顶部
				if (this.catupchecktage == false) {
					if (rect.intersects(check_cat2)) {
						this.catman.y = kfood.y - 65;
						this.catupnum = 0;
						if (kfood.FoodType == 3) {
							if (kfood.Foodtag) {
								var fukaa = PatCat.createBitmapByName("ele-flower_png");
								var fukcc = PatCat.createBitmapByName("gold_1_png");
								var fukaathis = this;
								fukaa.x = kfood.x + (kfood.width - 35) / 2;
								fukaa.y = kfood.y - 65;
								fukaa.width = 35;
								fukaa.height = 62;
								fukcc.width = 30;
								fukcc.height = 30;
								fukcc.x = kfood.x + (kfood.width - 30) / 2;
								fukcc.y = kfood.y - 62 - 40;
								this.cathouse.addChild(fukcc);
								egret.Tween.get(fukcc).to({ texture: RES.getRes("gold_2_png") }).wait(100).to({ texture: RES.getRes("gold_3_png") }).wait(100).to({ texture: RES.getRes("gold_4_png") }).wait(100)
									.to({ texture: RES.getRes("gold_5_png") }).wait(100).to({ texture: RES.getRes("gold_6_png") }).wait(100).call(function () {
										this.cathouse.removeChild(fukcc);
									}, this)
								this.catflows.addChild(fukaa);
								myDate.score++;
								kfood.Foodtag = false;
								return;
							}
						}
					}
				}

				//右碰撞
				if (rect.intersects(check_cat3)) {
					//kfood.Foodtag = false;
					this.catmovex = false;
					this.catmovex2 = true;
					this.catmovehnum = kfood.y;
					this.catmovehnumb = kfood.y + kfood.height;
					if (kfood.FoodType == 4) {
						myDate.sucesstag = true;
						this.Gameover();
					}
					if (kfood.FoodType == 2) {
						this.catmovex = true;
						this.catmovex2 = true;

					}
				}
				//左边碰撞
				if (rect.intersects(check_cat4)) {
					this.catmovex = true;
					this.catmovex2 = false;
					this.catmovehnum = kfood.y;
					this.catmovehnumb = kfood.y + kfood.height;//食物自身加高度
					if (kfood.FoodType == 4) {
						myDate.sucesstag = true;
						this.Gameover();
					}
					if (kfood.FoodType == 2) {
						this.catmovex = true;
						this.catmovex2 = true;

					}
				}

				//顶部碰撞检测
				if (rect.intersects(check_cat1)) {
					this.catupchecktage = false;
					this.catmovex = true;
					if (kfood.FoodType == 2) {
						//alert('金币');
						this.foodcont.removeChild(kfood);
						var fukbb = PatCat.createBitmapByName("gold_1_png");
						//var fukff = PatCat.createBitmapByName("food_png");
						var fukddthis = this;
						fukbb.x = kfood.x;
						fukbb.y = kfood.y - 42;
						fukbb.width = 30;
						fukbb.height = 30;
						/*fukff.x = this.catman.x + 40;
						fukff.y = this.catman.y - 45;
						this.cathouse.addChild(fukff);
						setTimeout(function () {
							fukddthis.cathouse.removeChild(fukff);
						}, 100)*/
						this.cathouse.addChild(fukbb);
						myDate.score++;
						egret.Tween.get(fukbb).to({ texture: RES.getRes("gold_2_png") }).wait(100).to({ texture: RES.getRes("gold_3_png") }).wait(100).to({ texture: RES.getRes("gold_4_png") }).wait(100)
							.to({ texture: RES.getRes("gold_5_png") }).wait(100).to({ texture: RES.getRes("gold_6_png") }).wait(100).call(function () {
								this.cathouse.removeChild(fukbb);
							}, this)
					}
				}
				//小动物检测
				for (var g = 0; g <= this.foodanimal.numChildren - 1; g++) {
					var gfood = <PatCat.FoodUtile>this.foodanimal.getChildAt(g);
					var grect = new egret.Rectangle(gfood.x, gfood.y, gfood.width, gfood.height);
					if (this.mycatanimaltag) {
						if (grect.intersects(check_cat6)) {
							//egret.log("小动物碰撞检测");
							myDate.lifenum--;
							var nethis = this;
							setTimeout(function () {
								nethis.catman.alpha = 0.5;
								setTimeout(function () {
									nethis.catman.alpha = 1;
									setTimeout(function () {
										nethis.catman.alpha = 0.5;
										setTimeout(function () {
											nethis.catman.alpha = 1;
										}, 100)
									}, 100)
								}, 100)
							}, 10)
							//egret.Tween.get(this.catman).to({ alpha: 0.5 },100).wait(100).to({alpha:1},100).wait(100);
							this.mycatanimaltag = false
							setTimeout(function () {
								nethis.mycatanimaltag = true;
							}, 1000)
						}
					}
					if (this.animaltagep) {
						if (rect.intersects(grect)) {
							this.animaltagep = false;
							this.animaltage = true;
						}
					}
					//判断小动物移动边界
					if (this.animaltage) {
						gfood.x += 0.04;
						this.animaltagenumn += 0.04;
						if (this.animaltagenumn >= 5200) {
							this.animaltagep = true;
							this.animaltagenumn = 0;
							this.animaltage = false;;
						}
					} else {
						gfood.x -= 0.04;
					}
				}
				//判断小动物移动边界结束
			}
			//人物移动判断写法

			//向上跳跃动作
			if (this.catuptage) {
				if (this.catupchecktage) {
					this.catman.y -= speedOffset;
					this.catupnum += speedOffset;
					if (this.catupnum >= 120) {
						this.catupchecktage = false;
					}
					if (this.catman.y + 60 < this.catmovehnum) {
						this.catmovex = true;
						this.catmovex2 = true;
					}
					//if()
				} else {
					this.catman.y += speedOffset;
					//if()
					if (this.catman.y >= (515 - 96)) {
						this.catupnum = 0;
						this.catman.y = (515 - 96);
						this.catuptage = false;
						this.catmovex = true;
						this.catmovex2 = true;
						//this.catupchecktage = true;
						/*if (this.catman.y > this.catmovehnumb) {
							this.catmovex = true;
							this.catmovex2 = true;
							//alert("pk")
						}*/
						if (this.catrighttage || this.catlefttage) {
							egret.Tween.get(this.catman, { loop: true }).to({ source: "run-right1_png" }).wait(100).to({ source: "run-right2_png" }).wait(100)
								.to({ source: "run-right3_png" }).wait(100).to({ source: "run-right4_png" }).wait(100).to({ source: "run-right5_png" }).wait(100)
								.to({ source: "run-right6_png" }).wait(100);
						} else {
							this.catman.source = 'stand_png';
						}
					}
				}
			}
			//向右
			if (this.catrighttage) {
				if (this.catman.x >= 500) {
					if (this.catmovex) {
						this.storybg.x -= speedOffset;
						this.flowway.x -= speedOffset;
						this.foodcont.x -= speedOffset;
						this.foodanimal.x -= speedOffset;
						this.cathouse.x -= speedOffset;
						this.catflows.x -= speedOffset;
						this.catman.x += speedOffset;
						if (this.storybg.x <= -(this.storybg.width - 1040)) {
							this.storybg.x = -(this.storybg.width - 1040);
							this.flowway.x = -(this.flowway.width - 1040);
							this.foodcont.x = -(this.foodcont.width - 1040);
							this.foodanimal.x = -(this.foodanimal.width - 1040);
							this.cathouse.x = -(this.cathouse.width - 1040);
							this.catflows.x = -(this.cathouse.width - 1040);
						}
					}
				} else {
					if (this.catmovex) {
						this.catman.x += speedOffset;
					}
				}
			}
			//向左
			if (this.catlefttage) {
				if (this.catman.x >= 500) {
					if (this.catmovex2) {
						this.storybg.x += speedOffset;
						this.flowway.x += speedOffset;
						this.foodcont.x += speedOffset;
						this.foodanimal.x += speedOffset;
						this.cathouse.x += speedOffset;
						this.catflows.x += speedOffset;
						this.catman.x -= speedOffset;
						if (this.storybg.x > 0) {
							this.storybg.x = 0;
							this.flowway.x = 0;
							this.foodcont.x = 0;
							this.foodanimal.x = 0;
							this.cathouse.x = 0;
							this.catflows.x = 0;
						}
					}
				} else {
					if (this.catmovex2) {
						this.catman.x -= speedOffset;
					}
				}
			}
			//游戏结束调用
			if (myDate.lifenum <= 0) {
				this.Gameover();
			}
		}
		private catmovehnumb: number = 0;
		private catmovehnum: number = 0;
		private catupchecktage: boolean = true;
		private catupseep: number = 6;
		private catupnum: number = 0;
		private catmovex: boolean = false;
		private catmovex2: boolean = false;
		private catuptage: boolean = false;
		private catlefttage: boolean = false;
		private catrighttage: boolean = false;
		/**开始游戏*/
		public start(): void {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
			//创建阶梯计时器
			this.creatTimer = new egret.Timer(100, 0);
			this.creatTimer.addEventListener(egret.TimerEvent.TIMER, this.creatbrid, this);
			this.creatTimer.start();
		}
		/**游戏结束*/
		public Gameover(): void {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
			this.creatTimer.stop();
			//for()
			/*for (var k = this.foodcont.numChildren - 1; k >= 0; k--) {
				this.foodcont.removeChild(<PatCat.FoodUtile>this.foodcont.getChildAt(k));
			}
			for (var j = this.flowway.numChildren - 1; j >= 0; j--) {
				this.flowway.removeChild(<PatCat.FoodUtile>this.flowway.getChildAt(j));
			}
			for (var i = this.catflows.numChildren - 1; i >= 0; i--) {
				this.catflows.removeChild(<PatCat.FoodUtile>this.catflows.getChildAt(i));
			}
			for (var m = this.foodanimal.numChildren - 1; m >= 0; m--) {
				this.foodanimal.removeChild(<PatCat.FoodUtile>this.foodanimal.getChildAt(m));
			}
			for (var n = this.storybg.numChildren - 1; n >= 0; n--) {
				this.storybg.removeChild(<PatCat.FoodUtile>this.storybg.getChildAt(n));
		}*/
			var mygameover = new PatCat.GamOver();
			this.addChild(mygameover);
			//this.parent.addChild(mygameover);
			//for()
		}

		public catleftf(e: egret.TouchEvent) {
			this.catman.scaleX = -1;
			this.catmovex = true;
			this.catmovex2 = true;
			this.catrighttage = false;
			this.catlefttage = true;
			egret.Tween.get(this.catman, { loop: true })
				.to({ source: "run-right1_png" }).wait(100)
				.to({ source: "run-right2_png" }).wait(100)
				.to({ source: "run-right3_png" }).wait(100)
				.to({ source: "run-right4_png" }).wait(100)
				.to({ source: "run-right5_png" }).wait(100)
				.to({ source: "run-right6_png" }).wait(100);
		}
		public catupf() {
			this.catuptage = true;
			this.catupchecktage = true;
			egret.Tween.pauseTweens(this.catman);
			this.catman.source = 'jump_png';
		}
		public catrightf(e: egret.TouchEvent) {
			this.catrighttage = true;
			this.catmovex = true;
			this.catmovex2 = true;
			this.catlefttage = false;
			this.catman.scaleX = 1;
			egret.Tween.get(this.catman, { loop: true })
				.to({ source: "run-right1_png" }).wait(100)
				.to({ source: "run-right2_png" }).wait(100)
				.to({ source: "run-right3_png" }).wait(100)
				.to({ source: "run-right4_png" }).wait(100)
				.to({ source: "run-right5_png" }).wait(100)
				.to({ source: "run-right6_png" }).wait(100);
		}
		public catendtge() {
			egret.Tween.pauseTweens(this.catman);
			this.catman.source = 'stand_png';
			this.catmovex = false;
			this.catmovex2 = false;
			this.catrighttage = false;
			this.catlefttage = false;
		}
		private creatbrid() {
			myDate.timer++;
		}

	}
}