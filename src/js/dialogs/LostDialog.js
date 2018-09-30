import {IButton, IEmitter, IPanelBackground, IText, IVisual} from "../Base";
import {RENDER_LAYER} from "../Renderer";

export const LostDialog = (renderer, score) => {

    const width = 600, height = 400

    const self = IPanelBackground(width, height).setLayer(RENDER_LAYER.UI)
        .setPosition((renderer.size.x - width)/2, (renderer.size.y - height)/2)

    Object.assign(self, IEmitter({}))
    self.show = () => {
        renderer.addObject(self)
    }

    self.hide = () => {
        renderer.removeObject(self)
    }

    const label = IText('You are lost',
        {fontFamily: 'Ubuntu Mono', fontSize: 68, fill: '#CFCFFF',
            wordWrap: true, wordWrapWidth: width, align: 'center'})
        .setAnchor(0.5, 0.5).setPosition(304, 80)

    const scoreLabel = IText(`Your score: ${score}`,
        {fontFamily: 'Ubuntu Mono', fontSize: 50, fill: '#CFCFFF',
            wordWrap: true, wordWrapWidth: width, align: 'center'})
        .setAnchor(0.5, 0.5).setPosition(304, 240)

    const restart = IButton(IVisual('button_restart_flat'),
            () => window.location.href = window.location.origin
        )
        .setAnchor(0, 0).setPosition(100, 330)

    const share = IButton(IVisual('button_share'),
            () => window.open(`https://twitter.com/intent/tweet?text=I've scored ${score} while sorting garbage! Can you top my result? Challenge me at https://liveedu-garbage-sorting.firebaseapp.com/`, '_blank')
        )
        .setAnchor(1, 0).setPosition(width-100, 330)

    self.add(label).add(scoreLabel).add(restart).add(share)

    return self
}