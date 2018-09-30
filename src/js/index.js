import {Resources} from "./Resources";


window.onload = () => {

    const resources = window.resources = Resources()

    resources.add('digest', 'assets/digest.json').load().then(() => {
        console.log('digest loaded')

        const digest = resources.getJSON('digest')
        digest.graphics.forEach(g => resources.add(g.alias, g.path))
        digest.sfx.forEach(s => resources.add(s.alias, s.path))

        resources.load().then(() => {
            console.log('Resources loaded')
            console.log(resources.raw)
        })
    })
}