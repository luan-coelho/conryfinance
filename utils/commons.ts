const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>, setAmount: (text: string) => void) => {
  const value = event.target.value;

  const numericValue = value.replace(/[^0-9]/g, "");

  if (numericValue) {
    const numberValue = parseFloat(numericValue) / 100;

    const formattedValue = numberValue.toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 2 });

    setAmount(formattedValue);
  } else {
    setAmount("");
  }
};