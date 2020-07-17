const fs = require('fs');

class Game {
  constructor(id, name, publisher, platform) {
    this.id = id;
    this.name = name;
    this.publisher = publisher;
    this.platform = platform;
  }
}

class Stim extends Game {
  constructor(id, name, publisher, platform = 'Stim') {
    super(id, name, publisher, platform);
  }
}

class Original extends Game {
  constructor(id, name, publisher, platform = 'Original') {
    super(id, name, publisher, platform);
  }
}

class WubiPlay extends Game {
  constructor(id, name, publisher, platform = 'WubiPlay') {
    super(id, name, publisher, platform);
  }
}

class GameFactory {
  static createGame(id, name, publisher, platform) {
    if (platform === 'Stim') {
      return new Stim(id, name, publisher);
    }
    else if (platform === 'Original') {
      return new Original(id, name, publisher);
    }
    else if (platform === 'WubiPlay') {
      return new WubiPlay(id, name, publisher);
    }
  }
}

class Model {
  // Ingat ingat kembali bahwa kita menggunakan error-first argument
  // atau first-error callback
  static readData(callback) {
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null);
      }
      else {
        // Di sini tipe dari data adalah String -> Object Literal
        data = JSON.parse(data);

        // pakai map
        data = data.map((elem) => {
          return GameFactory.createGame(
            elem.id,
            elem.name,
            elem.publisher,
            elem.platform
          );
        });

        // kembalikan data via callback
        callback(null, data);
      }
    });
  }

  static addData(name, publisher, platform, callback) {
    // Kita bisa menggunakan method readData yang ada di class Model juga
    // untuk digunakan pada method addData
    this.readData((err, data) => {
      if (err) {
        callback(err, null);
      }
      else {
        let allGames = data;

        let idGame = allGames[allGames.length - 1].id + 1;

        let instanceGame = GameFactory.createGame(
          idGame, name, publisher, platform
        );

        let idxGame = allGames.findIndex((elem) => {
          return elem.name === name;
        });

        if (idxGame === -1) {
          allGames.push(instanceGame);

          fs.writeFile(
            './data.json',
            JSON.stringify(allGames, null, 2),
            (err) => {
              if(err) {
                callback(err, null);
              }
              else {
                callback(null, instanceGame);
              }
            }
          );
        }
        else {
          callback({errorData: instanceGame}, null);
        }
      }
    });
  }

  static delData(id, callback) {
    // Kita akan menggunakan kembali method readData yang ada di class Model
    // ini juga untuk digunakan pada delData
    this.readData((err, data) => {
      if(err) {
        callback(err, null);
      }
      else {
        let allGames = data;

        let idGame = Number(id);

        let idxGame = allGames.findIndex((elem) => {
          return elem.id === idGame;
        });

        if (idxGame === -1) {
          callback({errorData: id}, null);
        }
        else {
          allGames.splice(idxGame, 1);

          fs.writeFile(
            './data.json',
            JSON.stringify(allGames, null, 2),
            (err) => {
              if(err) {
                callback(err, null);
              }
              else {
                callback(null, allGames[idxGame]);
              }
            }
          )
        }
      }
    });
  } 
}

module.exports = {
  Game, Stim, Original, WubiPlay, GameFactory, Model
};