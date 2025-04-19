
export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  assignedTo: string;
  recurring?: boolean;
  description?: string;
  location?: string;
  showAsLine?: boolean;
}
