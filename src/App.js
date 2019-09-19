import React, { Component } from 'react';
import './App.css';
import Picture from './img/user.jpg';

// For the {address}
const displayAddress = ({ street, suite, city, zipcode }) => `${suite}, ${street}, ${zipcode}, ${city}.`

class App extends Component {

  // API
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filteredItems: [],
      isLoaded: false,
    }
  }

  // Fetch API
  componentDidMount() {
    fetch('http://www.mocky.io/v2/5d73bf3d3300003733081869')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
          filteredItems: json
        })
      });
  }

  // Handling the filter
  handleAgeSelect = e => {
    const mappings = {
      0: person => person,
      1: person => person,
      2: person => person.age >= 1 && person.age <= 20,
      3: person => person.age >= 21 && person.age <= 39,
      4: person => person.age >= 40
    }
    this.setState({
      filteredItems: this.state.items.filter(mappings[e.target.value])
    })
  }

  render() {

    // API
    var { isLoaded, filteredItems } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>
    } else {

      return (

        // Handling the filter
        <div>
          <p className="Title"><b>DISTRICT MANAGER</b></p>
          <div class="filter-style">
            <p>Filter By Age</p>
            <select onChange={this.handleAgeSelect}>
              <option value={0}>Select Age</option>
              <option value={1}>All</option>
              <option value={2}>20 and below</option>
              <option value={3}>21 to 39</option>
              <option value={4}>40 and above</option>
              <br className="divider"></br>
            </select>

            <hr className="divider" style={{ borderTop: '50px solid #grey' }} />
          </div>

          <br></br>



          <div>
            <ul>
              <div class="flex-container" >

                {filteredItems.map(item => (

                  <div className="row flex-container-box item" key={item.id}>
                    <div className=" col-4" >
                      <img src={Picture} className="img"></img>
                    </div>
                    <div className=" col-8" >
                      <a className="text"><b>{item.name}</b></a>
                      <br></br>
                      Email: <b>{item.email}</b>
                      <br></br>
                      Mobile: <b>{item.phone}</b>
                      <br></br>
                      Company: <b>{item.company}</b>
                      <br></br>
                      Address: <b>{displayAddress(item.address)}</b>
                      <br></br>
                      Website: <b>{item.website}</b>
                      <br></br>
                      Age: <b>{item.age}</b>
                    </div>
                  </div>
                ))}
              </div>
            </ul>
          </div>
        </div>



      );
    }
  }
}

export default App;
