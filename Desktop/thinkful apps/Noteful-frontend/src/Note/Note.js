import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';

export default class Note extends React.Component{
  static defaultProps = {
    onDeleteNote: () => {},
  }

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    console.log(this.props.id);
    const noteId = this.props.id

    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }
render () { 
  const { name, id, modified } = this.props
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={this.handleClickDelete}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
}

Note.propTypes ={
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
};