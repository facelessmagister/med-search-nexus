import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const SearchFilters = () => {
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
                <Checkbox id={db} />
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
              <input
                type="number"
                id="yearFrom"
                className="w-full mt-1 px-2 py-1 border rounded"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <Label htmlFor="yearTo">To</Label>
              <input
                type="number"
                id="yearTo"
                className="w-full mt-1 px-2 py-1 border rounded"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};