

export const Draggable = (target, renderer) => {

    let dragging = false
    let resultPoint = new PIXI.Point()
    let dragStart = new PIXI.Point()
    let originalPos = new PIXI.Point()
    target.on('pointerdown', e => {
        dragging = true

        const parent = target.parent
        parent.removeChild(target)
        parent.addChild(target)


        e.data.getLocalPosition(renderer.stage, resultPoint)
        dragStart.x = resultPoint.x
        dragStart.y = resultPoint.y
        originalPos.x = target.x
        originalPos.y = target.y

        e.stopPropagation()
    })

    target.on('pointermove', e => {
        if (!dragging) return
        e.data.getLocalPosition(renderer.stage, resultPoint)
        const diffX = resultPoint.x - dragStart.x
        const diffY = resultPoint.y - dragStart.y
        target.x = originalPos.x + diffX
        target.y = originalPos.y + diffY
    })

    target.on('pointerup', e => {
        dragging = false
    })
}