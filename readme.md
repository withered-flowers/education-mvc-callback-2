## Table of Content
1. [Interlude](#interlude)
1. [Apps Requirement](#apps-requirement)
    * [Langkah 1 - Buat Class](#langkah-1---buat-class)
    * [Langkah 2 - Read the File](#langkah-2---read-the-file)
    * [Langkah 3 - Adding Data to File](#langkah-3---adding-data-to-file)
    * [Langkah 4 - Remove Data from File](#langkah-4---remove-data-from-file)
1. [Let's Make the Code](#let's-make-the-code)
    * [Release 1 - Buat Class](#release-1---buat-class)
    * [Release 2 - Read the File](#release-2---read-the-file)
    * [Release 3 - Adding Data to File](#release-3---adding-data-to-file)
    * [Release 4 - Remove Data from File](#release-4---removing-data-from-file)

## Interlude
Pada pembelajaran kali ini, kita akan mencoba untuk memantapkan kembali
pengetahuan kita tentang MVC Callback pada NodeJS yah !

Disclaimer:  
Pembuatan nama dan cara pembuatan ini bukanlah sebuah cara yang `best practice`
namun hanya digunakan sebagai pembelajaran semata agar dapat lebih memahami
konsep MVC dengan Callback pada nodejs.

## Apps Requirement
Misalkan pada pembelajaran kali ini, kita akan membuat sebuah aplikasi untuk
melisting dan menambahkan koleksi `Games` yang dimiliki oleh seseorang berdasar
kan data yang dimiliki, yang dapat dilihat pada `games.json`.

Aplikasi ini dapat dikerjakan sesuai dengan langkah-langkah berikut

### Langkah 1 - Buat Class
Diketahui dari `games.json` ini, dapat dibuat sebuah class dengan nama `Game`
yang memiliki property sebagai berikut:
- `id`
- `name`
- `publisher`
- `platform`

karena `Game` ini memiliki platform-nya sendiri sendiri, kita juga ingin
mengklasifikasikan `Game` ini berdasarkan property `platform` nya,

Sehingga nantinya kita akan memiliki tiga buah class lainnya lagi, yaitu
- class `Stim`, apabila Game memiliki platform `Stim` 
- class `Original`, apabila Game memiliki platform `Original`
- class `WubiPlay`, apabila Game memiliki platofmr `WubiPlay`

### Langkah 2 - Read the File
Setelah berhasil merealisasikan kode di atas, maka selanjutnya, buatlah
fitur pada aplikasi sehingga bisa menerima perintah `list` untuk membaca
data `games.json` yang sudah diberikan, dan tampilkan seluruh isi dari
data tersebut.

Perintah yang akan dijalankan adalah:
```
node <nama_main_app.js> list
```
e.g:
```
node index.js list
```

Contoh output adalah:
```
[
  Stim {
    "id": 1,
    "name": "Defense of the Spaghetti Code",
    "publisher": "Valvic",
    "platform": "Stim"
  },
  ...
  Original {
    "id": 3,
    "name": "Apek Legends",
    "publisher": "IE Games",
    "platform": "Original"
  },
  ...
  WubiPlay {
    "id": 5,
    "name": "Hyper Scoop",
    "publisher": "UbiHard",
    "platform": "WubiPlay"
  },
  ...
]
```

### Langkah 3 - Adding Data to File
Setelah berhasil merealisasikan kode di atas, maka selanjutnya, buatlah
fitur pada aplikasi sehingga bisa menerima perintah `add` untuk menambahkan
koleksi game pada data `games.json` yang sudah diberikan, dan tampilkan output
bila berhasil ditambahkan. Penambahan untuk property `id` bersifat 
`auto-increment` dalam artian akan mengambil dari id terakhir yang ada, 
kemudian ditambah 1.

Lakukan juga validasi apabila penambahan game tersebut, dalam satu platform
yang sama, tidak boleh ada `Game` yang sama.

Perintah yang akan dijalankan adalah:
```
node <nama_main_app.js> add <nama_game> <publisher> <platform>
```
e.g.:
```
node index.js add "Shield Art Offline" "Badai Camno" Stim
```

Contoh output pada saat berhasil adalah:
```
Game "Shield Art Offline" berhasil ditambahkan pada "Stim"
```

Contoh output pada saat gagal (sudah ada) adalah:
```
Game "Shield Art Offline" sudah ada di platform "Stim"
```

### Langkah 4 - Remove Data from File
Setelah berhasil merealisasikan kode di atas, maka selanjutnya, buatlah
fitur pada aplikasi sehingga bisa menerima perintah `del` untuk menghapus
koleksi game pada data `games.json` yang sudah diberkan, dan tampilkan
output bila game berhasil dihapus.

Lakukan juga validasi apabila game tidak ditemukan.

Perintah yang akan dijalankan adalah:
```
node <nama_main_app.js> del <id>
```
e.g.:
```
node index.js del 1
```

Contoh output pada saat berhasil adalah:
```
Game "Defense of the Spaghetti Code" berhasil dihapus
```

Contoh output pada saat gagal adalah:
```
Game dengan id 1 tidak ditemukan
```

Sekian untuk requirement aplikasi yang akan dibuat.

## Let's Make the Code
Setelah membaca requirement yang dibutuhkan oleh aplikasi di atas, maka
selanjutnya kita akan membuat aplikasi ini dengan menggunakan MVC dan Callback
pada nodejs.

### Release 1 - Buat Class
Karena class ini merupakan **representasi** dari data yang ada, maka kita
akan membuat class tersebut di dalam sebuah folder yang namanya adalah 
... **models**

```javascript
// File: models/model.js

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

module.exports = { Game, Stim, Original, WubiPlay };
```

Berarti sampai dengan tahap ini, realisasi class untuk representasi data sudah
selesai !

### Release 2 - Read the File
Dikarenakan pada saat membaca file ini kita harus merepresentasikan dalam
bentuk 3 buah class (`Stim`, `Original`, dan `WubiPlay`) yang sebenarnya
cukup mirip, maka kita bisa menyatukan pada saat `instantiate` object class
tersebut dalam sebuah pola yang dinamakan dengan `Factory`.

Oleh karena itu, ada baiknya sekarang kita membuat sebuah class dengan nama
`GameFactory` dan sebuah method yang bernama `createGame` untuk memudahkan
pembuatan aplikasi kita ini.

Untuk memudahkan pembelajaran, class ini akan dimasukkan dalam file
`models/model.js`

```javascript
// File: models/model.js

...

class GameFactory {
  static createGame(id, name, publisher, platform) {
    if(platform === 'Stim') {
      return new Stim(id, name, publisher);
    }
    else if(platform === 'Original') {
      return new Original(id, name, publisher);
    }
    else if(platform === 'WubiPlay') {
      return new WubiPlay(id, name, publisher);
    }
  }
}

...

module.exports = {
  Game, Stim, Original, WubiPlay, GameFactory
};
```

Setelah membuat `GameFactory` ini, selanjutnya kita akan membuat sebuah class 
lagi yang digunakan meng-handle perintah `list` yang diberikan dari 
`index.js` --> `controller` --> `model`.

Untuk mempermudah pembelajaran, maka kita akan menamakan class ini dengan
nama `Model` pada file `models/model.js`.

Di dalam class `Model` ini, kita akan membuat sebuah method untuk meng-handle
perintah `list` dengan nama `readData`

```javascript
// File: models/model.js

const fs = require('fs');

...
class Model {
  // Ingat ingat kembali bahwa kita menggunakan error-first argument
  // atau first-error callback
  static readData(callback) {
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if(err) {
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
} 

...
module.exports = {
  Game, Stim, Original, WubiPlay, GameFactory, Model
}
```

Selanjutnya kita akan mencoba untuk membuat fitur `list` pada `index.js` 

```javascript
// File: index.js

const argvInput = process.argv;

let perintah = argvInput[2];

if(perintah === 'list') {
  // Sampai di sini berarti kita harus pindah sejenak untuk merealisasikan
  // controller

}
```

Selanjutnya berarti kita harus berpindah ke controller, membuat sebuah folder
dengan nama `controllers` dan membuat sebuah file dengan nama `controller.js`
dan membuat class dengan nama `Controller` dan method dengan nama `listHandler`

```javascript
// File: controllers/controller.js

// Ingat bahwa kita butuh untuk memanggil si Model
const { Model } = require('../models/model.js');

class Controller {
  static listHandler() {
    Model.readData(function readHandler(err, data) {
      if(err) {
        // Berarti sekarang kita harus membuat Viewnya terlebih dahulu
      }
    });
  }
}

module.exports = Controller;
```

Dikarenakan pada Controller sekarang membutuhkan output tampilan, maka sekarang
kita harus berpindah ke views, membuat sebuah folder dengan nama `views` dan 
membuat sebuah file dengan nama `view.js`, membuat sebuah class dengan nama
`View` dan method dengan nama `showSuccess` dan `showError`

```javascript
// File: models/model.js

class View {
  static showSuccess(outputMessage) {
    console.log(outputMessage);
  }

  static showError(errorMessage) {
    console.error(errorMessage.stack);
  }
}

module.exports = View;
```

Selanjutnya kita akan menyelesaikan `controllers/controller.js`

```javascript
// File: controllers/controller.js

const { Model } = require('../models/model.js');
// Import view
const View = require('../views/view.js');

class Controller {
  static listHandler() {
    Model.readData(function readHandler(err, data) {
      if(err) {
        View.showError(err);
      }
      else {
        View.showSuccess(data);
      }
    });
  }
}

module.exports = Controller;
```

Selanjutnya kita akan menyelesaikan `index.js`

```javascript
// File: index.js

const Controller = require('./controllers/controller.js');

const argvInput = process.argv;

let perintah = argvInput[2];

if(perintah === 'list') {
  // Sampai di sini berarti kita harus pindah sejenak untuk merealisasikan
  // controller
  Controller.listHandler();
}
```

Kemudian kita akan coba untuk menjalankan aplikasi dengan mengetikkan perintah
```
node index.js list
```

Perhatikan outputnya, apakah sudah sesuai yang diminta ?

### Release 3 - Adding Data to File
Setelah kita membuat `list`, maka selanjutnya kita akan membuat fitur tambahan
untuk `add`, oleh karena itu, sekarang kita akan membuatnya dari `index.js`
terlebih dahulu

```javascript
// File: index.js

...
else if(perintah === 'add') {
  // node <nama_main_app.js> add <nama_game> <publisher> <platform>
  let name = argvInput[3];
  let publisher = argvInput[4];
  let platform = argvInput[5];

  // Berarti sekarang kita harus berpindah ke controller
}
```

Setelah itu kita akan melanjutkannya untuk menambahkan sebuah method pada
class `Controller` dengan nama `addHandler`

```javascript
// File: controllers/controller.js

  static addHandler(name, publisher, platform) {
    // Berarti sekarang kita harus masuk ke bagian model
  }
```

Setelah itu kita akan melanjutkannya dengan menambahkan sebuah method pada
`Model` dengan nama `addData`

```javascript
// File: models/model.js

class Model {
  ...

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
}
```

Kemudian, setelah method `addData` ini selesai dibuat, kita akan kembali untuk
melengkapi `Controller` nya lagi

```javascript
// File: controllers/controller.js

  static addHandler(name, publisher, platform) {
    Model.addData(name, publisher, platform, (err, data) => {
      if(err && err.errorData === undefined) {
        View.showError(err);
      }
      else if(err && err.errorData) {
        // Kalau ada custom data Error dari kita
        // maka kita akan menampilkan error ala kita
        // Berarti kita akan menggunakan method tambahan pada View
      }
      else {
        // Karena data kembaliannya sekarang akan kita proses lebih 
        // lanjut, maka kita harus menambah method pada View-nya
        // kembali
      }
    });
  }
```

Selanjutnya, kita akan menambahkan method `showSuccessAdd`
dan `showErrorAdd` pada `View` lagi agar dapat menampilkan output sesuai 
yang diharapkan pada requirement.

```javascript
// File: views/view.js

  static showErrorAdd(errData) {
    console.log(`Game "${errData.name}" sudah ada di platform ${errData.platform}`);
  }

  static showSuccessAdd(instance) {
    console.log(`Game "${instance.name}" berhasil ditambahkan pada ${instance.platform}`);
  }

```

Selanjutnya kita akan melengkapi controller dengan method yang sudah dibuat
pada view.

```javascript
// File: controllers/controller.js

  static addHandler(name, publisher, platform) {
    Model.addData(name, publisher, platform, (err, data) => {
      if(err && err.errorData === undefined) {
        View.showError(err);
      }
      else if(err && err.errorData) {
        // Kalau ada custom data Error dari kita
        // maka kita akan menampilkan error ala kita
        // Berarti kita akan menggunakan method tambahan pada View
        View.showErrorAdd(err.errorData);
      }
      else {
        // Karena data kembaliannya sekarang akan kita proses lebih 
        // lanjut, maka kita harus menambah method pada View-nya
        // kembali
        View.showSuccessAdd(data);
      }
    });
  }
```

Kemudian selanjutnya kita akan melengkapi `index.js`

```javascript
else if(perintah === 'add') {
  // node <nama_main_app.js> add <nama_game> <publisher> <platform>
  let name = argvInput[3];
  let publisher = argvInput[4];
  let platform = argvInput[5];

  Controller.addHandler(name, publisher, platform);
}
```

Kemudian kita akan coba untuk menjalankan aplikasi dengan perintah
```
node index.js add "Shield Art Offline" "Badai Camno" Stim
```

Dan melihat, apakah hasilnya ?

### Release 4 - Remove Data from File
Setelah kita membuat `add`, maka selanjutnya kita akan membuat fitur tambahan
untuk `del`, oleh karena itu, sekarang kita akan membuatnya lagi dari
`index.js` terlebih dahulu

```javascript
// File: index.js

...
else if(perintah === 'del') {
  //node <nama_main_app.js> del <id>
  let id = argvInput[3];

  // Berarti sekarang kita harus berpindah ke controller lagi
}
```

Setelah itu kita akan melanjutkannya untuk menambahkan sebuah method pada
class `Controller` dengan nama `delHandler`

```javascript
// File: controllers/controller.js

  static delHandler(id) {
    // Berarti sekarang kita harus masuk ke bagian model lagi
  }
```

Setelah itu kita akan melanjutkannya dengan menambahkan sebuah method pada
`Model` dengan nama `delData`

```javascript
// File: models/model.js

class Model{
  ...

  static delData(id, callback) {
    // Kita akan menggunakan kembali method readData yang ada di class Model
    // ini juga untuk digunakan pada delData
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

  ...
}
```

Kemudian setelah method `delData` ini selesai dibuat, kita akan kembali untuk
melengkapi `Controller` nya lagi

```javascript
// File: controllers/controller.js

  static delHandler(id) {
    Model.delData(id, (err, data) => {
      if(err && err.errorData === undefined) {
        View.showError(err);
      }
      else if(err && err.errorData) {
        // Kalau ada custom data Error dari kita
        // maka kita akan menampilkan error ala kita
        // Berarti kita akan menggunakan method tambahan pada View
      }
      else {
        // Karena data kembaliannya sekarang akan kita proses lebih
        // lanjut ala addHandler, maka kita harus menambahkan method
        // pada View-nya kembali
      }
    });
  }
```

Selanjutnya, kita akan menambahkan method `showSuccessDel` 
dan `showErrorDel` pada `View` lagi agar dapat menampilkan output sesuai
yang diharapkan pada requirement.

```javascript
// File: views/view.js

  static showErrorDel(errData) {
    console.log(`Game dengan id ${errData.id} tidak ditemukan`);
  }
  
  static showSuccessDel(instance) {
    console.log(`Game "${instance.name}" berhasil dihapus`);
  }
```

Selanjutnya kita akan melengkapi controller dengan method yang sudah dibuat
pada view.

```javascript
// File: controllers/controller.js
  
  static delHandler(id) {
    Model.delData(id, (err, data) => {
      if(err && err.errorData === undefined) {
        View.showError(err);
      }
      else if(err && err.errorData) {
        // Kalau ada custom data Error dari kita
        // maka kita akan menampilkan error ala kita
        // Berarti kita akan menggunakan method tambahan pada View
        View.showErrorDel(err.errorData);
      }
      else {
        // Karena data kembaliannya sekarang akan kita proses lebih
        // lanjut ala addHandler, maka kita harus menambahkan method
        // pada View-nya kembali
        View.showSuccessDel(data);
      }
    });
  }

```

Kemudian selanjutnya kita akan melengkapi `index.js`

```javascript
else if(perintah === 'del') {
  //node <nama_main_app.js> del <id>
  let id = argvInput[3];

  Controller.delHandler(id);
}
```

Kemudian kita akan coba untuk menjalankan aplikasi dengan perintah
```
node index.js del 1
```

Dan melihat, apakah hasilnya ?

`Keep learning !`