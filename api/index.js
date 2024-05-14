import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import cookieParser from "cookie-parser"
import { createProxyMiddleware } from 'http-proxy-middleware';




// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const app = express();
app.use(cookieParser());

// Enable CORS for specific origins
app.use(cors({ 
  origin: ["http://localhost:3000"], 
  credentials: true 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// this endpoint is used by the client to verify the user status and to make sure the user is registered in our database once they signup with Auth0
// if not registered in our database we will create it.
// if the user is already registered we will return the user information

// Define route to handle POST requests to /verify-user
app.post("/api/verify-user", requireAuth, async (req, res) => {
  // Extract user data from request
  const auth0Id = req.auth.payload.sub;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

  console.log(req.auth.payload);
  console.log(email);
  console.log(name);


  try {
    // Check if user already exists in database
    let user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    // If user does not exist, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          auth0Id,
        },
      });
    }

    // Send user data as response
    res.json(user);
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//post a review endpoint
app.post("/writeareview",requireAuth,async(req,res)=>{
  const auth0Id = req.auth.payload.sub;
  const reviewText = req.body.reviewText;
  if(!reviewText){
    res.status(400).send("your review is required")
  }
  else{
    const newReview = await prisma.review.create({
      data: {
        user:{connect:{auth0Id}},
        reviewText,
      },
    });
  }
})

// Proxy middleware for Yelp's /businesses endpoint
app.use(
  "/yelp-businesses",
  createProxyMiddleware({
    target: "https://api.yelp.com/v3/businesses",
    changeOrigin: true,
    pathRewrite: {
      "^/yelp-businesses": ""
    },
    headers: {
      authorization: `Bearer ${process.env.YELP_API_KEY}`,
      "Accept-Language": "en-US"
    }
  })
);

// Handler for /yelp-businesses/search endpoint with dynamic query parameters
app.get('/yelp-businesses/search', (req, res) => {
  const { term, location, sortBy, limit, offset } = req.query;

  // Validate query parameters if needed
  if (!term || !location || !sortBy || !limit || !offset) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  // Send a response or perform additional actions
  res.send(`Received request with term=${term}, location=${location}, sortBy=${sortBy}, limit=${limit}, offset=${offset}`);
});

// Handler for /yelp-businesses/businessId endpoint with dynamic query parameters
app.get('/yelp-businesses/businessId', (req, res) => {
  const {businessId} = req.params;

  // Validate query parameters if needed
  if (!businessId) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  // Send a response or perform additional actions
  res.send(`Received request with businessID=${businessId}`);
});

app.get("/ping", (req, res) => {
  res.send("Ping!");
})

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
