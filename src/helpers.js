export const groupByToObject = (x, f) =>
  x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

export const groupByToMap = (x, f) =>
  x.reduce((a, b, i, x) => {
    const k = f(b, i, x);
    a.get(k)?.push(b) ?? a.set(k, [b]);
    return a;
  }, new Map());
