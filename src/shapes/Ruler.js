let gridSize = 30;     // 一个方格的长度
const minGridSize = 1;     // 每个刻度之间的间距
const fontSize = 12;    // 字体大小
const rulerColor = '#eee';
const rulerHeaderWidth = 20;
const rulerHeadeHeight = 20;
import {Object2D} from './Object2D.js'
// 一个刻度表示一个grid  grid 可以是30*30像素，也可以是1*1像素，也可以是100*100像素
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
        let drawX = 0;
        for (let i = 0; i < width; i++) {
            if (gridSize <= 20) {
                if ((i % 10 === 0)) {
                    this.drawHorizontalText(ctx, i, drawX);
                }
            } else {
                this.drawHorizontalText(ctx, i, drawX);
            }
            drawX += gridSize;
        }
    }
    drawHorizontalText(ctx, i, drawX) {
        ctx.font = `${fontSize}px`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        ctx.fillText(i, i+drawX+rulerHeadeHeight, rulerHeadeHeight/2);
        drawX += gridSize;
    }
    drawHorizontalRuler(ctx) {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        for (let i = 0; i < width; i+= gridSize) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(i,0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
    }
    drawVerticalRulerText(ctx) {
        let height = ctx.canvas.height;
        let drawY = 0;
        for (let i = 0; i < height; i++) {
            if(i === 0){
                drawY += gridSize;
                continue;
            }
            if (gridSize <= 20) {
                if ((i % 10 === 0)) {
                    this.drawVerticalText(ctx, i, drawY);
                }
            } else {
                this.drawVerticalText(ctx, i, drawY);
               
            }
            drawY += gridSize;
          
        
           
        }
    }
    drawVerticalText(ctx, i, drawY) {
        ctx.save();
        ctx.font = `${fontSize}px`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(rulerHeadeHeight/2, i+drawY+rulerHeadeHeight);//canvas起点先平移到之前canvas y方向的字的位置
        ctx.rotate(-Math.PI / 2);//canvas在旋转90度
        ctx.fillText(i, 0, 0);//文字的位置就是当前canvas位置的起点
        ctx.restore();
    }
    drawVerticalRuler(ctx) {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        for (let i = 0; i < height; i+= gridSize) {
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
        gridSize = Math.max(minGridSize, Math.ceil(scale * gridSize))
        console.log(scale, Math.ceil(scale * gridSize), gridSize, 'gridSize');
        
        ctx.clearRect(0, 0, width, height);
        ctx.translate(0,0)
        ctx.save();
        this._render(ctx);
        ctx.restore();
    }

    

}