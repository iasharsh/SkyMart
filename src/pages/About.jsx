import React from "react";
import { useNavigate } from "react-router";

const team = [
  {
    initial: "A",
    name: "Aryan Shah",
    role: "Founder & CEO",
    color: "bg-lime-400 text-black",
  },
  {
    initial: "P",
    name: "Priya Mehta",
    role: "Head of Product",
    color: "bg-blue-500 text-white",
  },
  {
    initial: "R",
    name: "Rohan Verma",
    role: "Lead Engineer",
    color: "bg-purple-500 text-white",
  },
  {
    initial: "S",
    name: "Sneha Kapoor",
    role: "Design Director",
    color: "bg-rose-500 text-white",
  },
];

const values = [
  {
    icon: "fa-shield-halved",
    title: "Trust",
    desc: "Every product is verified for quality and authenticity before listing.",
  },
  {
    icon: "fa-truck-fast",
    title: "Speed",
    desc: "We obsess over delivery times so your orders arrive when promised.",
  },
  {
    icon: "fa-heart",
    title: "Community",
    desc: "Built around real customer feedback, not just business metrics.",
  },
  {
    icon: "fa-star",
    title: "Quality",
    desc: "We curate the best — no filler, no junk, just great products.",
  },
];

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-16 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-yellow-300 rounded-3xl flex items-center justify-center mx-auto mb-5 animate-bounce shadow-lg">
          <i className="fa-solid fa-bolt text-black text-3xl"></i>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          About <span className="text-lime-400">SkyMart</span>
        </h1>
        <p className="text-neutral-400 text-lg">
          SkyMart is a next-generation e-commerce platform built to make online
          shopping fast, fair, and enjoyable — for everyone.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: "fa-box", label: "Products", value: "20K+" },
          { icon: "fa-users", label: "Happy Customers", value: "50K+" },
          { icon: "fa-star", label: "Avg. Rating", value: "4.9" },
          { icon: "fa-truck", label: "On-time Delivery", value: "99%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-neutral-800 rounded-xl p-6 text-center bg-neutral-900/40 hover:border-lime-400 hover:scale-[1.02] transition"
          >
            <div className="w-12 h-12 rounded-full bg-lime-400/10 flex items-center justify-center mx-auto mb-3">
              <i className={`fa-solid ${stat.icon} text-lime-400`}></i>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-neutral-400">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Our Story */}
      <section className="max-w-5xl mx-auto px-6 mt-10">
        <div className="border border-lime-400/30 rounded-2xl p-10 bg-neutral-900/40 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-5">Our Story</h2>
          <p className="text-neutral-400 leading-relaxed mb-4">
            SkyMart started in 2022 as a small side project — two engineers
            tired of bloated, slow e-commerce experiences. We asked ourselves:
            what if shopping online was actually <em>enjoyable</em>?
          </p>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Three years later, SkyMart serves over 50,000 customers across the
            country. We stock electronics, fashion, jewelry, and everyday
            essentials — all at prices that don't require a second mortgage.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            We're still the same team at heart: obsessed with speed,
            transparency, and making you feel good about every purchase you make
            here.
          </p>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="max-w-5xl mx-auto px-6 mt-14">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="border border-neutral-800 rounded-xl p-6 flex gap-4 bg-neutral-900/40 hover:border-lime-400 transition"
            >
              <span className="w-11 h-11 rounded-lg bg-lime-400/10 text-lime-400 flex items-center justify-center flex-shrink-0">
                <i className={`fa-solid ${v.icon}`}></i>
              </span>
              <div>
                <h3 className="font-bold text-white mb-1">{v.title}</h3>
                <p className="text-neutral-400 text-sm">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="max-w-5xl mx-auto px-6 mt-14">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Meet the Team
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((member) => (
            <div
              key={member.name}
              className="border border-neutral-800 rounded-xl p-6 text-center bg-neutral-900/40 hover:scale-[1.03] transition"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg ${member.color}`}
              >
                {member.initial}
              </div>
              <p className="font-bold text-white">{member.name}</p>
              <p className="text-neutral-500 text-sm mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 mt-14 pb-16">
        <div className="border border-lime-400/40 rounded-2xl px-12 py-10 text-center bg-neutral-900/40 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to shop?</h2>
          <p className="text-neutral-400 mb-6">
            Explore thousands of products at unbeatable prices.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-lime-400 text-black font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 cursor-pointer hover:bg-lime-300 hover:scale-[1.05] active:scale-[0.95] transition-all"
          >
            Browse Products <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
