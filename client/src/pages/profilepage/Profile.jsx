import React from 'react'
import ReviewCard from '../../components/reviewcard/ReviewCard'
import './Profile.css'
import { useAuth0 } from '@auth0/auth0-react'
function Profile() {
    const { user } = useAuth0();
    return (
        <div className='profilepage'>
            <div className='details'>
                <div className='title'>
                    <h1>User Information</h1>
                </div>
                <div className='userinfo'>
                    <div>
                        <p>Name: {user.name}</p>
                    </div>
                    <div>
                        <img src={user.picture} width="70" alt="profile avatar" />
                    </div>
                    <div>
                        <p>📧 Email: {user.email}</p>
                    </div>
                    <div>
                        <p>🔑 Auth0Id: {user.sub}</p>
                    </div>
                    <div>
                        <p>✅ Email verified: {user.email_verified?.toString()}</p>
                    </div>
                    <div className='userinfo_buttons'>
                        <button id='updateprofile'>Update Profile</button>
                        <button id='logout'> Log Out</button>
                    </div>

                </div>
                <div className='title'>
                    <h1>Reviews</h1>
                </div>
                <div className='reviewcomponent'>
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </div>

            </div>
        </div>
    )
}

export default Profile