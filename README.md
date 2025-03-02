# RegenPass with Clerk Authentication

This project uses Clerk for authentication, replacing the previous Google login functionality.

## Authentication Flow

The application now uses Clerk for authentication:

1. When a user clicks the "Sign In" or "Get Started" buttons, they'll see Clerk's authentication modal.
2. After successful authentication, the user's information (name and email) is saved to the application's global store.
3. The user is then redirected to the events page, similar to the previous Google login behavior.
4. The authentication state persists across the application.

## Running the Application

1. Install dependencies:
```
cd frontend
npm install
```

2. Start the development server:
```
npm start
```

## Clerk Authentication

This project uses [Clerk](https://clerk.com/) for authentication. Clerk provides:

- Multiple sign-in methods (email, social logins, etc.)
- User management
- Authentication security
- Session management

The Clerk publishable key is hardcoded in the application for convenience, but in a production environment, it should be stored in environment variables.

## Customizing Clerk UI

You can customize the appearance of Clerk authentication components:

1. Visit your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Go to Customization > Branding
3. Adjust colors, logos, and other styling options to match your application's design

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check that the Clerk publishable key is correctly set
3. Check the browser console for any error messages

For more information, visit the [Clerk Documentation](https://clerk.com/docs). 