
import { Layout } from "@/components/layout/Layout";
import { WeeklyOverview } from "@/components/dashboard/WeeklyOverview";

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto">
        <h1 className="text-2xl font-bold mb-6">This Week's Schedule</h1>
        <p className="text-muted-foreground mb-6">
          Overview of your family's activities for the week.
        </p>
        <WeeklyOverview />
      </div>
    </Layout>
  );
};

export default Dashboard;

