import { SQLEngine } from "./SQLEngine.js";
import { habilidades, cursosDB } from "../../data/skills.js";

const DB = { cursos: cursosDB, habilidades };

const SERVER = {
  user: "miguel",
  host: "MiikeBoss80",
  ip: "192.168.1.100",
  lastLogin: "Wed Jul  8 13:45:22 2026",
  fromIp: "192.168.1.50",
};

const ARCHIVOS = {
  "sobre_mi.txt": `╔══════════════════════════════════════════╗
║        Miguel Angel — Backend Dev        ║
║        Data & BI Enthusiast              ║
╚══════════════════════════════════════════╝

Soy un desarrollador backend apasionado por
los datos, la automatizacion y el analisis.
Profundizando en el ecosistema .NET, Power BI
y analitica con Python.

Sistemas: Windows 11 / Ubuntu 22.04 (WSL)
Shell favorita: PowerShell + bash
Editor: VS Code
Servidor: MiikeBoss80 (192.168.1.100)

Contacto: miguel@ejemplo.com`,
  "cursos.sql": `-- Prueba estas consultas dentro de mysql:
SELECT * FROM cursos;
SELECT * FROM habilidades WHERE nivel = 'avanzado';
SELECT nombre, anio FROM cursos WHERE area = 'BI';
SHOW TABLES;
DESCRIBE habilidades;`,
};

const CHIPS = {
  bash: [
    "help",
    "ls",
    "ls habilidades/",
    "cat sobre_mi.txt",
    "cat cursos.sql",
    "whoami",
    "mysql -u miguel -p",
    "clear",
  ],
  mysql: [
    "SHOW TABLES;",
    "SELECT * FROM cursos;",
    "SELECT * FROM habilidades WHERE nivel = 'avanzado';",
    "SELECT nombre, anio FROM cursos WHERE area = 'BI';",
    "DESCRIBE habilidades;",
    "SELECT * FROM cursos ORDER BY nombre LIMIT 3;",
    "exit",
  ],
};

export class Terminal {
  constructor() {
    this.engine = new SQLEngine(DB);
    this.cuerpo = document.getElementById("cuerpo");
    this.rutaBarra = document.getElementById("rutaBarra");
    this.sugerencias = document.getElementById("sugerencias");
    this.terminal = document.getElementById("terminal");
    if (!this.cuerpo) return;

    this.modo = "bash";
    this.historial = [];
    this.idxHist = -1;
    this.entradaActual = null;

    this.init();
  }

  async init() {
    await this.bootSequence();
    this.rutaBarra.textContent = `${SERVER.user}@${SERVER.host}: ~`;
    this.pintarChips();
    this.nuevaEntrada();
    this.terminal.addEventListener("click", () => {
      const inp = this.entradaActual?.querySelector("input");
      if (inp && !window.getSelection().toString()) inp.focus();
    });
  }

  async bootSequence() {
    const lines = [
      { html: `Connecting to <span class="c-ok">${SERVER.host}</span> (${SERVER.ip})...` },
      { html: 'Authenticating with public key <span class="c-str">"id_ed25519"</span>...' },
      { html: '<span class="c-ok">SSH connection established.</span>' },
      { html: `Last login: ${SERVER.lastLogin} from ${SERVER.fromIp}` },
      { html: "&nbsp;" },
      { html: "Bienvenido/a a mi portafolio interactivo." },
      { html: 'Mis habilidades no están en una lista: están en una <span class="c-str">base de datos</span>.' },
      { html: "&nbsp;" },
      { html: 'Escribe <span class="c-ok">help</span> para ver los comandos, o <span class="c-ok">mysql</span> para consultarlas directamente.' },
      { html: "&nbsp;" },
    ];
    for (const line of lines) {
      await this.sleep(this.rapida(line) ? 0 : 90);
      this.linea(line.html);
    }
  }

  rapida(line) {
    return line.rapida || false;
  }

  sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  linea(html, clase) {
    const div = document.createElement("div");
    div.className = "linea" + (clase ? " " + clase : "");
    div.innerHTML = html;
    this.cuerpo.appendChild(div);
    this.cuerpo.scrollTop = this.cuerpo.scrollHeight;
    return div;
  }

  nuevaEntrada() {
    if (this.entradaActual) this.entradaActual.remove();

    const cont = document.createElement("div");
    cont.className = "linea entrada";

    const promptHTML =
      this.modo === "bash"
        ? `<span class="c-prompt">${SERVER.user}@${SERVER.host}</span><span class="c-tenue">:~$ </span>`
        : `<span class="c-mysql">mysql&gt; </span>`;

    cont.innerHTML = `<span class="prompt">${promptHTML}</span>`;

    const input = document.createElement("input");
    input.type = "text";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.setAttribute("aria-label", "Entrada de terminal");

    const espejo = document.createElement("span");
    espejo.className = "espejo";
    const cursor = document.createElement("span");
    cursor.className = "cursor";

    cont.appendChild(espejo);
    cont.appendChild(cursor);
    cont.appendChild(input);
    this.cuerpo.appendChild(cont);
    this.entradaActual = cont;

    input.addEventListener("input", () => {
      espejo.textContent = input.value;
    });

    input.addEventListener("keydown", (e) => this.handleKeydown(e, input, espejo));
    this.cuerpo.scrollTop = this.cuerpo.scrollHeight;
    input.focus({ preventScroll: true });
  }

  handleKeydown(e, input, espejo) {
    if (e.key === "Enter") {
      const cmd = input.value;
      this.entradaActual?.remove();
      this.entradaActual = null;
      this.linea(
        (this.modo === "bash"
          ? `<span class="c-prompt">${SERVER.user}@${SERVER.host}</span><span class="c-tenue">:~$ </span>`
          : `<span class="c-mysql">mysql&gt; </span>`) +
          `<span class="c-cmd">${this.resaltar(cmd)}</span>`
      );
      if (cmd.trim()) {
        this.historial.push(cmd);
        this.idxHist = this.historial.length;
        this.ejecutar(cmd.trim());
      }
      this.nuevaEntrada();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (this.idxHist > 0) {
        this.idxHist--;
        input.value = this.historial[this.idxHist];
        espejo.textContent = input.value;
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (this.idxHist < this.historial.length - 1) {
        this.idxHist++;
        input.value = this.historial[this.idxHist];
      } else {
        this.idxHist = this.historial.length;
        input.value = "";
      }
      espejo.textContent = input.value;
    } else if (e.key === "Tab") {
      e.preventDefault();
      const t = this.autocompletar(input.value);
      if (t) {
        input.value = t;
        espejo.textContent = t;
      }
    }
  }

  resaltar(cmd) {
    let h = this.esc(cmd);
    h = h.replace(
      /\b(SELECT|FROM|WHERE|ORDER BY|LIMIT|SHOW|TABLES|DESCRIBE|DESC|LIKE|AND|OR|USE|EXIT|QUIT)\b/gi,
      (m) => `<span class="c-kw">${m}</span>`
    );
    h = h.replace(/'([^']*)'/g, (_, g) => `<span class="c-str">'${g}'</span>`);
    h = h.replace(/\b(\d+)\b/g, (m) => `<span class="c-num">${m}</span>`);
    return h;
  }

  autocompletar(parcial) {
    const p = parcial.toLowerCase();
    const cands = CHIPS[this.modo];
    for (const c of cands) {
      if (c.toLowerCase().startsWith(p) && p.length > 0) return c;
    }
    return null;
  }

  async ejecutar(cmd) {
    if (this.modo === "mysql") return this.ejecutarSQL(cmd);

    const parts = cmd.split(/\s+/);
    const base = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (base) {
      case "help":
        this.linea('<span class="c-tenue">Comandos disponibles:</span>');
        this.linea('  <span class="c-ok">ls</span>              lista archivos del portafolio');
        this.linea('  <span class="c-ok">cat</span> &lt;archivo&gt;   muestra el contenido de un archivo');
        this.linea('  <span class="c-ok">whoami</span>          muestra información del usuario actual');
        this.linea('  <span class="c-ok">mysql</span>           conecta a la base de datos de habilidades');
        this.linea('  <span class="c-ok">clear</span>           limpia la pantalla');
        break;

      case "ls": {
        const objetivo = (args[0] || "").replace(/\/$/, "");
        if (objetivo === "habilidades") {
          this.linea(
            '<span class="c-cian" style="color:var(--cian)">python.txt  csharp.txt  dotnet.txt  sql.txt  powerbi.txt  excel.txt  docker.txt  git.txt</span>'
          );
          this.linea(
            '<span class="c-tenue">tip: el detalle completo vive en la base de datos → escribe</span> <span class="c-ok">mysql</span>'
          );
        } else {
          this.linea(
            '<span style="color:var(--cian)">habilidades/</span>  sobre_mi.txt  cursos.sql'
          );
        }
        break;
      }

      case "cat": {
        const archivo = args[0];
        if (!archivo) {
          this.linea('<span class="c-err">cat: falta el nombre del archivo</span>');
        } else if (archivo === "habilidades/") {
          this.linea('<span class="c-err">cat: habilidades/: es un directorio</span>');
        } else if (ARCHIVOS[archivo]) {
          ARCHIVOS[archivo].split("\n").forEach((l) =>
            this.linea(this.esc(l) || "&nbsp;")
          );
        } else if (
          /^(python|csharp|dotnet|sql|powerbi|excel|docker|git)\.txt$/.test(archivo) ||
          archivo.startsWith("habilidades/")
        ) {
          this.linea(
            '<span class="c-tenue">Ese detalle está en la base de datos. Escribe</span> <span class="c-ok">mysql</span> <span class="c-tenue">y consulta la tabla</span> <span class="c-str">habilidades</span><span class="c-tenue">.</span>'
          );
        } else {
          this.linea(
            `<span class="c-err">cat: ${this.esc(archivo)}: No existe el archivo o directorio</span>`
          );
        }
        break;
      }

      case "whoami":
        this.linea('<span class="c-ok">miguel</span>');
        this.linea("uid=1000(miguel) gid=1000(miguel) groups=1000(miguel),4(adm),27(sudo)");
        this.linea("&nbsp;");
        this.linea('<span class="c-ok">Rol: Backend Developer &amp; Data Enthusiast</span>');
        this.linea(`Servidor: ${SERVER.host} (${SERVER.ip})`);
        this.linea("Especializado en .NET, bases de datos, Power BI y análisis con Python.");
        this.linea('<span class="c-tenue">(más info: </span><span class="c-ok">cat sobre_mi.txt</span><span class="c-tenue">)</span>');
        break;

      case "mysql":
        this.linea('<span class="c-tenue">Enter password: </span>********');
        this.linea("&nbsp;");
        this.linea("Welcome to the MySQL monitor.  Commands end with ; or \\g.");
        this.linea("Your MySQL connection id is 8");
        this.linea('Server version: <span class="c-num">8.0.36</span> MySQL Community Server - GPL');
        this.linea("&nbsp;");
        this.linea(
          'Database changed to <span class="c-str">portafolio</span>. Type <span class="c-ok">SHOW TABLES;</span> to explore.'
        );
        this.modo = "mysql";
        this.rutaBarra.textContent = "mysql — MiikeBoss80:3306";
        this.pintarChips();
        break;

      case "clear":
        this.cuerpo.innerHTML = "";
        break;

      case "exit":
        this.linea(
          '<span class="c-tenue">Ya estás en bash. Prueba</span> <span class="c-ok">mysql</span> <span class="c-tenue">para entrar a la base de datos.</span>'
        );
        break;

      default:
        this.linea(
          `<span class="c-err">${this.esc(base)}: comando no encontrado.</span> <span class="c-tenue">Escribe</span> <span class="c-ok">help</span>`
        );
    }
  }

  ejecutarSQL(raw) {
    const result = this.engine.query(raw);
    if (result.type === "exit") {
      this.linea("Bye");
      this.modo = "bash";
      this.rutaBarra.textContent = `${SERVER.user}@${SERVER.host}: ~`;
      this.pintarChips();
      return;
    }
    this.engine.renderResult(result, (html) => this.linea(html));
  }

  pintarChips() {
    const existing = this.sugerencias.querySelectorAll(".chip");
    existing.forEach((c) => c.remove());
    const hint = this.sugerencias.querySelector(".hint");
    if (hint) hint.style.display = "block";
    CHIPS[this.modo].forEach((cmd) => {
      const b = document.createElement("button");
      b.className = "chip";
      b.textContent = cmd;
      b.addEventListener("click", () => this.escribirComoHumano(cmd));
      this.sugerencias.appendChild(b);
    });
  }

  escribirComoHumano(cmd) {
    const input = this.entradaActual?.querySelector("input");
    if (!input) return;
    input.focus({ preventScroll: true });
    input.value = "";
    let idx = 0;
    const tic = () => {
      if (idx < cmd.length) {
        input.value += cmd[idx];
        idx++;
        const delay = 45 + Math.random() * 70;
        setTimeout(tic, delay);
      } else {
        setTimeout(() => {
          input.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
          );
        }, 120);
      }
    };
    tic();
  }

  destroy() {
    // cleanup if needed
  }
}
