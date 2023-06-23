import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import{Todo}from '../../TODO';
interface ApiTodo {
  sno:number;
  title:string;
  desc:string;
  active:boolean;
}


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  localItem:string|null;

  todos!:Todo[];
  apiTodos!: ApiTodo[];

  constructor(private http: HttpClient){
    this.localItem=localStorage.getItem("todos");
    if(this.localItem==null){
    this.todos=[]
    }
    else{
      this.todos=JSON.parse(this.localItem);
    }
    console.log('Stored Todos:', this.todos); // Display stored todos in the console

  }
  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.http.get<ApiTodo[]>('http://localhost:3000/api/todos').subscribe(apiTodos => {
      this.apiTodos = this.todos;
      console.log('API Todos:', this.apiTodos);
      localStorage.setItem('todos', JSON.stringify(this.apiTodos));
    });
  }


  deleteTodo(todo:Todo){
    console.log(todo);
    const index=this.todos.indexOf(todo);
    this.todos.splice(index,1);
    localStorage.setItem("todos",JSON.stringify(this.todos));
  }
  addTodo(todo:Todo){
    console.log(todo);
    this.todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(this.todos));
    this.updateTodos();

  }
  toggleTodo(todo:Todo){
    console.log(todo);
    const index=this.todos.indexOf(todo);
    this.todos[index].active=!this.todos[index].active;
    localStorage.setItem("todos",JSON.stringify(this.todos));
  }
  updateTodos() {
    this.http.post('http://localhost:3000/api/todos', this.todos).subscribe(response => {
      response = this.todos;
      console.log('Todos sent to API:', response);
    });
  }


}
