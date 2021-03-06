import './App.css';
import {Fragment} from 'react'
import InputTodo from './component/InputTodo'
import ListTodos from './component/ListTodos'

function App() {
  return (
   <Fragment>
     <div className='container'>
       <InputTodo />
       <ListTodos />
     </div>
   </Fragment>
  );
}

export default App;
