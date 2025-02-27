let id = 0;
export class Canvas {
    canvasList = [];
    constructor(el, options) {
        ++id;
        this.el = el;
        this.setOptions(options);
        this.initLowerCanvas();
        this.initCanvasContainer();
        this.initUpperCanvas();
    }
    setOptions(options) {
        Object.assign(this, options);
    }
    initLowerCanvas() {
        if (typeof this.el === "string") {
            this.lowerCanvas = document.querySelector(this.el);
        } else {
            this.lowerCanvas = this.el;
        }
        console.log(this.lowerCanvas, 'this.lowerCanvas');
        
        this.lowerCanvas.classList.add("lower-canvas-"+id);
        this.setCanvasStyles(this.lowerCanvas);
        this.canvasList.push(this.lowerCanvas)
    }
    initCanvasContainer() {
        this.canvasContainer = document.createElement("div");
        this.canvasContainer.classList.add("canvas-container-" + id);
  
        this.lowerCanvas?.parentNode?.replaceChild(
            this.canvasContainer,
            this.lowerCanvas
        );//parentNode.replaceChild(newNode, oldNode); parentNode 父元素 (body) 替换body下的旧元素oldNode(this.lowerCanvas)  为新元素(this.canvasContainer)
        this.canvasContainer.appendChild(this.lowerCanvas);
        this.canvasContainer.style.position = "relative";
        this.canvasContainer.style.width = this.width + "px";
        this.canvasContainer.style.height = this.height + "px";
    }
    initUpperCanvas() {
        this.upperCanvas = document.createElement("canvas");
        this.upperCanvas.classList.add("upper-canvas-"+id);
        this.canvasList.push(this.upperCanvas)
        this.upperCanvas.width = this.width;
        this.upperCanvas.height = this.height;
        this.setCanvasStyles(this.upperCanvas);
        this.upperCanvas.style.setProperty('z-index', id)
        this.canvasContainer?.appendChild(this.upperCanvas);
    }
    setCanvasStyles(element, customCanvasStyle = {}) {
        let styles = {
            position: "absolute",
            top: "0px",
            left: "0px",
        };
        styles = Object.assign(styles, customCanvasStyle)
        Object.entries(styles).forEach(([property, value]) => {
            element.style.setProperty(property, value);
        });
        // 假设有一个对象 obj，其属性为 {a: 1, b: 2, c: 3}，使用 Object.entries(obj) 会返回一个数组 [['a', 1], ['b', 2], ['c', 3]]
        element.width = this.width;
        element.height = this.height;
    }
}