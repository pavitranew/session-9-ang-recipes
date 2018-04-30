import { Injectable } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable()
  
export class DataService {
  constructor(private http: HttpClient) { 
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(API_URL + 'api/recipe')
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http
      .get<Recipe>(API_URL + 'api/recipe/' + id)
  }

}
