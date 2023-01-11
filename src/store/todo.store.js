import { Todo } from "../todos/models/todo.models";

export const Filters = {
    All: 'all',
    Completed: 'Complited',
    Pending: 'Pending'
}

const state = {
    todos: [
        // new Todo('piedra del alma'),
        // new Todo('piedra del espacio'),
        // new Todo('piedra del tiempo'),
        // new Todo('piedra del poder'),
        // new Todo('piedra del realidad'),
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
    console.log( 'Init store' );
}

const loadStore = () =>{
    if( !localStorage.getItem( 'state' )  ){
        return
    }
    const { todos = [], filter  =[] } = JSON.parse( localStorage.getItem( 'state' ) );

    state.todos = todos;
    state.filter = filter;

    // state = JSON.parse( localStorage.getItem( 'state' ) );
    
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state) );
}

const getTodos = ( filter = Filters.All ) =>{
    
    switch ( filter ) {
        case Filters.All:
            return [...state.todos];
        
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        
        default:
            throw new Error(`Option ${ filter } is not valid.`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) =>{
    if( !description ) throw new Error('Desciption is required');

    state.todos.push( new Todo( description ) );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toogleTodo = ( todoId ) =>{

    state.todos = state.todos.map( todo =>{
        if( todo.id === todoId ){
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();

}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) =>{
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
}


const deleteCompleted = () =>{
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */

const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
}

const getcurrentFilter = () =>{
    return state.filter;
}



export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getcurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toogleTodo,
}