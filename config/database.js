
const mongoose = require('mongoose');

const DBConnection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log(`Database Established... ${result.connection.host}`);
    })
    .catch((err) => {
      console.error(`DB Error: ${err}`);
      process.exit(1);
    });
};

module.exports = DBConnection;
