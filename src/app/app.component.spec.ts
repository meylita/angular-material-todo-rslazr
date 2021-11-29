import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StateModule } from './state/state.module';

describe('AppComponent ', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [StateModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create app', () => {
    expect(component).toBeTruthy();
  });

  it('should add Todo', () => {
    component._toDo = { task: 'Learn something' };
    component.addToDo();
    let todoList: string[] = [];
    component.incompleteToDos.subscribe((val) => {
      for (let i = 0; i < val.length; i++) {
        todoList.push(val[i].task);
      }
    });
    console.log(todoList);
    expect(todoList).toContain('Learn something');
  });

  it('should set todoList to completed', () => {
    let todoList: any[] = [];
    let todoCompleted: any[] = [];
    let todoCompletedLength: number;
    let status: boolean = false;
    component.completeToDos.subscribe((data) => {
      todoCompleted = data;
      console.log(todoCompleted);
      if (!status) {
        todoCompletedLength = data.length;
      }
      status = true;
    });
    console.log();
    component.incompleteToDos.subscribe((data) => {
      todoList = data;
    });
    component.onCompleteToDo(todoList[1]);
    expect(todoCompleted.length).toBeGreaterThan(todoCompletedLength);
  });

  it('should set todoCompleted to todoList', () => {
    let todoList: any[] = [];
    let todoCompleted: any[] = [];
    let todoListLength: number;
    let status: boolean = false;
    component.incompleteToDos.subscribe((data) => {
      todoList = data;
      if (!status) {
        todoListLength = data.length;
      }
      status = true;
    });
    component.completeToDos.subscribe((data) => (todoCompleted = data));
    component.onIncompleteToDo(todoCompleted[0]);
    expect(todoList.length).toBeGreaterThan(todoListLength);
  });
});
