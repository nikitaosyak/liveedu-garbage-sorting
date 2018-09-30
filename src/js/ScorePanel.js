import {IContainer, IText} from "./Base";
import {RENDER_LAYER} from "./Renderer";

export const ScorePanel = () => {

    const self = IContainer().setLayer(RENDER_LAYER.UI)
    self.update = state => {
            scoreCounter.setText(state.score * 10)
            confuseCounter.setText(state.canConfuse)
            missedCounter.setText(state.canMiss)
        }

    //
    // renderer.addObject(
    //     IText('Ubuntu! 0123456789', {fontFamily: 'Ubuntu Mono', fontSize: 90, fill: '#CFCFFF'})
    //         .setLayer(RENDER_LAYER.UI).setPosition(300, 10)
    // )

    const scoreLabel = IText('Score:', {fontFamily: 'Ubuntu Mono', fontSize: 60, fill: '#CFCFFF'})
        .setAnchor(0, 0.5).setPosition(0, 50)
    const scoreCounter = IText('0', {fontFamily: 'Ubuntu Mono', fontSize: 60, fill: '#CFCFFF'})
        .setAnchor(1, 0.5).setPosition(400, 50)

    const confuseLabel = IText('Can confuse:', {fontFamily: 'Ubuntu Mono', fontSize: 60, fill: '#CFCFFF'})
        .setAnchor(0, 0.5).setPosition(0, 100)
    const confuseCounter = IText('0', {fontFamily: 'Ubuntu Mono', fontSize: 60, fill: '#CFCFFF'})
        .setAnchor(1, 0.5).setPosition(400, 100)

    const missedLabel = IText('Can miss:', {fontFamily: 'Ubuntu Mono', fontSize: 60, fill: '#CFCFFF'})
        .setAnchor(0, 0.5).setPosition(0, 150)
    const missedCounter = IText('0', {fontFamily: 'Ubuntu Mono', fontSize: 60, fill: '#CFCFFF'})
        .setAnchor(1, 0.5).setPosition(400, 150)

    self.add(scoreLabel).add(scoreCounter).add(confuseLabel).add(confuseCounter).add(missedLabel).add(missedCounter)

    return self
}