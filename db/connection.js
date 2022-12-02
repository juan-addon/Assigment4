const { mongoose } = require("mongoose");

const password = "vztrBQ2IMx14nDEg";
const uri =`mongodb+srv://juanadon03:${password}@juancluster.0tvd1wf.mongodb.net/?retryWrites=true&w=majority`;

const connection = ()=> {
    mongoose.connect(uri, {
        useUnifiedTopology: true ,
        useNewUrlParser: true
        }, (error) => {
            if(error) {
                console.log(error);
                console.log("Connection Failed.");
            }
            else {
                // console.log("Connected to the Database.")
            }
        }
    )
};

module.exports = connection;
