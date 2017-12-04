import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../../models/Recipe';
import { DataService } from '../../service/data.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

	id: string;
	recipe: Recipe;

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    
  }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
    const response = await this.dataService.getRecipe(this.id)
    // console.log(response)
    this.recipe = response.json()
  }

  back() {
  	window.history.back()
	}

}
