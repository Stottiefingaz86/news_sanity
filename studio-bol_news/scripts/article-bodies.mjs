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
      RELATED.worldCup,
      RELATED.clv,
      {
        title: 'BetOnline Launches New SGP+ Features for March Madness',
        href: '/betonline-launches-new-sgp-features',
        category: 'News',
      },
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
    nfl: buildNflBody(images),
    nba: buildNbaBody(images),
    clv: buildClvBody(images),
    sgp: buildSgpBody(images),
    podcast: buildPodcastBody(images),
  }
}
