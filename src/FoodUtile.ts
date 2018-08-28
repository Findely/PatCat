module PatCat {
	export class FoodUtile extends eui.Image {
		private foodtype: number;
		private tag: boolean;
		public constructor(type: number, tag: boolean) {
			super();
			this.FoodType = type;
			this.Foodtag = tag;
		}
		public get FoodType(): number {
			return this.foodtype;
		}
		public set FoodType(v: number) {
			this.foodtype = v;
			var str = "ele-wall" + <number>v + "_png";
			this.source = RES.getRes(str);
		}
		public get Foodtag(): boolean {
			return this.tag;
		}
		public set Foodtag(m: boolean) {
			this.tag = m;
		}
	}
    /**
     * 根据name关键字创建一个Bitmap对象。
     */
	export function createBitmapByName(name: string): egret.Bitmap {
		var result: egret.Bitmap = new egret.Bitmap();
		var texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}