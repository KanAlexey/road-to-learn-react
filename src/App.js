import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = searchTerm => item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

const lg = {
  width: '40%',
};
  
const md = {
  width: '30%',
};

const sm = {
  width: '10%',
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId)
    this.setState({ list: updatedList })
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
          >
          Search
          </Search>
        </div>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}


const Search = ({ value, onChange, children }) => 
    <form>
      {children}
      <input 
        type="text"
        value={value}
        onChange={onChange} />
    </form>

const Table = ({ list, pattern, onDismiss }) =>
      <div className="table">
        {list.filter(isSearched(pattern)).map(item => 
          <div key={item.objectID} className="table-row">
            <span style={lg}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={md}>{item.author}</span>
            <span style={sm}>{item.num_comments}</span>
            <span style={sm}>{item.points}</span>     
            <span style={sm}>
              <Button 
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>         
          </div>
        )}
      </div>


const Button = ({ onClick, className = '', children }) =>
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>


export default App;
