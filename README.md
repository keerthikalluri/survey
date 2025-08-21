
🌊 Waterlily Survey Application
📖 Overview

The Waterlily Survey Application is a full-stack project designed to simulate a real-world intake form system. Its primary goal is to allow users to respond to structured surveys that capture demographic, health, and financial information. This type of data collection is an essential part of the Waterlily product, where responses are later used by predictive models to estimate long-term care needs and costs. By recreating this simplified version of the system, the project demonstrates how user-centric data workflows can be built with scalability and maintainability in mind.

From a technical perspective, the application showcases the fundamentals of modern web development. On the frontend, users are presented with a clean and intuitive interface to answer survey questions, navigate between forms, and submit responses. On the backend, a robust API handles request validation, stores data securely in the database, and ensures that survey results are processed correctly. Together, these layers highlight the use of a micro-application design paradigm where small, modular services work in coordination to achieve reliable performance.

Beyond its functional scope, this project emphasizes clarity, reusability, and production-readiness. It demonstrates how to structure code for ease of extension, such as adding new survey categories or integrating with analytics pipelines. The project also offers opportunities to practice essential skills like API development, database schema design, and end-to-end testing, making it a valuable foundation for learning and for demonstrating engineering practices in a real hiring context.

✨ Features

📋 User-friendly interface for answering survey questions

🔐 Secure handling and storage of survey responses

🗄️ Backend API for form submission and data persistence

📊 Extensible design for adding new question categories

🧪 Built-in support for testing and debugging workflows

🛠️ Tech Stack

Frontend: React / Angular (depending on implementation), HTML, CSS, TypeScript

Backend: Node.js with Express / Spring Boot (depending on implementation)

Database: PostgreSQL / MySQL

Testing: Jest / JUnit

Deployment: Docker, containerized services

🚀 Getting Started
Prerequisites

Node.js (v16+ if using Node backend)

Java 17+ (if using Spring Boot backend)

PostgreSQL/MySQL installed locally or running in Docker

npm / Maven installed

Installation & Setup
# Clone repo
git clone https://github.com/your-username/waterlily-survey.git
cd waterlily-survey

Backend Setup (Node.js Example)
cd backend
npm install
npm run dev

Backend Setup (Spring Boot Example)
cd backend
mvn clean install
mvn spring-boot:run

Frontend Setup
cd frontend
npm install
npm start

🎯 Usage

Start both frontend and backend servers.

Open the frontend in your browser at http://localhost:5173.

Fill out the survey form step by step.

Submit responses to store them in the backend.

Check API logs or database to confirm data persistence.

📡 API Endpoints (Example)

POST /api/surveys/submit → Submit survey responses

GET /api/surveys/questions → Retrieve survey questions

GET /api/surveys/responses/:id → Fetch stored responses
