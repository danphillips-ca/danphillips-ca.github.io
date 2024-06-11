document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('loadFileButton').addEventListener('click', loadFile);

let selectedFile = null;

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    if (dataParam) {
        const jsonData = urlSafeBase64Decode(dataParam);
        console.log(jsonData); // Add this line to log the decoded JSON data
        const bingoData = JSON.parse(jsonData);
        populateGameboard(bingoData);
    }
};


function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

function urlSafeBase64Encode(jsonObject) {
    const jsonString = JSON.stringify(jsonObject);
    const base64String = btoa(encodeURIComponent(jsonString));
    // Make the base64 string URL-safe
    const urlSafeBase64String = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return urlSafeBase64String;
}

function urlSafeBase64Decode(base64String) {
    // Reverse the URL-safe transformations
    const base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(atob(base64));
}

function handleFileSelect(event) {
    selectedFile = event.target.files[0];
}

function loadFile() {
    if (!selectedFile) {
        console.log("No file selected");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        processFileContent(content);
    };
    reader.readAsText(selectedFile);
}

function processFileContent(content) {
    const lines = content.split('\n');
    let bingoData = { fileName: "" };
    let currentSection = null;

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('# ')) {
            bingoData.fileName = line.substring(2).trim();
        } else if (line.startsWith('## ')) {
            currentSection = line.substring(3).trim();
            bingoData[currentSection] = [];
        } else if (line && currentSection) {
            bingoData[currentSection].push(line);
        }
    });

    const urlSafeBase64String = urlSafeBase64Encode(bingoData);

    displayShareableUrl(urlSafeBase64String);
    populateGameboard(bingoData);
}

function displayShareableUrl(encodedData) {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = `${baseUrl}?data=${encodedData}`;

    const urlContainer = document.getElementById('shareableUrlContainer');
    urlContainer.innerHTML = `
        <div class="input-group">
            <input type="text" class="form-control" value="${shareableUrl}" readonly>
            <button class="btn btn-outline-secondary" onclick="copyToClipboard('${shareableUrl}')">Copy URL</button>
        </div>
    `;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('URL copied to clipboard');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

function populateGameboard(bingoData) {
    console.log(bingoData); // Add this line to log the data used to populate the game board
    const container = document.getElementById('gameboardContainer');
    container.innerHTML = ''; // Clear previous content

    // Create main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'container col-lg-8 col-md-10 col-12';

    // Add filename as a centered header
    const fileNameHeader = document.createElement('h2');
    fileNameHeader.className = 'text-center my-4';
    fileNameHeader.textContent = bingoData.fileName;
    mainContainer.appendChild(fileNameHeader);

    // Collect column labels and data
    const labels = Object.keys(bingoData).filter(key => key !== 'fileName' && key !== 'Free');
    const freeValues = bingoData['Free'];
    const columnData = labels.map(label => shuffleArray(bingoData[label]));

    // Create grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'row g-3';

    // Create header row
    const headerRow = document.createElement('div');
    headerRow.className = 'row g-3 bingo-header';
    labels.forEach(label => {
        const headerCol = document.createElement('div');
        headerCol.className = 'col text-center';
        const headerCard = document.createElement('div');
        headerCard.className = 'card h-100';
        const headerCardBody = document.createElement('div');
        headerCardBody.className = 'card-body';
        headerCardBody.textContent = label;
        headerCard.appendChild(headerCardBody);
        headerCol.appendChild(headerCard);
        headerRow.appendChild(headerCol);
    });
    gridContainer.appendChild(headerRow);

    // Create rows for bingo tiles
    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        const row = document.createElement('div');
        row.className = 'row g-3';

        labels.forEach((label, colIndex) => {
            const col = document.createElement('div');
            col.className = 'col text-center';
            const card = document.createElement('div');
            card.className = 'card h-100';
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex align-items-center justify-content-center';

            if (rowIndex === 2 && colIndex === 2) {
                // Middle tile is a free space
                cardBody.className += ' bingo-tile-free';
                cardBody.textContent = freeValues[Math.floor(Math.random() * freeValues.length)];
            } else {
                // Regular bingo tile
                cardBody.className += ' bingo-tile';
                cardBody.textContent = columnData[colIndex][rowIndex];
            }

            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        });

        gridContainer.appendChild(row);
    }

    mainContainer.appendChild(gridContainer);
    container.appendChild(mainContainer);
}

function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
