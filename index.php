<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Duelo das Sombras</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

<div id="startScreen" class="start-screen">

    <div class="start-box">

        <div class="logo">⚔️</div>

        <h1>Duelo das Sombras</h1>

        <p>Entre no campo e enfrente o Mago Sombrio.</p>

        <label>Nome do personagem</label>

        <input
            type="text"
            id="playerNameInput"
            maxlength="16"
            placeholder="Digite seu nome"
        >

        <button onclick="startGame()">
            COMEÇAR DUELO
        </button>

    </div>

</div>


<div id="game" class="game hidden">

    <header>

        <div>
            <h1>⚔️ Duelo das Sombras</h1>

            <p id="phaseText">
                Seu turno
            </p>
        </div>

        <div class="turn-box">

            <span>TURNO</span>

            <strong id="turnNumber">1</strong>

        </div>

    </header>


    <!-- INIMIGO -->

    <section class="duelist">

        <div class="duelist-info">

            <div class="duelist-name">

                <div class="avatar enemy-avatar">
                    🧙‍♂️
                </div>

                <div>

                    <strong>
                        Mago Sombrio
                    </strong>

                    <small>
                        Duelista inimigo
                    </small>

                </div>

            </div>


            <div class="character-stats">

                <div class="stat">
                    ❤️
                    <strong id="enemyLife">4000</strong>
                </div>

                <div class="stat">
                    ⚔️
                    <strong>1500</strong>
                </div>

                <div class="stat">
                    🛡️
                    <strong>1200</strong>
                </div>

            </div>

        </div>


        <div class="hp-bar">

            <div
                id="enemyLifeBar"
                class="hp-fill"
            ></div>

        </div>


        <div class="field-label">
            CAMPO DO INIMIGO
        </div>


        <div
            id="enemyField"
            class="field"
        ></div>

    </section>


    <!-- MENSAGEM -->

    <div
        id="battleMessage"
        class="battle-message"
    >
        Prepare-se!
    </div>


    <!-- CONTROLES PERTO DA LUTA -->

    <div class="battle-controls">

        <button
            id="cardAttackButton"
            onclick="attackWithCard()"
        >
            ⚔️ ATAQUE DA CARTA
        </button>

        <button
            id="characterAttackButton"
            onclick="characterAttack()"
        >
            👊 ATAQUE DO PERSONAGEM
        </button>

        <button
            id="endTurnButton"
            onclick="endTurn()"
        >
            ⏭️ ENCERRAR TURNO
        </button>

    </div>


    <!-- JOGADOR -->

    <section class="duelist">

        <div class="field-label">
            SEU CAMPO
        </div>


        <div
            id="playerField"
            class="field"
        ></div>


        <div class="hp-bar">

            <div
                id="playerLifeBar"
                class="hp-fill"
            ></div>

        </div>


        <div class="duelist-info">

            <div class="duelist-name">

                <div class="avatar">
                    🧙
                </div>

                <div>

                    <strong id="playerNameDisplay">
                        Jogador
                    </strong>

                    <small>
                        Seu duelista
                    </small>

                </div>

            </div>


            <div class="character-stats">

                <div class="stat">
                    ❤️
                    <strong id="playerLife">
                        4000
                    </strong>
                </div>

                <div class="stat">
                    ⚔️
                    <strong>1500</strong>
                </div>

                <div class="stat">
                    🛡️
                    <strong>1200</strong>
                </div>

            </div>

        </div>

    </section>


    <!-- MÃO -->

    <section class="hand-area">

        <div class="hand-title">

            <h2>🃏 Sua mão</h2>

            <span>
                Clique numa carta para invocar
            </span>

        </div>


        <div
            id="hand"
            class="hand"
        ></div>

    </section>


    <div class="bottom-controls">

        <button onclick="drawCard()">
            🃏 COMPRAR CARTA
        </button>

        <button onclick="resetGame()">
            🔄 NOVO DUELO
        </button>

    </div>

</div>


<!-- TELA DE RESULTADO -->

<div
    id="resultScreen"
    class="result-screen hidden"
>

    <div class="result-box">

        <div id="resultIcon">
            🏆
        </div>

        <h1 id="resultTitle">
            VITÓRIA!
        </h1>

        <p id="resultText">
            Você venceu o duelo!
        </p>

        <button onclick="resetGame()">
            🔄 JOGAR NOVAMENTE
        </button>

    </div>

</div>


<!-- EFEITO DE ATAQUE -->

<div
    id="attackEffect"
    class="attack-effect hidden"
>

    <span id="attackEmoji">
        💥
    </span>

</div>


<script src="game.js"></script>

</body>
</html>