import { getRandomId } from '../utils/getRandomId.js'
export class Object2D {
    constructor(options) {
        this.setOptions(options);
        this.id = getRandomId()
    }

    setOptions(options) {
        for (const key in options) {
            // For each key in options object...
            this[key] = options[key];
        }
    }

    render(ctx) {
        ctx.save();
        this._render(ctx);
        ctx.restore();
    }
    _render() {
        //子类会重载该方法
    }
}