export const centerGameObjects = (objects) => {
  objects.forEach((object) => {
    object.anchor.setTo(0.5);
  });
};

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100;
  percentWidth /= 100;
  const mySprite = sprite;
  mySprite.width = parent.width / (100 / percent);
  mySprite.height = sprite.texture.height - (sprite.texture.height * percentWidth);
  mySprite.height /= 100;
};
