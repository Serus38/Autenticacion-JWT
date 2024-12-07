const mongoose = require ('mongoose')
const getConection = async () => {

    try {

        const url = 'mongodb+srv://Serus:2vO8RUVebXQdQEfo@api-rest.ezvqn.mongodb.net/?retryWrites=true&w=majority&appName=API-Rest'
        await mongoose.connect(url);
        console.log('Conexión exitosa');

    } catch (error) {
        console.log(error);

    }

}

module.exports = {
    getConection
}