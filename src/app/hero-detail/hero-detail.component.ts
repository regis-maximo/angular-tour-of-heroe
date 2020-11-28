import { Location, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  
  constructor(private route: ActivatedRoute,
              private location: LocationStrategy,
              private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
    
      this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  back(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.back());
  }
}
