import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/commons/DatePicker";

export function MonthlyBudgetForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500 text-white rounded px-2 py-0 w-full">Cadastrar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Cadastrar</DialogTitle>
          <DialogDescription>
            Crie um novo orçamento mensal, seja pessoal, sua empresa, uma viagem...
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Descrição
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">
              Período
            </Label>
            <DatePicker />
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-green-600 hover:bg-green-500 text-white rounded px-2 py-0" type="submit">Cadastrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
