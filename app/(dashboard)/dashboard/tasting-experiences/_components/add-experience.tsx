"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddExperience = () => {
  return <Dialog>
    <DialogTrigger asChild>
      <Button>Add Experience</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Add Experience</DialogTitle>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="servings">Servings</Label>
            <Input id="servings" name="servings" />
          </div>
        </div>
      </form>
    </DialogContent>
  </Dialog>;
};
export default AddExperience;
