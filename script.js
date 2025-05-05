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

  // --- DOM Element References ---
  const allowMultipleCheckbox = document.getElementById("allowMultipleCheckbox");
  const turnos15Checkbox = document.getElementById("turnos15Checkbox");
  const availWeekSelect = document.getElementById("availWeekSelect");
  const availTurnSelect = document.getElementById("availTurnSelect");
  const roleSelect = document.getElementById("roleSelect");
  const personSelect = document.getElementById("personSelect");
  const availabilityListDiv = document.getElementById("availabilityList");
  const scheduleTableContainer = document.getElementById("scheduleTableContainer");


  // Función para obtener la clave de disponibilidad según semana y turno
  const getAvailabilityKey = () => {
    const week = availWeekSelect.value;
    const turno = availTurnSelect.value;
    return `${week}-${turno}`;
  };

  // Función para llenar el dropdown de personas según el rol seleccionado.
  const populatePersonSelect = () => {
    const role = roleSelect.value;
    personSelect.innerHTML = ""; // Clear previous options

    const filtered = role === "capitan"
      ? persons.filter(p => p.isCaptain)
      : persons; // All persons if not captain

    filtered.forEach(p => {
      const option = document.createElement("option");
      option.value = p.name;
      option.textContent = p.name;
      personSelect.appendChild(option);
    });
  };
  roleSelect.addEventListener("change", populatePersonSelect);
  populatePersonSelect(); // Initial population

  // Función para guardar los datos en LocalStorage.
  // --- MODIFICADA ---
  const saveToLocalStorage = () => {
    try {
      // Guardar asignaciones y disponibilidad
      localStorage.setItem("fixedAssignments", JSON.stringify(fixedAssignments));
      localStorage.setItem("availability", JSON.stringify(availability));

      // Guardar estado de los checkboxes
      const settings = {
        allowMultiple: allowMultipleCheckbox.checked,
        turnos15: turnos15Checkbox.checked
      };
      localStorage.setItem("scheduleSettings", JSON.stringify(settings));

      alert("Datos guardados localmente.");
    } catch (error) {
      alert("Error al guardar los datos en LocalStorage.");
      console.error("Error saving to LocalStorage:", error);
    }
  };

  // Función para cargar los datos desde LocalStorage.
  // --- MODIFICADA ---
  const loadFromLocalStorage = () => {
    try {
      // Cargar asignaciones y disponibilidad
      const loadedAssignments = localStorage.getItem("fixedAssignments");
      const loadedAvailability = localStorage.getItem("availability");
      if (loadedAssignments) {
          fixedAssignments = JSON.parse(loadedAssignments);
      } else {
          fixedAssignments = {}; // Reset if nothing loaded
      }
      if (loadedAvailability) {
          availability = JSON.parse(loadedAvailability);
      } else {
          availability = {}; // Reset if nothing loaded
      }

      // Cargar y restaurar estado de los checkboxes
      const loadedSettings = localStorage.getItem("scheduleSettings");
      if (loadedSettings) {
        const settings = JSON.parse(loadedSettings);
        // Asignar valores cargados (usando || false como fallback)
        allowMultipleCheckbox.checked = settings.allowMultiple || false;
        turnos15Checkbox.checked = settings.turnos15 || false;
      } else {
        // Si no hay configuraciones guardadas, asegurar que estén desmarcados
        allowMultipleCheckbox.checked = false;
        turnos15Checkbox.checked = false;
      }

      alert("Datos cargados desde LocalStorage.");
      populateAvailabilityList(); // Actualizar la lista de disponibilidad basada en los datos cargados
      // Podrías querer limpiar el calendario existente si se carga nueva data
      scheduleTableContainer.innerHTML = "";
      const analysisContainer = document.getElementById("assignmentAnalysis");
      if (analysisContainer) analysisContainer.innerHTML = "";


    } catch (error) {
      alert("Error al cargar los datos desde LocalStorage.");
      console.error("Error loading from LocalStorage:", error);
      // Resetear estados en caso de error
      fixedAssignments = {};
      availability = {};
      allowMultipleCheckbox.checked = false;
      turnos15Checkbox.checked = false;
      // Actualizar UI para reflejar el estado vacío
      populateAvailabilityList();
      scheduleTableContainer.innerHTML = "";
      const analysisContainer = document.getElementById("assignmentAnalysis");
      if (analysisContainer) analysisContainer.innerHTML = "";
    }
  };

  // Función para llenar la lista de disponibilidad con un checkbox por cada persona.
  const populateAvailabilityList = () => {
    availabilityListDiv.innerHTML = ""; // Clear previous list
    const key = getAvailabilityKey();

    // Determinar quiénes están disponibles para esta clave: los guardados o todos por defecto
    const availableForKey = availability[key] || persons.map(p => p.name); // Default to all if no data for this key

    persons.forEach(p => {
      const container = document.createElement("div");
      container.classList.add("checkbox-container"); // Add class for styling if needed

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = p.name;
      // Generate a unique ID for the checkbox and link it with the label
      const safeId = p.name.replace(/[^a-zA-Z0-9_]/g, '_'); // Make ID safe
      checkbox.id = `avail_${key}_${safeId}`;
      // Check if the person is in the list of available people for this key
      checkbox.checked = availableForKey.includes(p.name);

      const label = document.createElement("label");
      label.htmlFor = checkbox.id; // Link label to checkbox
      label.textContent = p.name;

      container.appendChild(checkbox);
      container.appendChild(label);
      availabilityListDiv.appendChild(container);
    });
  };

  // Update availability list when week or turn changes
  availWeekSelect.addEventListener("change", populateAvailabilityList);
  availTurnSelect.addEventListener("change", populateAvailabilityList);
  // Initial population of availability list for the default selected week/turn
  populateAvailabilityList();

  // Guarda la disponibilidad para la semana y turno seleccionados.
  document.getElementById("btnSaveAvailability").addEventListener("click", () => {
    const key = getAvailabilityKey();
    const checkboxes = availabilityListDiv.querySelectorAll("input[type='checkbox']");
    const availablePersons = Array.from(checkboxes)
      .filter(chk => chk.checked)
      .map(chk => chk.value);

    if (availablePersons.length > 0) {
      availability[key] = availablePersons; // Store the list of available names
    } else {
      // If no one is checked, maybe remove the key or store an empty array
      // Storing empty array signifies explicitly unavailable
      availability[key] = [];
      // delete availability[key]; // Alternative: remove the key if no one is available
    }
    alert(`Disponibilidad guardada para ${key}`);
  });

  // Fija la asignación para un turno y rol.
  document.getElementById("btnFixAssignment").addEventListener("click", () => {
    const week = document.getElementById("weekSelect").value;
    const turno = document.getElementById("turnSelect").value;
    const role = roleSelect.value; // Use the main role select here
    const person = personSelect.value; // Use the main person select
    const key = `${week}-${turno}`;

    // Ensure the structure exists
    if (!fixedAssignments[key]) {
      fixedAssignments[key] = { capitan: null, publicadores: [null, null, null] };
    }

    // Assign based on role
    if (role === "capitan") {
      fixedAssignments[key].capitan = person;
    } else if (role.startsWith("publicador")) {
      const index = parseInt(role.slice(-1)) - 1; // Get index 0, 1, or 2
      if (index >= 0 && index < 3) {
        fixedAssignments[key].publicadores[index] = person;
      }
    }
    alert(`Turno fijado para ${key} en rol ${roleSelect.options[roleSelect.selectedIndex].text}: ${person}`);
  });

  // Función de selección ponderada: mayor probabilidad a quien tenga menos turnos.
  function weightedRandomCandidate(candidates, counts) {
    if (!candidates || candidates.length === 0) return null; // Handle empty candidates

    let weightedCandidates = candidates.map(candidate => {
        // Ensure candidate exists in counts, default to 0 if not
        const count = counts[candidate] || 0;
        // Weight is higher for lower counts. Adding 1 avoids division by zero.
        const weight = 1 / (count + 1);
        return { name: candidate, weight: weight };
    });

    const totalWeight = weightedCandidates.reduce((sum, c) => sum + c.weight, 0);
    if (totalWeight === 0) {
         // If all weights are 0 (e.g., if counts were Infinity?), pick random
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    let random = Math.random() * totalWeight;
    for (let i = 0; i < weightedCandidates.length; i++) {
      random -= weightedCandidates[i].weight;
      if (random <= 0) return weightedCandidates[i].name;
    }
    // Fallback (should rarely be needed if logic is sound)
    return candidates[candidates.length - 1];
  }


  // Genera el calendario aplicando asignaciones fijas, disponibilidad, restricciones
  // y utilizando la selección ponderada para una distribución equitativa.
  document.getElementById("btnGenerateSchedule").addEventListener("click", generateSchedule);

  function generateSchedule() {
    const allowMultiple = allowMultipleCheckbox.checked;
    const turnos15 = turnos15Checkbox.checked;

    let assignedCounts = {}; // Counts within this generation run
    persons.forEach(p => {
      assignedCounts[p.name] = 0;
    });

    const weeksToProcess = turnos15 ? ["S1", "S2"] : ["S1", "S2", "S3", "S4"];
    const turnos = ["MM", "MT1", "MT2", "XT1", "XT2", "J", "VT1", "VT2", "S", "D"];
    let generatedSchedule = [];
    let weeklyAssignments = {}; // Track assignments per week { S1: { person: true, ...}, S2: ... }

    weeksToProcess.forEach(week => {
      weeklyAssignments[week] = {}; // Initialize tracker for the week

      turnos.forEach(turno => {
        const key = `${week}-${turno}`;
        let shiftAssignment = {
          week: week,
          turno: turno,
          capitan: null,
          publicadores: [null, null, null]
        };

        let assignedInThisShift = {}; // Track assignments within this specific shift

        // 1. Apply Fixed Assignments and update counts/trackers
        if (fixedAssignments[key]) {
          const fixed = fixedAssignments[key];
          if (fixed.capitan) {
            shiftAssignment.capitan = fixed.capitan;
            assignedCounts[fixed.capitan]++;
            assignedInThisShift[fixed.capitan] = true;
            if (!allowMultiple) weeklyAssignments[week][fixed.capitan] = true;
          }
          fixed.publicadores.forEach((p, i) => {
            if (p) {
              shiftAssignment.publicadores[i] = p;
              assignedCounts[p]++;
              assignedInThisShift[p] = true;
              if (!allowMultiple) weeklyAssignments[week][p] = true;
            }
          });
        }

        // 2. Determine Available Candidates for this shift
        // Start with globally available for the turn, or all persons if none specified
        let potentialCandidates = availability[key] ? [...availability[key]] : persons.map(p => p.name);

        // Filter out people already assigned IF multiple turns aren't allowed for the week
        const filterUnavailable = (name) => {
            // Already assigned in *this specific shift*? -> No
            if (assignedInThisShift[name]) return false;
            // Multiple turns per week not allowed AND already assigned this week? -> No
            if (!allowMultiple && weeklyAssignments[week][name]) return false;
            return true; // Otherwise, they are potentially available
        };

        potentialCandidates = potentialCandidates.filter(filterUnavailable);

        // 3. Assign Captain (if not fixed)
        if (!shiftAssignment.capitan) {
          const captainCandidates = potentialCandidates.filter(name => {
              const personObj = persons.find(p => p.name === name);
              return personObj && personObj.isCaptain;
          });

          const chosenCaptain = weightedRandomCandidate(captainCandidates, assignedCounts);
          if (chosenCaptain) {
            shiftAssignment.capitan = chosenCaptain;
            assignedCounts[chosenCaptain]++;
            assignedInThisShift[chosenCaptain] = true;
            if (!allowMultiple) weeklyAssignments[week][chosenCaptain] = true;
            // Remove chosen captain from potential publisher list for this shift
            potentialCandidates = potentialCandidates.filter(name => name !== chosenCaptain);
          } else {
            shiftAssignment.capitan = "Vacante"; // Or "Sin capitán disponible"
          }
        }

        // 4. Assign Publishers (for empty slots)
        for (let i = 0; i < 3; i++) {
          if (!shiftAssignment.publicadores[i]) {
            // Re-filter potential candidates based on current assignments *in this shift*
             const availablePublishers = potentialCandidates.filter(name => !assignedInThisShift[name] && (!(!allowMultiple && weeklyAssignments[week][name])));

            const chosenPublisher = weightedRandomCandidate(availablePublishers, assignedCounts);
            if (chosenPublisher) {
              shiftAssignment.publicadores[i] = chosenPublisher;
              assignedCounts[chosenPublisher]++;
              assignedInThisShift[chosenPublisher] = true;
              if (!allowMultiple) weeklyAssignments[week][chosenPublisher] = true;
               // Remove chosen publisher from potential list for the *next* slot in this shift
              potentialCandidates = potentialCandidates.filter(name => name !== chosenPublisher);
            } else {
              shiftAssignment.publicadores[i] = "Vacante"; // Or "Sin publicador disponible"
            }
          }
        }
        generatedSchedule.push(shiftAssignment);
      }); // End turnos loop
    }); // End weeksToProcess loop

    // 5. Duplicate for S3/S4 if turnos15 is checked
    if (turnos15) {
      const secondHalf = generatedSchedule.map(shift => {
          // Creates a new object, preserving original generatedSchedule
          return {
              ...shift, // Copy existing properties
              week: shift.week === "S1" ? "S3" : "S4" // Change the week
          };
      });
      generatedSchedule = generatedSchedule.concat(secondHalf);
    }

    // 6. Display the final schedule
    displaySchedule(generatedSchedule);
  }


  // Mapeo para los días/turnos con colores (Ejemplo, ajusta según tu style.css)
  const turnoMapping = {
    "MM": "day-lunes",       // Lunes
    "MT1": "day-martes-1",   // Martes Mañana
    "MT2": "day-martes-2",   // Martes Tarde
    "XT1": "day-miercoles-1",// Miércoles Mañana
    "XT2": "day-miercoles-2",// Miércoles Tarde
    "J": "day-jueves",       // Jueves
    "VT1": "day-viernes-1",  // Viernes Mañana
    "VT2": "day-viernes-2",  // Viernes Tarde
    "S": "day-sabado",       // Sábado
    "D": "day-domingo"       // Domingo
  };

  // Mapeo para las semanas con colores (Ejemplo)
  const weekMapping = {
    "S1": "week-s1",
    "S2": "week-s2",
    "S3": "week-s3",
    "S4": "week-s4"
  };

  function displaySchedule(scheduleData) {
    scheduleTableContainer.innerHTML = ""; // Clear previous table

    if (!scheduleData || scheduleData.length === 0) {
        scheduleTableContainer.textContent = "No hay datos de calendario para mostrar.";
        return;
    }

    const table = document.createElement("table");
    table.className = "schedule-table"; // For CSS styling

    // Create Table Header
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    ["Semana", "Turno", "Capitán", "Publicador 1", "Publicador 2", "Publicador 3"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });

    // Create Table Body
    const tbody = table.createTBody();
    scheduleData.forEach(item => {
      const row = tbody.insertRow();

      // Week Cell (with potential week-specific class)
      const cellWeek = row.insertCell();
      cellWeek.textContent = item.week;
      if (weekMapping[item.week]) {
        cellWeek.classList.add(weekMapping[item.week]);
      }

      // Turno Cell (with potential day/turno specific class)
      const cellTurno = row.insertCell();
      cellTurno.textContent = item.turno;
      const dayClass = turnoMapping[item.turno];
      if (dayClass) {
        cellTurno.classList.add(dayClass);
      }

      // Captain Cell (apply day class)
      const cellCap = row.insertCell();
      cellCap.textContent = item.capitan || "Vacante"; // Show Vacante if null/undefined
       if (dayClass) {
         cellCap.classList.add(dayClass);
       }


      // Publisher Cells (apply day class)
      item.publicadores.forEach(pub => {
        const cellPub = row.insertCell();
        cellPub.textContent = pub || "Vacante"; // Show Vacante if null/undefined
         if (dayClass) {
           cellPub.classList.add(dayClass);
         }
      });
    });

    scheduleTableContainer.appendChild(table);

    // Analyze assignments and display summary
    analyzeAssignments(scheduleData);

    // Add PDF Export Button (if not already present)
    if (!document.getElementById("btnExportPDF")) {
      const exportBtn = document.createElement("button");
      exportBtn.id = "btnExportPDF";
      exportBtn.textContent = "Exportar PDF";
      exportBtn.style.marginTop = "15px"; // Add some space
      exportBtn.style.padding = "8px 15px";
       // Insert after the table container but within the same section
      scheduleTableContainer.parentNode.insertBefore(exportBtn, scheduleTableContainer.nextSibling);

      exportBtn.addEventListener("click", () => {
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
            alert("Error: La librería jsPDF no está cargada. Asegúrate de incluirla en tu HTML.");
            console.error("jsPDF or jsPDF.jsPDF is undefined.");
            return;
        }
         // Check if autoTable plugin is loaded
         if (typeof window.jspdf.jsPDF.autoTable !== 'function') {
             alert("Error: El plugin jsPDF-AutoTable no está cargado correctamente.");
             console.error("jsPDF.autoTable is not a function.");
             return;
         }


        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
          orientation: "portrait", // portrait layout
          unit: "pt",             // points as units
          format: "a4"            // A4 paper size
        });

        doc.setFontSize(18);
        doc.text("Calendario de Turnos", 40, 50); // Title and position

        // Generate table using autoTable plugin
        doc.autoTable({
          html: ".schedule-table", // Use the table's class
          startY: 70, // Position below the title
          theme: 'grid', // 'striped', 'grid', 'plain'
          headStyles: {
            fillColor: [22, 160, 133], // Example header color (teal)
            textColor: [255, 255, 255], // White text
            halign: 'center'
          },
          styles: {
            fontSize: 9,
            cellPadding: 5,
          },
          columnStyles: { // Example: Center align 'Semana' and 'Turno'
            0: { halign: 'center' }, // Semana
            1: { halign: 'center' }  // Turno
          },
          didParseCell: function (data) {
            // Apply background colors based on CSS classes if style.css is loaded
            const cellElement = data.cell.raw; // The HTML TD/TH element
            if (cellElement && cellElement.classList) {
                try {
                    let fillColor = null;
                     // Check week classes first
                     Object.entries(weekMapping).forEach(([key, cls]) => {
                         if (cellElement.classList.contains(cls)) {
                             const style = getComputedStyle(cellElement);
                             fillColor = style.backgroundColor; // Get computed background color
                         }
                     });
                     // Check day classes (potentially override week color if more specific)
                     Object.entries(turnoMapping).forEach(([key, cls]) => {
                         if (cellElement.classList.contains(cls)) {
                             const style = getComputedStyle(cellElement);
                             fillColor = style.backgroundColor;
                         }
                     });

                     if (fillColor && fillColor !== 'rgba(0, 0, 0, 0)' && fillColor !== 'transparent') {
                        // Convert 'rgb(r, g, b)' to [r, g, b] array
                        const rgb = fillColor.match(/\d+/g);
                        if (rgb && rgb.length >= 3) {
                            data.cell.styles.fillColor = [parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])];
                        }
                     }
                } catch (e) {
                    console.warn("Could not apply cell style for PDF:", e);
                }
            }
          },
          // You can add more customizations here (margins, etc.)
        });

        // Save the PDF
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        doc.save(`calendario-turnos-${today}.pdf`);
      });
    }
  }


  // Función para analizar asignaciones y mostrar cuántos turnos tiene cada persona.
  function analyzeAssignments(scheduleData) {
    let counts = {};
    persons.forEach(p => {
      counts[p.name] = 0; // Initialize count for everyone
    });

    scheduleData.forEach(shift => {
      // Increment count if the person is assigned and not 'Vacante' or similar
      if (shift.capitan && persons.some(p => p.name === shift.capitan)) {
        counts[shift.capitan]++;
      }
      shift.publicadores.forEach(pub => {
        if (pub && persons.some(p => p.name === pub)) {
          counts[pub]++;
        }
      });
    });

    // Find or create the container for the analysis results
    let analysisContainer = document.getElementById("assignmentAnalysis");
    if (!analysisContainer) {
      analysisContainer = document.createElement("div");
      analysisContainer.id = "assignmentAnalysis";
      analysisContainer.style.marginTop = "20px";
      // Append it within the schedule section, after the PDF button if it exists
       const pdfButton = document.getElementById("btnExportPDF");
       if (pdfButton) {
           pdfButton.parentNode.insertBefore(analysisContainer, pdfButton.nextSibling);
       } else {
           scheduleTableContainer.parentNode.insertBefore(analysisContainer, scheduleTableContainer.nextSibling);
       }

    }
    analysisContainer.innerHTML = ""; // Clear previous results

    const heading = document.createElement("h3");
    heading.textContent = "Resumen de Asignaciones Generadas";
    analysisContainer.appendChild(heading);

    const list = document.createElement("ul");
    list.style.listStyleType = "none"; // Optional: remove bullet points
    list.style.paddingLeft = "0";     // Optional: remove default padding

    // Sort persons by name for consistent display order in the summary
    persons.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach(p => {
      const count = counts[p.name];
      const li = document.createElement("li");
      li.textContent = `${p.name}: ${count} turno(s)`;
      // Style based on count
      li.style.color = count === 0 ? "#e74c3c" : "#27ae60"; // Red if 0, Green otherwise
      li.style.marginBottom = "3px"; // Add a little spacing
      list.appendChild(li);
    });
    analysisContainer.appendChild(list);
  }

  // Asignar eventos a botones de almacenamiento.
  document.getElementById("btnSaveStorage").addEventListener("click", saveToLocalStorage);
  document.getElementById("btnLoadStorage").addEventListener("click", loadFromLocalStorage);

  // Initial setup calls after DOM is ready
  // populatePersonSelect(); // Already called after definition
  // populateAvailabilityList(); // Already called after definition

}); // End DOMContentLoaded
