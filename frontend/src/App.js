import React, { Component } from 'react';
import logo from './assets/logo192.png'
import './App.css';
import Axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {  members: [] , gender: [] , 
                    firstname: '', 
                    lastname: '', 
                    genderId: '',
                    member_id: '', 
                    age: '' 
                  }
    this.handleInput = this.handleInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() { // eslint-disable-next-line
    { this.getMember() } // eslint-disable-next-line
    { this.getGender() }
  }

  getMember = () => {
    var dataMember = []
    Axios.get('http://localhost:4000/members').then(result => {
        console.log(result.data)
        result.data.forEach(item => {
          dataMember.push(item)
        })
        this.setState({ members: dataMember })
    })
  }

  getGender = () => {
    var dataGender = []
    Axios.get('http://localhost:4000/genders').then(result => {
        console.log(result.data)
        result.data.forEach(item => {
          dataGender.push(item)
        })
        this.setState({ gender: dataGender })
    })
  }

  handleInput(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
        this.setState({
            [name]: value,
        });
  }

  handleSubmit = event => {
    event.preventDefault();
    Axios.post(`http://localhost:4000/members`, {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        age: parseInt(this.state.age),
        genderId: this.state.genderId
    })
        .then(res => {
            console.log(res);
            console.log(res.data);
            console.log('Member Added!!');
        })
    console.dir(this.state);
    window.location.reload();
  }

  handleDelete(member_id) {
    Axios.delete(`http://localhost:4000/members/${member_id}`)
        .then(() => {
          console.log('Member Deleted!!');
        });
    window.location.reload();
  }

  render () {
    return (
      <div>
        <center>
        <img src={logo} alt="Logo" />
          <h1> Member </h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="firstname" placeholder = "Firstname" value={this.state.firstname} onChange={this.handleInput}/>
            <br/>
            <input type="text" name="lastname" placeholder = "Lastname" value={this.state.lastname} onChange={this.handleInput}/>
            <br/>
            <input type="text" name="age" placeholder = "Age" value={this.state.age} onChange={this.handleInput}/>
            <br/>              
            <select name="genderId" value={this.state.genderId} onChange={this.handleInput}>
              <option disabled={true} hidden value="">Select Gender</option>
                { this.state.gender.map((gen, index) => (
                  <option value={gen._id} key={index} >{gen.gendername}</option>
                )) }
            </select>            
            <br/>
            <button type="submit">Submit</button>
          </form>        
          <hr/>
          <table border='1' width='80%' cellSpacing="0">
            <tbody>
              <tr>
                <th>MemberID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Delete</th>
              </tr>
              {this.state.members.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.age}</td>
                  <td>{item.sex.gendername}</td>
                  <td align= "center"><button onClick={()=>{this.handleDelete(item._id)}}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </div>
    );
  }
  
}

export default App;
