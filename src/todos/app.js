import  html  from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderPending, renderTodos } from "./use-cases";


const elementIds = {
    clearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}
/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId )=>{

    const displayTodos = ()=> {
        const todos = todoStore.getTodos( todoStore.getcurrentFilter() );
        renderTodos( elementIds.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( elementIds.PendingCountLabel )
    }

    // funcion autoinvocada cuando APP() se llama 
    ( ()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput  = document.querySelector( elementIds.newTodoInput );
    const todoListUL           = document.querySelector( elementIds.TodoList );
    const clearCompletedButton = document.querySelector( elementIds.clearCompleted );
    const filterUL             = document.querySelectorAll( elementIds.TodoFilters );

    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) =>{

        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value='';

    } );

    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toogleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        const isDestroElement  = event.target.className;

        if ( isDestroElement == 'destroy') {
            console.log('😧');
            todoStore.deleteTodo( element.getAttribute('data-id') );
            displayTodos();
        }
    

    });

    clearCompletedButton.addEventListener('click', ( event )=>{
        todoStore.deleteCompleted();
        displayTodos();

    });

    filterUL.forEach( element => {
        element.addEventListener('click', ( element ) =>{

            filterUL.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected')

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;
                
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
                
            }

            displayTodos();

        });
    });


}
