const { default: mongoose } = require("mongoose")

const connectToDB = async () => {
    const connectionURL = "mongodb+srv://amanara854:ZIPAGUAYOjkjfaXG@cluster0.hg93ghp.mongodb.net/"

    mongoose.connect(connectionURL)
    .then(() => console.log("Jobadda connection is successful"))
    .catch((error) => console.log(error))
};

export default connectToDB;