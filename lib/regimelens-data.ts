export type RegimeState =
    | 'Strong Uptrend'
    | 'Weak Uptrend'
    | 'Strong Downtrend'
    | 'Weak Downtrend'
    | 'Range-Bound'
    | 'Breakout Setup'
    | 'Breakdown Risk'
    | 'High-Volatility Instability'
    | 'Transitional';

export type DirectionLabel =
    | 'Bullish continuation'
    | 'Bullish but fragile'
    | 'Neutral compression'
    | 'Bearish continuation'
    | 'Bearish but unstable'
    | 'Volatile two-way trade'
    | 'Await confirmation';

export type StrategyTone = 'Favorable' | 'Selective' | 'Cautious' | 'Avoid';

export type HistoryPoint = {
    period: string;
    regime: RegimeState;
    note: string;
    confidence: number;
};

export type StrategyFit = {
    label: string;
    tone: StrategyTone;
    note: string;
};

export type InstrumentInsight = {
    symbol: string;
    name: string;
    assetClass: string;
    venue: string;
    regime: RegimeState;
    regimeSummary: string;
    biasLabel: DirectionLabel;
    shortTermDirection: string;
    mediumTermCondition: string;
    likelyNextMove: string;
    rationale: string[];
    volatilityContext: string;
    behaviorContext: string;
    trendStrength: number;
    volatilityScore: number;
    confidence: number;
    stability: number;
    regimeShiftRisk: number;
    breakoutPotential: number;
    reversalRisk: number;
    setupQuality: number;
    watchlisted: boolean;
    recentAnalysisAt: string;
    regimeChange: string;
    changeTone: 'improving' | 'weakening' | 'stable' | 'transition';
    strategyFits: StrategyFit[];
    risks: string[];
    commentary: string;
    history: HistoryPoint[];
};

export const instrumentUniverse: InstrumentInsight[] = [
    {
        symbol: 'NVDA',
        name: 'NVIDIA',
        assetClass: 'Equity',
        venue: 'NASDAQ',
        regime: 'Strong Uptrend',
        regimeSummary:
            'Orderly upside with broad participation, shallow pullbacks, and momentum still being defended.',
        biasLabel: 'Bullish continuation',
        shortTermDirection: 'Bias remains higher while pullbacks hold above the recent breakout shelf.',
        mediumTermCondition:
            'Medium-term trend remains constructive, but extension risk is rising after a persistent run.',
        likelyNextMove:
            'Most probable path is continuation after digestion, not an immediate trend reversal.',
        rationale: [
            'Price structure is printing higher highs with expanding relative strength.',
            'Pullbacks are shallow and volume is not signaling aggressive distribution.',
            'Volatility is elevated enough to create opportunity, but not disorderly.',
        ],
        volatilityContext:
            'Energetic but still controlled. Range expansion is supporting trend discovery rather than random whipsaw.',
        behaviorContext:
            'Momentum-led tape with clear dip-buying behavior and acceptable trend cleanliness.',
        trendStrength: 92,
        volatilityScore: 68,
        confidence: 84,
        stability: 79,
        regimeShiftRisk: 34,
        breakoutPotential: 77,
        reversalRisk: 29,
        setupQuality: 86,
        watchlisted: true,
        recentAnalysisAt: '14 min ago',
        regimeChange: '+6 trend score vs prior review',
        changeTone: 'improving',
        strategyFits: [
            {
                label: 'Trend-following',
                tone: 'Favorable',
                note: 'Momentum entries and pullback participation are aligned with the current structure.',
            },
            {
                label: 'Breakout continuation',
                tone: 'Selective',
                note: 'Works if entries are disciplined; chasing large range expansion is less attractive.',
            },
            {
                label: 'Mean reversion',
                tone: 'Avoid',
                note: 'Countertrend fading has a poor edge while buyers keep defending structure.',
            },
        ],
        risks: [
            'Extended positioning can create sharp but temporary air pockets.',
            'A failed retest of the breakout shelf would reduce confidence quickly.',
        ],
        commentary:
            'NVIDIA remains in a high-quality bullish regime. The tape still favors continuation over reversal, but the opportunity is cleaner on controlled pullbacks than on emotional upside spikes.',
        history: [
            {
                period: '3 weeks ago',
                regime: 'Breakout Setup',
                note: 'Compression tightened under resistance with improving breadth.',
                confidence: 71,
            },
            {
                period: '2 weeks ago',
                regime: 'Strong Uptrend',
                note: 'Breakout confirmed and follow-through held.',
                confidence: 80,
            },
            {
                period: '5 days ago',
                regime: 'Strong Uptrend',
                note: 'Momentum accelerated but remained orderly.',
                confidence: 83,
            },
        ],
    },
    {
        symbol: 'SPY',
        name: 'SPDR S&P 500 ETF',
        assetClass: 'Index ETF',
        venue: 'NYSE Arca',
        regime: 'Weak Uptrend',
        regimeSummary:
            'Uptrend is intact, but thrust is moderating and upside progress requires more selectivity.',
        biasLabel: 'Bullish but fragile',
        shortTermDirection:
            'Near-term direction still leans upward, though follow-through has become less decisive.',
        mediumTermCondition:
            'Broader structure is healthy, but leadership concentration makes the tape less forgiving.',
        likelyNextMove:
            'Most likely outcome is a pause-to-digest phase before trend continuation is resolved.',
        rationale: [
            'Higher-high structure is intact but momentum breadth is narrowing.',
            'Volatility is calm enough to support constructive price action.',
            'Failed breakouts are limited, yet fewer names are doing the heavy lifting.',
        ],
        volatilityContext:
            'Calm to moderate. Realized volatility is not flashing stress, but it is not collapsing either.',
        behaviorContext:
            'Index-level trend is positive, though underlying participation suggests weaker internal conviction.',
        trendStrength: 74,
        volatilityScore: 42,
        confidence: 72,
        stability: 70,
        regimeShiftRisk: 39,
        breakoutPotential: 56,
        reversalRisk: 35,
        setupQuality: 71,
        watchlisted: true,
        recentAnalysisAt: '48 min ago',
        regimeChange: 'Breadth cooling under the surface',
        changeTone: 'weakening',
        strategyFits: [
            {
                label: 'Trend-following',
                tone: 'Selective',
                note: 'Works best in leading groups rather than broad aggressive exposure.',
            },
            {
                label: 'Breakout trading',
                tone: 'Cautious',
                note: 'Cleaner when confirmed by expanding breadth; otherwise prone to stalling.',
            },
            {
                label: 'Patience / observation',
                tone: 'Favorable',
                note: 'Waiting for either broader confirmation or a reset can improve timing.',
            },
        ],
        risks: [
            'Internal weakness can create a sudden shift from drift-up to rejection.',
            'Crowded consensus can flatten upside reward-to-risk.',
        ],
        commentary:
            'SPY still leans constructive, but this is not an effortless risk-on tape. The market is rewarding selectivity and discipline more than broad aggression.',
        history: [
            {
                period: '1 month ago',
                regime: 'Range-Bound',
                note: 'Index struggled to extend while leadership rotated quickly.',
                confidence: 67,
            },
            {
                period: '2 weeks ago',
                regime: 'Weak Uptrend',
                note: 'Range resolved higher, but expansion was measured.',
                confidence: 70,
            },
            {
                period: '4 days ago',
                regime: 'Weak Uptrend',
                note: 'Upside held, though breadth softened.',
                confidence: 72,
            },
        ],
    },
    {
        symbol: 'XLE',
        name: 'Energy Select Sector SPDR',
        assetClass: 'Sector ETF',
        venue: 'NYSE Arca',
        regime: 'Breakout Setup',
        regimeSummary:
            'Price is coiling beneath resistance with supportive internals and rising expansion risk.',
        biasLabel: 'Await confirmation',
        shortTermDirection:
            'Short-term direction is neutral-to-bullish while the range remains intact.',
        mediumTermCondition:
            'Medium-term condition is improving, especially if sector rotation continues to favor cyclicals.',
        likelyNextMove:
            'Most likely next behavior is an expansion move; direction depends on resistance resolution.',
        rationale: [
            'Compression has tightened while pullbacks keep finding support at higher lows.',
            'Volatility has contracted, often a precursor to directional expansion.',
            'Relative performance has improved versus broad market benchmarks.',
        ],
        volatilityContext:
            'Currently calm, but likely to expand soon if the range resolves.',
        behaviorContext:
            'Constructive base-building. The tape is not trending yet, but it is organizing for a larger move.',
        trendStrength: 63,
        volatilityScore: 38,
        confidence: 69,
        stability: 75,
        regimeShiftRisk: 47,
        breakoutPotential: 82,
        reversalRisk: 31,
        setupQuality: 78,
        watchlisted: true,
        recentAnalysisAt: '1 hr ago',
        regimeChange: 'Compression tightening near trigger',
        changeTone: 'improving',
        strategyFits: [
            {
                label: 'Breakout trading',
                tone: 'Favorable',
                note: 'The setup is attractive if price confirms with acceptance above resistance.',
            },
            {
                label: 'Trend-following',
                tone: 'Selective',
                note: 'Better after the range resolves; pre-breakout trend signals are still premature.',
            },
            {
                label: 'Range trading',
                tone: 'Cautious',
                note: 'Late-stage ranges can break abruptly and punish fading behavior.',
            },
        ],
        risks: [
            'A failed breakout could rotate the regime into noisy indecision quickly.',
            'Commodity-led sectors can gap on macro headlines.',
        ],
        commentary:
            'XLE is not yet in a confirmed trend, but it is one of the cleaner expansion candidates on the board. It deserves attention because the market is compressing in a way that often precedes a tradable move.',
        history: [
            {
                period: '4 weeks ago',
                regime: 'Weak Downtrend',
                note: 'Sector drifted lower with weak sponsorship.',
                confidence: 64,
            },
            {
                period: '2 weeks ago',
                regime: 'Range-Bound',
                note: 'Selling pressure faded and base formation started.',
                confidence: 68,
            },
            {
                period: '3 days ago',
                regime: 'Breakout Setup',
                note: 'Range tightened near resistance.',
                confidence: 69,
            },
        ],
    },
    {
        symbol: 'IWM',
        name: 'iShares Russell 2000 ETF',
        assetClass: 'Index ETF',
        venue: 'NYSE Arca',
        regime: 'Range-Bound',
        regimeSummary:
            'Price is oscillating without durable directional control, making selective patience more valuable than activity.',
        biasLabel: 'Neutral compression',
        shortTermDirection:
            'Short-term direction is balanced; edges appear brief and fade quickly.',
        mediumTermCondition:
            'Medium-term condition remains unresolved until the current range decisively breaks.',
        likelyNextMove:
            'Most likely behavior is continued rotation inside the range unless breadth improves materially.',
        rationale: [
            'Breakouts and breakdowns are not earning sustained follow-through.',
            'Momentum readings are middling and quickly mean-revert.',
            'Volatility is moderate, but structure quality is poor.',
        ],
        volatilityContext:
            'Neither calm nor explosive. The issue is inefficiency rather than headline-level volatility.',
        behaviorContext:
            'Two-way, choppy trade where clean directional setups are scarce.',
        trendStrength: 41,
        volatilityScore: 51,
        confidence: 77,
        stability: 74,
        regimeShiftRisk: 44,
        breakoutPotential: 48,
        reversalRisk: 46,
        setupQuality: 43,
        watchlisted: true,
        recentAnalysisAt: '2 hr ago',
        regimeChange: 'No decisive range resolution',
        changeTone: 'stable',
        strategyFits: [
            {
                label: 'Range trading',
                tone: 'Selective',
                note: 'Works only with disciplined levels and modest expectations.',
            },
            {
                label: 'Trend-following',
                tone: 'Avoid',
                note: 'Trend persistence is not strong enough to justify chasing directional moves.',
            },
            {
                label: 'Observation / wait',
                tone: 'Favorable',
                note: 'Preserving attention for cleaner structures may be the best decision.',
            },
        ],
        risks: [
            'False starts can create frustration and overtrading.',
            'A surprise macro shock could push the market out of the range without warning.',
        ],
        commentary:
            'IWM is a classic attention trap right now: active enough to tempt action, but not structured enough to reward it consistently. Unless the range resolves, patience is a valid strategy.',
        history: [
            {
                period: '1 month ago',
                regime: 'Weak Uptrend',
                note: 'Small caps pushed higher, but sponsorship weakened quickly.',
                confidence: 62,
            },
            {
                period: '10 days ago',
                regime: 'Transitional',
                note: 'Trend broke down into mixed behavior.',
                confidence: 66,
            },
            {
                period: '2 days ago',
                regime: 'Range-Bound',
                note: 'Balance condition became more obvious.',
                confidence: 77,
            },
        ],
    },
    {
        symbol: 'TSLA',
        name: 'Tesla',
        assetClass: 'Equity',
        venue: 'NASDAQ',
        regime: 'High-Volatility Instability',
        regimeSummary:
            'Large directional swings are occurring without enough structural consistency to trust follow-through.',
        biasLabel: 'Volatile two-way trade',
        shortTermDirection:
            'Near-term direction is highly reactive and headline-sensitive rather than structurally reliable.',
        mediumTermCondition:
            'Medium-term condition is unstable; the chart can swing from breakout attempt to rejection quickly.',
        likelyNextMove:
            'Most likely outcome is continued outsized movement with poor signal quality.',
        rationale: [
            'Volatility is expanding while trend persistence remains weak.',
            'Impulse moves are frequent, but retracements are deep and fast.',
            'Risk is dominated by instability rather than clean directional edge.',
        ],
        volatilityContext:
            'Unstable. Sudden range expansion is common and stop placement is difficult.',
        behaviorContext:
            'Emotion-driven tape with elevated whip risk and inconsistent trend sponsorship.',
        trendStrength: 38,
        volatilityScore: 91,
        confidence: 81,
        stability: 22,
        regimeShiftRisk: 78,
        breakoutPotential: 61,
        reversalRisk: 72,
        setupQuality: 35,
        watchlisted: false,
        recentAnalysisAt: '3 hr ago',
        regimeChange: 'Volatility spike after failed upside continuation',
        changeTone: 'transition',
        strategyFits: [
            {
                label: 'Breakout trading',
                tone: 'Cautious',
                note: 'Only for traders comfortable with unstable expansion and fast invalidation.',
            },
            {
                label: 'Trend-following',
                tone: 'Avoid',
                note: 'Trend quality is too inconsistent to trust normal continuation logic.',
            },
            {
                label: 'Patience / reduced size',
                tone: 'Favorable',
                note: 'Reducing attention or size is justified until structure settles.',
            },
        ],
        risks: [
            'Gap risk and headline sensitivity can overwhelm technical levels.',
            'Volatility can look attractive while actually degrading edge.',
        ],
        commentary:
            'Tesla currently offers movement, not clarity. This is the kind of tape that can create the illusion of opportunity while punishing undisciplined participation.',
        history: [
            {
                period: '3 weeks ago',
                regime: 'Weak Uptrend',
                note: 'Recovery bounce looked tradable but lacked durability.',
                confidence: 60,
            },
            {
                period: '1 week ago',
                regime: 'Transitional',
                note: 'Bullish structure began to fray.',
                confidence: 69,
            },
            {
                period: '1 day ago',
                regime: 'High-Volatility Instability',
                note: 'Expansion turned disorderly.',
                confidence: 81,
            },
        ],
    },
    {
        symbol: 'QQQ',
        name: 'Invesco QQQ Trust',
        assetClass: 'Index ETF',
        venue: 'NASDAQ',
        regime: 'Strong Uptrend',
        regimeSummary:
            'Leadership remains concentrated but effective, keeping the index in a durable bullish regime.',
        biasLabel: 'Bullish continuation',
        shortTermDirection:
            'Near-term direction still points higher while momentum leaders hold above support.',
        mediumTermCondition:
            'Medium-term condition is constructive, though crowded leadership should be monitored.',
        likelyNextMove:
            'A continuation or shallow reset is more likely than outright trend failure.',
        rationale: [
            'Mega-cap leadership is maintaining index-level structure.',
            'Breakdown attempts have been brief and bought quickly.',
            'Volatility is active but not yet destabilizing the uptrend.',
        ],
        volatilityContext:
            'Moderate and supportive. Pullbacks are large enough to matter, but not chaotic.',
        behaviorContext:
            'Leader-driven uptrend where relative strength is doing most of the work.',
        trendStrength: 88,
        volatilityScore: 58,
        confidence: 82,
        stability: 76,
        regimeShiftRisk: 36,
        breakoutPotential: 68,
        reversalRisk: 32,
        setupQuality: 84,
        watchlisted: false,
        recentAnalysisAt: 'Yesterday',
        regimeChange: 'Leadership still holding index-level control',
        changeTone: 'stable',
        strategyFits: [
            {
                label: 'Trend-following',
                tone: 'Favorable',
                note: 'Still the clearest index-level approach while leadership persists.',
            },
            {
                label: 'Breakout trading',
                tone: 'Selective',
                note: 'Works best in liquid leaders rather than indiscriminately across the basket.',
            },
            {
                label: 'Mean reversion',
                tone: 'Avoid',
                note: 'Shorting strength without evidence of structural damage is low quality.',
            },
        ],
        risks: [
            'Leadership concentration can mask underlying fragility.',
            'A sharp reversal in large-cap tech would affect the regime quickly.',
        ],
        commentary:
            'QQQ remains one of the cleaner expressions of market leadership. The read is bullish, but that strength is narrower than it appears at first glance.',
        history: [
            {
                period: '1 month ago',
                regime: 'Weak Uptrend',
                note: 'Market regained footing but still needed confirmation.',
                confidence: 68,
            },
            {
                period: '2 weeks ago',
                regime: 'Strong Uptrend',
                note: 'Leadership expanded and trend quality improved.',
                confidence: 79,
            },
            {
                period: '6 days ago',
                regime: 'Strong Uptrend',
                note: 'Trend stayed intact after brief digestion.',
                confidence: 82,
            },
        ],
    },
    {
        symbol: 'XLU',
        name: 'Utilities Select Sector SPDR',
        assetClass: 'Sector ETF',
        venue: 'NYSE Arca',
        regime: 'Weak Downtrend',
        regimeSummary:
            'Price is leaning lower in an orderly way, with weak relative demand and limited upside urgency.',
        biasLabel: 'Bearish continuation',
        shortTermDirection:
            'Short-term direction favors lower or sideways-to-lower action unless support reclaims quickly.',
        mediumTermCondition:
            'Medium-term condition remains soft as defensive leadership is not attracting urgent sponsorship.',
        likelyNextMove:
            'A drift lower or failed bounce is more probable than a durable upside reversal.',
        rationale: [
            'Lower-high structure remains in place.',
            'Bounces are not translating into regime repair.',
            'Volatility is contained, which makes the weakness orderly rather than capitulatory.',
        ],
        volatilityContext:
            'Calm but unsupportive. The issue is persistent softness, not violent movement.',
        behaviorContext:
            'Orderly weakness with limited evidence of sponsorship returning.',
        trendStrength: 57,
        volatilityScore: 29,
        confidence: 74,
        stability: 72,
        regimeShiftRisk: 28,
        breakoutPotential: 21,
        reversalRisk: 44,
        setupQuality: 58,
        watchlisted: false,
        recentAnalysisAt: 'Yesterday',
        regimeChange: 'Defensive bounce attempts continue to fail',
        changeTone: 'weakening',
        strategyFits: [
            {
                label: 'Trend-following',
                tone: 'Selective',
                note: 'Short-side continuation has some edge, but the move lacks urgency.',
            },
            {
                label: 'Reversal trading',
                tone: 'Cautious',
                note: 'A bullish reversal needs real evidence; soft conditions alone are not enough.',
            },
            {
                label: 'Opportunity triage',
                tone: 'Favorable',
                note: 'This may simply be less attractive than stronger sector alternatives.',
            },
        ],
        risks: [
            'Low-volatility names can consume time without producing much opportunity.',
            'A rate-driven rotation could change the read quickly.',
        ],
        commentary:
            'XLU is not collapsing, but it is failing to prove relevance. The cleaner decision may be to deprioritize it unless the regime begins to improve.',
        history: [
            {
                period: '3 weeks ago',
                regime: 'Range-Bound',
                note: 'Support held, but upside sponsorship was absent.',
                confidence: 65,
            },
            {
                period: '8 days ago',
                regime: 'Weak Downtrend',
                note: 'Range resolved lower in an orderly manner.',
                confidence: 71,
            },
            {
                period: '2 days ago',
                regime: 'Weak Downtrend',
                note: 'Bounce attempt failed under prior support.',
                confidence: 74,
            },
        ],
    },
    {
        symbol: 'SMH',
        name: 'VanEck Semiconductor ETF',
        assetClass: 'Sector ETF',
        venue: 'NASDAQ',
        regime: 'Transitional',
        regimeSummary:
            'Primary trend is still positive, but rotation beneath the surface is making the next phase less obvious.',
        biasLabel: 'Await confirmation',
        shortTermDirection:
            'Short-term direction is mixed: strength exists, but internal participation is rotating.',
        mediumTermCondition:
            'Medium-term condition is constructive if support holds, though trend confidence has softened.',
        likelyNextMove:
            'Most likely path is either a controlled reset or a renewed upside push after leadership stabilizes.',
        rationale: [
            'Trend remains above key support, but momentum is no longer broad-based.',
            'Some leaders still act well while laggards are degrading.',
            'Conflicting signals justify a transitional label rather than blind bullishness.',
        ],
        volatilityContext:
            'Moderate and rising. The market is shifting from trend comfort to decision territory.',
        behaviorContext:
            'Leadership rotation and mixed signal quality make this a transition regime rather than a clean trend state.',
        trendStrength: 69,
        volatilityScore: 61,
        confidence: 63,
        stability: 49,
        regimeShiftRisk: 61,
        breakoutPotential: 58,
        reversalRisk: 52,
        setupQuality: 62,
        watchlisted: true,
        recentAnalysisAt: '5 hr ago',
        regimeChange: 'Leadership divergence increasing',
        changeTone: 'transition',
        strategyFits: [
            {
                label: 'Trend-following',
                tone: 'Selective',
                note: 'Still possible in stronger components, but sector-level confidence is lower.',
            },
            {
                label: 'Breakout trading',
                tone: 'Cautious',
                note: 'Needs confirmation because mixed internals increase failure risk.',
            },
            {
                label: 'Observation / reduced aggression',
                tone: 'Favorable',
                note: 'Waiting for either repair or breakdown can improve decision quality.',
            },
        ],
        risks: [
            'Mixed internals can fool traders into treating a transition like a trend.',
            'If support fails, confidence can unwind quickly.',
        ],
        commentary:
            'SMH is a useful reminder that strength and uncertainty can coexist. The broader structure has not broken, but conviction should be lower until participation improves again.',
        history: [
            {
                period: '1 month ago',
                regime: 'Strong Uptrend',
                note: 'Semiconductor leadership was broad and decisive.',
                confidence: 81,
            },
            {
                period: '2 weeks ago',
                regime: 'Weak Uptrend',
                note: 'Upside continued but breadth narrowed.',
                confidence: 70,
            },
            {
                period: '3 days ago',
                regime: 'Transitional',
                note: 'Divergence between leaders and laggards widened.',
                confidence: 63,
            },
        ],
    },
];

export const activityFeed = [
    {
        title: 'Regime shift detected in semiconductors',
        detail: 'SMH moved from weak uptrend to transitional after leadership divergence widened.',
        time: '12 min ago',
    },
    {
        title: 'High-volatility alert',
        detail: 'TSLA volatility score crossed the instability threshold with worsening setup quality.',
        time: '37 min ago',
    },
    {
        title: 'Breakout candidate promoted',
        detail: 'XLE moved into top expansion watch after tighter compression and better relative strength.',
        time: '1 hr ago',
    },
];

export function buildDashboardSnapshot(instruments: InstrumentInsight[]) {
    const watchlist = instruments.filter((instrument) => instrument.watchlisted);
    const trending = [...instruments]
        .filter((instrument) =>
            ['Strong Uptrend', 'Weak Uptrend'].includes(instrument.regime)
        )
        .sort((left, right) => right.trendStrength - left.trendStrength)
        .slice(0, 3);
    const rangeBound = instruments.filter(
        (instrument) => instrument.regime === 'Range-Bound'
    );
    const unstable = [...instruments]
        .filter(
            (instrument) =>
                instrument.regime === 'High-Volatility Instability' ||
                instrument.volatilityScore >= 75
        )
        .sort((left, right) => right.volatilityScore - left.volatilityScore);
    const changing = [...instruments]
        .filter((instrument) => instrument.changeTone !== 'stable')
        .sort((left, right) => right.regimeShiftRisk - left.regimeShiftRisk)
        .slice(0, 4);

    return {
        watchlist,
        trending,
        rangeBound,
        unstable,
        changing,
        averageConfidence: Math.round(
            instruments.reduce((sum, instrument) => sum + instrument.confidence, 0) /
                instruments.length
        ),
        highPriorityCount: instruments.filter(
            (instrument) => instrument.setupQuality >= 75 || instrument.breakoutPotential >= 75
        ).length,
    };
}
