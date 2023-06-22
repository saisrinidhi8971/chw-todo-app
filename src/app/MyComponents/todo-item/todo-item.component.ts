import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/TODO';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit{
@Input() todo!:Todo;
@Output() todoDelete:EventEmitter<Todo>=new EventEmitter<Todo>();
constructor(){ }
ngOnInit(): void {

}
onClick(todo:Todo){
  this.todoDelete.emit(todo);
  console.log("Deleted");
}

}
