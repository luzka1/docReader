function combineValuesByName(r: any[], p: any[]) {
  const map = new Map<
    string,
    { fornecedor: string; pagar?: string; pago?: string; total?: number }
  >();

  const parseToNumber = (valor: string): number => {
    return parseFloat(
      valor
        .replace(/[^\d,.-]/g, "")
        .replace(/\./g, "")
        .replace(",", ".")
    );
  };

  for (const item of p) {
    const key = item.fornecedor.trim().toUpperCase();
    if (!map.has(key)) {
      map.set(key, { fornecedor: item.fornecedor, pago: item.valor });
    } else {
      map.get(key)!.pago = item.valor;
    }
  }

  for (const item of r) {
    const key = item.fornecedor.trim().toUpperCase();
    if (!map.has(key)) {
      map.set(key, { fornecedor: item.fornecedor, pagar: item.valor });
    } else {
      map.get(key)!.pagar = item.valor;
    }
  }

  for (const entry of map.values()) {
    const pagar = entry.pagar ? parseToNumber(entry.pagar) : 0;
    const pago = entry.pago ? parseToNumber(entry.pago) : 0;

    entry.total = pagar + pago;
  }
  return Array.from(map.values());
}

export { combineValuesByName };
