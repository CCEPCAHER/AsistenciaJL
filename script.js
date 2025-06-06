// script.js
// —— IMPORTA FIREBASE (desde firebase.js) ——  
import { app, analytics } from './firebase.js';

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

  // Función para obtener la clave de disponibilidad según semana y turno
  const getAvailabilityKey = () => {
    const week = document.getElementById("availWeekSelect").value;
    const turno = document.getElementById("availTurnSelect").value;
    return `${week}-${turno}`;
  };

  // Función para llenar el dropdown de personas según el rol seleccionado.
  const populatePersonSelect = () => {
    const role = document.getElementById("roleSelect").value;
    const personSelect = document.getElementById("personSelect");
    personSelect.innerHTML = "";

    const filtered = role === "capitan"
      ? persons.filter(p => p.isCaptain)
      : persons;

    filtered.forEach(p => {
      const option = document.createElement("option");
      option.value = p.name;
      option.textContent = p.name;
      personSelect.appendChild(option);
    });
  };
  document.getElementById("roleSelect").addEventListener("change", populatePersonSelect);
  populatePersonSelect();

  // Función para guardar los datos en LocalStorage.
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem("fixedAssignments", JSON.stringify(fixedAssignments));
      localStorage.setItem("availability", JSON.stringify(availability));
      alert("Datos guardados localmente.");
    } catch (error) {
      alert("Error al guardar los datos en LocalStorage.");
      console.error(error);
    }
  };

  // Función para cargar los datos desde LocalStorage.
  const loadFromLocalStorage = () => {
    try {
      const loadedAssignments = localStorage.getItem("fixedAssignments");
      const loadedAvailability = localStorage.getItem("availability");
      if (loadedAssignments) fixedAssignments = JSON.parse(loadedAssignments);
      if (loadedAvailability) availability = JSON.parse(loadedAvailability);
      alert("Datos cargados desde LocalStorage.");
      populateAvailabilityList();
    } catch (error) {
      alert("Error al cargar los datos desde LocalStorage.");
      console.error(error);
    }
  };

  // Función para llenar la lista de disponibilidad con un checkbox por cada persona.
  const populateAvailabilityList = () => {
    const availListDiv = document.getElementById("availabilityList");
    availListDiv.innerHTML = "";
    const key = getAvailabilityKey();
    // Si no hay datos guardados, por defecto todas están disponibles.
    const savedAvailability = (availability[key] && availability[key].length > 0)
      ? availability[key]
      : persons.map(p => p.name);

    persons.forEach(p => {
      const container = document.createElement("div");
      container.classList.add("checkbox-container");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = p.name;
      checkbox.id = `avail_${p.name.replace(/\s+/g, '_')}`;
      checkbox.checked = savedAvailability.includes(p.name);

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = p.name;

      container.appendChild(checkbox);
      container.appendChild(label);
      availListDiv.appendChild(container);
    });
  };

  document.getElementById("availWeekSelect").addEventListener("change", populateAvailabilityList);
  document.getElementById("availTurnSelect").addEventListener("change", populateAvailabilityList);
  populateAvailabilityList();

  // Guarda la disponibilidad para la semana y turno seleccionados.
  document.getElementById("btnSaveAvailability").addEventListener("click", () => {
    const key = getAvailabilityKey();
    const checkboxes = document.querySelectorAll("#availabilityList input[type='checkbox']");
    const availablePersons = Array.from(checkboxes)
      .filter(chk => chk.checked)
      .map(chk => chk.value);
    availability[key] = availablePersons;
    alert(`Disponibilidad guardada para ${key}`);
  });

  // Fija la asignación para un turno y rol.
  document.getElementById("btnFixAssignment").addEventListener("click", () => {
    const week = document.getElementById("weekSelect").value;
    const turno = document.getElementById("turnSelect").value;
    const role = document.getElementById("roleSelect").value;
    const person = document.getElementById("personSelect").value;
    const key = `${week}-${turno}`;

    if (!fixedAssignments[key]) {
      fixedAssignments[key] = { capitan: null, publicadores: [null, null, null] };
    }
    if (role === "capitan") {
      fixedAssignments[key].capitan = person;
    } else if (role.startsWith("publicador")) {
      const index = parseInt(role.slice(-1)) - 1;
      fixedAssignments[key].publicadores[index] = person;
    }
    alert(`Turno fijado para ${key} en rol ${role}: ${person}`);
  });

  // Función de selección ponderada: mayor probabilidad a quien tenga menos turnos.
  function weightedRandomCandidate(candidates, counts) {
    let totalWeight = 0;
    const weights = candidates.map(candidate => {
      // Se suma 1 al conteo para evitar división por cero
      const weight = 1 / (counts[candidate] + 1);
      totalWeight += weight;
      return weight;
    });
    let random = Math.random() * totalWeight;
    for (let i = 0; i < candidates.length; i++) {
      random -= weights[i];
      if (random <= 0) return candidates[i];
    }
    return candidates[candidates.length - 1];
  }

  // Genera el calendario aplicando asignaciones fijas, disponibilidad, restricciones
  // y utilizando la selección ponderada para una distribución equitativa.
  document.getElementById("btnGenerateSchedule").addEventListener("click", generateSchedule);

  function generateSchedule() {
    const allowMultiple = document.getElementById("allowMultipleCheckbox").checked;
    const turnos15 = document.getElementById("turnos15Checkbox").checked;

    // Inicializa un contador local para cada persona.
    let localCounts = {};
    persons.forEach(p => {
      localCounts[p.name] = 0;
    });

    const weeks = turnos15 ? ["S1", "S2"] : ["S1", "S2", "S3", "S4"];
    const turnos = ["MM", "MT1", "MT2", "XT1", "XT2", "J", "VT1", "VT2", "S", "D"];
    let scheduleResults = [];

    weeks.forEach(week => {
      let assigned = {};
      turnos.forEach(turno => {
        const key = `${week}-${turno}`;
        let shiftAssignment = { week, turno, capitan: null, publicadores: [null, null, null] };

        // Aplicar asignaciones fijas y actualizar conteos.
        if (fixedAssignments[key]) {
          if (fixedAssignments[key].capitan) {
            shiftAssignment.capitan = fixedAssignments[key].capitan;
            if (!allowMultiple) assigned[fixedAssignments[key].capitan] = true;
            localCounts[fixedAssignments[key].capitan]++;
          }
          fixedAssignments[key].publicadores.forEach((p, i) => {
            if (p) {
              shiftAssignment.publicadores[i] = p;
              if (!allowMultiple) assigned[p] = true;
              localCounts[p]++;
            }
          });
        }

        // Lista de disponibles para el turno.
        let availableForShift = availability[key] ? [...availability[key]] : persons.map(p => p.name);

        const filterCandidates = (candidates, condition) => {
          return candidates.filter(name => {
            if (!allowMultiple && assigned[name]) return false;
            const personObj = persons.find(p => p.name === name);
            return personObj && condition(personObj);
          });
        };

        // Asignar capitán (si no está fijado) usando selección ponderada.
        if (!shiftAssignment.capitan) {
          const candidates = filterCandidates(availableForShift, person => person.isCaptain);
          if (candidates.length > 0) {
            const chosen = weightedRandomCandidate(candidates, localCounts);
            shiftAssignment.capitan = chosen;
            if (!allowMultiple) assigned[chosen] = true;
            localCounts[chosen]++;
          } else {
            shiftAssignment.capitan = "Sin asignar";
          }
        }

        // Asignar los 3 publicadores usando selección ponderada.
        for (let i = 0; i < 3; i++) {
          if (!shiftAssignment.publicadores[i]) {
            const candidates = filterCandidates(availableForShift, person => true);
            if (candidates.length > 0) {
              const chosen = weightedRandomCandidate(candidates, localCounts);
              shiftAssignment.publicadores[i] = chosen;
              if (!allowMultiple) assigned[chosen] = true;
              localCounts[chosen]++;
            } else {
              shiftAssignment.publicadores[i] = "Sin asignar";
            }
          }
        }

        scheduleResults.push(shiftAssignment);
      });
    });

    // Duplicar asignaciones para "Turnos cada 15 días" si está activado.
    if (turnos15) {
      const duplicates = scheduleResults.map(shift => {
        let newWeek = shift.week === "S1" ? "S3" : shift.week === "S2" ? "S4" : shift.week;
        return {
          week: newWeek,
          turno: shift.turno,
          capitan: shift.capitan,
          publicadores: [...shift.publicadores]
        };
      });
      scheduleResults = scheduleResults.concat(duplicates);
    }

    displaySchedule(scheduleResults);
  }

  // Mapeo para los días/turnos
  const turnoMapping = {
    "MM": "day-lunes",
    "MT1": "day-martes-1",
    "MT2": "day-martes-2",
    "XT1": "day-miercoles-1",
    "XT2": "day-miercoles-2",
    "J": "day-jueves",
    "VT1": "day-viernes-1",
    "VT2": "day-viernes-2",
    "S": "day-sabado",
    "D": "day-domingo"
  };

  // Mapeo para las semanas
  const weekMapping = {
    "S1": "week-S1",
    "S2": "week-S2",
    "S3": "week-S3",
    "S4": "week-S4"
  };

  function displaySchedule(scheduleResults) {
    const container = document.getElementById("scheduleTableContainer");
    container.innerHTML = "";

    const table = document.createElement("table");
    table.className = "schedule-table";

    // Cabecera de la tabla
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Semana", "Turno", "Capitán", "Publicador 1", "Publicador 2", "Publicador 3"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Cuerpo de la tabla
    const tbody = document.createElement("tbody");

    scheduleResults.forEach(item => {
      const row = document.createElement("tr");

      // Celda para la semana con su color independiente
      const tdWeek = document.createElement("td");
      tdWeek.textContent = item.week;
      const weekClass = weekMapping[item.week];
      if (weekClass) {
        tdWeek.classList.add(weekClass);
      }
      row.appendChild(tdWeek);

      // Obtener la clase para el día/turno
      const dayClass = turnoMapping[item.turno] || "";

      // Celda para el turno con su color
      const tdTurno = document.createElement("td");
      tdTurno.textContent = item.turno;
      if (dayClass) {
        tdTurno.classList.add(dayClass);
      }
      row.appendChild(tdTurno);

      // Celda para el capitán, aplicando el mismo color del día
      const tdCap = document.createElement("td");
      tdCap.textContent = item.capitan;
      if (dayClass) {
        tdCap.classList.add(dayClass);
      }
      row.appendChild(tdCap);

      // Celdas para los publicadores, aplicando el mismo color del día
      item.publicadores.forEach(pub => {
        const tdPub = document.createElement("td");
        tdPub.textContent = pub;
        if (dayClass) {
          tdPub.classList.add(dayClass);
        }
        row.appendChild(tdPub);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);

    // Llama a la función para analizar las asignaciones, si la tienes
    analyzeAssignments(scheduleResults);

    // --- Aquí añadimos la opción de exportar PDF ---
    // Evitamos crear múltiples botones si se vuelve a generar
    if (!document.getElementById("btnExportPDF")) {
      const exportBtn = document.createElement("button");
      exportBtn.id = "btnExportPDF";
      exportBtn.textContent = "Exportar PDF";
      exportBtn.style.margin = "10px 0";
      container.parentNode.insertBefore(exportBtn, container.nextSibling);

      exportBtn.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
          unit: "pt",
          format: "a4",
          orientation: "portrait"
        });

        // Título
        doc.setFontSize(18);
        doc.text("Calendario de Turnos", 40, 50);

        // Generar la tabla a partir del HTML
        doc.autoTable({
          html: ".schedule-table",
          startY: 80,
          theme: "grid",
          headStyles: {
            fillColor: [63, 81, 181],
            textColor: 255,
            halign: "center"
          },
          styles: {
            fontSize: 9,
            cellPadding: 4
          },
          didParseCell: function(data) {
            const node = data.cell.raw;
            // Colores de fondo según clases
            Object.entries(turnoMapping).forEach(([turn, cls]) => {
              if (node.classList && node.classList.contains(cls)) {
                const bg = getComputedStyle(document.querySelector(`.${cls}`)).backgroundColor;
                const nums = bg.match(/\d+/g).map(Number);
                data.cell.styles.fillColor = nums;
              }
            });
            Object.entries(weekMapping).forEach(([wk, cls]) => {
              if (node.classList && node.classList.contains(cls)) {
                const bg = getComputedStyle(document.querySelector(`.${cls}`)).backgroundColor;
                const nums = bg.match(/\d+/g).map(Number);
                data.cell.styles.fillColor = nums;
              }
            });
          }
        });

        doc.save("calendario-turnos.pdf");
      });
    }
  }

  // Función para analizar asignaciones y mostrar cuántos turnos tiene cada persona.
  function analyzeAssignments(scheduleResults) {
    let counts = {};
    persons.forEach(p => {
      counts[p.name] = 0;
    });

    scheduleResults.forEach(shift => {
      if (shift.capitan && shift.capitan !== "Sin asignar") {
        counts[shift.capitan]++;
      }
      shift.publicadores.forEach(pub => {
        if (pub && pub !== "Sin asignar") {
          counts[pub]++;
        }
      });
    });

    let analysisContainer = document.getElementById("assignmentAnalysis");
    if (!analysisContainer) {
      analysisContainer = document.createElement("div");
      analysisContainer.id = "assignmentAnalysis";
      analysisContainer.style.marginTop = "20px";
      document.getElementById("scheduleSection").appendChild(analysisContainer);
    }
    analysisContainer.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = "Resumen de Asignaciones";
    analysisContainer.appendChild(heading);

    const list = document.createElement("ul");
    persons.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name}: ${counts[p.name]} turno(s)`;
      li.style.color = counts[p.name] === 0 ? "red" : "green";
      list.appendChild(li);
    });
    analysisContainer.appendChild(list);
  }

  // Asignar eventos a botones de almacenamiento.
  document.getElementById("btnSaveStorage").addEventListener("click", saveToLocalStorage);
  document.getElementById("btnLoadStorage").addEventListener("click", loadFromLocalStorage);
});