'use client';

import type { ComponentType, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
    Activity,
    AlertTriangle,
    ArrowUpRight,
    Bot,
    Clock3,
    Compass,
    Gauge,
    History,
    LayoutDashboard,
    ListFilter,
    Search,
    ShieldAlert,
    Sparkles,
    Star,
    TrendingUp,
    Waves,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    activityFeed,
    buildDashboardSnapshot,
    instrumentUniverse,
    type InstrumentInsight,
    type StrategyTone,
} from '@/lib/regimelens-data';

type MarketDashboardProps = {
    userName: string;
};

const strategyToneClasses: Record<StrategyTone, string> = {
    Favorable:
        'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    Selective:
        'border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    Cautious:
        'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    Avoid: 'border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300',
};

const regimeClasses: Record<string, string> = {
    'Strong Uptrend':
        'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    'Weak Uptrend':
        'border-teal-500/20 bg-teal-500/10 text-teal-700 dark:text-teal-300',
    'Strong Downtrend':
        'border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300',
    'Weak Downtrend':
        'border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300',
    'Range-Bound':
        'border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-300',
    'Breakout Setup':
        'border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    'Breakdown Risk':
        'border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300',
    'High-Volatility Instability':
        'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    Transitional:
        'border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300',
};

function meterClass(value: number) {
    if (value >= 75) {
        return 'bg-emerald-500';
    }

    if (value >= 50) {
        return 'bg-cyan-500';
    }

    if (value >= 35) {
        return 'bg-amber-500';
    }

    return 'bg-rose-500';
}

function changeToneLabel(
    tone: InstrumentInsight['changeTone'],
    summary: string
) {
    const toneMap = {
        improving: 'Improving',
        weakening: 'Weakening',
        stable: 'Stable',
        transition: 'Transition',
    } as const;

    return `${toneMap[tone]}: ${summary}`;
}

function ScoreBar({
    label,
    value,
    caption,
}: {
    label: string;
    value: number;
    caption: string;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-foreground">{label}</span>
                <span className="text-muted-foreground">{value}/100</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
                <div
                    className={`h-2 rounded-full ${meterClass(value)}`}
                    style={{ width: `${value}%` }}
                />
            </div>
            <p className="text-xs leading-5 text-muted-foreground">{caption}</p>
        </div>
    );
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
}) {
    return (
        <article className="rounded-[1.4rem] border border-border/80 bg-card/80 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        {title}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">
                        {value}
                    </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-muted/60 p-3 text-[var(--brand-cyan)]">
                    <Icon className="size-5" />
                </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
            </p>
        </article>
    );
}

function SectionCard({
    title,
    kicker,
    children,
}: {
    title: string;
    kicker: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-[1.6rem] border border-border/80 bg-card/80 p-5 shadow-sm sm:p-6">
            <div className="mb-5 space-y-1">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    {kicker}
                </p>
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            </div>
            {children}
        </section>
    );
}

export function MarketDashboard({ userName }: MarketDashboardProps) {
    const [query, setQuery] = useState('');
    const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
    const [watchlist, setWatchlist] = useState(
        () =>
            new Set(
                instrumentUniverse
                    .filter((instrument) => instrument.watchlisted)
                    .map((instrument) => instrument.symbol)
            )
    );

    const instruments = useMemo(
        () =>
            instrumentUniverse.map((instrument) => ({
                ...instrument,
                watchlisted: watchlist.has(instrument.symbol),
            })),
        [watchlist]
    );

    const filtered = useMemo(() => {
        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return instruments;
        }

        return instruments.filter((instrument) =>
            [instrument.symbol, instrument.name, instrument.assetClass, instrument.regime]
                .join(' ')
                .toLowerCase()
                .includes(normalized)
        );
    }, [instruments, query]);

    const selectedInstrument =
        instruments.find((instrument) => instrument.symbol === selectedSymbol) ??
        instruments[0];

    const compareSet = filtered.slice(0, 4);
    const snapshot = buildDashboardSnapshot(instruments);

    function toggleWatchlist(symbol: string) {
        setWatchlist((current) => {
            const next = new Set(current);

            if (next.has(symbol)) {
                next.delete(symbol);
            } else {
                next.add(symbol);
            }

            return next;
        });
    }

    return (
        <main className="flex flex-1">
            <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(61,228,193,0.20),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.14),_transparent_32%),linear-gradient(135deg,_rgba(8,12,18,0.98),_rgba(13,22,32,0.96))] p-6 text-white shadow-2xl shadow-black/20 sm:p-8">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_27rem]">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.26em] text-white/72">
                                <LayoutDashboard className="size-3.5 text-[var(--brand-cyan)]" />
                                Regime Dashboard
                            </div>
                            <div className="space-y-3">
                                <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                                    {userName}, the market is rewarding
                                    selectivity, not generic activity.
                                </h1>
                                <p className="max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
                                    RegimeLens organizes trend, volatility,
                                    stability, and strategy-fit into one daily
                                    decision surface so you can quickly tell
                                    which names deserve action, patience, or
                                    reduced attention.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                                    <p className="text-xs uppercase tracking-[0.22em] text-white/48">
                                        Watchlist coverage
                                    </p>
                                    <p className="mt-3 text-3xl font-semibold">
                                        {snapshot.watchlist.length}
                                    </p>
                                    <p className="mt-2 text-sm text-white/65">
                                        Saved instruments actively monitored for
                                        regime shifts.
                                    </p>
                                </div>
                                <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                                    <p className="text-xs uppercase tracking-[0.22em] text-white/48">
                                        Avg confidence
                                    </p>
                                    <p className="mt-3 text-3xl font-semibold">
                                        {snapshot.averageConfidence}%
                                    </p>
                                    <p className="mt-2 text-sm text-white/65">
                                        Current read quality across the active universe.
                                    </p>
                                </div>
                                <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                                    <p className="text-xs uppercase tracking-[0.22em] text-white/48">
                                        High-priority setups
                                    </p>
                                    <p className="mt-3 text-3xl font-semibold">
                                        {snapshot.highPriorityCount}
                                    </p>
                                    <p className="mt-2 text-sm text-white/65">
                                        Names with either strong trend or credible expansion potential.
                                    </p>
                                </div>
                                <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                                    <p className="text-xs uppercase tracking-[0.22em] text-white/48">
                                        Instability alerts
                                    </p>
                                    <p className="mt-3 text-3xl font-semibold">
                                        {snapshot.unstable.length}
                                    </p>
                                    <p className="mt-2 text-sm text-white/65">
                                        Instruments where volatility is degrading clarity.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.22em] text-white/48">
                                        Analyst summary
                                    </p>
                                    <h2 className="mt-2 text-xl font-semibold">
                                        Desk posture
                                    </h2>
                                </div>
                                <Bot className="size-5 text-[var(--brand-amber)]" />
                            </div>
                            <p className="mt-4 text-sm leading-7 text-white/72">
                                Trend leadership remains intact in large-cap
                                tech, energy is organizing for a possible
                                breakout, and small caps still look like a
                                low-efficiency range. The main risk is confusing
                                movement with edge in high-volatility names.
                            </p>
                            <div className="mt-5 grid gap-3">
                                {activityFeed.map((item) => (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-white/10 bg-black/18 p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="text-sm font-medium">
                                                {item.title}
                                            </p>
                                            <span className="text-xs text-white/50">
                                                {item.time}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-white/65">
                                            {item.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Strongest Trending"
                        value={snapshot.trending.map((item) => item.symbol).join(', ')}
                        description="Names with the cleanest continuation structure and strongest directional bias."
                        icon={TrendingUp}
                    />
                    <StatCard
                        title="Range-Bound"
                        value={snapshot.rangeBound.map((item) => item.symbol).join(', ') || 'None'}
                        description="Instruments where patience is more valuable than forcing trend logic."
                        icon={Waves}
                    />
                    <StatCard
                        title="Regime Changes"
                        value={snapshot.changing.length.toString()}
                        description="Names showing meaningful weakening, improvement, or transition risk."
                        icon={Compass}
                    />
                    <StatCard
                        title="Recent Activity"
                        value="3 notes"
                        description="Fresh desk interpretations ready for daily review and planning."
                        icon={Clock3}
                    />
                </section>

                <section className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
                    <div className="space-y-6">
                        <SectionCard
                            title="Instrument Search"
                            kicker="Analyze and switch"
                        >
                            <div className="rounded-[1.2rem] border border-border/80 bg-background/70 p-3">
                                <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-3 py-2">
                                    <Search className="size-4 text-muted-foreground" />
                                    <input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search symbol, name, regime, asset class"
                                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                    />
                                </div>
                                <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                                    <span>{filtered.length} instruments in view</span>
                                    <span className="inline-flex items-center gap-1">
                                        <ListFilter className="size-3.5" />
                                        Filtered universe
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">
                                {filtered.map((instrument) => (
                                    <button
                                        key={instrument.symbol}
                                        type="button"
                                        onClick={() => setSelectedSymbol(instrument.symbol)}
                                        className={`w-full rounded-[1.2rem] border p-4 text-left transition ${
                                            instrument.symbol === selectedInstrument.symbol
                                                ? 'border-[var(--brand-cyan)]/55 bg-[var(--brand-cyan)]/10 shadow-sm'
                                                : 'border-border/80 bg-background/70 hover:border-[var(--brand-cyan)]/35 hover:bg-[var(--brand-cyan)]/5'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-base font-semibold">
                                                        {instrument.symbol}
                                                    </p>
                                                    <span
                                                        className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${regimeClasses[instrument.regime]}`}
                                                    >
                                                        {instrument.regime}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {instrument.name}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                aria-label={`Toggle ${instrument.symbol} watchlist`}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    toggleWatchlist(instrument.symbol);
                                                }}
                                                className={`rounded-full border p-2 transition ${
                                                    instrument.watchlisted
                                                        ? 'border-[var(--brand-amber)]/40 bg-[var(--brand-amber)]/12 text-[var(--brand-amber)]'
                                                        : 'border-border/70 bg-card text-muted-foreground hover:border-[var(--brand-amber)]/30 hover:text-[var(--brand-amber)]'
                                                }`}
                                            >
                                                <Star
                                                    className={`size-4 ${
                                                        instrument.watchlisted
                                                            ? 'fill-current'
                                                            : ''
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                                            <div className="rounded-lg bg-muted/70 px-2 py-2">
                                                <p className="text-muted-foreground">Trend</p>
                                                <p className="mt-1 font-medium text-foreground">
                                                    {instrument.trendStrength}
                                                </p>
                                            </div>
                                            <div className="rounded-lg bg-muted/70 px-2 py-2">
                                                <p className="text-muted-foreground">Vol</p>
                                                <p className="mt-1 font-medium text-foreground">
                                                    {instrument.volatilityScore}
                                                </p>
                                            </div>
                                            <div className="rounded-lg bg-muted/70 px-2 py-2">
                                                <p className="text-muted-foreground">Conf</p>
                                                <p className="mt-1 font-medium text-foreground">
                                                    {instrument.confidence}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </SectionCard>

                        <SectionCard title="Watchlist" kicker="Cross-instrument monitoring">
                            {snapshot.watchlist.length === 0 ? (
                                <div className="rounded-[1.2rem] border border-dashed border-border/80 bg-background/60 p-5 text-sm leading-6 text-muted-foreground">
                                    No saved instruments yet. Star names from the
                                    search list to build a monitoring set.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {snapshot.watchlist.map((instrument) => (
                                        <div
                                            key={instrument.symbol}
                                            className="rounded-[1.2rem] border border-border/80 bg-background/70 p-4"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="font-semibold">
                                                        {instrument.symbol}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {instrument.biasLabel}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`rounded-full border px-2 py-1 text-[11px] font-medium ${regimeClasses[instrument.regime]}`}
                                                >
                                                    {instrument.regime}
                                                </span>
                                            </div>
                                            <p className="mt-3 text-xs leading-5 text-muted-foreground">
                                                {changeToneLabel(
                                                    instrument.changeTone,
                                                    instrument.regimeChange
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </SectionCard>
                    </div>

                    <div className="space-y-6">
                        <SectionCard
                            title={`${selectedInstrument.symbol} Regime Read`}
                            kicker={`${selectedInstrument.name} · ${selectedInstrument.assetClass} · ${selectedInstrument.venue}`}
                        >
                            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_19rem]">
                                <div className="space-y-5">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-medium ${regimeClasses[selectedInstrument.regime]}`}
                                        >
                                            {selectedInstrument.regime}
                                        </span>
                                        <span className="rounded-full border border-border/80 bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                                            {selectedInstrument.biasLabel}
                                        </span>
                                        <span className="rounded-full border border-border/80 bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                                            Reviewed {selectedInstrument.recentAnalysisAt}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold tracking-tight">
                                            {selectedInstrument.regimeSummary}
                                        </h3>
                                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                            {selectedInstrument.commentary}
                                        </p>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-[1.2rem] border border-border/80 bg-background/70 p-4">
                                            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                                Short-term direction
                                            </p>
                                            <p className="mt-3 text-sm leading-6">
                                                {selectedInstrument.shortTermDirection}
                                            </p>
                                        </div>
                                        <div className="rounded-[1.2rem] border border-border/80 bg-background/70 p-4">
                                            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                                Medium-term condition
                                            </p>
                                            <p className="mt-3 text-sm leading-6">
                                                {selectedInstrument.mediumTermCondition}
                                            </p>
                                        </div>
                                        <div className="rounded-[1.2rem] border border-border/80 bg-background/70 p-4 md:col-span-2">
                                            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                                Most likely next behavior
                                            </p>
                                            <p className="mt-3 text-sm leading-6">
                                                {selectedInstrument.likelyNextMove}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 rounded-[1.2rem] border border-border/80 bg-background/70 p-4">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="size-4 text-[var(--brand-cyan)]" />
                                            <p className="text-sm font-semibold">
                                                Why the model believes this regime
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            {selectedInstrument.rationale.map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-xl border border-border/70 bg-card px-4 py-3 text-sm leading-6 text-muted-foreground"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 rounded-[1.4rem] border border-border/80 bg-background/70 p-4">
                                    <ScoreBar
                                        label="Trend strength"
                                        value={selectedInstrument.trendStrength}
                                        caption="Measures directional persistence and structural cleanliness."
                                    />
                                    <ScoreBar
                                        label="Volatility context"
                                        value={selectedInstrument.volatilityScore}
                                        caption="Higher scores imply expanding movement, but not always better opportunity."
                                    />
                                    <ScoreBar
                                        label="Regime confidence"
                                        value={selectedInstrument.confidence}
                                        caption="Confidence is lower when signals conflict or participation narrows."
                                    />
                                    <ScoreBar
                                        label="Regime stability"
                                        value={selectedInstrument.stability}
                                        caption="Stability indicates whether the current read is holding together or fraying."
                                    />
                                    <ScoreBar
                                        label="Reversal risk"
                                        value={selectedInstrument.reversalRisk}
                                        caption="Monitors whether continuation is fragile and vulnerable to structure failure."
                                    />
                                </div>
                            </div>
                        </SectionCard>

                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
                            <SectionCard
                                title="Volatility, Strategy Fit, and Risk"
                                kicker="Behavior context"
                            >
                                <div className="space-y-5">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-[1.2rem] border border-border/80 bg-background/70 p-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold">
                                                <Gauge className="size-4 text-[var(--brand-cyan)]" />
                                                Volatility personality
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                                {selectedInstrument.volatilityContext}
                                            </p>
                                        </div>
                                        <div className="rounded-[1.2rem] border border-border/80 bg-background/70 p-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold">
                                                <Activity className="size-4 text-[var(--brand-cyan)]" />
                                                Tape behavior
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                                {selectedInstrument.behaviorContext}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Strategy-fit guidance
                                        </p>
                                        <div className="mt-3 grid gap-3 md:grid-cols-3">
                                            {selectedInstrument.strategyFits.map((fit) => (
                                                <div
                                                    key={fit.label}
                                                    className="rounded-[1.2rem] border border-border/80 bg-background/70 p-4"
                                                >
                                                    <span
                                                        className={`inline-flex rounded-full border px-2 py-1 text-[11px] font-medium ${strategyToneClasses[fit.tone]}`}
                                                    >
                                                        {fit.tone}
                                                    </span>
                                                    <p className="mt-3 text-sm font-semibold">
                                                        {fit.label}
                                                    </p>
                                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                        {fit.note}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Risks that matter now
                                        </p>
                                        <div className="mt-3 space-y-3">
                                            {selectedInstrument.risks.map((risk) => (
                                                <div
                                                    key={risk}
                                                    className="flex items-start gap-3 rounded-[1.1rem] border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-sm leading-6 text-muted-foreground"
                                                >
                                                    <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-500" />
                                                    <span>{risk}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SectionCard>

                            <SectionCard
                                title="Recent History"
                                kicker="Regime change timeline"
                            >
                                <div className="space-y-4">
                                    {selectedInstrument.history.map((item) => (
                                        <div
                                            key={`${item.period}-${item.regime}`}
                                            className="rounded-[1.2rem] border border-border/80 bg-background/70 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        {item.period}
                                                    </p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        Confidence {item.confidence}%
                                                    </p>
                                                </div>
                                                <span
                                                    className={`rounded-full border px-2 py-1 text-[11px] font-medium ${regimeClasses[item.regime]}`}
                                                >
                                                    {item.regime}
                                                </span>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                                {item.note}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>

                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
                            <SectionCard
                                title="Cross-Instrument Comparison"
                                kicker="Daily decision support"
                            >
                                <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                                    {compareSet.map((instrument) => (
                                        <article
                                            key={instrument.symbol}
                                            className="rounded-[1.2rem] border border-border/80 bg-background/70 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="text-base font-semibold">
                                                        {instrument.symbol}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {instrument.name}
                                                    </p>
                                                </div>
                                                <ArrowUpRight className="size-4 text-muted-foreground" />
                                            </div>
                                            <span
                                                className={`mt-3 inline-flex rounded-full border px-2 py-1 text-[11px] font-medium ${regimeClasses[instrument.regime]}`}
                                            >
                                                {instrument.regime}
                                            </span>
                                            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                                                <div className="rounded-lg bg-card px-3 py-2">
                                                    <p className="text-muted-foreground">
                                                        Trend
                                                    </p>
                                                    <p className="mt-1 font-medium">
                                                        {instrument.trendStrength}
                                                    </p>
                                                </div>
                                                <div className="rounded-lg bg-card px-3 py-2">
                                                    <p className="text-muted-foreground">
                                                        Volatility
                                                    </p>
                                                    <p className="mt-1 font-medium">
                                                        {instrument.volatilityScore}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                                {instrument.likelyNextMove}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </SectionCard>

                            <SectionCard
                                title="Market Commentary"
                                kicker="Prepared note"
                            >
                                <div className="rounded-[1.2rem] border border-border/80 bg-[var(--brand-cyan)]/8 p-4">
                                    <div className="flex items-start gap-3">
                                        <History className="mt-0.5 size-4 shrink-0 text-[var(--brand-cyan)]" />
                                        <p className="text-sm leading-7 text-foreground">
                                            <span className="font-semibold">
                                                Current regime:
                                            </span>{' '}
                                            {selectedInstrument.symbol} is in a{' '}
                                            {selectedInstrument.regime.toLowerCase()}{' '}
                                            environment with{' '}
                                            {selectedInstrument.confidence}% read
                                            confidence. The desk bias is{' '}
                                            {selectedInstrument.biasLabel.toLowerCase()}
                                            , but execution quality depends on{' '}
                                            {selectedInstrument.volatilityContext.toLowerCase()}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 rounded-[1.2rem] border border-border/80 bg-background/70 p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[var(--brand-amber)]" />
                                        <p className="text-sm leading-7 text-muted-foreground">
                                            The main planning question is not
                                            whether the instrument can move, but
                                            whether the current structure
                                            supports a repeatable edge. If
                                            stability continues to weaken while
                                            volatility expands, attention should
                                            shift from opportunity-seeking to
                                            risk containment.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-3">
                                    <Button size="lg" className="bg-[var(--brand-cyan)] text-slate-950 hover:bg-[color-mix(in_oklab,var(--brand-cyan)_88%,white)]">
                                        Save to briefing
                                    </Button>
                                    <Button size="lg" variant="outline">
                                        Share summary
                                    </Button>
                                </div>
                            </SectionCard>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
