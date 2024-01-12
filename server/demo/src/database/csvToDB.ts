import {insertDataIntoDB, readCSV} from "../utils/utils";

const filePath = 'src/data/coin.csv' //regarding current working directory 'demo'

readCSV(filePath)
.then(data => {
    insertDataIntoDB(data)
        .then(()=>{console.log('csv to DB is done')})
        .catch((e)=>{console.log('csv to DB failure' ,e)})
})
.catch(e => {console.log('read csv failure', e)})

//this file is useless:<