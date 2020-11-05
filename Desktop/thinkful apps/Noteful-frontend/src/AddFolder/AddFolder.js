import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddFolder.css';
import ApiContext from '../ApiContext';
import config from '../config';
// console.log("hey")
export default class AddFolder extends React.Component {
   
    static contextType = ApiContext;
    
    

    handleSubmit = (e) => {
        e.preventDefault();
       
       
        // const newFolderName = {name:e.target.newFolder.val};
        const newFolderName = e.target.newFolder.value;
        // console.log('plz',newFolderName)
        // const newFolderName = {folder_name}

        fetch(`${config.API_ENDPOINT}api/folders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ folder_name: newFolderName } )
           
        })
            .then(response => response.json())
           
            .then((newFolder) => {
               
                this.context.addFolder(newFolder)
                this.props.history.push(`/`)
                // console.log('success',newFolder)
            })
            .catch((error) => {
                // console.log('catch', error);
            });
            
    }

    
    render() {

        // console.log('yams',this.context)

        // const {
        //     folders = [], notes = []
        // } = this.context
        // console.log("attempt",this.handleSubmit)
        // console.log('yams',this.context.folders)
        // console.log("YEERP",e.target.newFolder.value)
        return (
            <div>
                <form className="Folder__add" onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="newFolder">Add a new folder!</label>
                    <input 
                        type="text"
                        className="Folder__add"
                        name="newFolder"
                        id="newFolder"
                       
                        // {console.log('plz',newFolderName)}

                    ></input>
                    
                    <button className='Folder__add' type='submit'>
                        <FontAwesomeIcon icon='plus' />
                        {' '}
            Add Folder
            </button>
                </form>
            </div>
            
        )
       
    }
}

//1.when fetch returns put folders and notes in context then rerender
//2. research context
//3.look at example solution
//4. google
