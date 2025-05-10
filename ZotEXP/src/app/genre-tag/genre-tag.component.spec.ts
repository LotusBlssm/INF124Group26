import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreTagComponent } from './genre-tag.component';

describe('GenreTagComponent', () => {
  let component: GenreTagComponent;
  let fixture: ComponentFixture<GenreTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
