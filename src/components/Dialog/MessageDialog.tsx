import { Dialog } from ".";

interface Props {
  text: string;
  color: string;
}

function MessageDialog({ text, color }: Props) {
  return (
    <Dialog>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-lg h-70 rounded-4xl bg-white shadow-lg">{text}</div>
      </div>
    </Dialog>
  );
}

export { MessageDialog };
