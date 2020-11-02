import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class MessageService {
   // step 1 
   // private _listenerPostClick = new Subject<any>();
   // private _listenerCartList = new Subject<any>();
   // private _listenerRmCartList = new Subject<any>();
   // private _listenerAddQty = new Subject<any>();
   private _listenerLogout = new Subject<any>();
   private _listenerbindMenu = new Subject<any>();
   private _listenerHdr = new Subject<any>();
   private _listenSwitchProfileImg = new Subject<any>();

   // step 2
   // listenPostClick(): Observable<any> {
   //    return this._listenerPostClick.asObservable();
   // }
   //create observable
   
   // listenCartList(): Observable<any> {
   //    return this._listenerCartList.asObservable();
   // }
   // listenRmCartList(): Observable<any> {
   //    return this._listenerRmCartList.asObservable();
   // }
   // listenAddQty(): Observable<any> {
   //    return this._listenerAddQty.asObservable();
   // }
   listenLogout(): Observable<any> {
      return this._listenerLogout.asObservable();
   }
   listenbindMenu(): Observable<any> {
      return this._listenerbindMenu.asObservable();
   }
   listenHdr(): Observable<any> {
      return this._listenerHdr.asObservable();
   }
   listenSwitchProfileImg(): Observable<any> {
      return this._listenSwitchProfileImg.asObservable();
   }


   // step 3
   // postClick(data: string) {
   //    this._listenerPostClick.next(data);
   // }
   //forwards method to the subscribing resources / pages
  
   // cartListClick(data: string) {
   //    this._listenerCartList.next(data);
   // }
   // rmCartListClick(data: string) {
   //    this._listenerRmCartList.next(data);
   // }
   // addQtyClick(data: any) {
   //    this._listenerAddQty.next(data);
   // }
   logoutClick() {
      this._listenerLogout.next();
   }
   bindMenu(data: any) {
      this._listenerbindMenu.next(data);
   }
   HdrClick(data: boolean) {
      this._listenerHdr.next(data);
   }
   SwitchProfileImg() {
      this._listenSwitchProfileImg.next();
   }
}