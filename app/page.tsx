import { auth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { MarketDashboard } from '@/components/regimelens/market-dashboard';
import { PublicLanding } from '@/components/regimelens/public-landing';

export default async function Home() {
    const { userId } = await auth();

    if (!userId) {
        return <PublicLanding />;
    }

    const user = await currentUser();
    const userName = user?.firstName || user?.username || 'Desk lead';

    return <MarketDashboard userName={userName} />;
}
