type PresentActionsOptionProps = {
  children: React.ReactNode;
};

export default function PresentActionsOption({ children }: PresentActionsOptionProps) {
  return (
    <>
      <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        {children}
      </div>
    </>
  );
}
