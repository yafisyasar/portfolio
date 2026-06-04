import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LiveBackground from './components/LiveBackground'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <LiveBackground />
      <Navbar loaded={!loading} />
      <main>
        <Hero loaded={!loading} />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
