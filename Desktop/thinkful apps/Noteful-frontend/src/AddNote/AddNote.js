import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';
import ValidateNote from './ValidateNote';
import './AddNote.css'
import config from '../config';

export default class AddNote extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props)
        this.state = {
            newNote: {
                value: '',
                touched: false,
            },
            noteContent: {
                value: '',
                touched: false,
            }
        }
    }

    updateNewNote(newNote) {
        this.setState({ newNote: { value: newNote, touched: true } })
    }

    updateNoteContent(noteContent) {
        this.setState({ noteContent: { value: noteContent, touched: true } })
    }


    handleSubmit = (e) => {
        console.log("click")
        e.preventDefault();
        const newNoteName = e.target.newNote.value;
        const newNoteContent = e.target.noteContent.value;
        const folderId = e.target.selectFolder.value;

        fetch(`${config.API_ENDPOINT}api/notes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ note_name: newNoteName, note_content: newNoteContent, modified_date: new Date(), folder_id:folderId})
        })
            .then(response => response.json())
            .then((newAddNote) => {
                this.context.addNote(newAddNote)
                this.props.history.push('/')
            })
            .catch((error) => {
                // console.log('catch', error);
            });

    }

    validateNoteName() {
        const newNoteName = this.state.newNote.value.trim();
        // console.log('validate note ran')
        if (newNoteName.length === 0) {
            return 'Your note needs a name!'
        }
    }

    validateNoteContent() {
        const updateNoteContent = this.state.noteContent.value.trim();
        if (updateNoteContent.length < 3) {
            return `2 characters don't make a note!`
        }
    }



    render() {
        return (
            <div>
                <form className="Note__add" onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="newNote">Add a new note!</label>
                    <input type="text"
                        className="Note__add"
                        name="newNote"
                        id="newNote"
                        onChange={e => this.updateNewNote(e.target.value)}                                               
                        required>
                    </input>

                    <label htmlFor="newNote">Add new content!</label>
                    <input type="text"
                        className="Note__add"
                        name="noteContent"
                        onChange={e => this.updateNoteContent(e.target.value)}                                                
                        required
                    ></input>

                    <select name="selectFolder">{this.context.folders.map(folder =>
                        <option key={folder.id} value={folder.id}>{folder.folder_name}</option>)}
                    </select>
                    <button
                        className='Note__add'
                        type='submit'
                        disabled={
                            this.validateNoteName() ||
                            this.validateNoteContent()
                        }>
                        <FontAwesomeIcon icon='plus' />
                        {' '}
            Add Note
            </button>
                </form>
                {this.state.newNote.touched && <ValidateNote message={this.validateNoteName()} />}
                {this.state.noteContent.touched && <ValidateNote message={this.validateNoteContent()} />}
            </div>
        )
    }
}