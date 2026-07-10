/* ============================================================
   TERMINAL HABILIDADES  —  Modo Bash + MySQL interactivo
   ============================================================ */
(function () {

/* ------------------------------------------------------------------
   DATOS — edita aquí tus cursos y habilidades
   ------------------------------------------------------------------ */
const DB = {
  cursos: {
    columnas: ['id', 'nombre', 'institucion', 'anio', 'area'],
    filas: [
      [1, 'C# & .NET Development',             'Microsoft / Platzi',    2024, 'Backend'],
      [2, 'Database Administration',            'Microsoft Learn',       2024, 'Datos'],
      [3, 'Business Intelligence con Power BI', 'Platzi',                2025, 'BI'],
      [4, 'Excel + AI + Python',                'Udemy',                 2025, 'Analítica'],
      [5, 'Inglés Técnico B1.2',                'Angloamericano',        2025, 'Idiomas'],
      [6, 'Fundamentos de .NET',                'Platzi',                2024, 'Backend'],
    ],
  },
  habilidades: {
    columnas: ['id', 'habilidad', 'categoria', 'nivel', 'anios_exp'],
    filas: [
      [1, 'Python',             'Backend',    'intermedio', 2],
      [2, 'C#',                  'Backend',    'intermedio', 2],
      [3, '.NET Core',           'Backend',    'intermedio', 1],
      [4, 'Node.js / Express',   'Backend',    'básico',     1],
      [5, 'SQL Server / T-SQL',  'BD',         'avanzado',   3],
      [6, 'MySQL',               'BD',         'avanzado',   3],
      [7, 'PostgreSQL',          'BD',         'intermedio', 2],
      [8, 'MongoDB',             'BD',         'básico',     1],
      [9, 'Azure SQL',           'Cloud',      'intermedio', 1],
      [10,'Power BI / DAX',      'BI',         'intermedio', 2],
      [11,'Excel Avanzado',      'BI',         'avanzado',   4],
      [12,'Power Automate',      'BI',         'básico',     1],
      [13,'Git / GitHub',        'Tools',      'avanzado',   3],
      [14,'Docker',              'Tools',      'intermedio', 2],
      [15,'HTML5 / CSS3',        'Frontend',   'intermedio', 2],
      [16,'JavaScript (ES6+)',   'Frontend',   'intermedio', 2],
      [17,'Administración BD',   'BD',         'avanzado',   3],
      [18,'Bootstrap',           'Frontend',   'intermedio', 2],
    ],
  },
};

const SERVER = {
  user: 'miguel',
  host: 'MiikeBoss80',
  ip: '192.168.1.100',
  lastLogin: 'Wed Jul  8 13:45:22 2026',
  fromIp: '192.168.1.50',
};

const ARCHIVOS = {
  'sobre_mi.txt':
`╔══════════════════════════════════════════╗
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
  'habilidades': null,
  'cursos.sql':
`-- Prueba estas consultas dentro de mysql:
SELECT * FROM cursos;
SELECT * FROM habilidades WHERE nivel = 'avanzado';
SELECT nombre, anio FROM cursos WHERE area = 'BI';
SHOW TABLES;
DESCRIBE habilidades;`,
};

const CHIPS_CONFIG = {
  bash: [
    'help',
    'ls',
    'ls habilidades/',
    'cat sobre_mi.txt',
    'cat cursos.sql',
    'whoami',
    'mysql -u miguel -p',
    'clear',
  ],
  mysql: [
    'SHOW TABLES;',
    'SELECT * FROM cursos;',
    "SELECT * FROM habilidades WHERE nivel = 'avanzado';",
    "SELECT nombre, anio FROM cursos WHERE area = 'BI';",
    'DESCRIBE habilidades;',
    'SELECT * FROM cursos ORDER BY nombre LIMIT 3;',
    'exit',
  ],
};

/* ------------------------------------------------------------------
   NÚCLEO DE LA TERMINAL
   ------------------------------------------------------------------ */
const cuerpo = document.getElementById('cuerpo');
const rutaBarra = document.getElementById('rutaBarra');
const sugerencias = document.getElementById('sugerencias');

let modo = 'bash';
let historial = [];
let idxHist = -1;
let entradaActual = null;

const PROMPT_BASH = () =>
  `<span class="c-prompt">${SERVER.user}@${SERVER.host}</span><span class="c-tenue">:~$ </span>`;
const PROMPT_MYSQL = () =>
  `<span class="c-mysql">mysql&gt; </span>`;

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function linea(html, clase) {
  const div = document.createElement('div');
  div.className = 'linea' + (clase ? ' ' + clase : '');
  div.innerHTML = html;
  cuerpo.appendChild(div);
  cuerpo.scrollTop = cuerpo.scrollHeight;
  return div;
}

function imprimirSecuencia(lineas, retraso) {
  if (retraso === undefined) retraso = 55;
  return new Promise(function (resolve) {
    var i = 0;
    (function paso() {
      if (i >= lineas.length) {
        resolve();
        return;
      }
      linea(lineas[i].html, lineas[i].clase || '');
      i++;
      var r = lineas[i - 1].rapida ? 0 : retraso;
      if (!lineas[i - 1].rapida && retraso > 0) {
        r += Math.random() * (retraso * 0.4);
      }
      setTimeout(paso, r);
    })();
  });
}

function nuevaEntrada() {
  if (entradaActual) entradaActual.remove();

  var cont = document.createElement('div');
  cont.className = 'linea entrada';
  cont.innerHTML =
    '<span class="prompt">' +
    (modo === 'bash' ? PROMPT_BASH() : PROMPT_MYSQL()) +
    '</span>';

  var input = document.createElement('input');
  input.type = 'text';
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.setAttribute('aria-label', 'Entrada de terminal');

  var espejo = document.createElement('span');
  espejo.className = 'espejo';
  var cursor = document.createElement('span');
  cursor.className = 'cursor';

  cont.appendChild(espejo);
  cont.appendChild(cursor);
  cont.appendChild(input);
  cuerpo.appendChild(cont);
  entradaActual = cont;

  input.addEventListener('input', function () {
    espejo.textContent = input.value;
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var cmd = input.value;
      cont.remove();
      entradaActual = null;
      linea(
        (modo === 'bash' ? PROMPT_BASH() : PROMPT_MYSQL()) +
          '<span class="c-cmd">' +
          resaltar(cmd) +
          '</span>'
      );
      if (cmd.trim()) {
        historial.push(cmd);
        idxHist = historial.length;
        ejecutar(cmd.trim());
      }
      nuevaEntrada();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idxHist > 0) {
        idxHist--;
        input.value = historial[idxHist];
        espejo.textContent = input.value;
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (idxHist < historial.length - 1) {
        idxHist++;
        input.value = historial[idxHist];
      } else {
        idxHist = historial.length;
        input.value = '';
      }
      espejo.textContent = input.value;
    } else if (e.key === 'Tab') {
      e.preventDefault();
      var t = autocompletar(input.value);
      if (t) {
        input.value = t;
        espejo.textContent = t;
      }
    }
  });

  cuerpo.scrollTop = cuerpo.scrollHeight;
  input.focus({ preventScroll: true });
}

document.getElementById('terminal').addEventListener('click', function () {
  var inp = entradaActual ? entradaActual.querySelector('input') : null;
  if (inp && !window.getSelection().toString()) inp.focus();
});

function resaltar(cmd) {
  var h = esc(cmd);
  h = h.replace(
    /\b(SELECT|FROM|WHERE|ORDER BY|LIMIT|SHOW|TABLES|DESCRIBE|DESC|LIKE|AND|OR|USE|EXIT|QUIT)\b/gi,
    function (m) {
      return '<span class="c-kw">' + m + '</span>';
    }
  );
  h = h.replace(/'([^']*)'/g, function (_, g) {
    return "<span class=\"c-str\">'" + g + "'</span>";
  });
  h = h.replace(/\b(\d+)\b/g, function (m) {
    return '<span class="c-num">' + m + '</span>';
  });
  return h;
}

function autocompletar(parcial) {
  var p = parcial.toLowerCase();
  var cands = CHIPS_CONFIG[modo];
  for (var i = 0; i < cands.length; i++) {
    if (cands[i].toLowerCase().startsWith(p) && p.length > 0)
      return cands[i];
  }
  return null;
}

/* ------------------------------------------------------------------
   COMANDOS BASH
   ------------------------------------------------------------------ */
async function ejecutar(cmd) {
  if (modo === 'mysql') return ejecutarSQL(cmd);

  var parts = cmd.split(/\s+/);
  var base = parts[0];
  var args = parts.slice(1);

  switch (base.toLowerCase()) {
    case 'help':
      await imprimirSecuencia(
        [
          { html: '<span class="c-tenue">Comandos disponibles:</span>' },
          { html: '  <span class="c-ok">ls</span>              lista archivos del portafolio' },
          { html: '  <span class="c-ok">cat</span> &lt;archivo&gt;   muestra el contenido de un archivo' },
          { html: '  <span class="c-ok">whoami</span>          muestra información del usuario actual' },
          { html: '  <span class="c-ok">mysql</span>           conecta a la base de datos de habilidades' },
          { html: '  <span class="c-ok">clear</span>           limpia la pantalla' },
        ],
        30
      );
      break;

    case 'ls': {
      var objetivo = (args[0] || '').replace(/\/$/, '');
      if (objetivo === 'habilidades') {
        await imprimirSecuencia(
          [
            {
              html: '<span class="c-cian" style="color:var(--cian)">python.txt  csharp.txt  dotnet.txt  sql.txt  powerbi.txt  excel.txt  docker.txt  git.txt</span>',
            },
            {
              html: '<span class="c-tenue">tip: el detalle completo vive en la base de datos → escribe</span> <span class="c-ok">mysql</span>',
            },
          ],
          40
        );
      } else {
        await imprimirSecuencia(
          [
            {
              html: '<span style="color:var(--cian)">habilidades/</span>  sobre_mi.txt  cursos.sql',
            },
          ],
          0
        );
      }
      break;
    }

    case 'cat': {
      var archivo = args[0];
      if (!archivo) {
        linea('<span class="c-err">cat: falta el nombre del archivo</span>');
      } else if (archivo.replace(/\/$/, '') === 'habilidades') {
        linea(
          '<span class="c-err">cat: habilidades/: es un directorio</span>'
        );
      } else if (
        ARCHIVOS[archivo] !== undefined &&
        ARCHIVOS[archivo] !== null
      ) {
        var lineasArch = ARCHIVOS[archivo]
          .split('\n')
          .map(function (l) {
            return { html: esc(l) || '&nbsp;' };
          });
        await imprimirSecuencia(lineasArch, 25);
      } else if (
        /^(python|csharp|dotnet|sql|powerbi|excel|docker|git)\.txt$/.test(
          archivo
        ) ||
        /^habilidades\//.test(archivo)
      ) {
        linea(
          '<span class="c-tenue">Ese detalle está en la base de datos. Escribe</span> <span class="c-ok">mysql</span> <span class="c-tenue">y consulta la tabla</span> <span class="c-str">habilidades</span><span class="c-tenue">.</span>'
        );
      } else {
        linea(
          '<span class="c-err">cat: ' +
            esc(archivo) +
            ': No existe el archivo o directorio</span>'
        );
      }
      break;
    }

    case 'whoami':
      await imprimirSecuencia(
        [
          {
            html: '<span class="c-ok">miguel</span>',
          },
          {
            html: 'uid=1000(miguel) gid=1000(miguel) groups=1000(miguel),4(adm),27(sudo)',
          },
          { html: '&nbsp;' },
          {
            html: 'Rol: <span class="c-ok">Backend Developer &amp; Data Enthusiast</span>',
          },
          {
            html: 'Servidor: ' + SERVER.host + ' (' + SERVER.ip + ')',
          },
          {
            html: 'Especializado en .NET, bases de datos, Power BI y análisis con Python.',
          },
          {
            html: '<span class="c-tenue">(más info: </span><span class="c-ok">cat sobre_mi.txt</span><span class="c-tenue">)</span>',
          },
        ],
        40
      );
      break;

    case 'mysql':
      await imprimirSecuencia(
        [
          {
            html: '<span class="c-tenue">Enter password: </span>********',
            rapida: false,
          },
          { html: '&nbsp;' },
          { html: 'Welcome to the MySQL monitor.  Commands end with ; or \\g.' },
          { html: 'Your MySQL connection id is 8' },
          {
            html: 'Server version: <span class="c-num">8.0.36</span> MySQL Community Server - GPL',
          },
          { html: '&nbsp;' },
          {
            html: 'Database changed to <span class="c-str">portafolio</span>. Type <span class="c-ok">SHOW TABLES;</span> to explore.',
          },
        ],
        120
      );
      modo = 'mysql';
      rutaBarra.textContent = 'mysql — MiikeBoss80:3306';
      pintarChips();
      break;

    case 'clear':
      cuerpo.innerHTML = '';
      break;

    case 'exit':
      linea(
        '<span class="c-tenue">Ya estás en bash. Prueba</span> <span class="c-ok">mysql</span> <span class="c-tenue">para entrar a la base de datos.</span>'
      );
      break;

    default:
      linea(
        '<span class="c-err">' +
          esc(base) +
          ': comando no encontrado.</span> <span class="c-tenue">Escribe</span> <span class="c-ok">help</span>'
      );
  }
}

/* ------------------------------------------------------------------
   MINI MOTOR SQL
   ------------------------------------------------------------------ */
async function ejecutarSQL(raw) {
  var sql = raw.replace(/;+\s*$/, '').trim();
  var t0 = performance.now();

  if (/^(exit|quit|\\q)$/i.test(sql)) {
    linea('Bye');
    modo = 'bash';
    rutaBarra.textContent = SERVER.user + '@' + SERVER.host + ': ~';
    pintarChips();
    return;
  }

  if (/^show\s+tables$/i.test(sql)) {
    await renderTabla(
      ['Tables_in_portafolio'],
      Object.keys(DB).map(function (t) {
        return [t];
      }),
      t0
    );
    return;
  }

  var m = sql.match(/^(describe|desc)\s+(\w+)$/i);
  if (m) {
    var tabla = DB[m[2].toLowerCase()];
    if (!tabla)
      return errorSQL("Table 'portafolio." + m[2] + "' doesn't exist");
    var filas = tabla.columnas.map(function (c, i) {
      return [
        c,
        i === 0
          ? 'int'
          : c === 'anio' || c === 'anios_exp'
            ? 'int'
            : 'varchar(120)',
        i === 0 ? 'NO' : 'YES',
        i === 0 ? 'PRI' : '',
        'NULL',
        i === 0 ? 'auto_increment' : '',
      ];
    });
    await renderTabla(
      ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra'],
      filas,
      t0
    );
    return;
  }

  m = sql.match(
    /^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(\w+)(\s+desc)?)?(?:\s+limit\s+(\d+))?$/i
  );
  if (m) {
    var colsRaw = m[1];
    var tablaNombre = m[2];
    var whereRaw = m[3];
    var ordenCol = m[4];
    var ordenDesc = m[5];
    var limitRaw = m[6];
    var tabla2 = DB[tablaNombre.toLowerCase()];
    if (!tabla2)
      return errorSQL("Table 'portafolio." + tablaNombre + "' doesn't exist");

    var cols, idxs;
    if (colsRaw.trim() === '*') {
      cols = tabla2.columnas;
      idxs = cols.map(function (_, i) {
        return i;
      });
    } else {
      cols = colsRaw.split(',').map(function (c) {
        return c.trim();
      });
      idxs = cols.map(function (c) {
        return tabla2.columnas.indexOf(c);
      });
      var mala = cols[idxs.indexOf(-1)];
      if (idxs.includes(-1))
        return errorSQL("Unknown column '" + mala + "' in 'field list'");
    }

    var filas2 = tabla2.filas.slice();
    if (whereRaw) {
      var w = whereRaw.match(
        /^(\w+)\s*(=|like|>|<|>=|<=)\s*'?([^']*)'?$/i
      );
      if (!w)
        return errorSQL(
          "You have an error in your SQL syntax near '" + whereRaw + "'"
        );
      var wc = w[1];
      var op = w[2];
      var valRaw = w[3];
      var ci =
        tabla2.columnas.indexOf(wc.toLowerCase()) !== -1
          ? tabla2.columnas.indexOf(wc.toLowerCase())
          : tabla2.columnas.indexOf(wc);
      if (ci === -1)
        return errorSQL("Unknown column '" + wc + "' in 'where clause'");
      filas2 = filas2.filter(function (f) {
        var celda = String(f[ci]).toLowerCase();
        var val = valRaw.toLowerCase();
        switch (op.toLowerCase()) {
          case '=':
            return celda === val;
          case 'like':
            return celda.indexOf(val.replace(/%/g, '')) !== -1;
          case '>':
            return Number(f[ci]) > Number(valRaw);
          case '<':
            return Number(f[ci]) < Number(valRaw);
          case '>=':
            return Number(f[ci]) >= Number(valRaw);
          case '<=':
            return Number(f[ci]) <= Number(valRaw);
          default:
            return false;
        }
      });
    }

    if (ordenCol) {
      var oi = tabla2.columnas.indexOf(ordenCol.toLowerCase());
      if (oi === -1)
        return errorSQL("Unknown column '" + ordenCol + "' in 'order clause'");
      filas2.sort(function (a, b) {
        return (a[oi] > b[oi] ? 1 : -1) * (ordenDesc ? -1 : 1);
      });
    }

    if (limitRaw) filas2 = filas2.slice(0, Number(limitRaw));

    if (filas2.length === 0) {
      var dur = ((performance.now() - t0) / 1000).toFixed(2);
      linea('<span class="c-tenue">Empty set (' + dur + ' sec)</span>');
      return;
    }
    await renderTabla(
      cols,
      filas2.map(function (f) {
        return idxs.map(function (i) {
          return f[i];
        });
      }),
      t0
    );
    return;
  }

  errorSQL(
    "You have an error in your SQL syntax; check the manual near '" +
      esc(sql.slice(0, 30)) +
      "'"
  );
}

function errorSQL(msg) {
  linea('<span class="c-err">ERROR 1064 (42000): ' + msg + '</span>');
}

async function renderTabla(cols, filas, t0) {
  var anchos = cols.map(function (c, i) {
    return Math.max(
      String(c).length,
      ...filas.map(function (f) {
        return String(f[i]).length;
      })
    );
  });
  var sep =
    '+' +
    anchos
      .map(function (a) {
        return '-'.repeat(a + 2);
      })
      .join('+') +
    '+';
  var fila = function (arr) {
    return (
      '|' +
      arr
        .map(function (v, i) {
          return ' ' + String(v).padEnd(anchos[i]) + ' ';
        })
        .join('|') +
      '|'
    );
  };

  var lineasTabla = [
    { html: '<span class="c-borde-t">' + sep + '</span>', rapida: true, clase: 'no-wrap' },
    {
      html: '<span class="c-tabla">' + esc(fila(cols)) + '</span>',
      rapida: true,
      clase: 'no-wrap',
    },
    { html: '<span class="c-borde-t">' + sep + '</span>', rapida: true, clase: 'no-wrap' },
    ...filas.map(function (f) {
      return { html: '<span class="c-tabla">' + esc(fila(f)) + '</span>', clase: 'no-wrap' };
    }),
    { html: '<span class="c-borde-t">' + sep + '</span>', rapida: true, clase: 'no-wrap' },
  ];
  await imprimirSecuencia(lineasTabla, 90);
  var dur = ((performance.now() - t0) / 1000).toFixed(2);
  linea(
    '<span class="c-ok">' +
      filas.length +
      ' row' +
      (filas.length !== 1 ? 's' : '') +
      ' in set</span> <span class="c-tenue">(' +
      dur +
      ' sec)</span>'
  );
}

/* ------------------------------------------------------------------
   CHIPS
   ------------------------------------------------------------------ */
function pintarChips() {
  var chips = sugerencias.querySelectorAll('.chip');
  for (var j = 0; j < chips.length; j++) chips[j].remove();
  var lista = CHIPS_CONFIG[modo];
  for (var i = 0; i < lista.length; i++) {
    (function (cmd) {
      var b = document.createElement('button');
      b.className = 'chip';
      b.textContent = cmd;
      b.addEventListener('click', function () {
        escribirComoHumano(cmd);
      });
      sugerencias.appendChild(b);
    })(lista[i]);
  }
}

function escribirComoHumano(cmd) {
  var input = entradaActual ? entradaActual.querySelector('input') : null;
  if (!input) return;
  input.focus({ preventScroll: true });
  input.value = '';
  var idx = 0;
  (function tic() {
    if (idx < cmd.length) {
      input.value += cmd[idx];
      idx++;
      var delay = 45 + Math.random() * 70;
      if ('.,;()[]{}'.indexOf(cmd[idx - 1]) !== -1) delay += 40;
      if (idx === cmd.length) delay += 60;
      setTimeout(tic, delay);
    } else {
      setTimeout(function () {
        input.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
        );
      }, 120);
    }
  })();
}

/* ------------------------------------------------------------------
   ARRANQUE
   ------------------------------------------------------------------ */
(async function init() {
  await imprimirSecuencia(
    [
      { html: 'Connecting to <span class="c-ok">' + SERVER.host + '</span> (' + SERVER.ip + ')...', rapida: false },
      { html: 'Authenticating with public key <span class="c-str">"id_ed25519"</span>...', rapida: false },
      { html: '<span class="c-ok">SSH connection established.</span>', rapida: false },
      { html: 'Last login: ' + SERVER.lastLogin + ' from ' + SERVER.fromIp, rapida: false },
      { html: '&nbsp;' },
      { html: 'Bienvenido/a a mi portafolio interactivo.' },
      {
        html: 'Mis habilidades no están en una lista: están en una <span class="c-str">base de datos</span>.',
      },
      { html: '&nbsp;' },
      {
        html: 'Escribe <span class="c-ok">help</span> para ver los comandos, o <span class="c-ok">mysql</span> para consultarlas directamente.',
      },
      { html: '&nbsp;' },
    ],
    90
  );
  rutaBarra.textContent = SERVER.user + '@' + SERVER.host + ': ~';
  pintarChips();
  nuevaEntrada();
})();
})();
