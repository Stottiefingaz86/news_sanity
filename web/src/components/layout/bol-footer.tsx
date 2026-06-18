"use client";

import { useEffect, useState } from "react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconShield,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { assetPath } from "@/lib/base-path";

const quickLinks = [
  "About Us",
  "Refer A Friend",
  "Rules",
  "Banking",
  "Privacy Policy",
  "Affiliates",
  "Terms & Conditions",
  "Responsible Gaming",
];

const casinoLinks = [
  "Play Casino",
  "Blackjack",
  "Baccarat",
  "Craps",
  "Roulette",
  "Keno",
  "Slots",
  "Video Poker",
];

const sportsLinks = [
  "Sportsbook",
  "NFL Betting Odds",
  "NBA Betting Odds",
  "MLB Betting Odds",
  "NHL Betting Odds",
  "NCAAB Betting Odds",
  "Super Bowl Betting Odds",
  "Boxing Betting Odds",
];

const pokerLinks = ["Play Poker", "Download", "Texas Holdem", "Omaha Poker"];

const racebookLinks = [
  "Horse Betting",
  "Kentucky Derby",
  "Preakness Stakes",
  "Belmont Stakes",
  "Breeders Cup",
];

const otherLinks = [
  "Promos",
  "News Room",
  "Why BetOnline",
  "BetOnline Vs Competition",
  "VIP Rewards",
  "Bet TV",
];

const supportLinks = ["Live Chat", "Help Centre"];

const partners = [
  { file: "laliga.svg", label: "LaLiga" },
  { file: "lfa.svg", label: "LFA" },
  { file: "matchroom.svg", label: "Matchroom" },
  { file: "golden boy.svg", label: "Golden Boy" },
] as const;

const cryptoMethods = [
  "Bitcoin",
  "Ethereum",
  "Litecoin",
  "USDT",
  "USDC",
  "BitcoinCash",
  "Dogecoin",
];

const cardMethods = ["VISA", "Mastercard", "AMEX", "Discover"];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <ul className="space-y-1.5 text-xs text-white/70">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="transition-colors hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PaymentLogo({ method }: { method: string }) {
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const normalizedMethod = method.toLowerCase().replace(/\s+/g, "");
  const imagePath = assetPath(
    useFallback
      ? `/logos/payment/${normalizedMethod}.png`
      : `/logos/payment/${normalizedMethod}.svg`,
  );

  return (
    <div className="flex h-8 shrink-0 items-center justify-center px-2">
      {!imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imagePath}
          alt={method}
          width={60}
          height={20}
          className="max-h-5 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
          onError={() => {
            if (!useFallback) setUseFallback(true);
            else setImageError(true);
          }}
        />
      ) : (
        <span className="text-xs font-semibold text-white/70">{method}</span>
      )}
    </div>
  );
}

function SecurityBadge({
  name,
  iconPath,
}: {
  name: string;
  iconPath: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex shrink-0 items-center justify-center">
      {!imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={assetPath(iconPath)}
          alt={name}
          width={52}
          height={20}
          className="max-h-5 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
          onError={() => setImageError(true)}
        />
      ) : (
        <IconShield className="size-6 text-green-500" />
      )}
    </div>
  );
}

export function BolFooter() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
    setCurrentTime(formatter.format(new Date()));
  }, []);

  return (
    <footer className="relative z-0 mt-12 w-full min-w-0 overflow-x-hidden border-t border-white/10 bg-[#2d2d2d] text-white">
      <div className="w-full min-w-0 px-4 py-6 md:px-6">
        <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          <FooterLinkColumn title="Quick Links" links={quickLinks} />
          <FooterLinkColumn title="Casino" links={casinoLinks} />
          <FooterLinkColumn title="Sports" links={sportsLinks} />
          <FooterLinkColumn title="Poker" links={pokerLinks} />
          <FooterLinkColumn title="Racebook" links={racebookLinks} />
          <FooterLinkColumn title="Other" links={otherLinks} />
          <FooterLinkColumn title="Support" links={supportLinks} />
        </div>

        <Separator className="mb-6 bg-white/10" />

        <div className="mb-6 min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-base font-semibold">A TRUSTED & SAFE EXPERIENCE</h3>
            <IconShield className="size-4 shrink-0" />
          </div>
          <p className="mb-4 max-w-2xl text-xs text-white/70">
            At BetOnline, our company&apos;s guiding principle is to establish
            long-lasting, positive relationships with our customers and within the
            online gaming community for over 25 years.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {cryptoMethods.map((method) => (
              <PaymentLogo key={method} method={method} />
            ))}
            {cardMethods.map((method) => (
              <PaymentLogo key={method} method={method} />
            ))}
            <SecurityBadge
              name="Responsible Gaming"
              iconPath="/banners/partners/responsible gaming.webp"
            />
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-white bg-red-500">
              <span className="text-[10px] font-bold text-white">18+</span>
            </div>
          </div>
        </div>

        <Separator className="mb-6 bg-white/10" />

        <div className="mb-4 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <h3 className="shrink-0 text-sm font-semibold">OFFICIAL PARTNERS</h3>
            <Separator
              orientation="vertical"
              className="hidden h-5 bg-white/20 sm:block"
            />
            <Separator className="bg-white/10 sm:hidden" />
            <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.file}
                  className="flex h-7 shrink-0 items-center justify-center opacity-80 transition-opacity hover:opacity-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath(`/banners/partners/${partner.file}`)}
                    alt={partner.label}
                    width={70}
                    height={28}
                    className="max-h-7 w-auto max-w-[5.5rem] object-contain sm:max-w-none"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {[
              IconBrandFacebook,
              IconBrandInstagram,
              IconBrandX,
              IconBrandYoutube,
              IconBrandTiktok,
            ].map((Icon, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="size-7 rounded-small text-white/70 hover:bg-white/5 hover:text-white"
              >
                <Icon className="size-4" />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/5 pt-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div>Copyright ©2026 BetOnline.ag. All rights reserved.</div>
          <div className="shrink-0">{currentTime}</div>
        </div>
      </div>
    </footer>
  );
}
