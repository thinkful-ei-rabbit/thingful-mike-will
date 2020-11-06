import React from 'react';
import Note from '../Note/Note';
import './NotePageMain.css';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';
import { findNote } from '../notes-helpers';



export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  handleDeleteNote = noteID => {
    this.props.history.push(`/`)
  }

  render () {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content:'' }
    console.log('content check',note.content)
  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.note_name}
        modified={note.modified_date}
        onDeleteNote={this.handleDeleteNote}
        
      />
      <div className='NotePageMain__content'>
        {note.note_content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}

NotePageMain.propTypes ={
  match: PropTypes.object
};