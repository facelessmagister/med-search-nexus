import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface SearchFiltersProps {
  onFilterChange: (filters: {
    databases: string[];
    yearFrom: string;
    yearTo: string;
  }) => void;
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const handleDatabaseChange = (database: string, checked: boolean) => {
    const checkbox = document.querySelector(`#${database}`) as HTMLInputElement;
    const yearFrom = (document.querySelector('#yearFrom') as HTMLInputElement).value;
    const yearTo = (document.querySelector('#yearTo') as HTMLInputElement).value;
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectedDatabases = Array.from(checkboxes)
      .filter((cb: Element) => (cb as HTMLInputElement).checked)
      .map((cb: Element) => (cb as HTMLInputElement).id);

    onFilterChange({
      databases: selectedDatabases,
      yearFrom,
      yearTo,
    });
  };

  const handleYearChange = () => {
    const yearFrom = (document.querySelector('#yearFrom') as HTMLInputElement).value;
    const yearTo = (document.querySelector('#yearTo') as HTMLInputElement).value;
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectedDatabases = Array.from(checkboxes)
      .filter((cb: Element) => (cb as HTMLInputElement).checked)
      .map((cb: Element) => (cb as HTMLInputElement).id);

    onFilterChange({
      databases: selectedDatabases,
      yearFrom,
      yearTo,
    });
  };

  const databases = [
    "PubMed",
    "Pillbox",
    "Reactome"
  ];

  return (
    <Card className="backdrop-blur-lg bg-background/50 border-primary/20">
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <h4 className="font-medium text-primary">Databases</h4>
          <div className="grid grid-cols-2 gap-4">
            {databases.map((db) => (
              <div key={db} className="flex items-center space-x-2">
                <Checkbox 
                  id={db} 
                  onCheckedChange={(checked) => handleDatabaseChange(db, checked as boolean)}
                  className="border-primary/50"
                />
                <Label htmlFor={db} className="text-sm">{db}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-primary">Year Range</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yearFrom" className="text-sm">From</Label>
              <Input
                type="number"
                id="yearFrom"
                className="mt-1 bg-background/50 border-primary/20"
                min="1900"
                max={new Date().getFullYear()}
                onChange={handleYearChange}
              />
            </div>
            <div>
              <Label htmlFor="yearTo" className="text-sm">To</Label>
              <Input
                type="number"
                id="yearTo"
                className="mt-1 bg-background/50 border-primary/20"
                min="1900"
                max={new Date().getFullYear()}
                onChange={handleYearChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};