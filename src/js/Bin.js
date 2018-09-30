import {IText, IVisual} from "./Base";
import {BIN_TYPES} from "./Simulation";
import {RENDER_LAYER} from "./Renderer";

export const Bin = (type, x, y) => {

    const typeTint = {
        [BIN_TYPES.compost]: '0x00000',
        [BIN_TYPES.glass]: '0x33CC33',
        [BIN_TYPES.paper]: '0x3333CC'
    }

    const typeLabel = {
        [BIN_TYPES.compost]: 'compost',
        [BIN_TYPES.glass]: 'glass',
        [BIN_TYPES.paper]: 'paper'
    }

    const self = IVisual('bin')
        .setAnchor(0.5, 0)
        .setTint(typeTint[type])
        .setPosition(x, y)
        .setLayer(RENDER_LAYER.GAME)
        .setName(typeLabel[type])
    self.visual.interactive = true

    const label = IText(typeLabel[type], {
        fontFamily: 'Crimson Text',
        fontSize: 36, fill: '#EFEFCF'})
        .setAnchor(0.5, 0.5)
        .setPosition(0, 30)
    self.visual.addChild(label.visual)

    return self
}