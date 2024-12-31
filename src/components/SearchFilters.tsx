import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Databases</h4>
          <div className="space-y-2">
            {["PubMed Central", "TCIA", "Dryad", "MDM"].map((db) => (
              <div key={db} className="flex items-center space-x-2">
                <Checkbox 
                  id={db} 
                  onCheckedChange={(checked) => handleDatabaseChange(db, checked as boolean)}
                />
                <Label htmlFor={db}>{db}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Year Range</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="yearFrom">From</Label>
              <Input
                type="number"
                id="yearFrom"
                className="w-full mt-1"
                min="1900"
                max={new Date().getFullYear()}
                onChange={handleYearChange}
              />
            </div>
            <div>
              <Label htmlFor="yearTo">To</Label>
              <Input
                type="number"
                id="yearTo"
                className="w-full mt-1"
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