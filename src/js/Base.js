
export const IVisual = texture => {
    let layer = null

    const s = new PIXI.Sprite(window.resources.getTexture(texture))
    const self = {
        setName: v => {s.name = v; return self},
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