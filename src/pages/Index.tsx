
import { Layout } from "@/components/layout/Layout";
import { Calendar } from "@/components/calendar/Calendar";

const Index = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Family Calendar</h1>
      <p className="text-muted-foreground mb-6">
        Manage your family's schedule, appointments, and activities in one place. 
        Parents can oversee all family events, while extended family members and children 
        have appropriate levels of access.
      </p>
      <Calendar />
    </Layout>
  );
};

export default Index;
