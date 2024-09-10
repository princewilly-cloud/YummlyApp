# Yummly - Food Review Web Application

Yummly is a "Software as a Service" (SaaS) web application inspired by Yelp, designed for reviewing restaurants. Built with modern technologies like React, Node.js, Auth0 for authentication, and Prisma for database operations, Yummly offers a robust platform for users to explore and review dining options.

## Features

### Anonymous Browsing
- **Search for Restaurants**: Users can search for restaurants without logging in.
- **View Restaurant Details**: Details like location, cuisine, and average ratings are viewable without an account.
- **Read Reviews**: Browse reviews from other users on various restaurants.

### User Account Features
- **Bookmark Restaurants**: Logged-in users can bookmark their favorite spots.
- **Write Reviews**: Users can share their dining experiences by writing reviews once logged in.
- **Profile Management**: Users can view and edit their profiles, review their bookmarked restaurants, and manage their reviews.

### Detailed Restaurant View
- **Restaurant Detail Page**: Provides comprehensive details about restaurants, including full reviews, images, and other relevant information.

### Security
- **Secure Login**: Integration with Auth0 ensures secure and straightforward user authentication.
- **Auth Debugger**: A dedicated page to view and debug authentication tokens.

## External API

Yummly utilizes the Yelp API for fetching restaurant data:
- Yelp API Endpoint: [Yelp Business Search](https://api.yelp.com/v3/businesses/search)
