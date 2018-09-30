import {ArrayUtil} from "./util/ArrayUtil";
import {RENDER_LAYER} from "./Renderer";
import {MathUtil} from "./util/MathUtil";
import {IVisual} from "./Base";
import {Bin} from "./Bin";
import {Draggable} from "./Draggable";
import {ScorePanel} from "./ScorePanel";

export const GARBAGE_TYPES = {
    BANANA_PEEL: 'banana_peel',
    BOTTLE: 'bottle',
    PAPER: 'paper'
}

export const BIN_TYPES = {
    compost: 'compost',
    glass: 'glass',
    paper: 'paper'
}

export const GARBAGE_TO_BIN = {
    [GARBAGE_TYPES.BANANA_PEEL]: [BIN_TYPES.compost],
    [GARBAGE_TYPES.BOTTLE]: [BIN_TYPES.glass],
    [GARBAGE_TYPES.PAPER]: [BIN_TYPES.paper]
}

export const Simulation = renderer => {

    let params = {
        spawnSpeed: 3,
        garbageSpeed: 200,
        speedVariance: 50
    }

    let state = {
        timeScale: 1,
        lost: false,
        dontUpdate: false,
        canMiss: 3,
        canConfuse: 3,
        score: 0
    }

    const scorePanel = ScorePanel().setPosition(0, 0)
    renderer.addObject(scorePanel)

    const invalidateState = () => {
        if (state.canMiss <= 0) {
            state.lost = true
        }

        if (state.canConfuse <= 0) {
            state.lost = true
        }

        scorePanel.update(state)
    }
    console.log(scorePanel)
    scorePanel.update(state)

    // initialize spawn queue
    let timeSinceLastSpawn = Number.MAX_VALUE
    let spawnQueueIdx = 0
    let spawnQueue = []
    Object.keys(GARBAGE_TYPES).forEach(key => {
        for (let i = 0; i < 10; i++) {
            spawnQueue.push(GARBAGE_TYPES[key])
        }
    })
    spawnQueue = ArrayUtil.shuffle(spawnQueue)

    // initialize garbage array
    let garbage = []
    let bins = [
        new Bin(BIN_TYPES.compost, 100, 700),
        new Bin(BIN_TYPES.paper, 300, 700),
        new Bin(BIN_TYPES.glass, 500, 700)
    ]
    bins.forEach(b => {
        renderer.addObject(b)
        new Draggable(b.visual, renderer)
    })

    const grayFilter = new PIXI.filters.ColorMatrixFilter()
    renderer.stage.filters = [grayFilter]
    grayFilter.desaturate()
    grayFilter.alpha = 0

    const self = {
        update: dt => {
            if (state.dontUpdate) return

            if (state.lost) {
                state.timeScale = MathUtil.lerp(state.timeScale, 0.00, 0.05)
                grayFilter.alpha = 1 - state.timeScale

                if (state.timeScale < 0.01) {
                    console.log('am i here?')
                    state.dontUpdate = true

                    window.alert('you lost')
                    window.location.href = window.location.origin
                }
            }
            dt *= state.timeScale

            //
            // spawning garbage
            if (timeSinceLastSpawn > params.spawnSpeed) {
                timeSinceLastSpawn = 0
                spawnQueueIdx += 1
                if (spawnQueueIdx > spawnQueue.length-1) spawnQueueIdx = 0

                // console.log(`spawning ${spawnQueue[spawnQueueIdx]} from index ${spawnQueueIdx}`)
                const gbg = IVisual(spawnQueue[spawnQueueIdx])
                    .setLayer(RENDER_LAYER.GAME)
                    .setAnchor(0.5, 0.5)
                    .setPosition(MathUtil.randomRange(100, renderer.size.x-100), -100)
                    .setSize(100, 100)
                    .setName(spawnQueue[spawnQueueIdx])
                gbg.speed = params.garbageSpeed + MathUtil.randomRange(-params.speedVariance, params.speedVariance)
                garbage.push(gbg)
                renderer.addObject(gbg)
                return
            }
            timeSinceLastSpawn += dt

            //
            // handling garbage behaviour
            const toRemoveArray = []
            garbage.forEach(g => {
                //
                // flying down
                g.visual.y += g.speed * dt

                //
                // handling missed garbage
                if (g.visual.y > renderer.size.y + 100) {
                    window.resources.playSfx('sfx_missed', 0.1)
                    state.canMiss -= 1
                    invalidateState()
                    toRemoveArray.push(g)
                }

                //
                // handling bin catch
                bins.forEach(b => {
                    const binCatchArea = new PIXI.Rectangle(
                        b.visual.x - b.visual.width/2 + 20,
                        b.visual.y,
                        b.visual.width - 40,
                        40
                    )

                    if (binCatchArea.contains(
                        g.visual.x,
                        g.visual.y
                    )) {
                        if (GARBAGE_TO_BIN[g.name].indexOf(b.name) > -1) {
                            window.resources.playSfx('sfx_correct_bin', 0.1)
                            state.score += 1
                        } else {
                            window.resources.playSfx('sfx_wrong_bin', 0.1)
                            state.canConfuse -= 1
                        }
                        toRemoveArray.push(g)
                        invalidateState()
                    }
                })
            })

            //
            // handling any removed garbage
            toRemoveArray.forEach(toRemove => {
                renderer.removeObject(toRemove)
                garbage.splice(garbage.indexOf(toRemove), 1)
            })
        }
    }

    return self
}