import Phaser from 'phaser';

export default class {

  constructor({ game, tilemap, tileset }) {
    //  The 'mario' key here is the Loader key given in game.load.tilemap
    this.map = game.add.tilemap(tilemap);


    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    this.map.addTilesetImage('f8614', tileset);

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    this.layersBackground = [];
    this.layerToCollide = null;
    const self = this;


    this.map.layers.forEach((layer) => {
      //const layerSelected = self.map.createLayer(layer.name);
      //(layer.name.indexOf('Collision') > -1) ? self.layerToCollide = layerSelected : self.layersBackground.push(layerSelected);
      if(layer.name.indexOf('Collision') > -1) {
        const layerSelected = self.map.createLayer(layer.name);
        self.layerToCollide = layerSelected;
        this.layersBackground.push(layerSelected)
      }

    });

    //  This isn't totally accurate, but it'll do for now
    this.map.setCollisionBetween(1, 10000, true, self.layerToCollide);

    //  This resizes the game world to match the layer dimensions
    this.layersBackground[0].resizeWorld();
  }
}
