# PLO-Equity Calculator

### A High-Performance, Full-Stack Equity Calculator for 5-Card Pot Limit Omaha

This project is a web application designed to provide **real-time hand equity calculations** for 5-Card Pot Limit Omaha (PLO5).

To the best of my knowledge this is the only calculator that allows calculations against specific parts of range. Hope it's useful for some Omaha Fiends out there.

---


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
    * Deployed to scalable cloud infrastructure (Render), this transforms the  model into a readily accessible **model-as-a-service**

3.  **Interactive Data Visualization (User Experience):**
    * A responsive frontend built with **React** consumes the API.
    * It gathers user inputs and presents the complex probabilistic outputs (hand equities) in an intuitive, real-time format

---

### Technologies Used

* **Backend:** Python (FastAPI, PokerKit)
* **Containerization and deployment:** Docker, Render (Backend CI/CD), Vercel (Frontend CI/CD)
* **Frontend:** React (Vite)
* **Cloud Deployment:** AWS App Runner / Render (backend), Vercel (frontend)

---

### 🛠️ Running for Local Development

Follow these instructions to set up and run the project on your local machine for development and testing.

---

### Prerequisites

Before you begin, ensure you have the following installed:

- Git (https://git-scm.com/downloads)
- Python (version 3.10 or higher) from https://www.python.org/downloads/
- Node.js (which includes npm) from https://nodejs.org/en/

---

### 1. Clone the Repository

```bash
git clone https://github.com/SyntaxErrorGoblin/plo-equity-calculator.git
cd plo-equity-calculator
```

### 2. Set Up the Backend

The backend runs on FastAPI. We’ll set up a Python virtual environment to manage dependencies, then install the requirements.

```bash
# Navigate into the backend directory
cd backend
```

```bash
# Create a virtual environment
python -m venv venv
```

```bash
# Activate the virtual environment
# Windows (PowerShell):
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

```bash
# Install dependencies
pip install -r requirements.txt
```

---

### 3. Set Up the Frontend

The frontend is a React application built with Vite. Install its Node.js dependencies:

```bash
# From the project root
cd frontend
npm install
```

---

### 4. Running the Application Locally

You’ll need **two terminals**:

**Terminal 1 — Backend**

```bash
cd backend
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
uvicorn backend.main:app --reload
```

_Backend now live at_ http://127.0.0.1:8000

**Terminal 2 — Frontend**

```bash
cd frontend
npm run dev
```

_Frontend now live at_ http://localhost:5173


---

# 📌 Potential Contributions & Future Improvements

The core functionality of the PLO Equity Calculator is complete. The following list highlights possible enhancements that any contributor can pick up to improve performance, add new features, or deepen strategic capabilities.

---

## 1. Performance Optimization: Core Engine Porting

**Objective:**  
Migrate the hand‐evaluation logic in `get_winner_on_board` from the high‐level `pokerkit` implementation to a C++‑backed library (e.g. [phevaluator](https://github.com/chenosaurus/phevaluator)).

**Benefits:**  
- **Speed:** Dramatically reduce simulation time per hand.  
- **Scalability:** Support larger numbers of Monte Carlo trials for higher-precision equity estimates.  

**Considerations:**  
- Replacing `pokerkit`’s game‑state abstractions with a custom simulation loop.  
- Managing deck creation, shuffling, and hand ranking manually
- Libraries built in C++ don't seem to have native support for anything beyond PLO

---

## 2. Advanced Deployment: AWS Lambda Migration

**Objective:**  
Repackage the FastAPI backend for serverless deployment on AWS Lambda using the AWS Serverless Application Model (SAM) and the [Mangum](https://github.com/jordaneremieff/mangum) adapter.

**Benefits:**  
- **Cost & Maintenance:** Faster processing of all requests compared to Render
- 
**Considerations:**  
- Adapting code for Mangum.  
- Packaging dependencies within Lambda deployment limits.

---

## 3. Major Feature: Post‑Flop Equity Calculator

**Objective:**  
Extend equity computations beyond pre‑flop by allowing users to specify flop and compare range vs range

**Benefits:**  
- Enables exploration of texture‑specific equities and range vs. range outcomes post‑flop.

**Considerations:**  
- **Frontend:** Design inputs for up to three community cards and validate entries.  
- **Backend:** Initialize simulations from a given board state and manage combinatorial complexity.  
- Limited usefulness in current state as ranges generally become more refined with each street and the hands that make it to flop in certain scenarios will change heavily. May be better to rely on solvers for this

---

## 4. Advanced Feature: Range Manipulation

**Objective:**  
Allow contributors to add functionality for manual include/exclude of specific hands from an opponent’s range after setting an initial percentage.

**Benefits:**  
- Models realistic opponent tendencies (e.g., “Top 5% of hands would of already been 3-bet”).  
- Produces more realistic equities for advanced game‑theory and exploitative analyses.

**Considerations:**  
- **Frontend:** Redesign how the range is selected
- **Backend:** Would simply need to change selection critera.  


---

### License

This project is open source under the [MIT License](LICENSE.md).

---


