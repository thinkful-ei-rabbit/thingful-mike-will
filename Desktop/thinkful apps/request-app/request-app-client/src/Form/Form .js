import React, {Component} from 'react';
// import { Link } from 'react-router-dom'
import'./form.css'

export default class Form extends Component {
    ///state ///constructor ///super props ///name:name ///collect info for form
    constructor(props) {
        super(props);
        this.state = {
            name:" ",
            title:" ",
            artist:" ",
            comment:" "
        }
    }
    nameChanged(name) {
        this.setState({
            name
        })
    }

    titleChanged(title) {
        this.setState({
            title
        })
    }

    artistChanged(artist) {
        this.setState({
            artist
        })
    }

    commentChanged(comment) {
        this.setState({
            comment
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()
         const { name, title, artist, comment } = this.state;
         const newSong = { name, title, artist, comment }
         console.log(newSong)
        const url = 'https://mighty-temple-37477.herokuapp.com/api/songs'
        const options ={
            method: 'POST',
            body: JSON.stringify(newSong),
            headers: {
                'content-Type': 'application/json'
            }
           
        };

        fetch(url,options)
        .then(res => {
            console.log(res)
            if(!res.ok) {
                throw new Error('something went wrong please try again')
            }
            return res.json()
        })
        .then(newSong => {
            this.setState({
                name:" ",
                title:" ",
                artist:" ",
                comment:" "
            })
            this.props.handleAdd(newSong)
        })
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
        ///start with url
        ///give a body


        //make a post request to add data to the server
        //add it to my apps state
    }

    // handleChange = (event) =>{
    //     console.log('clicked')

    // }
    //onchange
        //update the state everytime an endpoint is edited
        //collecting data in one place

    
   
    render(){
        
        //state
        //pull data from state send to api
return (
    <form
    onSubmit={this.handleSubmit}
    >
            <h1 class="neon">REQUEST APP</h1>
            <h2>How would you like to party</h2>

        <label name ="name">Name</label><br></br>
        <input 
        required
        type="text" 
        id="name" 
        name="name" 
        value={this.state.name} 
        onChange={e => this.nameChanged(e.target.value)} 
        placeholder="NAME">
        </input><br></br>

        <label name ="title">Song Title</label><br></br>
        <input 
        type="text" 
        class="title" 
        name="title"  
        value={this.state.title} 
        onChange={e => this.titleChanged(e.target.value)} 
        placeholder="Song Title">
        </input><br></br>

        <label name ="artist">Artist</label><br></br>
        <input 
        type="text" 
        class="artist" 
        name="artist"  
        value={this.state.artist}
        onChange={e => this.artistChanged(e.target.value)} 
        placeholder="Artist Name"></input><br></br>
        
        <label name ="comment">comment</label><br></br>
        <textarea 
        placeholder="comment"
        name="comment"
        value={this.state.comment}
        onChange={e => this.commentChanged(e.target.value)}
        >
        </textarea>
        <br></br>
        
        <button to ="Sent" type='submit' class ="req">Send Request </button>
    
    </form>
    
)
    }
}
/* <Link to="../Vote/Vote.js"></Link> */


/* <main className='Form'></main> */


// onChange={e => this.nameChanged(e.target.value)}
// value={this.state.name}


//  componentDidMount(){
//      this.setState({
//          id:null,
//          name:null,
//          artist:null,
//          title:null

//      })
//  }

//     handleSubmit = (event) => {
//      event.preventDefault();
//      const {
//          id,
//          name,
//          artist,
//          title,
//      }
//     } = event.target;

// const newSong = {
//     name: name.value,
//     title: song-title.value,
//     artist: artist-name.value, 
// }


// const
//  handleInputChange=(event) => {
//     event.preventDefault()
//     console.log(event)
//     console.log(event.target.name)
//     console.log(event.target.value)
//     this.setState({
//         [event.target.name]: event.target.value
//     })
//  }