
import { Layout } from "@/components/layout/Layout";
import { WeeklyOverview } from "@/components/dashboard/WeeklyOverview";

const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Family Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Overview of your family's upcoming events and activities for the week.
      </p>
      <WeeklyOverview />
    </Layout>
  );
};

export default Dashboard;
