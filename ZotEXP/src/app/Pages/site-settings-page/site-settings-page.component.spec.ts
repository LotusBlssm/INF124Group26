import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSettingsPageComponent } from './site-settings-page.component';

describe('SiteSettingsPageComponent', () => {
  let component: SiteSettingsPageComponent;
  let fixture: ComponentFixture<SiteSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteSettingsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
