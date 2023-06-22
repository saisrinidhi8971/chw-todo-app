import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/TODO';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit{

  title!:string;
  desc!:string;
  @Output() todoAdd:EventEmitter<Todo>=new EventEmitter<Todo>();

constructor(){

}
ngOnInit(): void {

}
onSubmit(){
  const todo={
    sno:8,
    title:this.title,
    desc:this.desc,
    active:true
  }
  this.todoAdd.emit(todo);


}

}
