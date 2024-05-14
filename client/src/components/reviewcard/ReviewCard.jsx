import React from 'react'
import { singlePostData } from '../../lib/dummydata';
import Card from '../card/Card';
import './ReviewCard.css'

function ReviewCard() {
    return (
        <div className='reviewcardcontainer'>
            <div className='restaurantinformation'>
                <Card key={singlePostData.id} item={singlePostData} />
            </div>
            <span className='reviewcontent'>
                {singlePostData.review[0]}
            </span>
            <div className='reviewcardbuttons'>
                <button id='editbutton'>Edit</button>
                <button id='deletebutton'>Delete</button>
            </div>
        </div>
    )
}

export default ReviewCard