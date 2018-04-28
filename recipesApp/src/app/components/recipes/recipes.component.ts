import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [DataService]
})
export class RecipesComponent implements OnInit {

  pageTitle: string;
  recipes: object[];
  recipe: Recipe;

  constructor(public dataService: DataService) {
    this.pageTitle = 'Recipes'
    // this.recipes = this.dataService.getRecipes()
  }
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
}