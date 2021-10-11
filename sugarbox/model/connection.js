const mongoose = require('mongoose');
const schema = require("./schema");

// if(process.env.NODE_ENV == 'test') {
//     console.log('Inside testing')
//     const Mockgoose = require('mockgoose').Mockgoose
//     const mockgooseObj = new Mockgoose(mongoose)
//     mockgooseObj.prepareStorage(() => {
//         {
//             console.log("inside mockgoose")
//             mongoose.connect("mongodb://localhost:27017/sugarbox", { useNewUrlParser : true, useUnifiedTopology: true }, (error) => {
//             if(!error) {
//                 console.log("Connected Successfully to test!");
//             } else {
//                 console.log("Error in connecting to database!"+error);
//             }
//         });
//         }
        
//     })
// } else {
//     mongoose.connect("mongodb://localhost:27017/sugarbox", { useNewUrlParser : true, useUnifiedTopology: true }, (error) => {
//     if(!error) {
//         console.log("Connected Successfully!");
//     } else {
//         console.log("Error in connecting to database!"+error);
//     }
// });
// }

function open(){
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/sugarbox', (err, res) => {
              if (err) return reject(err);
              resolve();
            });
    });
}

function close(){
    return mongoose.disconnect();
}

module.exports = { close, open };

