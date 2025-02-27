import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import KanbanBoard from './components/KanbanBoard';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <HeroSection />
        <Features />

        <section className="kanban-section">
          <h2>Manage Your Workflow Effectively</h2>
          <p>
            Use the Kanban Board to organize tasks, improve team productivity, and streamline projects effortlessly.
          </p>
          <KanbanBoard />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
