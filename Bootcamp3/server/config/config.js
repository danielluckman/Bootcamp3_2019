//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb+srv://jewfit:iloveuf@cluster0-hv38r.mongodb.net/test?retryWrites=true&w=majority'//place the URI of your mongo database here.
  }, 
  openCage: {
    key: '4c37f44c768b49cc80bf3d2dd29c0e92' //place your openCage public key here - Sign-up for a free key https://opencagedata.com/
  },
  port: 8080
};