import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render key portfolio sections', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#home')).toBeTruthy();
    expect(compiled.querySelector('#experience')).toBeTruthy();
    expect(compiled.querySelector('#projects')).toBeTruthy();
    expect(compiled.querySelector('#skills')).toBeTruthy();
    expect(compiled.querySelector('#contact')).toBeTruthy();
  });

  it('should switch to english content', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as unknown as { setLang: (lang: 'ru' | 'en') => void };

    app.setLang('en');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#about h2')?.textContent).toContain('About');
    expect(compiled.querySelector('.topnav a:nth-child(2)')?.textContent).toContain('About');
  });
});
