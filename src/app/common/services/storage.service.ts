import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';


@Injectable()

export class StorageService {

    public userstore: Map<string, any>= new Map<string, any>();
    public masterdata:  Map<string, any>= new Map<string, any>();
    //bankdata:any[];

    constructor(public storage: Storage,
        //public http:Http,
        //public fc: Facade
        ){
        this.userstore = new Map<string, any>();
        this.masterdata = new Map<string, any>();
    }

    storeObject(key: string , value:any){
        if(key != null && key != undefined && key != ""){
            if(this.userstore.has(key)){
                this.userstore.delete(key);
            }
            this.userstore.set(key , value);
            //this.storage.set(key , value);
        }
    }

    removeObject(key : string){
        if((key != null && key != undefined && key != "" ) && this.userstore.has(key)){
            this.userstore.delete(key);
        }
    }

    getObject(key : string){
        return((key != null && key != undefined && key != "") && this.userstore.has(key)) ? this.userstore.get(key): null;
        
    }

    clearAllObjects() {
        this.userstore.clear();
    }
}