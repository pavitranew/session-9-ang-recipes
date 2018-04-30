import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { DataService } from '../../service/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: string;
  formEnabled: boolean;
  
  back() {
    window.history.back()
  }

  editRecipe(){
    console.log(this.recipe.title)
  }

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    this.formEnabled = false;
  }

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

}
