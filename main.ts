namespace SpriteKind {
    export const qbloc = SpriteKind.create()
}
function GoombaSetup () {
    for (let value of tiles.getTilesByType(assets.tile`Goomba spawn tile`)) {
        Goomba = sprites.create(assets.image`Question block`, SpriteKind.Enemy)
        animation.runImageAnimation(
        Goomba,
        assets.animation`GoombaWalk`,
        500,
        true
        )
        Goomba.ay = 200
        tiles.placeOnTile(Goomba, value)
        tiles.setTileAt(value, assets.tile`myTile8`)
        if (Math.percentChance(50)) {
            Goomba.vx = randint(30, 60)
        } else {
            Goomba.vx = randint(-30, -60)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`DoorDown`, function (sprite, location) {
    game.setGameOverMessage(true, "You Won")
    game.gameOver(true)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Mario.vx = 255000
    pause(100)
    Mario.vx = 0
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Mario.isHittingTile(CollisionDirection.Bottom)) {
        Mario.vy = -150
    } else {
        if (Mario.x >= -40) {
            Mario.vy = -75
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.qbloc, function (sprite, otherSprite) {
    info.changeScoreBy(1)
})
function MarioSetup () {
    info.setLife(3)
    Mario = sprites.create(assets.image`mario_left`, SpriteKind.Player)
    controller.moveSprite(Mario, 100, 0)
    Mario.ay = 200
    scene.cameraFollowSprite(Mario)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.x > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        sprites.destroy(otherSprite, effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -60
        info.changeScoreBy(100)
    } else {
        info.changeLifeBy(-1)
        scene.cameraShake(8, 500)
        Mario.setFlag(SpriteFlag.GhostThroughSprites, true)
        pause(2000)
        Mario.setFlag(SpriteFlag.GhostThroughSprites, false)
    }
})
let Mario: Sprite = null
let Goomba: Sprite = null
tiles.setCurrentTilemap(tilemap`Level 1-1`)
MarioSetup()
GoombaSetup()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = randint(30, 60)
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = randint(-30, -60)
        }
    }
})
