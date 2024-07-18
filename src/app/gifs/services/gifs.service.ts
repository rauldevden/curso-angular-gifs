import { Injectable } from '@angular/core';

const GIPHY_KEY = '6ukRs8hw0LpjN56WdWS7G346ze1cGAHL';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagHistory: string[] = [];

  constructor() { }

  get tagHistory(){
    return [...this._tagHistory];
  }

  private organizeHistory(newTag: string){
    newTag = newTag.toLowerCase();

    if(this.tagHistory.find(tag => tag === newTag )){
      this._tagHistory = this._tagHistory.filter(tag => newTag !== tag)
    }
    this._tagHistory.unshift(newTag)
    this._tagHistory = this._tagHistory.splice(0,10);

  }

  searchTag(tag: string):void {
    if(tag.length !== 0){
      this.organizeHistory(tag)
    }
  }



}
