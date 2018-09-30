export const Resources = () => {

    const loader = PIXI.loader
    const res = loader.resources

    const self = {
        get raw() { return res },
        add: (alias, path) => { loader.add(alias, path); return self },
        load: () => {
            return new Promise(resolve => {
                loader.load(resolve)
            })
        },
        hasResource: alias => alias in res,

        getTexture: alias => {
            if (self.hasResource(alias)) return res[alias].texture
            console.warn(`texture ${alias} was replaced by default texture`)
            return PIXI.Texture.WHITE
        },

        getJSON: alias => {
            if (self.hasResource(alias)) return res[alias].data
            console.warn(`there is no JSON document by name ${alias}`)
        },

        playSfx: (alias, volume = 0.2) => {
            if (self.hasResource(alias)) {
                const sound = res[alias].sound
                sound.volume = volume
                sound.play()
            } else {
                console.warn(`there is not sfx by name ${alias}`)
            }
        }
    }

    return self
}