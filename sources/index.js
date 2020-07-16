const Controller = require('./controllers/controller.js');

const argvInput = process.argv;

let perintah = argvInput[2];

if(perintah === 'list') {
  // Sampai di sini berarti kita harus pindah sejenak untuk merealisasikan
  // controller
  Controller.listHandler();
}
else if(perintah === 'add') {
  // node <nama_main_app.js> add <nama_game> <publisher> <platform>
  let name = argvInput[3];
  let publisher = argvInput[4];
  let platform = argvInput[5];

  Controller.addHandler(name, publisher, platform);
}