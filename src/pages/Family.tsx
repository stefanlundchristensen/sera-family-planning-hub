
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddFamilyMemberForm } from "@/components/family/AddFamilyMemberForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Updated initial family members with simplified roles, excluding linked calendars
const INITIAL_FAMILY_MEMBERS = [
  { id: 1, name: "Sarah Johnson", role: "Parent", color: "teal" },
  { id: 2, name: "Michael Johnson", role: "Parent", color: "blue" },
  { id: 3, name: "Tommy Johnson", role: "Child", color: "coral" },
  { id: 4, name: "Emma Johnson", role: "Child", color: "purple" },
  { id: 5, name: "Grandma Linda", role: "Extended Family", color: "green" },
];

const Family = () => {
  const [familyMembers, setFamilyMembers] = useState(INITIAL_FAMILY_MEMBERS);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const handleAddMember = (newMember: any) => {
    setFamilyMembers([...familyMembers, newMember]);
    setIsAddMemberOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Family Members</h1>
        <Button onClick={() => setIsAddMemberOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Family Member
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {familyMembers.map(member => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar className={`bg-${member.color}-500`}>
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
