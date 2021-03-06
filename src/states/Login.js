/* globals __DEV__ */
import Phaser from 'phaser'
import _PhaserInput from '@orange-games/phaser-input/build/phaser-input'

import { centerGameObjects } from '../utils'
import userService from '../services/userService'

const PhaserInput = _PhaserInput.PhaserInput
export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.game.load.image('drone', 'assets/images/drone_gwno_1.png')
    this.game.add.plugin(PhaserInput.Plugin)
  }

  create () {
    const title = 'Game of Drones'
    const presentation = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    this.titleBanner = this.add.text(this.world.centerX, 80, title, {
      font: '4em Russo One',
      fill: '#000000',
      smoothed: false
    })

    this.presentationBanner = this.add.text(this.world.centerX, 160, presentation, {
      align: 'center',
      wordWrap: true,
      font: '2em Russo One',
      fill: '#000000',
      wordWrapWidth: this.world.width - 100,
      smoothed: false
    })

    this.titleBanner.padding.set(10, 16)
    this.titleBanner.anchor.setTo(0.5)

    this.presentationBanner.padding.set(10, 16)
    this.presentationBanner.anchor.x = 0.5

    const leftDrone = this.game.add.sprite(this.world.width / 3, this.world.height / 3, 'drone')
    const rightDrone = this.game.add.sprite(this.world.width * 2 / 3, this.world.height / 3, 'drone')
    centerGameObjects([leftDrone, rightDrone])

    const loginInput = this.game.add.inputField(this.world.width / 2, this.world.height / 3, {
      font: '20px Russo One',
      fill: '#212121',
      fontWeight: 'bold',
      width: 150,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Login'
    })

    const passwordInput = this.game.add.inputField(this.world.width / 2, (this.world.height / 3) + 50, {
      font: '20px Russo One',
      fill: '#212121',
      fontWeight: 'bold',
      width: 150,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Password',
      type: 'password'
    })
    centerGameObjects([loginInput, passwordInput])

    const signinButton = this.game.add.button(this.world.width / 2, (this.world.height / 3) + 100, 'drone', signin, this, 2, 1, 0)
    const signupButton = this.game.add.button(this.world.width / 2, (this.world.height / 3) + 100, 'drone', signup, this, 2, 1, 0)
    centerGameObjects([signinButton, signupButton])

    function signin () {
      console.log(loginInput.value, passwordInput.value)
      userService.login(loginInput.value, passwordInput.value)
        .then(result => {
          console.log(result)
          this.game.state.start('Warehouse')
        })
        .catch(err => {
          console.log(err)
          console.log('fail')
          // TODO: show error for a while on screen
        })
    }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.cat, 32, 32)
    }
  }

  resize (width, height) {
    this.scaleSprite(this.titleBanner, width, height / 3, 50, 1)
    this.titleBanner.x = this.world.centerX
  }

  getSpriteScale (spriteWidth, spriteHeight, availableSpaceWidth, availableSpaceHeight, minPadding) {
    var ratio = 1
    var currentDevicePixelRatio = window.devicePixelRatio
    // Sprite needs to fit in either width or height
    var widthRatio = (spriteWidth * currentDevicePixelRatio + 2 * minPadding) / availableSpaceWidth
    var heightRatio = (spriteHeight * currentDevicePixelRatio + 2 * minPadding) / availableSpaceHeight
    if (widthRatio > 1 || heightRatio > 1) {
      ratio = 1 / Math.max(widthRatio, heightRatio)
    }
    return ratio * currentDevicePixelRatio
  }

  scaleSprite (sprite, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
    var scale = this.getSpriteScale(sprite._frame.width, sprite._frame.height, availableSpaceWidth, availableSpaceHeight, padding)
    sprite.scale.x = scale * scaleMultiplier
    sprite.scale.y = scale * scaleMultiplier
  }
}
