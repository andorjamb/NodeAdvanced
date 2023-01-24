'use strict';

const mariadb=require('mariadb');

module.exports=class Database{
    constructor(options){
        this.options=options;
    }

    doQuery(sql,parameters){
        return new Promise(async (resolve,reject)=>{
            let connection;
            try{
                connection = await
            }
        })
    }
}