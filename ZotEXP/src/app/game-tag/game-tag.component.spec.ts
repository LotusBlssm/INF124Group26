import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTagComponent } from './game-tag.component';

describe('GameTagComponent', () => {
  let component: GameTagComponent;
  let fixture: ComponentFixture<GameTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
