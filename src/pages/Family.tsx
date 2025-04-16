
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FamilyMember } from "@/components/family/FamilyMember";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddFamilyMemberForm } from "@/components/family/AddFamilyMemberForm";

// Updated initial family members with simplified roles
const INITIAL_FAMILY_MEMBERS = [
  { id: 1, name: "Sarah Johnson", role: "Parent", color: "teal" },
  { id: 2, name: "Michael Johnson", role: "Parent", color: "blue" },
  { id: 3, name: "Tommy Johnson", role: "Child", color: "coral" },
  { id: 4, name: "Emma Johnson", role: "Child", color: "purple" },
  { id: 5, name: "Grandma Linda", role: "Extended Family", color: "green" },
  { id: 6, name: "Sarah's Work Calendar", role: "Linked Calendar", color: "yellow" },
  { id: 7, name: "Michael's Work Calendar", role: "Linked Calendar", color: "pink" },
];

const Family = () => {
  const [familyMembers, setFamilyMembers] = useState(INITIAL_FAMILY_MEMBERS);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const handleAddMember = (newMember: any) => {
    setFamilyMembers([...familyMembers, newMember]);
    setIsAddMemberOpen(false);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Family Members</h1>
        <Button onClick={() => setIsAddMemberOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Family Member
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {familyMembers.map(member => (
          <FamilyMember 
            key={member.id}
            name={member.name}
            role={member.role}
            color={member.color}
          />
        ))}
      </div>

      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
          </DialogHeader>
          <AddFamilyMemberForm 
            onSave={handleAddMember}
            onCancel={() => setIsAddMemberOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Family;
