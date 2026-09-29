import React from 'react'
import { Mail, MapPin, Clock, Github, Linkedin, MessageSquare, Twitter } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import JoinForm from '../components/JoinForm'
import ContactForm from '../components/ContactForm'
import { siteConfig } from '../data/siteConfig'

export default function Join() {
  return (
    <div className="w-full px-3 sm:px-5 py-8 space-y-10">
      {/* Header */}
      <SectionHeader
        badge="Inductions Open"
        title="Become a"
        highlight="Cypher Club Member"
        subtitle="Join our close-knit student technology society. Fill out your details below to get connected to our study circles, workshops, and project pods."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Details */}
        <div className="lg:col-span-5">
          <div className="card-lift bg-cypher-900/60 border border-cypher-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Contact Details</h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Official Club Email</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-white hover:text-neon-cyan transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Campus Headquarters</span>
                  <span className="text-slate-200 block">{siteConfig.contact.location}</span>
                  <span className="text-xs text-slate-400 block mt-0.5">{siteConfig.contact.institution}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Lab Meeting Hours</span>
                  <span className="text-slate-200">{siteConfig.contact.meetingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-cypher-800/80">
              <span className="text-xs font-mono text-slate-400 block mb-3 uppercase tracking-wider">
                Follow & Connect
              </span>
              <div className="flex items-center gap-3">
                {siteConfig.socials.github && (
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-cypher-950 border border-cypher-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan transition-all"
                    aria-label="Cypher GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.socials.linkedin && (
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-cypher-950 border border-cypher-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan transition-all"
                    aria-label="Cypher LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.socials.discord && (
                  <a
                    href={siteConfig.socials.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-cypher-950 border border-cypher-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan transition-all"
                    aria-label="Cypher Discord"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.socials.twitter && (
                  <a
                    href={siteConfig.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-cypher-950 border border-cypher-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan transition-all"
                    aria-label="Cypher Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Application Form */}
        <div className="lg:col-span-7">
          <JoinForm />
        </div>
      </div>

      <section id="contact" className="scroll-mt-24 pt-4">
        <SectionHeader
          badge="Direct Channels"
          title="Get in Touch with"
          highlight="Cypher Club"
          subtitle="Have a question about upcoming workshops, project proposals, campus collaborations, or speaking opportunities? We'd love to hear from you."
          className="mb-8"
        />
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
