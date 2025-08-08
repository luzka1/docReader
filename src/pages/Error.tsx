import { Button } from "@/components/ui/button";

function Error() {
  return (
    <div className="flex w-full h-full items-center justify-center gap-4 flex-col">
      Não foi possível encontrar a página

      <Button><a href="/">Tela inicial</a></Button>
    </div>
  );
}

export { Error };
