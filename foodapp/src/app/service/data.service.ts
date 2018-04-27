import { Injectable } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class DataService {

  // recipes: Recipe[];
  // recipe: Recipe;

  id: string;
recipe: Recipe;
recipes: Recipe[]

  // getRecipe(id) {
  //   this.recipe = this.recipes.filter(recipe => recipe.name == id)[0]
  //   return this.recipe;
  // }
  getRecipes() {
    return this.http.get('http://localhost:3006/api/recipe').toPromise()
  }
  getRecipe(id) {
    return this.http.get('http://localhost:3006/api/recipe/' + id).toPromise()
  }
  constructor(private http: Http) {
  }
  
    
    // this.recipes = [
    //   {
    //     "name": "recipe1309",
    //     "title": "Lasagna",
    //     "date": "2013-09-01",
    //     "description": "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.",
    //     "image": "lasagne.png"
    //   },
    //   {
    //     "name": "recipe1404",
    //     "title": "Pho-Chicken Noodle Soup",
    //     "date": "2014-04-15",
    //     "description": "Pho (pronounced \"fuh\") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.",
    //     "image": "pho.png"
    //   },
  
    //   {
    //     "name": "recipe1210",
    //     "title": "Guacamole",
    //     "date": "2016-10-01",
    //     "description": "Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.",
    //     "image": "guacamole.png"
    //   },
  
    //   {
    //     "name": "recipe1810",
    //     "title": "Hamburger",
    //     "date": "2012-10-20",
    //     "description": "A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.",
    //     "image": "hamburger.png"
    //   }
    // ]
  // }

}
