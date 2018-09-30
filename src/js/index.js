import {Resources} from "./Resources";
import {RENDER_LAYER, Renderer} from "./Renderer";
import {IText, IVisual} from "./Base";


window.onload = () => {

    PIXI.settings.MIPMAP_TEXTURES = false
    const resources = window.resources = Resources()

    const startGame = () => {

        const renderer = Renderer()

        renderer.addObject(
            IVisual('background')
                .setLayer(RENDER_LAYER.BACKGROUND)
                .setAnchor(0.5, 0.5)
                .setPosition(renderer.size.x/2, renderer.size.y/2)
        )

        renderer.addObject(
            IVisual('banana_peel').setLayer(RENDER_LAYER.GAME)
        )

        renderer.addObject(
            IText('Hello', {fontFamily: 'Crimson Text', fontSize: 90, fill: '#CFCFFF'}).setLayer(RENDER_LAYER.UI)
        )

        renderer.addObject(
            IText('Ubuntu! 0123456789', {fontFamily: 'Ubuntu Mono', fontSize: 90, fill: '#CFCFFF'})
                .setLayer(RENDER_LAYER.UI).setPosition(300, 10)
        )

        // resources.playSfx('sfx_wrong_bin')

        let time = Date.now()
        const gameLoop = () => {
            const now = Date.now()
            let dt = (now - time) / 1000
            time = now

            renderer.update()

            requestAnimationFrame(gameLoop)
        }
        gameLoop()
    }

    resources.add('digest', 'assets/digest.json').load().then(() => {
        console.log('digest loaded')

        const digest = resources.getJSON('digest')
        digest.graphics.forEach(g => resources.add(g.alias, g.path))
        digest.sfx.forEach(s => resources.add(s.alias, s.path))

        resources.load().then(() => {
            console.log('Resources loaded')

            WebFont.load({
                google: {
                    families: ['Crimson Text', 'Ubuntu Mono']
                },
                loading: () => console.log('font started loading'),
                inactive: () => {
                    console.log('failed to load webfont')
                    startGame()
                },
                active: () => {
                    console.log('font loading was a success')
                    startGame()
                }
            })
            // console.log(resources.raw)
        })
    })
}