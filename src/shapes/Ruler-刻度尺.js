let spacing = 30;     // 每个刻度之间的间距
const minSpacing = 10;     // 每个刻度之间的间距
const rulerHeight = 20; // 标尺高度
const tickHeight = 5;  // 刻度高度
const tickWidth = 5;    // 刻度宽度
const fontSize = 12;    // 字体大小
const rulerColor = '#eee';
const rulerHeaderWidth = 20;
const rulerHeadeHeight = 20;
import {Object2D} from './Object2D.js'
export class Ruler extends Object2D{
    constructor(options) {
        super(options)
    }
    _render(ctx) {
        // 1.绘制
        // 1.1 绘制水平刻度

        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        console.log(width, rulerHeadeHeight);
        ctx.fillStyle = rulerColor;
        ctx.fillRect(0, 0, width, rulerHeadeHeight);
        ctx.fillRect(0, 0, rulerHeaderWidth, height);
        this.drawHorizontalRulerText(ctx);
        this.drawVerticalRulerText(ctx);
        ctx.translate(rulerHeaderWidth,rulerHeadeHeight)
        this.drawHorizontalRuler(ctx);
        this.drawVerticalRuler(ctx);
    }
    drawHorizontalRulerText(ctx) {
        let width = ctx.canvas.width;
        for (let i = 0; i < width; i+= spacing) {
            if (spacing < 30) {
                if ((i % (spacing*3)) === 0) {
                    ctx.font = `${fontSize}px`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#000';
                    ctx.fillText(i, i+rulerHeadeHeight, rulerHeadeHeight/2);
                }
            } else {
                ctx.font = `${fontSize}px`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#000';
                ctx.fillText(i, i+rulerHeadeHeight, rulerHeadeHeight/2);
            }

        }
    }
    drawHorizontalRuler(ctx) {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        for (let i = 0; i < width; i+= spacing) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(i,0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
    }
    drawVerticalRulerText(ctx) {
        let height = ctx.canvas.height;
        for (let i = 0; i < height; i+= spacing) {
            if(i === 0){
                continue;
            }
            if (spacing < 30) {
                if ((i % (spacing*3)) === 0) {
                    ctx.save();
                    ctx.font = `${fontSize}px`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.translate(rulerHeadeHeight/2, i+rulerHeadeHeight);//canvas起点先平移到之前canvas y方向的字的位置
                    ctx.rotate(-Math.PI / 2);//canvas在旋转90度
                    ctx.fillText(i, 0, 0);//文字的位置就是当前canvas位置的起点
                    ctx.restore();
                }
            } else {
                ctx.save();
                ctx.font = `${fontSize}px`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.translate(rulerHeadeHeight/2, i+rulerHeadeHeight);//canvas起点先平移到之前canvas y方向的字的位置
                ctx.rotate(-Math.PI / 2);//canvas在旋转90度
                ctx.fillText(i, 0, 0);//文字的位置就是当前canvas位置的起点
                ctx.restore();
            }
           
        }
    }
    drawVerticalRuler(ctx) {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        for (let i = 0; i < height; i+= spacing) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.font = `${fontSize}px`;
            ctx.textBaseline = 'middle';
            ctx.moveTo(0,i); //普通刻度
            ctx.lineTo(width,i);
            ctx.stroke();
        }
    }
    redraw(scale, ctx) {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        spacing = Math.max(minSpacing, Math.ceil(scale * spacing))
        console.log(spacing, 'spacing');
        
        ctx.clearRect(0, 0, width, height);
        ctx.translate(0,0)
        ctx.save();
        this._render(ctx);
        ctx.restore();
    }

    

}