export class Anim {
    img: HTMLImageElement;
    tickNumber: number = 0;
    currFrame: number = 0;
    destId: string;
    frames: { x0: number, y0: number, w: number, h: number }[];
    times: number[];
    repeat: boolean;

    constructor(img: HTMLImageElement, jsonData: any, destId: string) {
        this.img = img;
        this.destId = destId;
        this.frames = jsonData.frames;
        this.times = jsonData.times;
        this.repeat = jsonData.repeat;
    }

    renderFrame(i: number) {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = 96;
        canvas.height = 72;
        let ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.drawImage(this.img, this.frames[i].x0, this.frames[i].y0, this.frames[i].w, this.frames[i].h, 0, 0, this.frames[i].w, this.frames[i].h);
            let url = canvas.toDataURL();
            let dest = document.getElementById(this.destId);
            if (dest) {
                dest.style.backgroundImage = "url('" + url + "')";
            }
        }
    }

    goAnim() {
        this.renderFrame(this.currFrame);
        this.tickNumber++;
        if (this.tickNumber === this.times[this.currFrame]) {
            this.tickNumber = 0;
            this.currFrame++;
        }
        if (this.repeat && this.currFrame === this.frames.length) {
            this.currFrame = 0;
        }
    }
}
