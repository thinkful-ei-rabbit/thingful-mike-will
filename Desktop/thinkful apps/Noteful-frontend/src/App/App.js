import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import ErrorBoundary from '../ErrorBoundary';
import ApiContext from '../ApiContext';
import './App.css';


class App extends Component {
    state = {
        notes: [],
        folders: [],
        value:''
    };


    componentDidMount() {
        // fake date loading from API call
        console.log(`http://localhost:8000/api/notes`)
        Promise.all([
            fetch(`http://localhost:8000/api/notes`), fetch(`http://localhost:8000/api/folders`)
        ])
        .then(([notesRes, foldersRes]) => {
            console.log("TESTER")
            if(!notesRes.ok) {
                return notesRes.json().then(e => Promise.reject(e));
            }
            if(!foldersRes.ok) {
                return foldersRes.json().then(e => Promise.reject(e));
            }
            return Promise.all([notesRes.json(),foldersRes.json()])
        }).then(([notes, folders]) => { 
            console.log("TESTER2", notes, folders)
            this.setState({notes, folders}) 
        }).catch(e => {
            console.error({e});
        });
    }

    handleAddFolder = folder => {
        
        this.setState({
            folders: [...this.state.folders, folder]
            
        })
    }
    

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
      }
      
    handleAddNote = note => {
        this.setState({
            notes: [...this.state.notes, note]
        })
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                            />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-folder" component={AddFolder}/>
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote
        };
        
        return (
            <ApiContext.Provider value={value}>
                <ErrorBoundary>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
                </ErrorBoundary>
            </ApiContext.Provider>
        );
    }
} 


export default App;