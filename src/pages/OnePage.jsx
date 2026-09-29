import React from 'react'
import Hero from '../components/Hero'
import About from './About'
import Events from './Events'
import Projects from './Projects'
import Achievements from './Achievements'
import Team from './Team'
import Join from './Join'
import Faqs from './Faqs'

export default function OnePage() {
  return (
    <>
      <div id="top" className="scroll-mt-20">
        <Hero />
      </div>
      <section id="about" className="scroll-mt-20"><About /></section>
      <section id="events" className="scroll-mt-20"><Events /></section>
      <section id="projects" className="scroll-mt-20"><Projects /></section>
      <section id="achievements" className="scroll-mt-20"><Achievements /></section>
      <section id="team" className="scroll-mt-20"><Team /></section>
      <section id="join" className="scroll-mt-20"><Join /></section>
      <section id="faqs" className="scroll-mt-20"><Faqs /></section>
    </>
  )
}