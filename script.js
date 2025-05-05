document.addEventListener("DOMContentLoaded", () => {
  // Lista de personas (según la información proporcionada)
  const persons = [
    { name: "Lola Aradilla", isCaptain: false },
    { name: "Laura Andres", isCaptain: false },
    { name: "Cielo Moscoso", isCaptain: false },
    { name: "Antonia Carpintero", isCaptain: false },
    { name: "Sara Baño", isCaptain: false },
    { name: "Salvador Cadenas", isCaptain: true },
    { name: "Montse (hija) Cadenas", isCaptain: false },
    { name: "Franklin Carranza", isCaptain: true },
    { name: "Vanessa de Carranza", isCaptain: false },
    { name: "Sandra Carvajal", isCaptain: false },
    { name: "Rosa Corpas", isCaptain: false },
    { name: "Alejandro Correa", isCaptain: false },
    { name: "Isabel Cortés", isCaptain: false },
    { name: "Erika Góngora", isCaptain: false },
    { name: "Rosario González", isCaptain: false },
    { name: "Alejandro Hernández", isCaptain: true },
    { name: "Gloria Hernández", isCaptain: false },
    { name: "Javier Hernández", isCaptain: true },
    { name: "Montse de Hernández", isCaptain: false },
    { name: "Débora de Hosu", isCaptain: false },
    { name: "Samuel Hosu", isCaptain: true },
    { name: "Eliana Julián", isCaptain: false },
    { name: "Remedios Ligero", isCaptain: false },
    { name: "Olga Lópes 1", isCaptain: false },
    { name: "Iris López", isCaptain: false },
    { name: "Abigaíl López", isCaptain: false },
    { name: "Francisco López", isCaptain: true },
    { name: "Mª Carmen Lucía", isCaptain: false },
    { name: "Marta Martinez", isCaptain: false },
    { name: "Cristina de Mínguez", isCaptain: false },
    { name: "Francisco Mínguez", isCaptain: false },
    { name: "Segundo Miranda", isCaptain: true },
    { name: "María Montaño", isCaptain: false },
    { name: "Encarna de Moreno", isCaptain: false },
    { name: "José Moreno", isCaptain: true },
    { name: "Estéfany Muñoz", isCaptain: false },
    { name: "Jakeline Muñoz", isCaptain: false },
    { name: "Jimmy Muñoz", isCaptain: true },
    { name: "Samuel Ordoñez", isCaptain: true },
    { name: "Zulema de Ordoñez", isCaptain: false },
    { name: "Beatriz de Palomar", isCaptain: false },
    { name: "Claudio Palomar", isCaptain: true },
    { name: "Luis Fernando Paz", isCaptain: true },
    { name: "Joselma Pereira", isCaptain: false },
    { name: "Remedios Pérez", isCaptain: false },
    { name: "Santiago Quimbayo", isCaptain: true },
    { name: "Sara de Quimbayo", isCaptain: false },
    { name: "Sebastián Rodríguez", isCaptain: true },
    { name: "Javier Rodriguez", isCaptain: true },
    { name: "Teresa de Rodríguez", isCaptain: false },
    { name: "Aitana Ruíz", isCaptain: false },
    { name: "Eliú Ruíz", isCaptain: true },
    { name: "Juan Tomás Ruíz", isCaptain: false },
    { name: "Mireia de Ruíz", isCaptain: false },
    { name: "Rosa de Ruíz", isCaptain: false },
    { name: "Juan Sabio", isCaptain: true },
    { name: "Laura de Sabio", isCaptain: false },
    { name: "Francisco Sánchez", isCaptain: true },
    { name: "Ericka Sánchez", isCaptain: false },
    { name: "Julissa de Soria", isCaptain: false },
    { name: "Pablo Soria", isCaptain: false },
    { name: "Juan Luis Torres", isCaptain: true },
    { name: "Mercedes de Torres", isCaptain: false },
    { name: "Merche, Gomez", isCaptain: false },
    { name: "Cristihan Valdivieso", isCaptain: true },
    { name: "Encarna de Velarde", isCaptain: false },
    { name: "Andres Velarde", isCaptain: false },
    { name: "Ethelinda Velázquez", isCaptain: false },
    { name: "Manoli de Vich", isCaptain: false }
  ];
  persons.sort((a, b) => a.name.localeCompare(b.name));

  let fixedAssignments = {};
  let availability = {};

  const allowMultipleCheckbox = document.getElementById("allowMultipleCheckbox");
  const turnos15Checkbox    = document.getElementById("turnos15Checkbox");
  const availWeekSelect     = document.getElementById("availWeekSelect");
  const availTurnSelect     = document.getElementById("availTurnSelect");
  const roleSelect          = document.getElementById("roleSelect");
  const personSelect        = document.getElementById("personSelect");
  const availabilityListDiv = document.getElementById("availabilityList");
  const scheduleTableContainer = document.getElementById("scheduleTableContainer");

  const getAvailabilityKey = () =>
    `${availWeekSelect.value}-${availTurnSelect.value}`;

  const populatePersonSelect = () => {
    personSelect.innerHTML = "";
    const list = roleSelect.value === "capitan"
      ? persons.filter(p => p.isCaptain)
      : persons;
    list.forEach(p => {
      const o = document.createElement("option");
      o.value = p.name;
      o.textContent = p.name;
      personSelect.appendChild(o);
    });
  };
  roleSelect.addEventListener("change", populatePersonSelect);
  populatePersonSelect();

  const saveToLocalStorage = () => {
    localStorage.setItem("fixedAssignments", JSON.stringify(fixedAssignments));
    localStorage.setItem("availability", JSON.stringify(availability));
    localStorage.setItem("scheduleSettings", JSON.stringify({
      allowMultiple: allowMultipleCheckbox.checked,
      turnos15: turnos15Checkbox.checked
    }));
    alert("Datos guardados.");
  };

  const loadFromLocalStorage = () => {
    const fa = localStorage.getItem("fixedAssignments");
    const av = localStorage.getItem("availability");
    const st = localStorage.getItem("scheduleSettings");
    fixedAssignments = fa ? JSON.parse(fa) : {};
    availability     = av ? JSON.parse(av) : {};
    if (st) {
      const s = JSON.parse(st);
      allowMultipleCheckbox.checked = !!s.allowMultiple;
      turnos15Checkbox.checked     = !!s.turnos15;
    }
    populateAvailabilityList();
    scheduleTableContainer.innerHTML = "";
    const analysis = document.getElementById("assignmentAnalysis");
    if (analysis) analysis.innerHTML = "";
    alert("Último estado cargado.");
  };
  document.getElementById("btnLoadStorage")
    .addEventListener("click", loadFromLocalStorage);

  const populateAvailabilityList = () => {
    availabilityListDiv.innerHTML = "";
    const key = getAvailabilityKey();
    const availableForKey = availability[key] || [];
    persons.forEach(p => {
      const c = document.createElement("div");
      c.classList.add("checkbox-container");
      const chk = document.createElement("input");
      chk.type    = "checkbox";
      chk.value   = p.name;
      chk.id      = `avail_${key}_${p.name.replace(/[^a-zA-Z0-9_]/g,'_')}`;
      chk.checked = availableForKey.includes(p.name);
      const lbl = document.createElement("label");
      lbl.htmlFor = chk.id;
      lbl.textContent = p.name;
      c.append(chk, lbl);
      availabilityListDiv.appendChild(c);
    });
  };
  availWeekSelect.addEventListener("change", populateAvailabilityList);
  availTurnSelect.addEventListener("change", populateAvailabilityList);
  populateAvailabilityList();

  document.getElementById("btnSaveAvailability")
    .addEventListener("click", () => {
      const key = getAvailabilityKey();
      const chosen = Array.from(
        availabilityListDiv.querySelectorAll("input[type=checkbox]")
      ).filter(c => c.checked).map(c => c.value);
      availability[key] = chosen;
      alert(`Disponibilidad guardada para ${key}`);
    });

  document.getElementById("btnFixAssignment")
    .addEventListener("click", () => {
      const w = document.getElementById("weekSelect").value;
      const t = document.getElementById("turnSelect").value;
      const r = roleSelect.value;
      const p = personSelect.value;
      const key = `${w}-${t}`;
      if (!fixedAssignments[key]) {
        fixedAssignments[key] = { capitan: null, publicadores: [null,null,null] };
      }
      if (r === "capitan") fixedAssignments[key].capitan = p;
      else {
        const idx = parseInt(r.slice(-1),10) - 1;
        if (idx>=0&&idx<3) fixedAssignments[key].publicadores[idx] = p;
      }
      alert(`Asignación fijada: ${key} → ${r} = ${p}`);
    });

  document.getElementById("btnSaveStorage")
    .addEventListener("click", saveToLocalStorage);

  function weightedRandomCandidate(candidates, counts) {
    if (!candidates || candidates.length === 0) return null;
    const weighted = candidates.map(name => {
      const cnt = counts[name] || 0;
      return { name, weight: 1/(cnt+1) };
    });
    const total = weighted.reduce((s,c)=>s+c.weight,0);
    let rand = Math.random()*total;
    for (const w of weighted) {
      rand -= w.weight;
      if (rand <= 0) return w.name;
    }
    return candidates[candidates.length-1];
  }

  document.getElementById("btnGenerateSchedule")
    .addEventListener("click", generateSchedule);

  function generateSchedule() {
    const allowMultiple = allowMultipleCheckbox.checked;
    const turnos15      = turnos15Checkbox.checked;
    const assignedCounts = {};
    persons.forEach(p => assignedCounts[p.name] = 0);
    const weeks = turnos15 ? ["S1","S2"] : ["S1","S2","S3","S4"];
    const turnos = ["MM","MT1","MT2","XT1","XT2","J","VT1","VT2","S","D"];
    let schedule = [], weekly = {};

    weeks.forEach(week => {
      weekly[week] = {};
      turnos.forEach(turno => {
        const key = `${week}-${turno}`;
        const shift = { week, turno, capitan: null, publicadores: [null,null,null] };
        const inShift = {};

        if (fixedAssignments[key]) {
          const f = fixedAssignments[key];
          if (f.capitan) {
            shift.capitan = f.capitan;
            assignedCounts[f.capitan]++; inShift[f.capitan]=true;
            if (!allowMultiple) weekly[week][f.capitan]=true;
          }
          f.publicadores.forEach((pp,i) => {
            if (pp) {
              shift.publicadores[i] = pp;
              assignedCounts[pp]++; inShift[pp]=true;
              if (!allowMultiple) weekly[week][pp]=true;
            }
          });
        }

        let candidates = availability[key]
          ? [...availability[key]]
          : persons.map(p=>p.name);

        const filterFn = name =>
          !inShift[name] && (allowMultiple || !weekly[week][name]);

        candidates = candidates.filter(filterFn);

        if (!shift.capitan) {
          const caps = candidates.filter(n=>persons.find(p=>p.name===n).isCaptain);
          const chosen = weightedRandomCandidate(caps,assignedCounts);
          if (chosen) {
            shift.capitan = chosen;
            assignedCounts[chosen]++; inShift[chosen]=true;
            if (!allowMultiple) weekly[week][chosen]=true;
            candidates = candidates.filter(n=>n!==chosen);
          } else shift.capitan = "Vacante";
        }

        for (let i=0; i<3; i++) {
          if (!shift.publicadores[i]) {
            const pubs = candidates.filter(n=>!inShift[n] && (allowMultiple || !weekly[week][n]));
            const chosen = weightedRandomCandidate(pubs,assignedCounts);
            if (chosen) {
              shift.publicadores[i] = chosen;
              assignedCounts[chosen]++; inShift[chosen]=true;
              if (!allowMultiple) weekly[week][chosen]=true;
              candidates = candidates.filter(n=>n!==chosen);
            } else shift.publicadores[i] = "Vacante";
          }
        }

        schedule.push(shift);
      });
    });

    if (turnos15) {
      const extra = schedule.map(s => ({
        week: s.week==="S1"?"S3":"S4",
        turno: s.turno,
        capitan: s.capitan,
        publicadores: [...s.publicadores]
      }));
      schedule = schedule.concat(extra);
    }

    displaySchedule(schedule);
  }

  const turnoMapping = {
    MM:"day-lunes", MT1:"day-martes-1", MT2:"day-martes-2",
    XT1:"day-miercoles-1", XT2:"day-miercoles-2",
    J:"day-jueves", VT1:"day-viernes-1", VT2:"day-viernes-2",
    S:"day-sabado", D:"day-domingo"
  };
  const weekMapping = { S1:"week-s1", S2:"week-s2", S3:"week-s3", S4:"week-s4" };

  function displaySchedule(data) {
    scheduleTableContainer.innerHTML = "";
    if (!data.length) {
      scheduleTableContainer.textContent = "No hay datos de calendario.";
      return;
    }
    const table = document.createElement("table");
    table.className = "schedule-table";
    const thead = table.createTHead();
    const hr = thead.insertRow();
    ["Semana","Turno","Capitán","Publicador 1","Publicador 2","Publicador 3"]
      .forEach(text=>{ const th= document.createElement("th"); th.textContent=text; hr.appendChild(th); });
    const tbody = table.createTBody();
    data.forEach(item => {
      const row = tbody.insertRow();
      const dayClass = turnoMapping[item.turno];
      ["week","turno","capitan"].forEach((key,i) => {
        const cell = row.insertCell();
        cell.textContent = key==="week"?item.week
                          : key==="turno"?item.turno
                          : item.capitan||"Vacante";
        if (i===0 && weekMapping[item.week]) cell.classList.add(weekMapping[item.week]);
        if (i===1 && dayClass) cell.classList.add(dayClass);
        if (i===2 && dayClass) cell.classList.add(dayClass);
      });
      item.publicadores.forEach(pub => {
        const cell = row.insertCell();
        cell.textContent = pub||"Vacante";
        if (dayClass) cell.classList.add(dayClass);
      });
    });
    scheduleTableContainer.appendChild(table);
    analyzeAssignments(data);
    if (!document.getElementById("btnExportPDF")) {
      const btn = document.createElement("button");
      btn.id = "btnExportPDF";
      btn.textContent = "Exportar PDF";
      btn.style.marginTop = "15px"; btn.style.padding="8px 15px";
      scheduleTableContainer.parentNode.insertBefore(btn, scheduleTableContainer.nextSibling);
      btn.addEventListener("click", () => {
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
          alert("jsPDF no cargado."); return;
        }
        if (typeof window.jspdf.jsPDF.autoTable !== 'function') {
          alert("autoTable no cargado."); return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation:"portrait", unit:"pt", format:"a4" });
        doc.setFontSize(18);
        doc.text("Calendario de Turnos", 40, 50);
        doc.autoTable({ html:".schedule-table", startY:70, theme:'grid',
          headStyles:{ fillColor:[22,160,133], textColor:[255,255,255], halign:'center' },
          styles:{ fontSize:9, cellPadding:5 }, columnStyles:{ 0:{halign:'center'},1:{halign:'center'} },
          didParseCell(data) {
            const el = data.cell.raw;
            if (el && el.classList) {
              let color = null;
              Object.entries(weekMapping).forEach(([k,cls]) => {
                if (el.classList.contains(cls)) color = getComputedStyle(el).backgroundColor;
              });
              Object.entries(turnoMapping).forEach(([k,cls]) => {
                if (el.classList.contains(cls)) color = getComputedStyle(el).backgroundColor;
              });
              if (color && color!=='transparent') {
                const rgb = color.match(/\d+/g);
                if (rgb && rgb.length>=3) data.cell.styles.fillColor = rgb.slice(0,3).map(n=>parseInt(n));
              }
            }
          }
        });
        const today = new Date().toISOString().slice(0,10);
        doc.save(`calendario-turnos-${today}.pdf`);
      });
    }
  }

  function analyzeAssignments(data) {
    const counts = {};
    persons.forEach(p => counts[p.name] = 0);
    data.forEach(s => {
      if (s.capitan && counts[s.capitan]>=0) counts[s.capitan]++;
      s.publicadores.forEach(pub => {
        if (pub && counts[pub]>=0) counts[pub]++;
      });
    });
    let cont = document.getElementById("assignmentAnalysis");
    if (!cont) {
      cont = document.createElement("div");
      cont.id = "assignmentAnalysis";
      cont.style.marginTop="20px";
      const pdfBtn = document.getElementById("btnExportPDF");
      if (pdfBtn) pdfBtn.parentNode.insertBefore(cont,pdfBtn.nextSibling);
      else scheduleTableContainer.parentNode.insertBefore(cont,scheduleTableContainer.nextSibling);
    }
    cont.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent = "Resumen de Asignaciones Generadas";
    cont.appendChild(h3);
    const ul = document.createElement("ul");
    ul.style.listStyle="none"; ul.style.paddingLeft="0";
    persons.slice().sort((a,b)=>a.name.localeCompare(b.name))
      .forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.name}: ${counts[p.name]} turno(s)`;
        li.style.color = counts[p.name]===0?"#e74c3c":"#27ae60";
        li.style.marginBottom="3px";
        ul.appendChild(li);
      });
    cont.appendChild(ul);
  }
});