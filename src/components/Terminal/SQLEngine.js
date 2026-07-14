export class SQLEngine {
  constructor(db) {
    this.DB = db;
  }

  query(sql) {
    const clean = sql.replace(/;+\s*$/, "").trim();
    const t0 = performance.now();

    if (/^(exit|quit|\\q)$/i.test(clean)) return { type: "exit" };

    if (/^show\s+tables$/i.test(clean)) {
      return {
        type: "table",
        cols: ["Tables_in_portafolio"],
        rows: Object.keys(this.DB).map((t) => [t]),
        time: t0,
      };
    }

    let m = clean.match(/^(describe|desc)\s+(\w+)$/i);
    if (m) return this.describe(m[2], t0);

    m = clean.match(
      /^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(\w+)(\s+desc)?)?(?:\s+limit\s+(\d+))?$/i
    );
    if (m) return this.select(m, t0);

    return { type: "error", msg: `Syntax error near '${clean.slice(0, 30)}'` };
  }

  describe(tableName, t0) {
    const t = this.DB[tableName.toLowerCase()];
    if (!t) return { type: "error", msg: `Table '${tableName}' doesn't exist` };
    return {
      type: "table",
      cols: ["Field", "Type", "Null", "Key", "Default", "Extra"],
      rows: t.columns.map((c, i) => [
        c,
        i === 0
          ? "int"
          : c === "year" || c === "years_exp"
            ? "int"
            : "varchar(120)",
        i === 0 ? "NO" : "YES",
        i === 0 ? "PRI" : "",
        "NULL",
        i === 0 ? "auto_increment" : "",
      ]),
      time: t0,
    };
  }

  select(m, t0) {
    const colsRaw = m[1];
    const tableName = m[2];
    const whereRaw = m[3];
    const orderCol = m[4];
    const orderDesc = m[5];
    const limitRaw = m[6];
    const t = this.DB[tableName.toLowerCase()];

    if (!t) return { type: "error", msg: `Table '${tableName}' doesn't exist` };

    let cols, idxs;
    if (colsRaw.trim() === "*") {
      cols = t.columns;
      idxs = cols.map((_, i) => i);
    } else {
      cols = colsRaw.split(",").map((c) => c.trim());
      idxs = cols.map((c) => t.columns.indexOf(c));
      const bad = cols[idxs.indexOf(-1)];
      if (idxs.includes(-1))
        return { type: "error", msg: `Unknown column '${bad}'` };
    }

    let rows = t.rows.slice();

    if (whereRaw) {
      const w = whereRaw.match(
        /^(\w+)\s*(=|like|>|<|>=|<=)\s*'?([^']*)'?$/i
      );
      if (!w)
        return { type: "error", msg: `Syntax error near '${whereRaw}'` };
      const wc = w[1];
      const op = w[2];
      const val = w[3];
      const ci = t.columns.indexOf(wc.toLowerCase());
      if (ci === -1)
        return { type: "error", msg: `Unknown column '${wc}'` };
      rows = rows.filter((f) => {
        const cell = String(f[ci]).toLowerCase();
        const v = val.toLowerCase();
        switch (op.toLowerCase()) {
          case "=":
            return cell === v;
          case "like":
            return cell.includes(v.replace(/%/g, ""));
          case ">":
            return Number(f[ci]) > Number(val);
          case "<":
            return Number(f[ci]) < Number(val);
          case ">=":
            return Number(f[ci]) >= Number(val);
          case "<=":
            return Number(f[ci]) <= Number(val);
          default:
            return false;
        }
      });
    }

    if (orderCol) {
      const oi = t.columns.indexOf(orderCol.toLowerCase());
      if (oi === -1)
        return { type: "error", msg: `Unknown column '${orderCol}'` };
      rows.sort((a, b) =>
        (a[oi] > b[oi] ? 1 : -1) * (orderDesc ? -1 : 1)
      );
    }

    if (limitRaw) rows = rows.slice(0, Number(limitRaw));

    return {
      type: "table",
      cols,
      rows: rows.map((f) => idxs.map((i) => f[i])),
      time: t0,
    };
  }

  renderResult(result, linea) {
    if (result.type === "error") {
      linea(`<span class="c-err">ERROR: ${result.msg}</span>`);
      return;
    }
    if (result.type === "exit") {
      linea("Bye");
      return;
    }
    if (result.type === "table") {
      if (result.rows.length === 0) {
        const dur = ((performance.now() - result.time) / 1000).toFixed(2);
        linea(`<span class="c-tenue">Empty set (${dur} sec)</span>`);
        return;
      }
      const { cols, rows } = result;
      const widths = cols.map((c, i) =>
        Math.max(String(c).length, ...rows.map((r) => String(r[i]).length))
      );
      const sep =
        "+" +
        widths.map((w) => "-".repeat(w + 2)).join("+") +
        "+";
      const fmt = (arr) =>
        "|" +
        arr
          .map((v, i) => " " + String(v).padEnd(widths[i]) + " ")
          .join("|") +
        "|";

      linea(`<span class="c-borde-t">${sep}</span>`);
      linea(`<span class="c-tabla">${fmt(cols)}</span>`);
      linea(`<span class="c-borde-t">${sep}</span>`);
      rows.forEach((r) => linea(`<span class="c-tabla">${fmt(r)}</span>`));
      linea(`<span class="c-borde-t">${sep}</span>`);

      const dur = ((performance.now() - result.time) / 1000).toFixed(2);
      linea(
        `<span class="c-ok">${rows.length} row${
          rows.length !== 1 ? "s" : ""
        } in set</span> <span class="c-tenue">(${dur} sec)</span>`
      );
    }
  }
}
