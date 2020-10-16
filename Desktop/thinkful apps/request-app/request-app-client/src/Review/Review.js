import React from 'react';
import { Link } from 'react-router-dom' 
import './Review.css'

function Review(){
    return(
        <div>
        <h1 class="neon">Review</h1>
    <h2>How was your Expreience?</h2>
    <textarea placeholder="comment"></textarea><br></br>
    <Link to="Review-Sent" class="req">Send Review</Link>
    </div>
    )
}

export default Review;