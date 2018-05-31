new Vue({
    el: '#app',
    data: {
        start: true,
        yourHealth: 100,
        monsterHealth: 100,
        actionLog: [],
        log: {
            PLAYER_ATTACK_ROW: 'PLAYER HITS MONSTER FOR ',
            MONSTER_ATTACK_ROW: 'MONSTER HITS PLAYER FOR ',
            HEAL_ROW: 'PLAYER HEALS HIMSELF FOR '
        }
    },
    methods: {
        onStartNewGame: function() {
            this.start = false;
            this.reset();
        },
        onGiveUp: function() {
            this.start = true;
        },
        reset: function() {
            this.yourHealth = 100;
            this.monsterHealth = 100;
            this.actionLog = [];
        },
        onAttack: function(special) {
            var monsterAttack = this.getRandom(5, 10),
                yourAttack = special ? this.getRandom(10, 20) : this.getRandom(5, 10),
                monsterDamage = this.monsterHealth - yourAttack,
                yourDamage = this.yourHealth - monsterAttack;
                
            this.monsterHealth = monsterDamage < 0 ? 0 : monsterDamage;
            this.yourHealth = yourDamage < 0 ? 0 : yourDamage;
            this.actionLog.unshift({
                text: this.log.MONSTER_ATTACK_ROW + monsterAttack,
                playerTurn: false
            });
            this.actionLog.unshift({
                text: this.log.PLAYER_ATTACK_ROW + yourAttack,
                playerTurn: true
            });
        },
        onHeal: function() {
            var monsterAttack = this.getRandom(5, 12),
                healthRecovered = 10,
                yourDamage = this.yourHealth - monsterAttack;

            this.yourHealth = yourDamage < 0 ? 0 : yourDamage;
            this.yourHealth = this.yourHealth + healthRecovered > 100 ? 100 : this.yourHealth + healthRecovered;
            this.actionLog.unshift({
                text: this.log.MONSTER_ATTACK_ROW + monsterAttack,
                playerTurn: false
            });
            this.actionLog.unshift({
                text: this.log.HEAL_ROW + healthRecovered,
                playerTurn: true
            });
        },
        getRandom: function(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        },
        onHealthChange: function(val) {
            console.log(val);
        }  
    },
    computed: {
        yourStyle: function() {
            return {
                width: this.yourHealth + '%'
            };
        },
        monsterStyle: function() {
            return {
                width: this.monsterHealth + '%'
            };
        }
    },
    watch: {
        yourHealth: function(val) {
            if(val === 0) {
                if(confirm('You lose :( New Game?')) {
                    this.start = false;
                    this.reset();
                } else {
                    this.start = true;
                }
            }
        },
        monsterHealth: function(val) {
            if(val === 0) {
                if(confirm('You win! New Game?')) {
                    this.start = false;
                    this.reset();
                } else {
                    this.start = true;
                }
            }
        }
    }
  });