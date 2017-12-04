#session 9

Create a new angular project

`ng new foodapp`

Generate components

`ng generate component components/recipes`
`ng generate component components/recipe-detail`

and a service

`ng generate service service/data`


Create a second tab in the terminal and go to the foodapp directory

`npm run start`

Examine `app.module.ts` - no service

app.component.html

```
<div class="wrap">
    <app-recipes></app-recipes>
</div>
```

## Recipes Component

Add 

`pageTitle: string;` and `this.pageTitle = 'Recipes'`

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

	pageTitle: string;

  constructor() {
  	this.pageTitle = 'Recipes'
  }

  ngOnInit() {
  }

}
```

```
<div class="wrap recipes">
  <h1>{{ pageTitle }}</h1>
</div>
```

Add css from the assets folder

Add data to constructor:

```js
this.recipes = [
  {
    "name": "recipe1309",
    "title": "Lasagna",
    "date": "2013-09-01",
    "description": "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.",
    "image": "lasagne.png"
  },
  {
    "name": "recipe1404",
    "title": "Pho-Chicken Noodle Soup",
    "date": "2014-04-15",
    "description": "Pho (pronounced \"fuh\") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.",
    "image": "pho.png"
  },

  {
    "name": "recipe1210",
    "title": "Guacamole",
    "date": "2016-10-01",
    "description": "Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.",
    "image": "guacamole.png"
  },

  {
    "name": "recipe1810",
    "title": "Hamburger",
    "date": "2012-10-20",
    "description": "A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.",
    "image": "hamburger.png"
  }
]
```

Data type:

`recipes: object[]`

```
recipe: {
  name: string
  title: string
  date: string
  description: string
  image: string
}
```

Build out the html

```html
<div class="wrap recipes">
  <h1>{{ pageTitle }}</h1>

  <ul>
    <li *ngFor="let recipe of recipes">
      <img src="assets/home/{{recipe.image}}" />
      <div>
        <h2>
          <a href="/recipe">{{recipe.title}}</a>
        </h2>
        <p>{{recipe.description}}</p>
      </div>
    </li>
  </ul>
</div>
```

Add image assets to the project (may need to restart Webpack)

Adjust css

```css
.wrap ul {
    list-style: none;
    padding: 0;
}

.wrap li {
    display: flex;
    padding: 1rem;
}

.wrap li img {
    width: 30%;
    height: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    margin-right: 1rem;
    background-color: #fff;
    box-shadow: 2px 2px 4px #ccc;
}

.wrap li a {
    color: #7e360d;
    text-decoration: none;
}
```

## Routing

Add - app.module

```js
import { RouterModule, Routes } from '@angular/router';

...
const appRoutes: Routes = [
  { path: '', component: RecipesComponent, pathMatch: 'full' },
  { path: 'recipe', component: RecipeDetailComponent }
]

...

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],

...
```

And in the html

```
<router-outlet></router-outlet>
```

## Recipe-detail component

```
<button (click)="back()">Back</button>
```

```
back() {
  window.history.back()
}
```

Go to `http://localhost:4200/recipe`

We are going to be sharing data and functionality across components.

Create a model `Recipe.ts` in a models folder.

```js
 export interface Recipe {
 	name: string;
 	title: string;
 	date: string;
 	description: string;
 	image: string;
 }
```

Use it in our recipes and recipe-detail components

`import { Recipe } from '../../models/Recipe';`

`recipe: Recipe;`

Move the data into the service

1. add the service to app.module
1. import the service into the recipes templates

In app.module

```
import { DataService } from './service/data.service'
...
  providers: [DataService],
```

Add param

```
const appRoutes: Routes = [
  { path: '', component: RecipesComponent, pathMatch: 'full' },
  { path: 'recipe/:id', component: RecipeDetailComponent }
]
```

Ammend recipe template

```
<a href="recipe/{{recipe.name}}">{{recipe.title}}</a>
```

Add to components

`import { DataService } from '../../service/data.service';`

## Service

`import { Recipe } from '../models/Recipe';`

`recipes: Recipe[]`

```js
constructor() {
  	this.recipes = [
      {
        "name": "recipe1309",
        "title": "Lasagna",
        "date": "2013-09-01",
        "description": "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.",
        "image": "lasagne.png"
      },
      {
        "name": "recipe1404",
        "title": "Pho-Chicken Noodle Soup",
        "date": "2014-04-15",
        "description": "Pho (pronounced \"fuh\") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.",
        "image": "pho.png"
      },

      {
        "name": "recipe1210",
        "title": "Guacamole",
        "date": "2016-10-01",
        "description": "Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.",
        "image": "guacamole.png"
      },

      {
        "name": "recipe1810",
        "title": "Hamburger",
        "date": "2012-10-20",
        "description": "A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.",
        "image": "hamburger.png"
      }
    ]
  }
```

recipes.component

```
  constructor(public dataService: DataServiceService) {
    this.pageTitle = 'Recipes'
    this.recipes = this.dataService.getRecipes()
  }
```

in service

```
	getRecipes() {
		return this.recipes;
	}
```

Get the display in recipe-detail

```
import { Router, ActivatedRoute, Params } from '@angular/router';

...

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
    this.recipe = dataService.getRecipe(this.id)
  }
```

in service

```
	getRecipe(id) {
		this.recipe = this.recipes.filter(recipe => recipe.name == id)[0]
		return this.recipe;
	}
```

recipe-detail html

```
<h1>{{ recipe.title }}</h1>
<img style="width: 30%" src="assets/home/{{recipe.image}}" />
<p>{{ recipe.description }}</p>
<button (click)="back()">Back</button>
```

## HTTP 

add http service to app.module

```
import { HttpModule } from '@angular/http';

...

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
```

in service

```
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'
...

  constructor(private http: Http) {
  	
  }

...

	getRecipes() {
		return this.http.get('http://localhost:3006/api/recipe').toPromise()
	}
```

## API

`npm run start` the api in backend

note the app.use headers in app.js

in recipes.component

```
  async ngOnInit() {
    const response = await this.dataService.getRecipes()
    this.recipes = response.json()
  }
```

in recipes-detail.component

```
  constructor(public dataService: DataServiceService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
  }
```

```
  async ngOnInit() {
    const response = await this.dataService.getRecipe(this.id)
    this.recipe = response.json()
  }
```

in service

`import { Router, ActivatedRoute, Params } from '@angular/router';`

```
	id: string;
	recipe: Recipe;
	recipes: Recipe[]
```


```
	getRecipe(id) {
		return this.http.get('http://localhost:3006/api/recipe/' + id).toPromise()
	}
```

```
	constructor(private http: Http) {
		
	}
```

check the link

```
        <h2>
          <a href="recipe/{{recipe._id}}">{{recipe.title}}</a>
        </h2>

```

Safe operator?

`<h1>{{ recipe?.title }}</h1>`




























