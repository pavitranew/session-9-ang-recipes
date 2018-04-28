import { Injectable } from '@angular/core';
import { Recipe } from '../models/Recipe';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { 
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>('http://localhost:3006/api/recipe')
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http
      .get<Recipe>('http://localhost:3006/api/recipe/' + id)
  }

}
