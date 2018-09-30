
export const RENDER_LAYER = {
    BACKGROUND: 'BACKGROUND',
    GAME: 'GAME',
    UI: 'UI'
}

export const Renderer = () => {

    const vSize = {x: 1280, y: 856}
    let canvasW = 0, canvasH = 0

    const supposedAspectRatio = vSize.x / vSize.y
    let currentAspectRatio = supposedAspectRatio

    const stage = new PIXI.Container()

    const layers = {}
    Object.keys(RENDER_LAYER).forEach(layerKey => {
        layers[RENDER_LAYER[layerKey]] = new PIXI.Container()
        stage.addChild(layers[RENDER_LAYER[layerKey]])
    })

    const canvas = document.getElementById('gameCanvas')
    const renderer = PIXI.autoDetectRenderer({
        roundPixels: true,
        width: vSize.x,
        height: vSize.y,
        view: canvas,
        backgroundColor: 0x0,
        antialias: false,
        resolution: window.devicePixelRatio,
        forceFXAA: false,
        autoResize: true
    })

    const resizeCanvas = () => {
        canvasW = Math.max(window.innerWidth || 0, document.documentElement.clientWidth)
        canvasH = Math.max(window.innerHeight || 0, document.documentElement.clientHeight)

        currentAspectRatio = canvasW / canvasH
        renderer.resize(canvasW, canvasH)
        if (currentAspectRatio > supposedAspectRatio) {
            stage.scale.x = stage.scale.y = canvasH / vSize.y
            stage.x = (canvasW - (canvasH*supposedAspectRatio))/2
            stage.y = 0
        } else {
            stage.scale.x = stage.scale.y = canvasW / vSize.x
            stage.x = 0
            stage.y = (canvasH - (canvasW/supposedAspectRatio))/2
        }

    }
    resizeCanvas()

    const isGOCorrect = go => {
        const hasLayer = 'layer' in go
        const hasVisual = 'visual' in go
        if (!hasLayer) console.warn('no layer in game object', go)
        if (!hasVisual) console.warn('no visual in game object', go)
        return hasVisual && hasLayer
    }

    const self =  {
        get canvasW() { return canvasW },
        get canvasH() { return canvasH },
        get size() { return vSize },
        get stage() { return stage },
        // get layers() { return layers },
        addObject: (go) => {
            if (!isGOCorrect(go)) return
            layers[go.layer].addChild(go.visual)
        },
        removeObject: go => {
            if (!isGOCorrect(go)) return
            layers[go.layer].removeChild(go.visual)
        },
        update: () => {
            const newCanvasW = Math.max(window.innerWidth || 0, document.documentElement.clientWidth)
            const newCanvasH = Math.max(window.innerHeight || 0, document.documentElement.clientHeight)
            if (newCanvasW !== canvasW || newCanvasH !== canvasH) {
                resizeCanvas()
            }
            renderer.render(stage)
        }
    }

    return self
}