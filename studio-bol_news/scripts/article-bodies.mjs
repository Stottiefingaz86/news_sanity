function span(key, text, marks = []) {
  return {_type: 'span', _key: key, text, marks}
}

function block(key, style, children, markDefs = [], listItem) {
  const value = {_type: 'block', _key: key, style, markDefs, children}
  if (listItem) {
    value.listItem = listItem
    value.level = 1
  }
  return value
}

function p(key, text) {
  return block(key, 'normal', [span(`${key}s`, text)])
}

function emph(key, before, strong, after) {
  return block(key, 'normal', [
    span(`${key}a`, before),
    span(`${key}b`, strong, ['strong']),
    span(`${key}c`, after),
  ])
}

function h2(key, text) {
  return block(key, 'h2', [span(`${key}s`, text)])
}

function h3(key, text) {
  return block(key, 'h3', [span(`${key}s`, text)])
}

function quote(key, text) {
  return block(key, 'blockquote', [span(`${key}s`, text)])
}

function bullets(key, items) {
  return items.map((text, index) =>
    block(`${key}_${index}`, 'normal', [span(`${key}_${index}s`, text)], [], 'bullet'),
  )
}

function sectionHeader(key, kicker, title, subtitle, size = 'medium') {
  return {_type: 'sectionHeader', _key: key, kicker, title, subtitle, size, align: 'left'}
}

function pullQuote(key, quoteText, attribution, variant = 'highlight') {
  return {_type: 'pullQuote', _key: key, quote: quoteText, attribution, variant}
}

function marquee(key, items) {
  return {_type: 'marquee', _key: key, items, speed: 'medium', separator: '·'}
}

function oddsList(key, title, entries) {
  return {
    _type: 'oddsList',
    _key: key,
    title,
    entries: entries.map((entry, index) => ({_key: `${key}_${index}`, ...entry})),
  }
}

function contentGrid(key, layout, columns, items) {
  return {
    _type: 'contentGrid',
    _key: key,
    layout,
    columns,
    gap: 'normal',
    items: items.map((item, index) => ({_key: `${key}_${index}`, ...item})),
  }
}

function videoEmbed(key, url, caption, aspect = 'video', size = 'default') {
  return {_type: 'videoEmbed', _key: key, url, caption, aspect, size}
}

function mediaImage(key, image, caption, options = {}) {
  if (!image && !options.externalUrl) return null
  return {
    _type: 'mediaImage',
    _key: key,
    ...(image ? {image} : {}),
    ...(options.externalUrl ? {externalUrl: options.externalUrl} : {}),
    caption,
    size: options.size ?? 'default',
    aspect: options.aspect ?? 'landscape',
  }
}

function ctaBlock(key, data) {
  return {_type: 'ctaBlock', _key: key, ...data}
}

function divider(key, style = 'line') {
  return {_type: 'dividerBlock', _key: key, style}
}

function faqBlock(key, title, items) {
  return {
    _type: 'faqBlock',
    _key: key,
    title,
    items: items.map((item, index) => ({_key: `${key}_${index}`, ...item})),
  }
}

function relatedArticles(key, title, articles) {
  return {
    _type: 'relatedArticles',
    _key: key,
    title,
    articles: articles.map((item, index) => ({_key: `${key}_${index}`, ...item})),
  }
}

function standfirst(key, text) {
  return {_type: 'standfirst', _key: key, text}
}

function proseBody(key, paragraphs, options = {}) {
  return {
    _type: 'proseBody',
    _key: key,
    columns: String(options.columns ?? 1),
    dropCap: options.dropCap ?? false,
    paragraphs,
  }
}

function textHeading(key, text, level = 'h2') {
  return {_type: 'textHeading', _key: key, text, level}
}

const RELATED = {
  worldCupRankings: {
    title: 'Ranking 10 Teams with Best Chance to Win the World Cup',
    href: '/ranking-10-teams-best-chance-win-world-cup',
    category: 'Expert Analysis',
  },
  worldCupNeymar: {
    title: "Brazil's Neymar Gamble: Saving Their Star for the Knockouts",
    href: '/brazil-neymar-gamble-saving-star-for-knockouts',
    category: 'World Cup 2026',
  },
  worldCupMartinez: {
    title: "Martinez's Last Dance: Portugal's Coach Is Already Planning His Exit",
    href: '/roberto-martinez-portugal-exit-world-cup-drama',
    category: 'World Cup 2026',
  },
  worldCupIran: {
    title: "Iran's World Cup Nightmare: Visas, Late Flights, and a Dash Back to Mexico",
    href: '/iran-world-cup-visa-travel-chaos-betting-impact',
    category: 'World Cup 2026',
  },
  worldCup: {
    title: 'Closing Line Value Explained for New Bettors',
    href: '/closing-line-value-explained',
    category: 'Expert Analysis',
  },
  nfl: {
    title: 'NFL Division Odds: Early Look at AFC & NFC Value',
    href: '/nfl-division-odds-early-look',
    category: 'NFL',
  },
  nba: {
    title: 'NBA Playoff Race: Betting Guide for the Stretch Run',
    href: '/nba-playoff-race-betting-guide',
    category: 'NBA',
  },
  clv: {
    title: 'Ranking 10 Teams with Best Chance to Win the World Cup',
    href: '/ranking-10-teams-best-chance-win-world-cup',
    category: 'Expert Analysis',
  },
  sgp: {
    title: 'March Madness Bracket Breakdown — Weekly Podcast',
    href: '/march-madness-bracket-breakdown-podcast',
    category: 'News',
  },
}

export function buildWorldCupBody() {
  return [
    standfirst(
      'wc_standfirst',
      'Brazil and France remain co-favorites on our board, but the expanded 48-team format rewards depth, travel stamina, and knockout paths more than star power alone. What follows is a bettor’s ranking of the ten sides with the clearest championship equity — and where the value still lives before friendlies rewrite the board again.',
    ),
    proseBody(
      'wc_lede',
      [
        'The 2026 World Cup is no longer a talking point on the calendar. With the draw settled and the bracket mapped from the Round of 32 through the July 19 final, the betting market finally has something concrete to price — and the early numbers already tell a story the headline favorites alone cannot explain.',
      ],
      {dropCap: true},
    ),
    textHeading('wc_h2_draw', 'When the groups landed, the futures moved'),
    proseBody('wc_p_draw', [
      'Group-stage geography matters more than it did in a 32-team tournament. A soft opening run can save legs for a brutal quarterfinal corridor; a nightmare draw can knock a contender out before the knockout rounds even begin.',
      'England drawing Croatia and Ghana in Group L looks manageable on paper. Portugal landing beside Colombia and Uzbekistan in Group K is the kind of chaos that makes group-winner markets worth watching early — especially when the public still prices reputation over path.',
      'The host nations carry a different kind of pressure. Mexico opens against South Africa with Korea and the Czech Republic waiting. The United States gets Paraguay, Australia, and Turkey. Canada faces Bosnia, Qatar, and Switzerland. None of those paths is a walkover, and the crowd advantage only travels so far once the bracket splits across three countries.',
    ]),
    emph(
      'wc_p_quote1',
      'Shane Pratt, who leads betting analysis at BetOnline, put it plainly: ',
      '“In a 48-team World Cup, the team that wins is often the one that avoids the wrong side of the bracket in June — not the one with the most headlines in March.”',
      '',
    ),
    textHeading('wc_h2_bracket', 'Mapping the path to the final'),
    proseBody('wc_p_bracket', [
      'The knockout bracket is where outright tickets live or die. Mexico and Brazil could meet in the Round of 32 if both advance as group winners. England and Portugal are on a collision course in the same quarterfinal half. Argentina would need to navigate Saudi Arabia early and a stacked European side later just to reach the semis.',
      'That is why we weight reach-the-semis and group-winner prices alongside winner odds. A side priced at +700 to lift the trophy might still be mispriced at +220 to make the final four if its half of the draw opens up after a quarterfinal upset elsewhere.',
    ]),
    videoEmbed(
      'wc_vid',
      'https://www.youtube.com/watch?v=Ew-3-8itpnc',
      'How the 2026 draw reshapes outright winner value (2:14)',
      'square',
      'narrow',
    ),
    textHeading('wc_h2_rankings', 'The top ten on our board'),
    proseBody('wc_p_rankings', [
      'Our rankings blend current form, squad depth, knockout-path probability, and price against implied win percentage. The list is built for bettors, not pundits — which means a team can rank sixth on prestige and third on value.',
    ]),
    oddsList('wc_odds', 'Outright winner — top ten', [
      {label: 'Brazil', odds: '+450'},
      {label: 'France', odds: '+550'},
      {label: 'Argentina', odds: '+600'},
      {label: 'England', odds: '+700'},
      {label: 'Spain', odds: '+800'},
      {label: 'Portugal', odds: '+900'},
      {label: 'Germany', odds: '+1000'},
      {label: 'Netherlands', odds: '+1200'},
      {label: 'Colombia', odds: '+1400'},
      {label: 'USA', odds: '+1600'},
    ]),
    contentGrid('wc_grid_top', 'uniform', 3, [
      {
        title: 'Brazil',
        body: 'The deepest attacking pool in the field and a group path that avoids Europe until the latter rounds.',
      },
      {
        title: 'France',
        body: 'Elite midfield control and defensive structure travel in knockout soccer better than almost anyone.',
      },
      {
        title: 'Argentina',
        body: 'Defending champions with continuity in the spine and a manager who squeezes results from tight games.',
      },
    ]),
    textHeading('wc_h3_dark', 'Dark horses with real paths', 'h3'),
    proseBody(
      'wc_p_dark',
      [
        'Colombia is the most interesting long shot on the board. Luis Díaz gives them a genuine match-winner, the direct style suits summer conditions across North America, and a favorable group draw keeps legs fresh for the knockout rounds.',
        'Portugal and the Netherlands carry similar upside if the bracket breaks right. Both have ceiling; both have injury histories that keep the market honest. The difference is path — Portugal’s half looks heavier on paper, while the Dutch could benefit if a favorite exits early on the other side.',
        'Crowd support in host cities can turn a neutral venue into a home environment — especially for nations with large diasporas in Mexico and the United States. That matters when pricing group-stage props, not just outrights.',
        'The comparison keeps coming up internally: a soft group winner price plus a favorable quarterfinal half can beat a shorter outright on a side that must survive England or Brazil before the semis.',
      ],
      {columns: 2},
    ),
    pullQuote(
      'wc_pq1',
      'The market still underrates how much a favorable knockout path is worth in a 48-team format.',
      'Shane Pratt, BetOnline Analysis',
      'minimal',
    ),
    textHeading('wc_h2_markets', 'Where to shop first'),
    proseBody('wc_p_markets', [
      'Winner tickets are the headline, but they are rarely the best first move. Group winners, reach-the-semis prices, and Golden Boot markets often carry better implied value when a team has a soft path but lacks true championship equity.',
    ]),
    ...bullets('wc_bul_markets', [
      'Brazil and France offer the cleanest winner paths; Argentina remains live at a slight discount to 2022.',
      'Target Golden Boot props on strikers with penalty duties in groups that should produce goals.',
      'Shop group-winner lines before the public piles onto host-nation narratives.',
      'Reach-the-semis markets beat winner tickets when the draw opens a soft quarterfinal corridor.',
    ]),
    proseBody('wc_close', [
      'Lines will move fast once pre-tournament friendlies resume and injuries hit the wire. We will update prices, paths, and our top-ten board weekly through kickoff on June 11.',
    ]),
    ctaBlock('wc_cta', {
      kicker: 'World Cup 2026',
      title: 'Shop outright winner odds at BetOnline',
      body: 'Compare futures prices, group winners, and reach-the-semis markets in one bet slip before the lines move.',
      buttonLabel: 'View World Cup odds',
      buttonHref: 'https://www.betonline.ag/sportsbook',
      variant: 'accent',
    }),
    faqBlock('wc_faq', 'World Cup betting FAQ', [
      {
        question: 'When do outright lines move the most?',
        answer:
          'The biggest shifts hit after the final draw, key injuries, and the first batch of pre-tournament friendlies. We update our board weekly through kickoff.',
      },
      {
        question: 'Is it better to bet group winners or reach-the-semis markets?',
        answer:
          'Reach-the-semis and group-winner props often carry better implied value than winner tickets when a team has a soft path but lacks true championship equity.',
      },
      {
        question: 'How many teams should I have in an outright portfolio?',
        answer:
          'Most sharp bettors spread risk across three to five sides at different price points — a favorite, a co-favorite, and one or two longer shots with favorable brackets.',
      },
    ]),
    relatedArticles('wc_rel', 'More World Cup coverage', [
      RELATED.worldCupNeymar,
      RELATED.worldCupMartinez,
      RELATED.worldCupIran,
    ]),
  ].filter(Boolean)
}

export function buildWorldCupNeymarBody() {
  return [
    standfirst(
      'wc2_standfirst',
      'Brazil’s medical staff are prepared to navigate the entire group stage without Neymar — and the betting market is only now catching up to what that means for group winners, knockout props, and the Seleção’s outright price.',
    ),
    proseBody(
      'wc2_lede',
      [
        'The gossip out of Granja Comary is blunt: Carlo Ancelotti’s staff would rather miss Neymar in June than lose him in July. After a grade-two calf injury sustained with Santos on May 17, Brazil’s all-time leading scorer has not trained on grass with the squad since arriving at camp on May 27. Internally, the target is a knockout-round return — which effectively rules him out against Haiti and makes him a major doubt for the Scotland group finale in Miami on June 24.',
      ],
      {dropCap: true},
    ),
    textHeading('wc2_h2_strategy', 'Short-term caution, long-term gain'),
    proseBody('wc2_p_strategy', [
      'Medical staff are prioritizing fresh imaging before accelerating Neymar back to full training. The grade-two calf problem is the kind of setback that worsens if a star pushes through a group-stage cameo against a physical opponent — exactly the scenario Brazil wants to avoid when the knockout bracket opens.',
      'That creates a strange split in the market. Brazil remain co-favorites to lift the trophy at +450, but group-stage totals and first-scorer props already reflect a squad leaning on Vinícius Júnior, Rodrygo, and Raphinha without their penalty taker and creative hub.',
      'The Haiti opener on June 13 and the Scotland fixture in Miami are the two dates bettors should circle. If Neymar is officially ruled out for both, Brazil group-winner prices often tighten while “to reach the final” tickets can actually drift — the public still prices reputation over the risk of a slow start without their talisman.',
    ]),
    pullQuote(
      'wc2_pq1',
      'Brazil without Neymar in the group stage is not a crisis — unless you already bought Brazil group-stage scorer props at star prices.',
      'Shane Pratt, BetOnline Analysis',
      'highlight',
    ),
    textHeading('wc2_h2_betting', 'Where the lines are moving'),
    oddsList('wc2_odds', 'Brazil — key markets', [
      {label: 'Outright winner', odds: '+450'},
      {label: 'Group K winner', odds: '-180'},
      {label: 'Reach the final', odds: '+220'},
      {label: 'Neymar — anytime scorer (Group stage)', odds: '+140'},
    ]),
    proseBody('wc2_p_betting', [
      'The smarter play may be layering Brazil knockout-stage props once Neymar’s return timeline firms up. A rested Neymar entering the Round of 32 is a different proposition than a limping star rushed back for Scotland.',
      'Contrast that with France and Argentina, whose attacking cores entered the tournament at full fitness. If Brazil stumble to a draw in a group game without Neymar, their Round of 32 path could harden fast — which is where reach-the-semis markets beat winner tickets for bettors who still believe in the sixth title.',
    ]),
    ...bullets('wc2_bul', [
      'Monitor team news 48 hours before Haiti and Scotland — Brazil rarely confirm availability early.',
      'Fade Neymar Golden Boot tickets until he logs a full training session on grass.',
      'Shop Brazil “to win Group K” vs “top two” if Haiti or Scotland prices offer plus-money on the underdog.',
      'Consider Brazil knockout-round team totals once the Round of 32 opponent is known.',
    ]),
    ctaBlock('wc2_cta', {
      kicker: 'World Cup 2026',
      title: 'Shop Brazil group and knockout markets',
      body: 'Compare group-winner lines, reach-the-final prices, and player props before Neymar’s status moves the board again.',
      buttonLabel: 'View World Cup odds',
      buttonHref: 'https://www.betonline.ag/sportsbook',
      variant: 'accent',
    }),
    relatedArticles('wc2_rel', 'More World Cup coverage', [
      RELATED.worldCupRankings,
      RELATED.worldCupMartinez,
      RELATED.worldCupIran,
    ]),
  ].filter(Boolean)
}

export function buildWorldCupMartinezBody() {
  return [
    standfirst(
      'wc3_standfirst',
      'Roberto Martinez strongly hinted this World Cup will be his last tournament as Portugal’s head coach — and the squad news ahead of the DR Congo opener only adds to the drama surrounding a side priced fourth on the outright board.',
    ),
    proseBody(
      'wc3_lede',
      [
        'In Houston on the eve of Portugal’s World Cup opener, Martinez did not quite announce his resignation — but he did everything short of it. Asked about reports that he will leave after the tournament regardless of result, the Belgian said the conversation “is not news” in Portugal and that the focus remains on the World Cup. Translation for bettors: this is a lame-duck manager leading one of the deepest squads in the field, and the market has not fully priced the uncertainty.',
      ],
      {dropCap: true},
    ),
    textHeading('wc3_h2_exit', 'A lame-duck coach with a loaded squad'),
    proseBody('wc3_p_exit', [
      'Martinez confirmed center-back Rúben Dias will miss the DR Congo opener as Portugal refuse to “take risks” with a key defender. That is prudent football — but it is also the kind of pre-tournament wrinkle that makes group-winner bettors nervous when the coach already has one foot out the door.',
      'Portugal arrive at +900 to win the World Cup with Bruno Fernandes and Vitinha anchoring what many consider the best midfield in the tournament. Yet highly touted squads under departing managers have a history of slow starts — and DR Congo are not a soft opener. They finished ahead of Cameroon and Nigeria in qualifying and carry European-league talent across the spine.',
      'Martinez’s press-conference tone — calm, almost resigned — mirrors the gossip circulating in Lisbon: the FA and the coach have already discussed life after July, and a Nations League title was the farewell gift before the main event.',
    ]),
    emph(
      'wc3_p_quote',
      'Martinez on his future: ',
      '“Maybe it’s new elsewhere, but in Portugal we’ve discussed it a lot already. The World Cup is what matters.”',
      ' The subtext is harder to miss than the headline.',
    ),
    textHeading('wc3_h2_markets', 'Portugal prices vs. the noise'),
    oddsList('wc3_odds', 'Portugal — opening markets', [
      {label: 'Outright winner', odds: '+900'},
      {label: 'Group K winner', odds: '+110'},
      {label: 'Beat DR Congo (Match 1)', odds: '-165'},
      {label: 'Reach the semifinals', odds: '+350'},
    ]),
    contentGrid('wc3_grid', 'uniform', 2, [
      {
        title: 'The bull case',
        body: 'Squad depth survives a cautious opener. Martinez rides Fernandes and Vitinha through a soft knockout half if Colombia stumble elsewhere.',
      },
      {
        title: 'The bear case',
        body: 'Lame-duck energy, Dias rust, and a flexible DR Congo side that defends space well — a group-stage draw is not off the table.',
      },
    ]),
    proseBody('wc3_p_close', [
      'If Portugal drop points early, outright tickets die fast — but reach-the-semis and group-winner prices can become value for bettors who still trust the talent. Watch Martinez’s team sheet against DR Congo: a conservative XI signals he is managing for survival, not statement wins.',
    ]),
    relatedArticles('wc3_rel', 'More World Cup coverage', [
      RELATED.worldCupRankings,
      RELATED.worldCupNeymar,
      RELATED.worldCupIran,
    ]),
  ].filter(Boolean)
}

export function buildWorldCupIranBody() {
  return [
    standfirst(
      'wc4_standfirst',
      'Iran’s World Cup cycle has been defined by geopolitics off the pitch as much as football on it — visa denials, forced post-match flights, and a five-hour border crossing before their opening draw with New Zealand. Bettors pricing Group G should account for fatigue the box score never shows.',
    ),
    proseBody(
      'wc4_lede',
      [
        'Coach Amir Ghalenoei told reporters Iran were ordered to leave the United States immediately after their 2-2 opener with New Zealand in Inglewood — despite planning to recover locally overnight. Instead of a normal post-match routine, the squad boarded a plane for the 140-mile trip back to their Tijuana training base only hours after full time.',
      ],
      {dropCap: true},
    ),
    textHeading('wc4_h2_logistics', 'The travel rules nobody priced in'),
    proseBody('wc4_p_logistics', [
      'Andrew Giuliani, executive director of the White House World Cup task force, confirmed Iran would be allowed to enter the U.S. one day before each match but required to leave on the evening of their games. That is not standard tournament logistics — it is a political arrangement layered on top of a sporting competition.',
      'Captain Mehdi Taremi described five hours of travel and security checks on what should have been a short trip from Tijuana to Los Angeles before the opener. Key federation staff and coaching support personnel were denied U.S. visas entirely, compounding preparation problems that began when FIFA rejected Iran’s request to move group-stage matches out of the country.',
      'Winger Mehdi Torabi’s entry visa expired after the first game; the team scrambled to secure a multiple-entry replacement so he could travel for future fixtures. Every match day now carries administrative risk that most World Cup nations never face.',
    ]),
    pullQuote(
      'wc4_pq1',
      'You cannot model Iran’s fitness in a spreadsheet when the squad is flying back to Mexico on match night.',
      'Editorial Team, BetOnline News',
      'minimal',
    ),
    textHeading('wc4_h2_betting', 'Group G angles bettors are missing'),
    proseBody('wc4_p_betting', [
      'Iran share Group G with New Zealand, Belgium, and Egypt. The opening draw against New Zealand showed resilience — but the travel schedule punishes teams that rely on recovery between fixtures more than raw talent.',
      'Belgium remain heavy favorites to win the group, but second-place props and “points total” markets on Iran are where the gossip meets the odds board. A side running on adrenaline through visa chaos often fades in the second and third group games when legs and sleep catch up.',
    ]),
    oddsList('wc4_odds', 'Group G — snapshot', [
      {label: 'Belgium to win group', odds: '-220'},
      {label: 'Iran to qualify (top 2)', odds: '+180'},
      {label: 'Iran total group points O 3.5', odds: '+105'},
      {label: 'Iran vs Egypt — Draw', odds: '+240'},
    ]),
    ...bullets('wc4_bul', [
      'Track Iran travel news before each U.S.-based fixture — late arrivals compress training time.',
      'Second and third group games are where travel fatigue historically shows up in xG differential.',
      'Belgium -1.5 spreads in later Iran fixtures may inflate if the market overreacts to opener grit.',
      'Under tickets in Iran’s third group match are a common sharp angle when rotation and fatigue collide.',
    ]),
    faqBlock('wc4_faq', 'Iran World Cup FAQ', [
      {
        question: 'Why does Iran train in Mexico?',
        answer:
          'The squad base is in Tijuana, crossing into the U.S. only for match days under strict entry-and-exit rules negotiated with tournament officials.',
      },
      {
        question: 'Does travel chaos make Iran a fade in every game?',
        answer:
          'Not automatically — the opener proved they can compete — but cumulative fatigue makes second and third group fixtures the sharper fade spots.',
      },
    ]),
    relatedArticles('wc4_rel', 'More World Cup coverage', [
      RELATED.worldCupRankings,
      RELATED.worldCupNeymar,
      RELATED.worldCupMartinez,
    ]),
  ].filter(Boolean)
}

export function buildNflBody(images) {
  const hero = images.nfl
  return [
    p(
      'nfl_intro',
      'Division futures open the betting season with more value than most bettors realize. We scanned every AFC and NFC division for mispriced teams — and found three numbers worth staking before camp buzz moves the market.',
    ),
    h2('nfl_h2_1', 'AFC North: still a two-team race on paper'),
    p(
      'nfl_p1',
      'Baltimore and Cincinnati remain the headliners, but Pittsburgh’s defensive upgrades keep them live at a number that still has cushion. Cleveland is a pass at this price unless the quarterback room stabilizes in OTAs.',
    ),
    pullQuote(
      'nfl_pq',
      'Division futures are where recreational money lands first — which is exactly why the edges show up before August.',
      'Editorial Team, BetOnline News',
      'boxed',
    ),
    oddsList('nfl_odds', 'AFC North division winner', [
      {label: 'Baltimore Ravens', odds: '+120'},
      {label: 'Cincinnati Bengals', odds: '+165'},
      {label: 'Pittsburgh Steelers', odds: '+450'},
      {label: 'Cleveland Browns', odds: '+900'},
    ]),
    mediaImage(
      'nfl_img',
      hero,
      'AFC North lines tightened after free agency — shop before minicamp narratives hit the wire.',
    ),
    h2('nfl_h2_2', 'NFC South: the softest division on the board'),
    p(
      'nfl_p2',
      'No team in this division is priced like a juggernaut, which makes small-stake futures attractive for bettors building a portfolio of plus-money tickets.',
    ),
    contentGrid('nfl_grid', 'uniform', 2, [
      {
        title: 'New Orleans',
        body: 'Stable coaching and a veteran quarterback keep them relevant despite roster turnover.',
      },
      {
        title: 'Atlanta',
        body: 'Young core trending up — the price still treats them like a rebuilding project.',
      },
      {
        title: 'Tampa Bay',
        body: 'Window narrowing, but offensive continuity buys another competitive season.',
      },
      {
        title: 'Carolina',
        body: 'Long shot only if the second-year quarterback takes a leap in August.',
      },
    ]),
    marquee('nfl_mq', ['RAVENS +120', 'FALCONS +275', 'SAINTS +310', 'BUCCANEERS +340']),
    ctaBlock('nfl_cta', {
      kicker: 'BetOnline Sportsbook',
      title: 'Shop division futures with early-season limits',
      body: 'Compare AFC and NFC division prices alongside spreads and totals in one bet slip.',
      buttonLabel: 'View NFL futures',
      buttonHref: 'https://www.betonline.ag/sportsbook',
      variant: 'primary',
    }),
    relatedArticles('nfl_rel', 'More NFL coverage', [RELATED.nfl, RELATED.nba]),
  ].filter(Boolean)
}

export function buildNbaBody(images) {
  const hero = images.nba
  return [
    p(
      'nba_intro',
      'The West is tightening while the East still has a clear top tier. Here is how we are betting the playoff race down the stretch — with conference winner prices, seeding scenarios, and one prop market that is moving faster than the rest.',
    ),
    sectionHeader(
      'nba_sh1',
      'Conference race',
      'East vs. West pricing',
      'Where the market is sharp and where it is still catching up.',
      'large',
    ),
    ...bullets('nba_bul1', [
      'Boston remains the East benchmark — price in health risk before buying above +180.',
      'Denver’s West number looks short unless Minnesota and Oklahoma City both slip in the final 15 games.',
      'Play-in chaos is real: target seeding props now before teams clinch and lines freeze.',
    ]),
    oddsList('nba_odds', 'Conference winner odds', [
      {label: 'Boston Celtics to win East', odds: '+180'},
      {label: 'Milwaukee Bucks to win East', odds: '+450'},
      {label: 'Cleveland Cavaliers to win East', odds: '+600'},
      {label: 'Denver Nuggets to win West', odds: '+220'},
      {label: 'Oklahoma City Thunder to win West', odds: '+380'},
    ]),
    pullQuote(
      'nba_pq',
      'Late-season NBA futures are less about talent and more about path — who avoids the play-in, who gets rest, and who draws the soft 4–5 matchup.',
      'Shane Pratt, BetOnline Analysis',
    ),
    videoEmbed(
      'nba_vid',
      'https://www.youtube.com/watch?v=8jPQjjsBbIc',
      'Clip breakdown: why West conference winner prices lag the standings (1:45)',
      'video',
    ),
    mediaImage(
      'nba_img',
      hero,
      'The West playoff picture could flip twice before April — track rest days and back-to-backs.',
    ),
    h3('nba_h3', 'Best bets this week'),
    p(
      'nba_p2',
      'We like a small East futures add on Cleveland at +600 and a West hedge on Oklahoma City at +380. Both teams have top-five net ratings over the last 15 games and favorable remaining schedules.',
    ),
    contentGrid('nba_grid', 'masonry', 3, [
      {
        title: 'Celtics',
        body: 'Defense travels in April. Boston still profiles as the team to beat if Tatum and Brown stay on the floor.',
      },
      {title: 'Thunder', body: 'Young legs, home court edge in a crowded West.'},
      {
        title: 'Nuggets',
        body: 'Jokic playoff equity is priced in — but the surrounding cast is healthier than last spring.',
      },
    ]),
    faqBlock('nba_faq', 'Playoff betting primer', [
      {
        question: 'When should I bet conference winners?',
        answer:
          'The best window is often 20–30 games out, when standings stabilize but before public money piles onto seeds.',
      },
      {
        question: 'Do play-in teams hurt futures value?',
        answer:
          'Yes — a team that might drop to 7–8 carries extra variance. Factor that into any East or West ticket above +400.',
      },
    ]),
    relatedArticles('nba_rel', 'Related analysis', [RELATED.nba, RELATED.clv]),
  ].filter(Boolean)
}

export function buildClvBody(images) {
  const hero = images.analytics
  return [
    p(
      'clv_intro',
      'Closing line value (CLV) is the difference between the odds you bet and the final market price at kickoff. Consistently beating the close is the strongest signal of long-term skill — more reliable than a hot month or a lucky parlay streak.',
    ),
    h2('clv_h2_1', 'What closing line value actually measures'),
    p(
      'clv_p1',
      'Think of the closing line as the market’s best guess after all information is priced in — injuries, weather, steam moves, and sharp action. If you bet Team A at -105 and the game closes -125, you captured positive CLV even if Team A lost outright.',
    ),
    quote(
      'clv_q1',
      'CLV is not a guarantee of profit. It is a guarantee that you bet better numbers than the market’s final opinion — which is where edge lives over thousands of wagers.',
    ),
    mediaImage(
      'clv_img',
      hero,
      'Tracking CLV by sport and market type helps you double down on strengths and cut leaks.',
      {size: 'narrow'},
    ),
    h2('clv_h2_2', 'How to track it without a spreadsheet nightmare'),
    p(
      'clv_p2',
      'Log three fields for every bet: your price, closing price, and market type (spread, total, moneyline, prop). After 100+ bets, group by sport and bettor type. Most recreational bettors discover they beat the close on NFL totals but donate it back on NBA first-half props.',
    ),
    contentGrid('clv_grid', 'uniform', 2, [
      {
        title: 'Positive CLV',
        body: 'You beat the close more often than not in a market — keep firing with disciplined unit sizing.',
      },
      {
        title: 'Neutral CLV',
        body: 'Break-even long term unless you find a niche where your process consistently finds price.',
      },
      {
        title: 'Negative CLV',
        body: 'Stop or reduce volume in that market until your process changes.',
      },
      {
        title: 'Sample size',
        body: 'Track at least 100 bets per market before drawing conclusions from CLV trends.',
      },
    ]),
    divider('clv_div', 'thick'),
    h3('clv_h3', 'Common mistakes'),
    ...bullets('clv_bul', [
      'Chasing closing line value after the fact — bet early with a process, not late with regret.',
      'Ignoring hold and juice when comparing prices across books.',
      'Using CLV on parlays without isolating leg-level closes.',
    ]),
    faqBlock('clv_faq', 'CLV questions', [
      {
        question: 'What is a good CLV rate?',
        answer:
          'Beating the close on 55%+ of spread and total bets is excellent. Prop markets vary — focus on trend direction over 200+ wagers.',
      },
      {
        question: 'Can I have positive CLV and lose money?',
        answer:
          'Absolutely. Variance is real. CLV predicts long-run skill; it does not replace bankroll management.',
      },
      {
        question: 'Which markets are easiest for CLV?',
        answer:
          'Main markets with high limits (NFL sides, NBA totals) tend to have the cleanest closing lines to benchmark against.',
      },
    ]),
    ctaBlock('clv_cta', {
      kicker: 'BetOnline',
      title: 'Track your numbers with sharper main-market limits',
      body: 'Open an account and compare your prices to closing lines on spreads, totals, and props.',
      buttonLabel: 'Join BetOnline',
      buttonHref: 'https://www.betonline.ag/join',
      variant: 'outline',
    }),
    relatedArticles('clv_rel', 'More education', [RELATED.clv, RELATED.worldCup]),
  ].filter(Boolean)
}

export function buildSgpBody(images) {
  const hero = images.betting
  return [
    p(
      'sgp_intro',
      'BetOnline has rolled out SGP+ enhancements ahead of March Madness, making it easier to combine spreads, totals, and player props in one ticket — with clearer pricing and faster edits mid-session.',
    ),
    h2('sgp_h2', 'What changed in SGP+'),
    ...bullets('sgp_bul', [
      'One-tap correlation hints when props conflict with the spread.',
      'Quick swap for alternate lines without rebuilding the entire parlay.',
      'Bracket-mode presets for first-round upset hunting and chalk protection.',
    ]),
    mediaImage(
      'sgp_img',
      hero,
      'SGP+ surfaces correlated legs so you spend less time fixing rejected slips.',
    ),
    videoEmbed(
      'sgp_vid',
      'https://www.youtube.com/watch?v=OzoT_Y-IAEU',
      'Quick tour: building a same-game parlay for opening weekend (0:58)',
      'square',
    ),
    pullQuote(
      'sgp_pq',
      'The edge in March isn’t finding one perfect upset — it’s structuring SGPs that survive variance when your core thesis is right but the scoreboard looks ugly at halftime.',
      'Editorial Team',
      'minimal',
    ),
    ctaBlock('sgp_cta', {
      kicker: 'March Madness',
      title: 'Try SGP+ on opening weekend slates',
      body: 'Combine spreads, totals, and player props with updated correlation guidance.',
      buttonLabel: 'Build a parlay',
      buttonHref: 'https://www.betonline.ag/sportsbook',
      variant: 'accent',
    }),
    relatedArticles('sgp_rel', 'Tournament coverage', [RELATED.sgp, RELATED.worldCup]),
  ].filter(Boolean)
}

export function buildPodcastBody(images) {
  const hero = images.marchMadness
  return [
    p(
      'pod_intro',
      'Join Shane Pratt each week for bracket breakdowns, upset alerts, and same-game parlay ideas as March Madness unfolds. This episode covers East region landmines, a 12-seed worth backing, and three SGP templates for Thursday’s first window.',
    ),
    h2('pod_h2', 'Episode highlights'),
    ...bullets('pod_bul', [
      'Why the East region top seed is overbet on the moneyline.',
      'Two mid-majors with defensive profiles that travel in neutral sites.',
      'SGP frameworks for games with pace mismatches.',
    ]),
    mediaImage(
      'pod_img',
      hero,
      'Full bracket PDF and timestamp links publish with every episode.',
      {size: 'wide'},
    ),
    contentGrid('pod_grid', 'uniform', 3, [
      {
        title: 'Upset watch',
        body: 'Montana State profiles as live if the favorite starts cold from three.',
      },
      {
        title: 'Chalk anchor',
        body: 'Houston’s defense remains the safest regional one-seed cover.',
      },
      {
        title: 'SGP idea',
        body: 'Under + underdog team total plus in a 62-possession slugfest.',
      },
    ]),
    relatedArticles('pod_rel', 'More tournament content', [RELATED.sgp, RELATED.nba]),
  ].filter(Boolean)
}

export function buildArticleBodies(images) {
  return {
    worldCup: buildWorldCupBody(),
    worldCupNeymar: buildWorldCupNeymarBody(),
    worldCupMartinez: buildWorldCupMartinezBody(),
    worldCupIran: buildWorldCupIranBody(),
    nfl: buildNflBody(images),
    nba: buildNbaBody(images),
    clv: buildClvBody(images),
    sgp: buildSgpBody(images),
    podcast: buildPodcastBody(images),
  }
}
