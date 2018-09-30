
export const IPanelBackground = (width, height) => {
    let layer = null

    const s = new PIXI.Graphics(false)
    s.lineStyle(10, 0xb5b5b5, 0.95)
    s.beginFill(0x85746e, 0.98)
    s.drawRect(0, 0, width, height, 30)
    s.endFill()

    const self = {
        setLayer: v => { layer = v; return self },
        setPosition: (x, y) => { s.x = x; s.y = y; return self },
        add: (obj) => {
            s.addChild(obj.visual)
            return self
        },
        get layer() { return layer },
        get visual() { return s }
    }
    return self
}

export const IContainer = () => {
    let layer = null
    const c = new PIXI.Container()

    const self = {
        setPivot: (x, y) => { c.pivot.x = x; c.pivot.y = y; return self },
        setLayer: v => { layer = v; return self },
        setPosition: (x, y) => { c.x = x; c.y = y; return self },
        add: (obj) => {
            c.addChild(obj.visual)
            return self
        },
        get layer() { return layer },
        get visual() { return c }
    }

    return self
}

export const IVisual = texture => {
    let layer = null

    const s = new PIXI.Sprite(window.resources.getTexture(texture))
    const self = {
        setName: v => {self.name = v; return self},
        setSize: (x, y) => { s.width = x; s.height = y; return self },
        setAnchor: (x, y) => { s.anchor.x = x; s.anchor.y = y; return self },
        setPosition: (x, y) => { s.x = x; s.y = y; return self },
        setLayer: v => { layer = v; return self },
        setScale: (x, y) => { s.scale.x = x; s.scale.y = y; return self },
        setTint: v => { s.tint = v; return self },
        setAlpha: v => { s.alpha = v; return self },
        setTexture: v => { s.texture = window.resources.getTexture(v); return self; },
        get layer() { return layer },
        get visual() { return s }
    }
    return self
}

export const IButton = (visual, onClick) => {
    visual.visual.interactive = true
    visual.visual.on('click', onClick)
    visual.visual.on('tap', onClick)

    Object.assign(visual, {
        get interactive() { return visual.visual.interactive },
        set interactive(v) { visual.visual.interactive = v },
    })

    return visual
}

export const IText = (text, style) => {
    let layer = null

    const t = new PIXI.Text(text, new PIXI.TextStyle(style))
    const self = {
        setName: v => {t.name = v; return self},
        setAnchor: (x, y) => { t.anchor.x = x; t.anchor.y = y; return self },
        setPosition: (x, y) => { t.x = x; t.y = y; return self },
        setLayer: v => { layer = v; return self },
        setTint: v => { t.tint = v; return self },
        setAlpha: v => { t.alpha = v; return self },
        setText: v => { t.text = v; return self },
        get layer() { return layer },
        get visual() { return t }
    }
    return self
}

export const IEmitter = (dict) => {
    return {
        on: (e, callback) => {
            if (e in dict) {
                dict[e].push(callback)
            } else {
                dict[e] = [callback]
            }
        },
        clear: (e) => {
            if (e in dict) {
                delete dict[e]
            }
        },
        emit: (e, ...args) => {
            if (e in dict) {
                dict[e].forEach(cb => cb.apply(null, args))
            }
        }
    }
}