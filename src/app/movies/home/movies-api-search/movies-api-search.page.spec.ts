import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoviesApiSearchPage } from './movies-api-search.page';

describe('MoviesApiSearchPage', () => {
  let component: MoviesApiSearchPage;
  let fixture: ComponentFixture<MoviesApiSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesApiSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesApiSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
