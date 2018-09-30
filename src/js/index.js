import {Resources} from "./Resources";


window.onload = () => {

    const resources = window.resources = Resources()

    const startGame = () => {

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
                    families: ['Crimson Text']
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