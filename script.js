// Generate title, grid, and modals from a user-supplied CSV.
document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.type !== "text/csv") {
            showToast("Error", "Please select a CSV file.", "danger");
            return;
        }
        const fileNameWithoutExtension = file.name.replace('.csv', '');
        document.getElementById('file-name').textContent = `${fileNameWithoutExtension}`;
        console.log("File selected:", file); // Debug: check file selection
        window.selectedFile = file; // Store the selected file globally
        showToast("File Selected", `Selected File: ${fileNameWithoutExtension}`, "info");
    } else {
        showToast("Error", "Please select a CSV file.", "danger");
    }
}

function sanitizeCategoryName(category) {
    return category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function handleFile() {
    const file = window.selectedFile;
    if (file) {
        Papa.parse(file, {
            header: false, // CSV structure doesn't have a standard header
            complete: function(results) {
                console.log("Parsed CSV results:", results); // Debug: check parsed results
                const triviaData = parseCSVData(results.data);
                console.log("Trivia Data Array:", triviaData); // Debug: check trivia data array
                createGameBoard(triviaData, results.data[0]); // Create the entire game board including category labels and grid
                createModals(triviaData);
                showToast("File Loaded", "The file has been successfully loaded.", "success"); // Show toast notification when file is loaded
                closeAlertBox(); // Close the alert box
            },
            error: function(error) {
                console.error("Error parsing CSV file:", error);
                showToast("Error", "An error occurred while parsing the CSV file.", "danger");
            }
        });
    } else {
        showToast("Error", "Please select a CSV file.", "danger");
    }
}

function showToast(title, message, type) {
    const toastContainer = document.getElementById('toast-container');
    const toastId = `toast-${Date.now()}`;
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <strong>${title}:</strong> ${message}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);

    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

function parseCSVData(data) {
    const headers = data[0];
    const questionsAndAnswers = data.slice(1);

    const triviaData = [];

    for (let i = 0; i < questionsAndAnswers.length; i++) {
        const row = questionsAndAnswers[i];
        const id = row[0]; // First column in each row
        const value = parseInt(id.split('-')[0]);
        const isQuestion = id.endsWith('Q');
        const isQuestionMedia = id.endsWith('QM');
        const isAnswer = id.endsWith('A');
        const isAnswerMedia = id.endsWith('AM');

        headers.slice(1).forEach((category, index) => {
            if (isQuestion || isQuestionMedia || isAnswer || isAnswerMedia) {
                let existingEntry = triviaData.find(item => item.category === category && item.value === value);

                if (!existingEntry) {
                    existingEntry = { category: category, value: value };
                    triviaData.push(existingEntry);
                }

                if (isQuestion) {
                    existingEntry.question = row[index + 1];
                } else if (isQuestionMedia) {
                    existingEntry.questionMedia = row[index + 1];
                } else if (isAnswer) {
                    existingEntry.answer = row[index + 1];
                } else if (isAnswerMedia) {
                    existingEntry.answerMedia = row[index + 1];
                }
            }
        });
    }

    return triviaData.filter(item => item.question || item.answer || item.questionMedia || item.answerMedia);
}

function createGameBoard(triviaData, headers) {
    const gameBoardContainer = document.getElementById('game-board-container');
    gameBoardContainer.innerHTML = ''; // Clear existing game board

    // Create game board div
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('p-4', 'game-board', 'rounded');

    // Create category container
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('row', 'mb-4', 'mt-4', 'category-label');
    categoryContainer.id = 'category-container';
    createCategoryLabels(categoryContainer, headers);

    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.id = 'grid-container';
    createGrid(triviaData, gridContainer);

    // Append category and grid containers to game board
    gameBoard.appendChild(categoryContainer);
    gameBoard.appendChild(gridContainer);

    // Append game board to the main container
    gameBoardContainer.appendChild(gameBoard);
}

function createCategoryLabels(categoryContainer, headers) {
    headers.slice(1).forEach((category, index) => {
        const categoryCard = `
            <div class="col-3">
                <div class="card">
                    <div class="card-body" id="category${index + 1}">${category}</div>
                </div>
            </div>
        `;
        categoryContainer.innerHTML += categoryCard;
    });
}

function createGrid(triviaData, gridContainer) {
    const uniqueValues = [...new Set(triviaData.map(item => item.value))].sort((a, b) => a - b);
    const uniqueCategories = [...new Set(triviaData.map(item => item.category))];

    uniqueValues.forEach(value => {
        const row = document.createElement('div');
        row.classList.add('row', 'mb-4', 'mt-4');
        
        uniqueCategories.forEach((category, index) => {
            const sanitizedCategory = sanitizeCategoryName(category);
            console.log(`Creating card for category: ${sanitizedCategory}, value: ${value}`); // Debug
            const card = `
                <div class="col-3">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#${sanitizedCategory}-${value}" onclick="changeColor(this)">
                        <div class="card">
                            <div class="card-body">${value}</div>
                        </div>
                    </a>
                </div>
            `;
            row.innerHTML += card;
        });

        gridContainer.appendChild(row);
    });
}

function generateMediaHTML(media) {
    if (!media || media.trim() === '') return '';

    const mediaLower = media.toLowerCase();
    const isAudio = mediaLower.endsWith('.mp3') || mediaLower.endsWith('.wav');
    const isVideo = mediaLower.endsWith('.mp4') || mediaLower.endsWith('.webm');
    const isYouTube = mediaLower.includes('youtu.be') || mediaLower.includes('youtube.com') || mediaLower.includes('youtube.com/embed');

    if (isAudio) {
        return `<audio controls class="img-fluid" style="max-height: 500px;">
                    <source src="${media}" type="audio/${mediaLower.endsWith('.mp3') ? 'mpeg' : 'wav'}">
                    Your browser does not support the audio element.
                </audio>`;
    } else if (isVideo) {
        return `<video controls class="img-fluid" style="max-height: 500px;">
                    <source src="${media}" type="video/${mediaLower.endsWith('.mp4') ? 'mp4' : 'webm'}">
                    Your browser does not support the video tag.
                </video>`;
    } else if (isYouTube) {
        let videoId = null;
        if (media.includes('v=')) {
            videoId = media.split('v=')[1];
        } else if (media.includes('youtu.be/')) {
            videoId = media.split('youtu.be/')[1];
        } else if (media.includes('youtube.com/embed/')) {
            videoId = media.split('youtube.com/embed/')[1];
        }

        if (videoId) {
            const ampersandPosition = videoId.indexOf('&');
            const cleanVideoId = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
            return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${cleanVideoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="img-fluid" style="max-height: 500px;"></iframe>`;
        }
    } else {
        return `<img src="${media}" alt="Media" class="img-fluid" style="max-height: 500px;">`;
    }

    return '';
}



function createModals(triviaData) {
    const container = document.getElementById('modals-container');
    container.innerHTML = ''; // Clear existing modals

    triviaData.forEach(item => {
        const sanitizedCategory = sanitizeCategoryName(item.category);
        console.log(`Creating modal for category: ${sanitizedCategory}, value: ${item.value}`); // Debug

        if (item.question) {
            console.log(`Question media for ${sanitizedCategory}-${item.value}:`, item.questionMedia); // Log media
            const questionMediaHTML = item.questionMedia ? generateMediaHTML(item.questionMedia) : '';
            const questionModal = `
            <div class="modal fade" id="${sanitizedCategory}-${item.value}" tabindex="-1" aria-labelledby="trivia-question" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Question</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${item.question}</p>
                            ${questionMediaHTML}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${sanitizedCategory}-${item.value}A">Reveal Answer</button>
                        </div>
                    </div>
                </div>
            </div>`;

            container.innerHTML += questionModal;
        }

        if (item.answer) {
            console.log(`Answer media for ${sanitizedCategory}-${item.value}A:`, item.answerMedia); // Log media
            const answerMediaHTML = item.answerMedia ? generateMediaHTML(item.answerMedia) : '';
            const answerModal = `
            <div class="modal fade" id="${sanitizedCategory}-${item.value}A" tabindex="-1" aria-labelledby="trivia-answer" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Answer</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${item.answer}</p>
                            ${answerMediaHTML}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;

            container.innerHTML += answerModal;
        }
    });

    // Initialize Bootstrap modals after creation
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        new bootstrap.Modal(modal);
    });
}









// Close the alert box
function closeAlertBox() {
    const closeButton = document.querySelector('.alert .close');
    if (closeButton) {
        closeButton.click();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var closeButtons = document.querySelectorAll('.alert .close');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var alert = this.closest('.alert');
            alert.classList.add('fade');
            setTimeout(function() {
                alert.style.display = 'none';
                alert.classList.remove('fade'); // Remove fade class after hiding
            }, 500); // Fade out duration
        });
    });
});


// Change colour when question has been selected

function changeColor(element) {
    element.querySelector('.card-body').style.color = '#807A55';
}
