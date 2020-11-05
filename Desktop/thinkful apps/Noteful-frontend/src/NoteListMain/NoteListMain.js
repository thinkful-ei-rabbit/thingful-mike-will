import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Note from '../Note/Note';
import CircleButton from '../CircleButton/CircleButton';
import './NoteListMain.css';
import { getNotesForFolder } from '../notes-helpers';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render () {
    // console.log("hope",this.context)
    const { notes=[] } = this.context
    const { folderId } = this.props.match.params
    const notesForFolder = getNotesForFolder(notes, folderId)
    return ( 
    <section className='NoteListMain'>
      <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.note_name}
              modified={note.modified_date}
            />
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )
  }
}

NoteListMain.propTypes ={
  match: PropTypes.object
};

//1.rename id on line 30