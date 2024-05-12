import { Anim } from './Anim';

// const canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
// const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

fetch("./data/data.json")
    .then((res) => res.json())
    .then((data: any) => {
        let imgsArray: Anim[] = [];

        const anim = function () {
            for (let i = 0; i < imgsArray.length; i++) {
                imgsArray[i].goAnim();
            }
            setTimeout(window.requestAnimationFrame, 1000 / 60, anim);
        }

        const img = new Image();
        img.src = "./img/spritesheet_ex.png";
        img.onload = () => {
            imgsArray.push(new Anim(img, data.blue, "blue"));
            imgsArray.push(new Anim(img, data.yellow, "yellow"));
            anim();
        }
        // document.body.appendChild(img);
    });

