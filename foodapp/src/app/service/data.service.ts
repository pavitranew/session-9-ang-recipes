import { Injectable } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class DataService {

	id: string;
	recipe: Recipe;
	recipes: Recipe[]

	constructor(private http: Http) {
		// this.id = this.route.params['id']
	}

  getRecipes() {

		return this.http.get('http://localhost:3006/api/recipe').toPromise()
	}
	getRecipe(id) {
		// console.log(this.http.get('http://localhost:3006/api/recipe' + id).toPromise())
		return this.http.get('http://localhost:3006/api/recipe/' + id).toPromise()
	}

}
