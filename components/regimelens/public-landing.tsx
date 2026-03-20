import Link from 'next/link';
import {
    Activity,
    ArrowRight,
    BarChart3,
    Bot,
    Radar,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const featureCards = [
    {
        title: 'Regime-first market analysis',
        description:
            'Separate trend, noise, and instability before sizing risk or choosing a strategy.',
        icon: Radar,
    },
    {
        title: 'Forward-looking outlook notes',
        description:
            'Summaries explain what is most likely next, what could invalidate the read, and how fragile the setup is.',
        icon: Bot,
    },
    {
        title: 'Cross-instrument monitoring',
        description:
            'Compare trending leaders, indecisive names, volatility spikes, and regime transitions in one workspace.',
        icon: BarChart3,
    },
];

const audience = [
    'Retail and swing traders',
    'Research desks and advisory teams',
    'Portfolio managers and prop teams',
];

export function PublicLanding() {
    return (
        <main className="flex flex-1">
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:gap-14 lg:py-14">
                <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(61,228,193,0.22),_transparent_28%),linear-gradient(145deg,_rgba(8,12,18,0.98),_rgba(11,19,30,0.96))] px-6 py-8 text-white shadow-2xl shadow-black/20 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_22rem] lg:items-end">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-white/72">
                                <Sparkles className="size-3.5 text-[var(--brand-cyan)]" />
                                AI Market Regime Intelligence
                            </div>
                            <div className="space-y-4">
                                <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                                    Know whether the market deserves aggression,
                                    patience, or caution.
                                </h1>
                                <p className="max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
                                    RegimeLens helps traders and market teams
                                    distinguish strong trends from noisy churn,
                                    spot unstable conditions early, and match
                                    strategy to the environment with more
                                    discipline.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button asChild size="lg" className="bg-[var(--brand-cyan)] text-slate-950 hover:bg-[color-mix(in_oklab,var(--brand-cyan)_85%,white)]">
                                    <Link href="/sign-up">
                                        Open your workspace
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                                >
                                    <Link href="/sign-in">Sign in</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                            <div className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                                        Live desk view
                                    </p>
                                    <p className="mt-2 text-sm font-medium">
                                        18 instruments under active review
                                    </p>
                                </div>
                                <Activity className="size-5 text-[var(--brand-amber)]" />
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                                        Favorable trend
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold">QQQ, NVDA</p>
                                    <p className="mt-2 text-sm text-white/65">
                                        Cleanest continuation structures with moderate regime stability.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/8 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-amber-100/70">
                                        Caution
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold">TSLA</p>
                                    <p className="mt-2 text-sm text-white/65">
                                        Volatility expanding faster than setup quality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    {featureCards.map(({ title, description, icon: Icon }) => (
                        <article
                            key={title}
                            className="rounded-[1.5rem] border border-border/80 bg-card/80 p-6 shadow-sm"
                        >
                            <div className="inline-flex rounded-2xl border border-border/80 bg-muted/60 p-3 text-[var(--brand-cyan)]">
                                <Icon className="size-5" />
                            </div>
                            <h2 className="mt-5 text-xl font-semibold">{title}</h2>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {description}
                            </p>
                        </article>
                    ))}
                </section>

                <section className="grid gap-6 rounded-[2rem] border border-border/80 bg-card/70 p-6 shadow-sm lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:p-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-cyan)]/20 bg-[var(--brand-cyan)]/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-[var(--brand-cyan)]">
                            <ShieldCheck className="size-3.5" />
                            Decision support, not prediction theater
                        </div>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            Explainable reads for daily review, planning, and risk triage.
                        </h2>
                        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                            Every analysis combines current regime, directional
                            outlook, volatility personality, strategy-fit, and
                            confidence so teams can discuss opportunity with a
                            common framework instead of vague adjectives.
                        </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-border/80 bg-background/70 p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                            Built for
                        </p>
                        <div className="mt-4 space-y-3">
                            {audience.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-border/70 bg-card px-4 py-3 text-sm"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
