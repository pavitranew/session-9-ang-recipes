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

and a service with a flag to update the app module:

`ng generate service service/data --module app.module.ts`

Examine `app.module.ts` - note the addition of a service

Create a second tab in the terminal and run:

`ng serve`

In `app.component.html`:

```html
<div class="wrap">
    <app-recipes></app-recipes>
</div>
```

## Recipes Component

Add a typed variable to the `recipes.component` class :

`pageTitle: string;`

and

`this.pageTitle = 'Recipes'`

to the constructor, e.g.:

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

Add css from the assets folder. Note the error and correct it.

Add data to `recipes` constructor:

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

Note the error. Set the types in the class:

`recipes: object[];`

Add a definition for a single recipe in the class:

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

Add a `.recipe-entry` class to the `recipes template` and css for the recipes component css:

```css
@media (max-width: 620px){
  .wrap li {
    display: flex;
    flex-direction: column;
  }
  .wrap li img {
    width: 100%;
    margin-bottom: 1rem;
  }
}
```

Note that we are already off to a bad start with our css. Let's use mobile first design and SASS for our global styles.

Create some workspace prefs at the root of the project:

```js
{
  "liveSassCompile.settings.formats": [
    {
      "savePath": "/foodApp/src/",
      "format": "expanded"
    }
  ],
  "liveSassCompile.settings.excludeList": ["**/node_modules/**", ".vscode/**", "**/other/**"]
}
```

Create a `sass` directory at the root of the project and save the existing css into it.

Test with:

```css
* {
  color: var(--blue);
}
```

Adjust the global sass file:

```css
@import url("https://fonts.googleapis.com/css?family=Lobster");

:root {
  --blue: #007eb6;
  --green: #3f504a;
}
html {
  box-sizing: border-box;
  font-family: 'helvetica neue';
  font-size: 20px;
  font-weight: 200;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  min-height: 100vh;
  margin: 0;
  background-color: var(--blue);
}

.wrap {
  background: #eee;
  max-width: 90%;
  padding: 0.5rem;
  margin: 1rem auto;
}
h1,
h2 {
  font-family: lobster;
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

.recipes li {
  display: flex;
  flex-direction: column;
  @media (min-width: $breakone){
    flex-direction: row;
    padding: 1rem;
  }
}

.recipes li img {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  margin-right: 1rem;
  background-color: #fff;
  box-shadow: 2px 2px 4px #ccc;
  @media (min-width: $breakone){
    width: 30%;
  }
}

.recipes li a {
  color: #7e360d;
  text-decoration: none;
}

```

Note that you cannot use a native css variable for a break point, e.g.:

`--breakone: 620px;` is not inherited because a media query is not an element, it does not inherit. We use sass variables instead:

`$breakone: 620px;` and `@media (min-width: $breakone)`

## Angular CLI Sass

Important! Turn off the sass watching in VSCode.

We can retrofit our existing project to use sass with:

```sh
ng set defaults.styleExt scss
```

which adds this to the `.angular-cli.json` file:

```js
"defaults": {
  "styleExt": "scss",
  "component": {
  }
}
```

Note that we can control the location of the global scss files as well (there are a variety of preprocessor options). We will place our sass folder in `src` and edit the `.angular-cli.json` file:

```js
"styles": [
  "sass/styles.scss"
],
"stylePreprocessorOptions": {
  "includePaths": [

  ]
},
```

Move the sass directory into `src`.

Our recipes component css can then be renamed to `recipes.component.scss`. 

We then have to manually rename our recipes styleUrl:

```js
styleUrls: ['./recipes.component.scss']
```

Now we can use sass in our component style sheets:

```css
.recipes {
  li {
    display: flex;
    flex-direction: column;
    @media (min-width: $breakone){
      flex-direction: row;
      padding: 1rem;
    }
  }

  li img {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    margin-right: 1rem;
    background-color: #fff;
    box-shadow: 2px 2px 4px #ccc;
    @media (min-width: $breakone){
      width: 30%;
    }
  }

  li a {
    color: #7e360d;
    text-decoration: none;
  }
}
```

Almost. Create a variables sass partial in the global sass directory with:

`$breakone: 620px;`

and import it into the recipes scss file:

`@import '../../../sass/variables';`

Our globals are now in the sass directory:

```css
@import 'variables';

@import url("https://fonts.googleapis.com/css?family=Lobster");

:root {
  --blue: #007eb6;
  --green: #3f504a;
}
html {
  box-sizing: border-box;
  font-family: 'helvetica neue';
  font-size: 20px;
  font-weight: 200;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  min-height: 100vh;
  margin: 0;
  background-color: var(--blue);
}

.wrap {
  background: #eee;
  max-width: 90%;
  padding: 0.5rem;
  margin: 1rem auto;
}
h1,
h2 {
  font-family: lobster;
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
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

Exercise: add a 'Recipe' page title to the recipe page.

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

In `app.module` we have:

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

<!-- ## A note on `public`

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

By simply prefixing the constructor arg with the word private (or public or readonly) it automatically creates the property and initializes it from the constructor args. -->

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
1. in a new conole, cd into the backend directory
1. npm install
1. examine `app.js`
1. `npm run start` the api in backend
1. test at the get api endpoint `http://localhost:3006/`

add http service to `app.module`:

```js
import { HttpModule } from '@angular/http';

...

imports: [
  BrowserModule,
  RouterModule.forRoot(appRoutes),
  HttpModule
],
```

Now that its added to our app we can use it in the `service`:

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

<!-- GOOD
`import { Http } from '@angular/http';` -->

## API

Note the `app.use` headers in `app.js`. Uncomment these lines.

### Recipes List

Use async on the ngOnInit life cycle hook to bring in the recipes:

 in `recipes.component`:

```js
  async ngOnInit() {
    const response = await this.dataService.getRecipes()
    this.recipes = response.json()
  }
```

We can comment out the call to data service in the constructor:

```js
  constructor(public dataService: DataService) {
    this.pageTitle = 'Recipes'
    // this.recipes = this.dataService.getRecipes()
  }
```

### Recipe Detail

In `recipe-detail` component:

```js
  async ngOnInit() {
    const response = await this.dataService.getRecipe(this.id)
    this.recipe = response.json()
  }
```

in `recipe-detail.component`:

```js
  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
  }
```

### Data Service

In `service`:

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

### Recipes List HTML

Ammend the link in `recipes` template to use Mongo's `_id`:

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

In `service`

```js
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

Configure our Recipe as an exported object.

In `Recipe.ts`:

```js
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

In `recipes component`:

In observables `subscribe` replaces promises' `then`.

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

Note `public ngOnInit`, not async.

## HttpClient (vs Http)

In `module`

```js
import { HttpClientModule } from '@angular/common/http';

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule
  ],
```

In `Service`

```js
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

In `recipes component`

```html
<h2>
  <!-- <a href="recipe/{{recipe._id}}">{{recipe.title}}</a> -->
  <a [routerLink]="['/recipe', recipe._id]">{{recipe.title}}</a>
</h2>
```

Extend the use of Observables to the `recipes detail` component:

```js
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

Remove the safe operators for `recipe detail` template

```html
<h1>{{ recipe.title }}</h1>
<img style="width: 30%" src="assets/home/{{recipe.image}}" />
<p>{{ recipe.description }}</p>
<button (click)="back()">Back</button>
```
