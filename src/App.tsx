import { Layout } from "@/components/Layout";
import heroImg from "@/assets/nikca web.png";
import portrait from "@/assets/Nikča web.jpg";
import {
  MapPin, Sparkles, CalendarDays, Ruler, Pizza,
  HandHeart, ClipboardList, Salad, Check,
  GraduationCap, Award, Heart, Phone, Mail,
  Clock, MessageSquare, UtensilsCrossed, TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const services = [
  {
    icon: Clock,
    title: "Vstupní konzultace",
    duration: "60 minut",
    items: [
      "Délka konzultace 60 minut",
      "Kompletní anamnéza pacienta (osobní, rodinná, sociální...) antropometrie, nutriční anamnéza, léky a jiné",
      "Zhodnocení nutričního stavu + analýza 3 denního záznamu stravy",
      "Součástí je i měření na Inbody",
    ],
  },
  {
    icon: CalendarDays,
    title: "Následující konzultace",
    duration: "30 minut",
    items: [
      "Délka konzultace 30 minut",
      "Kontrola stravovacích návyků",
      "Edukace",
      "Odpovědi na nové otázky",
      "Měření na Inbody",
    ],
  },
];

function HomePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Nutriční poradenství s psychologickým přístupem
                </h1>
                <p className="text-lg text-muted-foreground">
                  Změňte svůj vztah k jídlu a dosáhněte stabilního hubnutí bez diet.
                  Dlouhodobé řešení pro vás a vaši rodinu.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    Objednat konzultaci
                  </button>
                  <button className="inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 font-medium text-primary hover:bg-primary/5 transition-colors">
                    Více informací
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src={heroImg}
                  alt="Nutriční konzultace"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-3xl font-bold text-foreground">Naše služby</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.title} className="rounded-lg border border-border bg-card p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">{service.duration}</p>
                    <ul className="space-y-2">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-primary" />
                          <span className="text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-muted/50 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <img
                src={portrait}
                alt="Portrét"
                className="rounded-lg shadow-lg"
              />
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">O mně</h2>
                <p className="text-lg text-muted-foreground">
                  Zdravý vztah k jídlu a tělu není o dietách a sebezápěti. Je to o pochopení svých potřeb, návyků a motivů.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Vzdělání</h3>
                      <p className="text-sm text-muted-foreground">Nutriční terapeuta s odbornými certifikáty</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Award className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Zkušenosti</h3>
                      <p className="text-sm text-muted-foreground">Více než 10 let práce s klienty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Kontaktujte mě</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">Telefonicky</span>
                </div>
                <p className="text-sm text-muted-foreground">+420 123 456 789</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">Email</span>
                </div>
                <p className="text-sm text-muted-foreground">info@nutrisniky.cz</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default HomePage;
