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
  
  back() {
    window.history.back()
  }

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
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
