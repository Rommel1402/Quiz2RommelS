import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpagesComponent } from './postpages.component';

describe('PostpagesComponent', () => {
  let component: PostpagesComponent;
  let fixture: ComponentFixture<PostpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
