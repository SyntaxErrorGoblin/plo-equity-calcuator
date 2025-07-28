# PLO-Equity Calculator

### A High-Performance, Full-Stack Equity Calculator for 5-Card Pot Limit Omaha

This project is a web application designed to provide **real-time hand equity calculations** for 5-Card Pot Limit Omaha (PLO5).

To the best of my knowledge this is the only calculator that allows calculations against specific parts of range. Hope it's useful for some Omaha Fiends out there.

---

## Live Demo - currently down while I port everything over to AWS Lambda

https://plo-equity-calcuator.vercel.app/
![As shown here](https://github.com/user-attachments/assets/0306c557-a592-4b10-b8d5-46557ac27cd7)

---

### Key Features

* **PLO5 Hand Equity Calculation:** Estimates win probabilities for any 5-card hand against opponents range.
* **High-Performance Simulation Engine:** Powered by an optimized Python backend for rapid calculations.
* **Full-Stack & Cloud-Deployed:** A complete web application leveraging modern cloud practices.
* **Intuitive Interface:** Presents complex statistical data clearly and effectively.

---

### How It Works: The Data Science & Engineering Flow

1.  **Statistical Modeling (The Brain - Monte Carlo Simulation):**
    * For a high-dimensional game like PLO5, exact equity calculation is computationally intractable. Our solution implements a **Monte Carlo simulation engine** in Python from the pokerkit` library
    * This engine runs thousands of randomized trials, simulating hand outcomes to **estimate probabilities** and provide statistically significant equity values in real-time.
    * We use a modified version of this when running the backend live and an unmodified version for the precomputation steps.

2.  **Data Product Deployment (MLOps in Action):**
    * The simulation engine is exposed as a **REST API** using **FastAPI**.
    * The backend is **containerized with Docker** for portability.
    * Deployed to scalable cloud infrastructure (e.g., **AWS App Runner** / Render), this transforms the  model into a readily accessible **model-as-a-service**

3.  **Interactive Data Visualization (User Experience):**
    * A responsive frontend built with **React** consumes the API.
    * It gathers user inputs and presents the complex probabilistic outputs (hand equities) in an intuitive, real-time format

---

### Technologies Used

* **Backend:** Python (FastAPI, PokerKit)
* **Containerization:** Docker
* **Frontend:** React (Vite)
* **Cloud Deployment:** AWS App Runner / Render (backend), Vercel (frontend)

---

### 🛠️ Running for Local Development

Follow these instructions to set up and run the project on your local machine for development and testing.

#### Prerequisites

Before you begin, ensure you have the following installed:
* [Git](https://git-scm.com/downloads)
* [Python](https://www.python.org/downloads/) (version 3.10 or higher)
* [Node.js](https://nodejs.org/en) (which includes npm)

#### 1. Clone the Repository

First, clone the project from GitHub to your local machine:
```bash
git clone [https://github.com/SyntaxErrorGoblin/plo-equity-calculator.git](https://github.com/SyntaxErrorGoblin/plo-equity-calculator.git)
cd plo-equity-calculator


---

### License

This project is open source under the [MIT License](LICENSE.md).

---
