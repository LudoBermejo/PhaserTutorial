import Phaser from 'phaser';
import EasyStar from 'easystarjs';

export default class extends Phaser.Sprite {

  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    // Game
    this.game = game;
    this.asset = asset;
  }

  prepare(layerToCollide) {
    // Variables
    this.searching = false;
    this.anchor.setTo(0.5);
    this.normalSpeed = 150;
    this.runningSpeed = 300;
    this.layerToCollide = layerToCollide;
    this.pathFindingNextX = undefined;
    this.pathFindingNextY = undefined;
    this.arrayPathfinding = [];

    // Animations
    if (this.asset) {
      this.animations.add('stop', [0], 12, true, true);
      this.animations.add('down', [0, 1, 2, 3], 12, true, true);
      this.animations.add('left', [4, 5, 6, 7], 12, true, true);
      this.animations.add('right', [8, 9, 10, 11], 12, true, true);
      this.animations.add('up', [12, 13, 14, 15], 12, true, true);
      this.animations.add('stop', [1], 12, true, true);
    }

    // Controls
    if (this.game.input) {
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.wasd = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      };

      this.shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    }

    // Enable if for physics. This creates a default rectangular body.
    if (this.game.physics) {
      this.game.physics.arcade.enable(this);
      this.game.physics.enable(this);
    }

    if (this.game.camera) {
      this.game.camera.follow(this);
    }

    //  Modify a few body properties
    if (this.body) {
//      this.body.setZeroDamping();
      this.body.setSize(20, 30, 0, 10);
      this.body.collideWorldBounds = true;
    }

    const gridEasyStar = Array(this.layerToCollide.map.width).fill().map(() => Array(this.layerToCollide.map.height));

    for (let y = 0; y <= gridEasyStar.length - 1; y++) {
      for (let x = 0; x <= gridEasyStar[y].length - 1; x++) {
        if (this.layerToCollide.map.getTile(x, y, this.layerToCollide.layer.name)) {
          gridEasyStar[y][x] = 1;
        } else {
          gridEasyStar[y][x] = 0;
        }
      }
    }

    this.easystar = new EasyStar.js();
    this.easystar.setIterationsPerCalculation(1000);
    this.easystar.setGrid(gridEasyStar);
    this.easystar.setAcceptableTiles([0]);
    this.easystar.enableDiagonals();
    this.easystar.enableCornerCutting();
    this.x = 0;
    this.y = 220;
    this.scale.setTo(0.8, 0.8);
  }

  getHeroCurrentTiles() {
    return {
      x: this.layerToCollide.getTileX(this.x),
      y: this.layerToCollide.getTileY(this.y),
    };
  }

  pathFindingNextMove(heroTiles) {
    return new Promise((resolve, reject) => {
      while (this.arrayPathfinding !== null && this.arrayPathfinding.length) {
        const currentPathPosition = this.arrayPathfinding[1];
        if (currentPathPosition && (currentPathPosition.x !== heroTiles.x || currentPathPosition.y !== heroTiles.y)) {
          resolve(
            {
              pathFindingNextX: currentPathPosition.x,
              pathFindingNextY: currentPathPosition.y,
            },
          );
          return;
        } else {
          this.arrayPathfinding.shift();
        }
      }
      reject();
    });
  }

  pathFindingCalculation() {
    const heroTiles = this.getHeroCurrentTiles();
    const mouseX = this.layerToCollide.getTileX(this.game.input.activePointer.worldX);
    const mouseY = this.layerToCollide.getTileY(this.game.input.activePointer.worldY);
    const self = this;
    this.easystar.findPath(
      heroTiles.x,
      heroTiles.y,
      mouseX,
      mouseY,
      (path) => {
        self.searching = false;
        self.arrayPathfinding = path;
      });

    this.easystar.calculate();
  }

  checkMouseClick() {
    if (this.layerToCollide && this.game.input.mousePointer.isDown) {
      if (this.searching) return false;
      this.searching = true;
    }
    if (this.searching && this.game.input.mousePointer.isUp) {
      this.pathFindingCalculation();
    }
    return this.searching;
  }

<<<<<<< HEAD
  moveUp(speed) {
    this.body.velocity.y -= speed;
    return 'up';
  }

  moveDown(speed) {
    this.body.velocity.y += speed;
    return 'down';
  }

  moveLeft(speed) {
    this.body.velocity.x -= speed;
    return 'left';
  }

  moveRight(speed) {
    this.body.velocity.x += speed;
    return 'right';
  }

  moveByKeyboard(speed) {
    let selectedAnimation = 'stop';
    if (this.cursors.up.isDown || this.wasd.up.isDown) {
        selectedAnimation = this.moveUp(speed);
    }
    if (this.cursors.down.isDown || this.wasd.down.isDown) {
        selectedAnimation = this.moveDown(speed);
    }
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
        selectedAnimation = this.moveLeft(speed);
    }
    if (this.cursors.right.isDown || this.wasd.right.isDown) {
        selectedAnimation = this.moveRight(speed);
    }
    return selectedAnimation;
  }

  moveByPathFinding(speed) {
    return new Promise((resolve) => {
      const heroTiles = this.getHeroCurrentTiles();
      this.pathFindingNextMove(heroTiles)
        .then((step) => {
          let selectedAnimation = 'stop';
          if (heroTiles.y > step.pathFindingNextY) {
            selectedAnimation = this.moveUp(speed);
          }
          if (heroTiles.y < step.pathFindingNextY) {
            selectedAnimation = this.moveDown(speed);
          }
          if (heroTiles.x > step.pathFindingNextX) {
            selectedAnimation = this.moveLeft(speed);
          }
          if (heroTiles.x < step.pathFindingNextX) {
            selectedAnimation = this.moveRight(speed);
          }
          resolve(selectedAnimation);
        })
        .catch(() => {
          resolve('stop');
        });
    });
  }

  pathFindingCompleted() {
    this.pathFindingNextX = undefined;
    this.pathFindingNextY = undefined;
  }

  update() {
    this.body.velocity.set(0);

    let speed = this.normalSpeed;
    if (this.shiftKey.isDown) {
      speed = this.runningSpeed;
    }

    let selectedAnimation = 'stop';
    // If I have not clicked mouse over the map, then we must move

    if (!this.checkMouseClick()) {
      // If I have a pathfinding lookup, then go for it

      if (this.arrayPathfinding && this.arrayPathfinding.length) {
        this.moveByPathFinding(speed)
          .then((selectedAnimation) => {
            this.animations.play(selectedAnimation, 12, true);
          });
      } else { // If not, you must move manually or not move at all
        // Do manual movement or stop
        if (this.layerToCollide) {
          this.game.physics.arcade.collide(this, this.layerToCollide);
        }

        selectedAnimation = this.moveByKeyboard(speed);
        this.animations.play(selectedAnimation, 12, true);
      }
    }
  }
}
