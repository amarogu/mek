# Wedding Landing Page System

## Overview

My sister needed a wedding landing page, so I decided to go above and beyond to create a comprehensive system that supports:
- **Gift Registry**: Guests can view and purchase gifts.
- **Messages**: Guests can leave heartfelt messages.
- **RSVP Management**: Guests can confirm their attendance.

Additionally, I plan to expand the project's scope to:
- Support dynamic domains.
- Provide multiple landing page templates for a broader client base.

The project is built using **Next.JS**, **MongoDB**, and **Stripe**.

## Features

### 1. Gift Registry
- View list of gifts.
- Purchase gifts via Stripe.

### 2. Messages
- Leave and view messages for the couple.

### 3. Presence Confirmation (RSVP)
- Guests can confirm their attendance.

### 4. Expansion Plans
- Dynamic domain support for personalized URLs.
- Multiple landing page templates for various clients.

## Tech Stack

- **Next.JS**: For creating the frontend and server-side rendering.
- **MongoDB**: For storing user data, gift registry, messages, and RSVPs.
- **Stripe**: For handling payments and gift purchases.

## Getting Started

### Prerequisites

- Node.js
- npm / yarn
- MongoDB
- Stripe Account

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/wedding-landing-page.git
    cd wedding-landing-page
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**:
    Create a `.env.local` file in the root directory and add your configurations:
    ```plaintext
    MONGODB_URI=your_mongodb_uri
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_PUBLIC_KEY=your_stripe_public_key
    NEXT_PUBLIC_BASE_URL=your_base_url
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Deployment

To deploy the app, you can use platforms like Vercel, Heroku, or any other cloud service that supports Next.JS apps.

### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/yourFeature`).
3. Make your changes and commit (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/yourFeature`).
5. Open a Pull Request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact

If you have any questions or suggestions, feel free to reach out.
