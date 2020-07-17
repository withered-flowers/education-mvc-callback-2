const { Model } = require('../models/model.js');
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

  static addHandler(name, publisher, platform) {
    Model.addData(name, publisher, platform, (err, data) => {
      if(err && err.errorData === undefined) {
        View.showError(err);
      }
      else if(err && err.errorData) {
        View.showErrorAdd(err.errorData);
      }
      else {
        View.showSuccessAdd(data);
      }
    });
  }

  static delHandler(id) {
    Model.delData(id, (err, data) => {
      if(err && err.errorData === undefined) {
        View.showError(err);
      }
      else if(err && err.errorData) {
        View.showErrorDel(err.errorData);
      }
      else {
        View.showSuccessDel(data);
      }
    });
  }
}

module.exports = Controller;