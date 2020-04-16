import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchMoviePage } from './search-movie.page';

describe('SearchMoviePage', () => {
  let component: SearchMoviePage;
  let fixture: ComponentFixture<SearchMoviePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMoviePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
