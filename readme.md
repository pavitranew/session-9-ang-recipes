# Session 9 - Angular

## Homework

Update this project to request information from *your* database on mLab.

Remember, to seed your database you can use the `api/import` endpoint. (You will need to do this before we can start sending post / delete / etc. requests.)

## FoodApp

Create a new angular project

`ng new foodapp`

cd into the foodapp directory

Generate components

`ng generate component components/recipes`

`ng generate component components/recipe-detail`

and a service

`ng generate service service/data`
`ng generate service service/data --module app.module.ts`

Create a second tab in the terminal and run:

`ng serve`

Examine `app.module.ts` - note lack of a service

app.component.html:

```html
<div class="wrap">
    <app-recipes></app-recipes>
</div>
```

## Recipes Component

Add:

`pageTitle: string;` 

to the class and 

`this.pageTitle = 'Recipes'` 

to the constructor:

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

In the recipes template:

```html
<div class="wrap recipes">
  <h1>{{ pageTitle }}</h1>
</div>
```

Add css from the assets folder

Add data to recipes constructor:

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

Set the types in the class:

`recipes: object[];`

(BAD) 

```js
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

Add image assets to the project (you'll need to restart Webpack in order for it to process and allow the images to appear).

Adjust the global css:

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

Add a `.recipe-entry` class to the recipes html template and css for the recipes component css:

```css
@media (max-width: 620px){
  .recipe-entry li {
    display: flex;
    flex-direction: column;
  }
  .recipe-entry img {
    width: 100%;
    margin-bottom: 1rem;
  }
}
```

## Routing

Add the router module - `app.module`:

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

And in `app-component` html

```html
<div class="wrap">
  <router-outlet></router-outlet>
</div>
```

Test at `http://localhost:4200/recipe`

## Recipe-detail component

`recipe-detail` html:

```html
<button (click)="back()">Back</button>
```

In `recipe-detail` component class:

```js
export class RecipeDetailComponent implements OnInit {

  back() {
    window.history.back()
  }

  constructor() { }
  ngOnInit() {
  }
}
```

Go to `http://localhost:4200/recipe` and test.

We are going to be sharing data and functionality across components.

Create a model, `Recipe.ts`, in a new `models` folder in `app`.

```js
 export interface Recipe {
 	name: string;
 	title: string;
 	date: string;
 	description: string;
 	image: string;
 }
```

Use it in our `recipes` and `recipe-detail` components.

Import it:

`import { Recipe } from '../../models/Recipe';`

And add it to the classes:

`recipe: Recipe;`

Move the data into the service

1. register / add the data service to app.module
1. import the service into the recipes templates

In `app.module`:

```js
import { DataService } from './service/data.service';
...
  providers: [DataService],
```

Add a param to the routes:

```js
const appRoutes: Routes = [
  { path: '', component: RecipesComponent, pathMatch: 'full' },
  { path: 'recipe/:id', component: RecipeDetailComponent }
]
```

Ammend the recipes template:

```html
<a href="recipe/{{recipe.name}}">{{recipe.title}}</a>
```

Add / make it available to the recipes and recipe-detail components:

`import { DataService } from '../../service/data.service';`

## Service

Add the model to the service:

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

Remove the data from the `recipes.component` and call a function from the service to retrieve them:

```js
  constructor(public dataService: DataService) {
    this.pageTitle = 'Recipes'
    this.recipes = this.dataService.getRecipes()
  }
```

## A note on `public`

Suppose you have a simple class with two properties. And the constructor is used to initialize the properties like this:

```js
class Point {
    private x: number;
    private y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
    }
}
```

A very common pattern in objected oriented programming. In TypeScript there is a shorthand for this pattern:

```js
class Point {
    constructor(public x: number, public y: number) {
    }
}
```

By simply prefixing the constructor arg with the word private (or public or readonly) it automatically creates the property and initializes it from the constructor args.

## Service cont

Add the function to the service:

```js
getRecipes() {
  return this.recipes;
}
```

Get the display into in `recipe-detail` - we're going to have to access the url params.

```js
import { Router, ActivatedRoute, Params } from '@angular/router';

...

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
    this.recipe = dataService.getRecipe(this.id)
  }
```

in the service:

```js
getRecipe(id) {
  this.recipe = this.recipes.filter(recipe => recipe.name == id)[0]
  return this.recipe;
}
```

`id: string;`

recipe-detail html:

```html
<h1>{{ recipe.title }}</h1>
<img style="width: 30%" src="assets/home/{{recipe.image}}" />
<p>{{ recipe.description }}</p>
<button (click)="back()">Back</button>
```

## HTTP Service

We are going to get the data from an API using Http ($http in Angular 1).

*Deploy the api using the backend assets in the zip file.*

1. unzip
1. npm install
1. `npm run start` the api in backend
1. test at the get api endpoint `http://localhost:3006/`

add http service to app.module

```js
import { HttpModule } from '@angular/http';

...

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
```

Now that its added to our app we can use it in the service:

```js
// BAD
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


GOOD
`import { Http } from '@angular/http';`

## API

note the app.use headers in app.js. Uncomment these lines

 in recipes.component

```js
  async ngOnInit() {
    const response = await this.dataService.getRecipes()
    this.recipes = response.json()
  }
```

```js
  constructor(public dataService: DataService) {
    this.pageTitle = 'Recipes'
    // this.recipes = this.dataService.getRecipes()
  }
```


In recipe-detail component:

```js
  async ngOnInit() {
    const response = await this.dataService.getRecipe(this.id)
    this.recipe = response.json()
  }
```

in recipes-detail.component

```js
  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
  }
```

(BAD)
in service

`import { Router, ActivatedRoute, Params } from '@angular/router';`

```js
id: string;
recipe: Recipe;
recipes: Recipe[]
```


```js
getRecipe(id) {
  return this.http.get('http://localhost:3006/api/recipe/' + id).toPromise()
}
```

```js
constructor(private http: Http) { 
}
```

Ammend the link in recipes template:

```js
<h2>
  <a href="recipe/{{recipe._id}}">{{recipe.title}}</a>
</h2>

```

Safe / Elvis operator?

`<h1>{{ recipe?.title }}</h1>`

## Notes

### Adding the api url to environment vars

In the `environments` directory:

```js
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3006/'
};
```

In the service:

```js
import { environment } from 'environments/environment';

const API_URL = environment.apiUrl;
```

You can find the mapping between dev and prod and their corresponding environment files in .angular-cli.json:

```js
"environments": {
  "dev": "environments/environment.ts",
  "prod": "environments/environment.prod.ts"
}
```

You can also create additional environments such as staging by adding a key:

```js
"environments": {
  "dev": "environments/environment.ts",
  "staging": "environments/environment.staging.ts",
  "prod": "environments/environment.prod.ts"
}
```

and creating the corresponding environment file.

### Using Observables

service

```
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

  public getRecipes(): Observable<Recipe[]> {
    // return this.http.get('http://localhost:3006/api/recipe').toPromise()
    return this.http
      .get('http://localhost:3006/api/recipe')
      .map(response => {
        const recipes = response.json();
        return recipes.map((recipe) => new Recipe(recipe));
      });
  }
```

Recipe.ts:

```
export class Recipe {
  name: string;
    title: string;
    date: string;
    description: string;
    image: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
```

recipes component

In obersvables `subscribe` replaces promises' `then`.

An observable doesn't start emitting values until `subscribe` is called.

```js
  public ngOnInit() {
    // const response = await this.dataService.getRecipes()
    // this.recipes = response.json()
    this.dataService
      .getRecipes()
      .subscribe(
        (recipes) => {
          this.recipes = recipes;
        });
  }
```

## HttpClient

Module

```
import { HttpClientModule } from '@angular/common/http';

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule
  ],
```

Service

```
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

```

recipes component

```
<h2>
  <!-- <a href="recipe/{{recipe._id}}">{{recipe.title}}</a> -->
  <a [routerLink]="['/recipe', recipe._id]">{{recipe.title}}</a>
</h2>
```


recipes detail compoent

```
  public ngOnInit() {
    // const response = await this.dataService.getRecipe(this.id)
    // this.recipe = response.json()
    this.dataService
      .getRecipe(this.id)
      .subscribe(
        (recipes) => {
          this.recipe = recipes;
        });
  }
  ```

Remove the safe operators for recipe detail template

```
<h1>{{ recipe.title }}</h1>
<img style="width: 30%" src="assets/home/{{recipe.image}}" />
<p>{{ recipe.description }}</p>
<button (click)="back()">Back</button>
```























