import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from './../interfaces/gifs.interfaces';


const GIPHY_KEY = '6ukRs8hw0LpjN56WdWS7G346ze1cGAHL';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[] = []

  private _tagHistory: string[] = [];
  private serviceUrl = 'https://api.giphy.com/v1/gifs'

  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

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

    this.saveLocalStorage();

  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

  private loadLocalStorage():void{
    if(localStorage.getItem('history')){
      this._tagHistory = JSON.parse(localStorage.getItem('history')!);
    }
    if(this._tagHistory.length>0){
      this.searchTag(this._tagHistory[0]);
    }
  }

  searchTag(tag: string):void {
    if(tag.length !== 0){
      this.organizeHistory(tag);

      const params = new HttpParams()
        .set('api_key', GIPHY_KEY)
        .set('limit', 10)
        .set('q', tag)

      this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
        .subscribe( response => {
          this.gifsList = response.data;
          console.log({gifs: this.gifsList});

      });

    }
  }



}
