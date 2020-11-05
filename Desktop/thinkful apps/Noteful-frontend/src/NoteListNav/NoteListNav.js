import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import ApiContext from '../ApiContext'

export default class NoteListNav extends React.Component{
  static contextType = ApiContext;

  render () {
    // console.log('NAV',this.context.folders)
    // console.log('NAV',folder.id)
    const { folders=[], notes=[] } = this.context
    return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {/* {console.log('check',folders)} */}
        {folders.map(folder =>
          <li key={folder.id}>
            
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(notes, folder.id)}
              </span>
              {folder.folder_name}
              {/* {console.log('folders',folder)} */}
              {/* {console.log('notes',notes)} */}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
      </div>
    </div>
  )
}
}

//to={`/folder/${folder.id}`}
//change to {`/api/folders/${id}`}