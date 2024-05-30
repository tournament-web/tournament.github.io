document.addEventListener('DOMContentLoaded', () => {
    const adminPanelButton = document.getElementById('adminPanelButton');
    const paymentsPageButton = document.getElementById('paymentsPageButton');
    const adminPasswordPopup = document.getElementById('adminPasswordPopup');
    const adminPasswordSubmit = document.getElementById('adminPasswordSubmit');
    const adminPanelPage = document.getElementById('adminPanelPage');
    const newTournamentPopup = document.getElementById('newTournamentPopup');
    const joinTournamentPopup = document.getElementById('joinTournamentPopup');
    const blockUserPopup = document.getElementById('blockUserPopup');
    const changePasswordPopup = document.getElementById('changePasswordPopup');
    const updateRoomIdPasswordPopup = document.getElementById('updateRoomIdPasswordPopup');
    const paymentPage = document.getElementById('paymentPage');
    const homePage = document.getElementById('homePage');
    const tournamentList = document.getElementById('tournamentList');
    const paymentList = document.getElementById('paymentList');

    let tournaments = [];
    let users = [];
    let bannedUsers = [];

    // Show Admin Password Popup
    adminPanelButton.addEventListener('click', () => {
        adminPasswordPopup.style.display = 'flex';
    });

    // Validate Admin Password
    adminPasswordSubmit.addEventListener('click', () => {
        const password = document.getElementById('adminPassword').value;
        if (password === 'talib') {
            adminPasswordPopup.style.display = 'none';
            adminPanelPage.style.display = 'block';
        } else {
            alert('PASSWORD KEY 🔑 ADMIN ONLY');
        }
    });

    // Show Payments Page
    paymentsPageButton.addEventListener('click', () => {
        paymentPage.style.display = 'block';
        homePage.style.display = 'none';
    });

    // Show New Tournament Popup
    document.getElementById('newTournament').addEventListener('click', () => {
        newTournamentPopup.style.display = 'flex';
    });

    // Publish New Tournament
    document.getElementById('publishTournament').addEventListener('click', () => {
        const gameMode = document.getElementById('setGameMode').value;
        const minLevel = document.getElementById('setMinLevel').value;
        const maxLevel = document.getElementById('setMaxLevel').value;
        const mode = document.getElementById('setMode').value;
        const name = document.getElementById('setName').value;
        const price = document.getElementById('setPrice').value;
        const entryFeeSolo = document.getElementById('setEntryFeeSolo').value;
        const entryFeeDuo = document.getElementById('setEntryFeeDuo').value;
        const entryFeeSquad = document.getElementById('setEntryFeeSquad').value;
        const device = document.getElementById('setDevice').value;

        const newTournament = {
            gameMode,
            minLevel,
            maxLevel,
            mode,
            name,
            price,
            entryFee: {
                solo: entryFeeSolo,
                duo: entryFeeDuo,
                squad: entryFeeSquad
            },
            device,
            joinedUsers: []
        };

        tournaments.push(newTournament);
        updateTournamentList();
        newTournamentPopup.style.display = 'none';
    });

    // Update Tournament List
    function updateTournamentList() {
        tournamentList.innerHTML = '';
        tournaments.forEach((tournament, index) => {
            const tournamentItem = document.createElement('div');
            tournamentItem.innerHTML = `
                <h3>${tournament.name}</h3>
                <p>Mode: ${tournament.mode}</p>
                <p>Level: ${tournament.minLevel} - ${tournament.maxLevel}</p>
                <p>Entry Fee: Solo - ₹${tournament.entryFee.solo}, Duo - ₹${tournament.entryFee.duo}, Squad - ₹${tournament.entryFee.squad}</p>
                <p>Device: ${tournament.device}</p>
                <button class="joinButton" data-index="${index}">Join</button>
                <div id="roomIdPassword${index}">Room ID / Password will be given here</div>
            `;
            tournamentList.appendChild(tournamentItem);
        });
    }

    // Show Join Tournament Popup
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('joinButton')) {
            const index = event.target.getAttribute('data-index');
            joinTournamentPopup.style.display = 'flex';
            joinTournamentPopup.setAttribute('data-index', index);
        }
    });

    // Submit Join Tournament
    document.getElementById('joinTournamentSubmit').addEventListener('click', () => {
        const gameMode = document.getElementById('joinGameMode').value;
        const device = document.getElementById('joinDevice').value;
        const paymentMethod = document.getElementById('joinPaymentMethod').value;
        const index = joinTournamentPopup.getAttribute('data-index');

        const joinedUser = {
            gameMode,
            device,
            paymentMethod
        };

        if (gameMode === 'solo') {
            joinedUser.details = {
                gameName: document.getElementById('soloGameName').value,
                gameUID: document.getElementById('soloGameUID').value,
                level: document.getElementById('soloLevel').value
            };
        } else if (gameMode === 'duo') {
            joinedUser.details = {
                player1: {
                    gameName: document.getElementById('duoGameName1').value,
                    gameUID: document.getElementById('duoGameUID1').value,
                    level: document.getElementById('duoLevel1').value
                },
                player2: {
                    gameName: document.getElementById('duoGameName2').value,
                    gameUID: document.getElementById('duoGameUID2').value,
                    level: document.getElementById('duoLevel2').value
                }
            };
        } else if (gameMode === 'squad') {
            joinedUser.details = {
                player1: {
                    gameName: document.getElementById('squadGameName1').value,
                    gameUID: document.getElementById('squadGameUID1').value,
                    level: document.getElementById('squadLevel1').value
                },
                player2: {
                    gameName: document.getElementById('squadGameName2').value,
                    gameUID: document.getElementById('squadGameUID2').value,
                    level: document.getElementById('squadLevel2').value
                },
                player3: {
                    gameName: document.getElementById('squadGameName3').value,
                    gameUID: document.getElementById('squadGameUID3').value,
                    level: document.getElementById('squadLevel3').value
                },
                player4: {
                    gameName: document.getElementById('squadGameName4').value,
                    gameUID: document.getElementById('squadGameUID4').value,
                    level: document.getElementById('squadLevel4').value
                }
            };
        }

        tournaments[index].joinedUsers.push(joinedUser);
        joinTournamentPopup.style.display = 'none';
        updateTournamentList();
    });

    // Update Payment List
    function updatePaymentList() {
        paymentList.innerHTML = '';
        tournaments.forEach(tournament => {
            if (tournament.joinedUsers.length > 0) {
                tournament.joinedUsers.forEach(user => {
                    const paymentItem = document.createElement('div');
                    paymentItem.innerHTML = `
                        <h3>${tournament.name}</h3>
                        <p>${user.details.gameName ? user.details.gameName : 'Multiple Players'}</p>
                        <button class="confirmPayment">Confirm</button>
                        <button class="dismissPayment">Dismiss</button>
                    `;
                    paymentList.appendChild(paymentItem);
                });
            }
        });
    }

    // Show Block User Popup
    document.getElementById('blockUser').addEventListener('click', () => {
        blockUserPopup.style.display = 'flex';
    });

    // Block User
    document.getElementById('blockUserSubmit').addEventListener('click', () => {
        const username = document.getElementById('blockUsername').value;
        bannedUsers.push(username);
        updateBannedUsersList();
        blockUserPopup.style.display = 'none';
    });

    // Update Banned Users List
    function updateBannedUsersList() {
        const bannedUsersList = document.getElementById('bannedUsersList');
        bannedUsersList.innerHTML = bannedUsers.join(', ');
    }

    // Show Change Password Popup
    document.getElementById('changePassword').addEventListener('click', () => {
        changePasswordPopup.style.display = 'flex';
    });

    // Change Password
    // Similar logic to Block User

    // Show Update Room ID and Password Popup
    document.getElementById('updateRoomIdPassword').addEventListener('click', () => {
        updateRoomIdPasswordPopup.style.display = 'flex';
    });

    // Update Room ID and Password
    document.getElementById('updateRoomDetails').addEventListener('click', () => {
        const tournamentIndex = document.getElementById('chooseTournament').value;
        const roomId = document.getElementById('roomId').value;
        const roomPassword = document.getElementById('roomPassword').value;
        document.getElementById(`roomIdPassword${tournamentIndex}`).innerText = `Room ID: ${roomId}, Password: ${roomPassword}`;
        updateRoomIdPasswordPopup.style.display = 'none';
    });

    // Add event listeners and logic for remaining functionalities...
});
