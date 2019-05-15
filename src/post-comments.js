import React from 'react'

const url = `https://jsonplaceholder.typicode.com/comments?postId=`;

class PostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showComments: false,
    };
    this.handleComment = this.handleComment.bind(this)
  }

  componentDidMount() {
    const { postId } = this.props
    if (postId) {
      fetch(`${url}${postId}`)
        .then((response) => {
          response.json().then(comments => {
            this.setState({ comments });
          })
        })
        .catch((err) => {
          if (err) throw err
        });
    }
  }

  handleComment() {
    const { showComments } = this.state;
    this.setState({ showComments: !showComments })
  }

  render() {
    const { comments, showComments } = this.state;
    if (comments.length === 0) return null;
    return (
      <div className="list-comments">
        <button onClick={this.handleComment}>Comments</button>
        {
          showComments && (
            <div>
              {
                comments.length > 0
                ? <ListComment comments={comments} />
                : <div>Empty Comments</div>
              }
            </div>
          )
        }
      </div>
      
    )
  }
}

const ListComment = ({ comments }) => {
  return (
    <div>
      {
        comments.map((item, i) => {
          return (
            <div className="comment" key={i}>
              <div className="email">{item.email}</div>
              <div className="desc">
                {
                  item.body.length > 50
                  ? `${item.body.substring(0, 50)}...`
                  : item.body
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PostComments;
