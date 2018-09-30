import {IButton, IEmitter, IPanelBackground, IText, IVisual} from "../Base";
import {RENDER_LAYER} from "../Renderer";

export const StartPanel = renderer => {

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

    const label = IText('Match garbage with proper bins!',
        {fontFamily: 'Ubuntu Mono', fontSize: 68, fill: '#CFCFFF',
            wordWrap: true, wordWrapWidth: width, align: 'center'})
        .setAnchor(0.5, 0.5).setPosition(304, 150)

    const ok = IButton(IVisual('button_ok_flat'), () => self.emit('ok'))
        .setAnchor(0.5, 0).setPosition(300, 350)

    self.add(label).add(ok)

    return self
}