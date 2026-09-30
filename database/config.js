const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("BBDD arrancada");
    }
    catch (error) {
        console.error(error);
        throw new Error("Error al arrancar la BBDD");
    }
}

module.exports = {
    dbConection
}
