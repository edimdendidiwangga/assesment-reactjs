import React from 'react'
import ListItem from './list-item'
import './index.css';
const url = 'https://jsonplaceholder.typicode.com/posts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch(url)
      .then((response) => {
        response.json().then(data => {
          this.setState({ data });
        })
      })
      .catch((err) => {
        if (err) throw err
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="container">
        {
          data.map((item, i) => {
            if (i < 100 && i % 5 === 0) {
              return (
                <ListItem item={item} />
              )
            }
            return null
          })
        }
        
      </div>
    )
  }
}

export default App;
