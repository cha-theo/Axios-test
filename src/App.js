import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React from 'react';


//Conection with the herokuapp
const api = axios.create({
  baseURL: 'https://my-mockk-api.herokuapp.com/mockapi'
})



class App extends React.Component {
 
  state ={
    courses: []
  }

  constructor() {
    super();
    this.getCourses();
  }


  getCourses = async() => {
    let data = await api.get('/').then(({ data }) => data);      
    this.setState({ courses: data})
  }

  createCourse= async () =>{
    let res = await api.post('/', {onoma: "Testing1234", id: "1", poly:'test'})
    console.log(res)
    this.getCourses();
  }

  deleteCourse= async (id) =>{
    let data = await api.delete(`/${id}`)
    this.getCourses();
  }


  updateCourse =async(id, val)=>{
    let data = await api.patch(`/${id}`, {onoma: val})
    this.getCourses()
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        
        {this.state.courses.map(course => <h2 key={course.id} onClick={()=> this.updateCourse(course.id, `${course.onoma}a`)}>{course.onoma} <button onClick={()=>this.deleteCourse(course.id)}>X</button></h2>
        )}

        <button onClick={this.createCourse}>Create home</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
  }
}

export default App;
