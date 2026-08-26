// ========================================
// ESTADO DO JOGO
// ========================================

let playerName = "";

let playerLife = 4000;
let enemyLife = 4000;

let turn = 1;

let playerField = [];
let enemyField = [];

let hand = [];

let busy = false;
let gameOver = false;

let playerHasAttacked = false;


// ========================================
// CARTAS
// ========================================

const cards = [

    {
        name: "Dragão de Cinzas",
        icon: "🐉",
        attack: 1800,
        defense: 1400,
        maxHp: 2500,
        description: "Dragão criado pelas chamas."
    },

    {
        name: "Lobo Trovejante",
        icon: "🐺",
        attack: 1500,
        defense: 1200,
        maxHp: 2200,
        description: "Uma fera carregada de energia."
    },

    {
        name: "Cavaleiro Sombrio",
        icon: "🗡️",
        attack: 1700,
        defense: 1400,
        maxHp: 2400,
        description: "Guerreiro das sombras."
    },

    {
        name: "Guardião da Floresta",
        icon: "🌳",
        attack: 1200,
        defense: 1800,
        maxHp: 2800,
        description: "Grande poder defensivo."
    },

    {
        name: "Fênix Flamejante",
        icon: "🔥",
        attack: 1800,
        defense: 1200,
        maxHp: 2200,
        description: "A criatura renascida do fogo."
    },

    {
        name: "Golem de Pedra",
        icon: "🗿",
        attack: 1100,
        defense: 2000,
        maxHp: 3000,
        description: "Quase impossível de derrubar."
    },

    {
        name: "Mago Arcano",
        icon: "🧙",
        attack: 1600,
        defense: 1100,
        maxHp: 2000,
        description: "Mestre da magia antiga."
    },

    {
        name: "Tigre Glacial",
        icon: "🐯",
        attack: 1500,
        defense: 1400,
        maxHp: 2200,
        description: "Uma fera do gelo."
    }

];


// ========================================
// INICIAR JOGO
// ========================================

function startGame() {

    const input =
        document.getElementById("playerNameInput");

    playerName =
        input.value.trim();

    if (!playerName) {

        alert(
            "Digite o nome do seu personagem."
        );

        return;
    }

    document.getElementById(
        "playerNameDisplay"
    ).textContent = playerName;

    document.getElementById(
        "startScreen"
    ).classList.add("hidden");

    document.getElementById(
        "game"
    ).classList.remove("hidden");

    newBattle();
}


// ========================================
// NOVA BATALHA
// ========================================

function newBattle() {

    playerLife = 4000;

    enemyLife = 4000;

    turn = 1;

    busy = false;

    gameOver = false;

    playerHasAttacked = false;

    playerField = [];

    enemyField = [];

    hand = [];


    // ------------------------------------
    // SUA MÃO INICIAL
    // ------------------------------------

    for (let i = 0; i < 5; i++) {

        hand.push(
            randomCard()
        );

    }


    // ------------------------------------
    // SUA CARTA INICIAL
    // ------------------------------------

    playerField.push(
        randomCard()
    );


    // ------------------------------------
    // APENAS UMA CARTA PARA O INIMIGO
    // ------------------------------------

    enemyField.push(
        randomCard()
    );


    updatePhase(
        "Seu turno"
    );


    message(
        "🔥 O duelo começou! É sua vez."
    );


    render();
}


// ========================================
// CARTA ALEATÓRIA
// ========================================

function randomCard() {

    const original =
        cards[
            Math.floor(
                Math.random() * cards.length
            )
        ];

    return {

        ...original,

        hp: original.maxHp

    };
}


// ========================================
// RENDER
// ========================================

function render() {

    renderHand();

    renderField(
        "playerField",
        playerField,
        "player"
    );

    renderField(
        "enemyField",
        enemyField,
        "enemy"
    );


    document.getElementById(
        "playerLife"
    ).textContent =
        Math.max(
            0,
            playerLife
        );


    document.getElementById(
        "enemyLife"
    ).textContent =
        Math.max(
            0,
            enemyLife
        );


    document.getElementById(
        "playerLifeBar"
    ).style.width =
        Math.max(
            0,
            playerLife / 4000 * 100
        ) + "%";


    document.getElementById(
        "enemyLifeBar"
    ).style.width =
        Math.max(
            0,
            enemyLife / 4000 * 100
        ) + "%";


    document.getElementById(
        "turnNumber"
    ).textContent =
        turn;


    updateButtons();
}


// ========================================
// RENDER DA MÃO
// ========================================

function renderHand() {

    const element =
        document.getElementById("hand");

    element.innerHTML =
        hand.map(
            (card, index) => {

                return createCard(
                    card,
                    index,
                    "hand"
                );

            }
        ).join("");
}


// ========================================
// RENDER DO CAMPO
// ========================================

function renderField(
    elementId,
    cardsArray,
    owner
) {

    const element =
        document.getElementById(
            elementId
        );

    element.innerHTML =
        cardsArray.map(
            (card, index) => {

                return createCard(
                    card,
                    index,
                    owner
                );

            }
        ).join("");
}


// ========================================
// CRIAR CARTA
// ========================================

function createCard(
    card,
    index,
    owner
) {

    let action = "";


    if (owner === "hand") {

        action =
            `onclick="summonCard(${index})"`;

    }


    const hpPercent =
        Math.max(
            0,
            card.hp / card.maxHp * 100
        );


    return `

        <div
            class="card"
            ${action}
        >

            <div class="card-name">
                ${card.name}
            </div>

            <div class="card-image">
                ${card.icon}
            </div>

            <div class="card-description">
                ${card.description}
            </div>

            <div class="card-stats">

                <span>
                    ⚔️ ${card.attack}
                </span>

                <span>
                    🛡️ ${card.defense}
                </span>

            </div>

            <div class="card-hp">

                <div
                    class="card-hp-fill"
                    style="width:${hpPercent}%"
                ></div>

            </div>

        </div>

    `;
}


// ========================================
// INVOCAR CARTA
// ========================================

function summonCard(index) {

    if (
        busy ||
        gameOver
    ) {
        return;
    }


    if (playerField.length >= 3) {

        message(
            "⚠️ Você já possui 3 cartas no campo."
        );

        return;
    }


    const card =
        hand[index];


    if (!card) {
        return;
    }


    playerField.push(card);

    hand.splice(
        index,
        1
    );


    message(
        "🃏 " +
        card.name +
        " foi invocado!"
    );


    render();
}


// ========================================
// COMPRAR CARTA
// ========================================

function drawCard() {

    if (
        busy ||
        gameOver
    ) {
        return;
    }


    if (hand.length >= 8) {

        message(
            "⚠️ Sua mão está cheia."
        );

        return;
    }


    hand.push(
        randomCard()
    );


    message(
        "🃏 Você comprou uma carta."
    );


    render();
}


// ========================================
// ATAQUE COM CARTA
// ========================================

function attackWithCard() {

    if (
        busy ||
        gameOver
    ) {
        return;
    }


    if (playerHasAttacked) {

        message(
            "⚠️ Você já atacou neste turno."
        );

        return;
    }


    if (playerField.length === 0) {

        message(
            "⚠️ Você não possui cartas."
        );

        return;
    }


    busy = true;

    playerHasAttacked = true;


    const attacker =
        playerField[0];


    message(
        "⚔️ " +
        attacker.name +
        " está atacando!"
    );


    render();


    const visual =
        document.querySelector(
            "#playerField .card"
        );


    if (visual) {

        visual.classList.add(
            "attacking-player"
        );

    }


    setTimeout(
        () => {

            // --------------------------------
            // ATAQUE DIRETO
            // --------------------------------

            if (enemyField.length === 0) {

                const damage =
                    Math.max(
                        500,
                        attacker.attack
                    );


                enemyLife -= damage;


                showEffect("💥");


                message(
                    "💥 Ataque direto! -" +
                    damage +
                    " HP!"
                );


                render();


                finishPlayerAction();

                return;
            }


            // --------------------------------
            // ATACA A PRIMEIRA CARTA
            // --------------------------------

            const defender =
                enemyField[0];


            const defenderVisual =
                document.querySelector(
                    "#enemyField .card"
                );


            if (defenderVisual) {

                defenderVisual.classList.add(
                    "damaged"
                );

            }


            // DANO MAIS CONTROLADO

            const damage =
                Math.max(
                    250,
                    attacker.attack -
                    Math.floor(
                        defender.defense * 0.30
                    )
                );


            defender.hp -= damage;


            showEffect("💥");


            if (defender.hp <= 0) {

                defender.hp = 0;


                message(
                    "💥 " +
                    attacker.name +
                    " derrotou " +
                    defender.name +
                    "!"
                );


                setTimeout(
                    () => {

                        enemyField.shift();

                        render();

                    },
                    400
                );

            }

            else {

                message(
                    "⚔️ " +
                    attacker.name +
                    " causou " +
                    damage +
                    " de dano!"
                );

            }


            render();


            finishPlayerAction();

        },
        700
    );
}


// ========================================
// FINAL DA AÇÃO DO JOGADOR
// ========================================

function finishPlayerAction() {

    if (checkWinner()) {
        return;
    }


    setTimeout(
        () => {

            busy = false;


            message(
                "⏭️ Ataque realizado. Você pode encerrar o turno."
            );


            render();

        },
        700
    );
}


// ========================================
// ATAQUE DO PERSONAGEM
// ========================================

function characterAttack() {

    if (
        busy ||
        gameOver
    ) {
        return;
    }


    if (playerHasAttacked) {

        message(
            "⚠️ Você já atacou neste turno."
        );

        return;
    }


    busy = true;

    playerHasAttacked = true;


    message(
        "👊 " +
        playerName +
        " atacou!"
    );


    setTimeout(
        () => {

            // ATAQUE DIRETO

            if (enemyField.length === 0) {

                enemyLife -= 500;

                showEffect("💥");


                message(
                    "👊 Ataque direto! -500 HP!"
                );

            }

            else {

                const target =
                    enemyField[0];


                target.hp -= 500;


                showEffect("💥");


                if (target.hp <= 0) {

                    target.hp = 0;


                    message(
                        "👊 " +
                        playerName +
                        " derrotou " +
                        target.name +
                        "!"
                    );


                    enemyField.shift();

                }

                else {

                    message(
                        "👊 Seu personagem causou 500 de dano!"
                    );

                }

            }


            render();


            if (!checkWinner()) {

                setTimeout(
                    () => {

                        busy = false;

                        render();

                    },
                    700
                );

            }

        },
        500
    );
}


// ========================================
// ENCERRAR TURNO
// ========================================

function endTurn() {

    if (
        busy ||
        gameOver
    ) {
        return;
    }


    busy = true;


    updatePhase(
        "Turno do inimigo"
    );


    message(
        "🤖 O inimigo está pensando..."
    );


    setTimeout(
        enemyTurn,
        800
    );
}


// ========================================
// TURNO DO INIMIGO
// ========================================

function enemyTurn() {

    if (gameOver) {
        return;
    }


    /*
       NOVA REGRA:

       O inimigo NÃO compra sempre.

       30% de chance de invocar.

       E nunca passa de 2 cartas.
    */

    const chance =
        Math.random();


    if (
        chance < 0.30 &&
        enemyField.length < 2
    ) {

        enemyField.push(
            randomCard()
        );


        render();


        message(
            "🤖 O inimigo invocou uma carta."
        );

    }

    else {

        message(
            "🤖 O inimigo não invocou nenhuma carta."
        );

    }


    setTimeout(
        enemyAttack,
        900
    );
}


// ========================================
// ATAQUE DO INIMIGO
// ========================================

function enemyAttack() {

    if (
        gameOver ||
        enemyField.length === 0
    ) {

        finishEnemyTurn();

        return;
    }


    const attacker =
        enemyField[0];


    message(
        "⚔️ " +
        attacker.name +
        " está atacando!"
    );


    const visual =
        document.querySelector(
            "#enemyField .card"
        );


    if (visual) {

        visual.classList.add(
            "attacking-enemy"
        );

    }


    setTimeout(
        () => {

            // ATAQUE DIRETO

            if (playerField.length === 0) {

                /*
                   INIMIGO AGORA CAUSA MENOS DANO
                */

                const damage =
                    Math.max(
                        250,
                        Math.floor(
                            attacker.attack * 0.45
                        )
                    );


                playerLife -= damage;


                showEffect("💥");


                message(
                    "💥 Ataque direto! -" +
                    damage +
                    " HP!"
                );


                render();


                finishEnemyTurn();

                return;
            }


            // ATACA SUA PRIMEIRA CARTA

            const defender =
                playerField[0];


            const defenderVisual =
                document.querySelector(
                    "#playerField .card"
                );


            if (defenderVisual) {

                defenderVisual.classList.add(
                    "damaged"
                );

            }


            /*
               DANO DO INIMIGO REDUZIDO
            */

            const damage =
                Math.max(
                    180,
                    Math.floor(
                        (
                            attacker.attack -
                            defender.defense * 0.25
                        ) * 0.65
                    )
                );


            defender.hp -= damage;


            showEffect("💥");


            if (defender.hp <= 0) {

                defender.hp = 0;


                message(
                    "💥 O inimigo derrotou " +
                    defender.name +
                    "!"
                );


                playerField.shift();

            }

            else {

                message(
                    "⚔️ O inimigo causou " +
                    damage +
                    " de dano!"
                );

            }


            render();


            finishEnemyTurn();

        },
        700
    );
}


// ========================================
// FINAL DO TURNO INIMIGO
// ========================================

function finishEnemyTurn() {

    if (checkWinner()) {
        return;
    }


    setTimeout(
        () => {

            turn++;

            playerHasAttacked = false;

            busy = false;


            updatePhase(
                "Seu turno"
            );


            message(
                "🔥 Seu turno começou!"
            );


            render();

        },
        900
    );
}


// ========================================
// BOTÕES
// ========================================

function updateButtons() {

    const cardButton =
        document.getElementById(
            "cardAttackButton"
        );

    const characterButton =
        document.getElementById(
            "characterAttackButton"
        );

    const endButton =
        document.getElementById(
            "endTurnButton"
        );


    cardButton.disabled =
        busy ||
        gameOver ||
        playerHasAttacked ||
        playerField.length === 0;


    characterButton.disabled =
        busy ||
        gameOver ||
        playerHasAttacked;


    endButton.disabled =
        busy ||
        gameOver;
}


// ========================================
// FASE
// ========================================

function updatePhase(text) {

    document.getElementById(
        "phaseText"
    ).textContent =
        text;
}


// ========================================
// MENSAGEM
// ========================================

function message(text) {

    document.getElementById(
        "battleMessage"
    ).textContent =
        text;
}


// ========================================
// EFEITO
// ========================================

function showEffect(emoji) {

    const effect =
        document.getElementById(
            "attackEffect"
        );

    const icon =
        document.getElementById(
            "attackEmoji"
        );


    icon.textContent =
        emoji;


    effect.classList.remove(
        "hidden"
    );


    setTimeout(
        () => {

            effect.classList.add(
                "hidden"
            );

        },
        600
    );
}


// ========================================
// VERIFICAR VENCEDOR
// ========================================

function checkWinner() {

    if (playerLife <= 0) {

        playerLife = 0;

        render();

        finishGame(false);

        return true;
    }


    if (enemyLife <= 0) {

        enemyLife = 0;

        render();

        finishGame(true);

        return true;
    }


    return false;
}


// ========================================
// FIM DA BATALHA
// ========================================

function finishGame(playerWon) {

    if (gameOver) {
        return;
    }


    gameOver = true;

    busy = false;


    const screen =
        document.getElementById(
            "resultScreen"
        );

    const icon =
        document.getElementById(
            "resultIcon"
        );

    const title =
        document.getElementById(
            "resultTitle"
        );

    const text =
        document.getElementById(
            "resultText"
        );


    if (playerWon) {

        icon.textContent = "🏆";

        title.textContent =
            "VITÓRIA!";

        text.textContent =
            playerName +
            " venceu o Mago Sombrio!";

    }

    else {

        icon.textContent = "💀";

        title.textContent =
            "DERROTA";

        text.textContent =
            "O Mago Sombrio venceu o duelo.";

    }


    screen.classList.remove(
        "hidden"
    );


    updateButtons();
}


// ========================================
// REINICIAR
// ========================================

function resetGame() {

    document.getElementById(
        "resultScreen"
    ).classList.add("hidden");

    document.getElementById(
        "game"
    ).classList.add("hidden");

    document.getElementById(
        "startScreen"
    ).classList.remove("hidden");

    document.getElementById(
        "playerNameInput"
    ).value = "";

    document.getElementById(
        "playerNameInput"
    ).focus();
}


// ========================================
// ENTER PARA COMEÇAR
// ========================================

document
    .getElementById(
        "playerNameInput"
    )
    .addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                startGame();

            }

        }
    );