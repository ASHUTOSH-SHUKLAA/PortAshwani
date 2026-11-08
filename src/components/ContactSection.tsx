import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { EDITOR_INFO } from '../data/config';

export default function ContactSection() {
  return <section id="contact" className="border-t border-white/10 bg-[#0d0b0b] py-20 text-[#f1eee6] md:py-28" aria-label="Get in touch">
    <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between lg:px-20">
      <div><span className="label-meta mb-4 block text-[#c9a45c]">GET IN TOUCH</span><h2 className="heading-section">Have a project<br/><span className="serif-editorial font-normal text-[#c9a45c]">in mind?</span></h2><p className="mt-4 max-w-md text-sm leading-relaxed text-[#a59d91]">For collaborations and commissions, reach out directly.</p></div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href={`mailto:${EDITOR_INFO.email}`} className="inline-flex items-center justify-between gap-6 border border-white/20 px-5 py-4 text-sm transition-colors hover:border-[#c8ff4d] hover:text-[#c8ff4d]"><span className="flex items-center gap-3"><Mail size={17}/>{EDITOR_INFO.email}</span><ArrowUpRight size={15}/></a>
        <a href={`https://wa.me/${EDITOR_INFO.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between gap-6 bg-[#b3121b] px-5 py-4 text-sm text-white transition-colors hover:bg-[#941018]"><span className="flex items-center gap-3"><MessageCircle size={17}/>WhatsApp</span><ArrowUpRight size={15}/></a>
      </div>
    </div>
  </section>;
}
