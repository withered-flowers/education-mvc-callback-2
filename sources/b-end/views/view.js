class View {
  static showSuccess(outputMessage) {
    console.log(outputMessage);
  }

  static showError(errorMessage) {
    console.error(errorMessage.stack);
  }

  static showErrorAdd(errData) {
    console.log(`Game "${errData.name}" sudah ada di platform ${errData.platform}`);
  }

  static showSuccessAdd(instance) {
    console.log(`Game "${instance.name}" berhasil ditambahkan pada ${instance.platform}`);
  }

  static showErrorDel(id) {
    console.log(`Game dengan id ${id} tidak ditemukan`);
  }
  
  static showSuccessDel(instance) {
    console.log(`Game "${instance.name}" berhasil dihapus`);
  }
}

module.exports = View;