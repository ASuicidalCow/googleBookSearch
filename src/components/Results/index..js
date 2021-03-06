import React, { Component } from 'react';

import API from '../../utils/API';

class Results extends Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    API.savedBooks()
      .then((savedBooks) => this.setState({ savedBooks: savedBooks }))
      .catch((err) => console.error(err));
  }

  handleSave = (book) => {
    if (this.state.savedBooks.map((book) => book._id).includes(book._id)) {
      API.deleteBook(book._id)
        .then((deletedBook) =>
          this.setState({
            saveBooks: this.state.savedBooks.filter(
              (book) => book._id !== deletedBook._id
            )
          })
        )
        .catch((err) => console.error(err));
    } else {
      API.saveBook(book)
        .then((savedBook) =>
          this.setState({
            savedBooks: this.state.savedBooks.concat([savedBook])
          })
        )
        .catch((err) => console.error(err));
    }
  };

  render() {
    return (
      <div>
        {!this.props.books.length ? (
          <h1 className='text-center'>No Results Found</h1>
        ) : (
          <div>
            {this.props.books.map((result) => (
              <div className='card mb-3' key={result._id}>
                <h5 className='card-title'>
                  {result.title} by {result.authors}
                </h5>
                <p className='card-text'>{result.description}</p>
                <div>
                  <a
                    href={result.link}
                    className='btn badge-pill btn-outline-dark mt3'
                    target='-blank'>
                    View
                  </a>
                  <button
                    onClick={() => this.handleSave(result)}
                    className='btn badge-pill btn-outline-warning mt-3 ml-3'>
                    {this.setState.savedbooks.map((book) => book._id).includes(result._id) ? 'Unsave' : 'Save'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Results;
