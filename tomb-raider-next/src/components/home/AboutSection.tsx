"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ChannelInfo {
  avatar: string;
  title: string;
  subscriberCount: string;
}

interface AboutSectionProps {
  channelInfo?: ChannelInfo | null;
}

const LARA_QUOTES = [
  '"I make my own luck."',
  '"A famous explorer once said, that the extraordinary is in what we do, not who we are."',
  '"Everything lost is meant to be found."',
  '"The past is never really gone."',
  '"I\'ll never stop looking for the truth."',
  '"Sometimes you have to make your own way."',
  '"In our darkest moments, when life flashes before us, we find something that keeps us going."',
  '"There\'s always a way out."',
];

export function AboutSection({ channelInfo }: AboutSectionProps) {
  const [quote, setQuote] = useState(LARA_QUOTES[0]);
  const [animatedCount, setAnimatedCount] = useState("0");
  const subscriberRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const randomizeQuote = () => {
    const randomIndex = Math.floor(Math.random() * LARA_QUOTES.length);
    setQuote(LARA_QUOTES[randomIndex]);
  };

  // Animate subscriber count
  useEffect(() => {
    if (!channelInfo?.subscriberCount || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounter(channelInfo.subscriberCount);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (subscriberRef.current) {
      observer.observe(subscriberRef.current);
    }

    return () => observer.disconnect();
  }, [channelInfo]);

  const animateCounter = (countText: string) => {
    let targetCount: number;

    if (countText.toLowerCase().includes("m")) {
      targetCount = parseFloat(countText) * 1000000;
    } else if (countText.toLowerCase().includes("k")) {
      targetCount = parseFloat(countText) * 1000;
    } else {
      targetCount = parseInt(countText);
    }

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentCount = Math.floor(targetCount * progress);

      if (currentCount >= 1000000) {
        setAnimatedCount((currentCount / 1000000).toFixed(1) + "M");
      } else if (currentCount >= 1000) {
        setAnimatedCount((currentCount / 1000).toFixed(1) + "k");
      } else {
        setAnimatedCount(currentCount.toString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return (
    <section id="about" className="section section-intro">
      <div className="container">
        <div className="intro-grid">
          {/* Quote Widget */}
          <div className="quote-widget card">
            <div className="quote-icon">💬</div>
            <blockquote className="quote-text">{quote}</blockquote>
            <cite className="quote-author">— Lara Croft</cite>
            <button
              className="btn btn-secondary btn-small"
              onClick={randomizeQuote}
            >
              🎲 Losuj Cytat
            </button>
          </div>

          {/* About Card */}
          <div className="about-card card">
            <div className="avatar-container">
              <div className="avatar">
                {channelInfo?.avatar && (
                  <Image
                    src={channelInfo.avatar}
                    alt={channelInfo.title || "Bruxa Gaming"}
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            <h2>O Kanale Bruxa Gaming</h2>
            <p>
              Witaj w <strong>Bruxa Gaming</strong> - Twoim miejscu na kompletne{" "}
              <strong>gameplay&apos;e Tomb Raider po polsku</strong>!
              Specjalizuję się w pełnych przejściach klasycznej serii z{" "}
              <strong>Larą Croft</strong>, od Tomb Raider 1 w wersji Remastered.
            </p>
            <p>Na kanale znajdziesz:</p>
            <ul style={{ textAlign: "left", margin: "15px 0", paddingLeft: "20px" }}>
              <li>
                📺 <strong>Pełne przejścia</strong> wszystkich części Tomb
                Raider (TR1-TR6 Remastered)
              </li>
              <li>
                🎮 <strong>Dodatki i ekspansje</strong>: Unfinished Business,
                Golden Mask, Lost Artifact
              </li>
              <li>
                ⭐ <strong>Highlights i najlepsze momenty</strong> z gier
              </li>
              <li>
                🔴 <strong>Streamy na żywo</strong> na TikTok z rozgrywką
              </li>
              <li>
                💎 <strong>Wszystkie sekrety i skarby</strong> odkryte w każdym
                poziomie
              </li>
            </ul>
            <p>
              Każdy <strong>gameplay Tomb Raider</strong> jest nagrany w
              wysokiej jakości, z polskim komentarzem i dokładnym pokazaniem
              wszystkich zagadek, sekretów i trudnych fragmentów. Idealne
              zarówno dla weteranów serii Tomb Raider, jak i dla nowych graczy
              którzy chcą poznać przygody <strong>Lary Croft</strong> po raz
              pierwszy.
            </p>
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-icon">🎮</span>
                <span className="stat-text">Nowy gameplay co tydzień</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🔴</span>
                <span className="stat-text">Live TikTok raz w tygodniu</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💎</span>
                <span className="stat-text">
                  <span ref={subscriberRef}>
                    {channelInfo ? animatedCount : "..."}
                  </span>{" "}
                  subskrybentów
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
