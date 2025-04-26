const spacing = 10;     // 每个刻度之间的间距
const rulerHeight = 20; // 标尺高度
const tickHeight = 5;  // 刻度高度
const tickWidth = 5;    // 刻度宽度
const fontSize = 12;    // 字体大小
import {Object2D} from './Object2D.js'
export class Ruler extends Object2D{
    constructor(options) {
        super(options)
    }
    _render(ctx) {
        // 1.绘制
        // 1.1 绘制水平刻度
        this.drawHorizontalRuler(ctx);
        this.drawVerticalRuler(ctx);
    }
    drawHorizontalRuler(ctx) {
        let width = ctx.canvas.width;
        for (let i = 0; i < width; i+= spacing) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.font = `${fontSize}px`;
            ctx.textAlign = 'center';
            if ((i % (spacing*5)) === 0) { //长刻度 5个一个
                ctx.moveTo(i,0);
                ctx.lineTo(i, tickHeight*2);
                if (i !== 0) {
                    ctx.fillText(i, i, tickHeight*2+ fontSize);
                }
                
            } else {
                ctx.moveTo(i,0); //普通刻度
                ctx.lineTo(i,tickHeight);
            }
            ctx.stroke();
        }
    }

    drawVerticalRuler(ctx) {
        let height = ctx.canvas.height;
        for (let i = 0; i < height; i+= spacing) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.font = `${fontSize}px`;
            // ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            if ((i % (spacing*5)) === 0) { //长刻度 5个一个
                ctx.moveTo(0,i);
                ctx.lineTo(tickWidth*2,i);
                if (i !== 0) {
                    ctx.fillText(i, tickWidth*2+ fontSize, i);
                }
            } else {
                ctx.moveTo(0,i); //普通刻度
                ctx.lineTo(tickWidth,i);
            }
            ctx.stroke();
        }
    }

    

}