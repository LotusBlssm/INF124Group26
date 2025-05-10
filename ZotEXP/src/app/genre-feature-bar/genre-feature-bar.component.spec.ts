import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreFeatureBarComponent } from './genre-feature-bar.component';

describe('GenreFeatureBarComponent', () => {
  let component: GenreFeatureBarComponent;
  let fixture: ComponentFixture<GenreFeatureBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFeatureBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreFeatureBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
