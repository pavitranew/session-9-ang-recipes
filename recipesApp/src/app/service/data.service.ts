import { Injectable } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: Http) { 
  }
  // id: string;
  // recipe: Recipe;
  // recipes: Recipe[]

  public getRecipes(): Observable<Recipe[]> {
    // return this.http.get('http://localhost:3006/api/recipe').toPromise()
    return this.http
      .get('http://localhost:3006/api/recipe')
      .map(response => {
        const recipes = response.json();
        return recipes.map((recipe) => new Recipe(recipe));
      });
  }

  public getRecipe(id) {
    return this.http.get('http://localhost:3006/api/recipe/' + id).toPromise()
  }

}
