# Career Finder Application

## Overview
The **Career Finder** application is an interactive web-based platform designed to help users discover potential career paths based on their preferences, skills, and interests. It leverages AI-powered quizzes to guide users through a personalized experience, culminating in tailored career recommendations.

## Features
- **AI-powered Career Quiz:** Dynamic quizzes that adapt in real-time based on user responses.
- **Customizable API Key Storage:** Users can input their own API key, stored locally for secure access.
- **Career Insights Dashboard:** Presents career recommendations with salary estimates, job descriptions, and relevant industry insights.
- **Data Persistence:** Saves user responses and recommendations locally for future reference.

## Technologies Used
- **Frontend:** React (TypeScript), React Router, Bootstrap
- **Backend:** OpenAI API integration
- **Database:** Local Storage (for user API keys and responses)
- **Deployment:** TBD

## Installation and Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.0.0)
- npm or yarn

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/career-finder.git
   cd career-finder
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm start  # or yarn start
   ```
4. Open the app in your browser at `http://localhost:3000`

## Project Structure
```
career-finder/
│── src/
│   ├── components/         # Reusable React components
│   ├── pages/              # Application pages
│   ├── assets/             # Static assets (images, icons, etc.)
│   ├── controller/         # API and business logic controllers
│   ├── interfaces/         # TypeScript interfaces and types
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point of the application
│── public/                 # Public assets
│── package.json            # Project metadata and dependencies
│── README.md               # Project documentation
```

## Usage
### Setting Up API Key
Before using the AI-powered quiz, users need to input an API key:
1. Navigate to the homepage.
2. Enter your OpenAI API key in the designated field.
3. Click "Submit" to store the key securely in Local Storage.

### Taking the Career Quiz
1. Select **Basic Guide** or **Advanced Guide** based on your preference.
2. Answer a series of dynamically generated questions.
3. View your personalized career recommendations upon completion.

## Contributions
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

