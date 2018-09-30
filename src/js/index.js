import {Resources} from "./Resources";
import {RENDER_LAYER, Renderer} from "./Renderer";
import {IVisual} from "./Base";
import {Simulation} from "./Simulation";


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

        const simulation = Simulation(renderer)

        let time = Date.now()
        const gameLoop = () => {
            const now = Date.now()
            let dt = (now - time) / 1000
            time = now

            simulation.update(dt)
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