import { Component } from '@angular/core';

type TodoType = {
  id: number,
  todo: string,
  status: boolean,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mode: 'react' | 'angular' = 'angular';

  todoList:TodoType[] = this.localSync();

  addTodo(todoInput: HTMLInputElement){
    const todo:TodoType = {
      id: Date.now(),
      status: false,
      todo: todoInput.value
    }
    this.todoList.push(todo);
    todoInput.value = '';
    this.localSync(true);
  }

  localSync(set = false){
    if(set){
      localStorage.setItem('todos', JSON.stringify(this.todoList));
      return this.todoList;
    }else{
      return JSON.parse(localStorage.getItem('todos') ?? "[]")
    }
  }

  switchMode(newMode: 'react' | 'angular'){
    this.mode = newMode;
    if(newMode == 'react'){
      window.postMessage({type: 'start-react', from:'APP'})
    }else{
      window.postMessage({type: 'stop-react', from:'APP'})
    }
    this.todoList = this.localSync()
  }

  deleteTodo(id:number){
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    this.localSync(true);
  }

  trackByTodo(index:number, todo: TodoType){
    return todo.id;
  }

}
