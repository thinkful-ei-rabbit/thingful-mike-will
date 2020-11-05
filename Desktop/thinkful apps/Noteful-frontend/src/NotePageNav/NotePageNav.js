import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import PropTypes from 'prop-types';
import { findNote, findFolder } from '../notes-helpers';
import ApiContext from '../ApiContext'



export default class NotePageNav extends React.Component {

  
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render () {
    
    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content:'' }
    const folder = findFolder(folders, note.folder_id)
   
    console.log("yo2",)
  return (
    
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.folder_name}
        </h3>
      )}      
    </div>
  )
}
}
NotePageNav.propTypes ={
  match: PropTypes.object
};