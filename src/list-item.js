import React from 'react'
import Comments from './post-comments';

const url = 'https://jsonplaceholder.typicode.com/users';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      colors: [
        'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
        'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
        'silver', 'teal', 'pink', 'yellow', 'tomato', 'salmon',
        'plum', 'olive', 'lime', 'chocolate', 'brown', '', 'white'
      ],
      user: null,
    };
  }

  componentDidMount() {
    const { item } = this.props
    if (item.userId) {
      fetch(`${url}/${item.userId}`)
        .then((response) => {
          response.json().then(user => {
            this.setState({ user });
          })
        })
        .catch((err) => {
          if (err) throw err
        });
    }
  }

  capitalizeFirstLetter(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render() {
    const { user, alphabet, colors } = this.state;
    const { item } = this.props;
    let firstWord = '';
    if (user) {
      firstWord = user.name.replace(/ .*/,'')[0].toLowerCase();
    }
    return (
      <div className="list-item">
        <div className="head">
          <div className="avatar" style={{ backgroundColor: `${user ? colors[alphabet.indexOf(firstWord)] : '#fff'}` }}>
            {firstWord.toUpperCase()}
          </div>
          <div className="identity">
            <div className="name">{user && user.name}</div>
            <div className="username">{user && `@${user.username}`}</div>
          </div>
        </div>
        <div className="title">{this.capitalizeFirstLetter(item.title)}</div>
        <div className="desc">{item.body}</div>
        <Comments postId={item.id} />
      </div>
    )
  }
}

export default ListItem;
