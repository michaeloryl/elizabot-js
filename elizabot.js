exports.reply = function (r) {
    if (this.bot == null) {
        this.bot = new ElizaBot(false);
    }
    return this.bot.transform(r);
};

exports.start = function () {
    if (this.bot == null) {
        this.bot = new ElizaBot(false);
    }
    return this.bot.getInitial();
};

exports.bye = function () {
    if (this.bot == null) {
        this.bot = new ElizaBot(false);
    }
    return this.bot.getFinal();
};

function ElizaBot(noRandomFlag) {

    this.elizaInitials = [
        "How do you do.  Please tell me your problem.",
        "Please tell me what's been bothering you.",
        "Is something troubling you?",
        "Im here. Talk to me.",
        "Talk to me",
        "Top of the morning to you.",
        "Thanks for waking me up"
    ];

    this.elizaKeywords = [

        /*
         Array of
         ["<key>", <rank>, [
         ["<decomp>", [
         "<reasmb>",
         "<reasmb>",
         "<reasmb>"
         ]],
         ["<decomp>", [
         "<reasmb>",
         "<reasmb>",
         "<reasmb>"
         ]]
         ]]
         */

        ["xnone", 0, [
            ["*", [
                "What do you mean?",
                "Please go on.",
                "Can you repeat that please?",
                "What does that suggest to you?",
                "Do you feel strongly about discussing such things?",
                "That is interesting.  Please continue.",
                "Tell me more about that.",
                "Do go on.",
                "Please talk more about it",
                "Does talking about this bother you?",
                "Can you rephrase that?",
                "I see. Tell me more.",
                "Interesting. Is this something you are sorry about?",
                "Mmm hmmm. Is this is your favorite subject?",
                "Now we are getting somewhere. Explain more.",
                "I see. How does that make you feel?"
            ]]
        ]],
        ["sorry", 0, [
            ["*", [
                "Please don't apologize.",
                "Apologies are not necessary.",
                "I've told you that apologies are not required.",
                "It did not bother me.  Please continue.",
                "I have no feelings. Do continue.",
                "There is nothing to worry about"
            ]]
        ]],
        ["apologize", 0, [
            ["*", [
                "goto sorry"
            ]]
        ]],
        ["remember", 5, [
            ["* i remember *", [
                "Do you often think of (2)?",
                "Does thinking of (2) bring anything else to mind?",
                "What else do you recollect?",
                "Why do you remember (2) just now?",
                "What in the present situation reminds you of (2)?",
                "What is the connection between me and (2)?",
                "What else does (2) remind you of?"
            ]],
            ["* do you remember *", [
                "Did you think I would forget (2)?",
                "Why do you think I should recall (2) now?",
                "What about (2)?",
                "goto what",
                "You mentioned (2)?"
            ]],
            ["* you remember *", [
                "How could I forget (2)?",
                "What about (2) should I remember?",
                "goto you"
            ]]
        ]],
        ["forget", 5, [
            ["* i forget *", [
                "Can you think of why you might forget (2)?",
                "Why can't you remember (2)?",
                "How often do you think of (2)?",
                "Does it bother you to forget that?",
                "Could it be a mental block?",
                "Are you generally forgetful?",
                "Do you think you are suppressing (2)?"
            ]],
            ["* did you forget *", [
                "Why do you ask?",
                "Are you sure you told me?",
                "Would it bother you if I forgot (2)?",
                "Why should I recall (2) just now?",
                "goto what",
                "Tell me more about (2)."
            ]]
        ]],
        ["if", 3, [
            ["* if *", [
                "Do you think it's likely that (2)?",
                "Do you wish that (2)?",
                "What do you know about (2)?",
                "Really, if (2)?",
                "What would you do if (2)?",
                "But what are the chances that (2)?",
                "What does this speculation lead to?"
            ]]
        ]],
        ["dreamed", 4, [
            ["* i dreamed *", [
                "Really, (2)?",
                "Have you ever fantasized (2) while you were awake?",
                "Have you ever dreamed (2) before?",
                "goto dream"
            ]]
        ]],
        ["dream", 3, [
            ["*", [
                "What does that dream suggest to you?",
                "Do you dream often?",
                "What persons appear in your dreams?",
                "Do you believe that dreams have something to do with your problem?"
            ]]
        ]],
        ["perhaps", 0, [
            ["*", [
                "You don't seem quite certain.",
                "Why the uncertain tone?",
                "Can't you be more positive?",
                "You aren't sure?",
                "Don't you know?",
                "How likely, would you estimate?"
            ]]
        ]],
        ["name", 15, [
            ["*", [
                "I am not interested in names.",
                "OK, my name is bweezy. What do you need to know?",
                "I've told you before, I don't care about names -- please continue."
            ]]
        ]],
        ["deutsch", 0, [
            ["*", [
                "goto xforeign",
                "Sorry I do not sprechen sie deutsch",
                "I told you before, I don't understand German."
            ]]
        ]],
        ["francais", 0, [
            ["*", [
                "goto xforeign",
                "Why? Do you love to go to France?",
                "I told you before, I don't understand French."
            ]]
        ]],
        ["italiano", 0, [
            ["*", [
                "goto xforeign",
                "Have you been to Rome?",
                "I told you before, I don't understand Italian."
            ]]
        ]],
        ["espanol", 0, [
            ["*", [
                "goto xforeign",
                "Sorry I do not speak Spanish",
                "I told you before, I don't understand Spanish."
            ]]
        ]],
        ["xforeign", 0, [
            ["*", [
                "Say it in English."
            ]]
        ]],
        ["hello", 0, [
            ["*", [
                "How do you do.  Please state your problem.",
                "Hi.  What seems to be your problem?"
            ]]
        ]],
        ["school", 50, [
            ["*", [
                "Does school worry you?",
                "Do you like school?",
                "Why do you mention school?",
                "What do you think machines have to do with your problem?",
                "What about school worries you?"
            ]]
        ]],
        ["am", 0, [
            ["* am i *", [
                "Do you believe you are (2)?",
                "Would you want to be (2)?",
                "Do you wish I would tell you you are (2)?",
                "What would it mean if you were (2)?",
                "goto what"
            ]],
            ["* i am *", [
                "goto i"
            ]],
            ["*", [
                "Why do you say 'am'?",
                "I don't understand that."
            ]]
        ]],
        ["are", 0, [
            ["* are you *", [
                "Why are you interested in whether I am (2) or not?",
                "Would you prefer if I weren't (2)?",
                "Perhaps I am (2) in your fantasies.",
                "Do you sometimes think I am (2)?",
                "goto what",
                "Would it matter to you?",
                "What if I were (2)?"
            ]],
            ["* you are *", [
                "goto you"
            ]],
            ["* are *", [
                "Did you think they might not be (2)?",
                "Would you like it if they were not (2)?",
                "What if they were not (2)?",
                "Are they always (2)?",
                "Possibly they are (2).",
                "Are you positive they are (2)?"
            ]]
        ]],
        ["your", 0, [
            ["* your *", [
                "Why are you concerned over my (2)?",
                "What about your own (2)?",
                "Are you worried about someone else's (2)?",
                "Really, my (2)?",
                "What makes you think of my (2)?",
                "Do you want my (2)?"
            ]]
        ]],
        ["was", 2, [
            ["* was i *", [
                "What if you were (2)?",
                "Do you think you were (2)?",
                "Were you (2)?",
                "What would it mean if you were (2)?",
                "What does ' (2) ' suggest to you?",
                "goto what"
            ]],
            ["* i was *", [
                "Were you really?",
                "Why do you tell me you were (2) now?",
                "Perhaps I already know you were (2)."
            ]],
            ["* was you *", [
                "Would you like to believe I was (2)?",
                "What suggests that I was (2)?",
                "What do you think?",
                "Perhaps I was (2).",
                "What if I had been (2)?"
            ]]
        ]],
        ["i", 0, [
            ["* i @desire *", [
                "What would it mean to you if you got (3)?",
                "Why do you want (3)?",
                "Suppose you got (3) soon.",
                "What if you never got (3)?",
                "What would getting (3) mean to you?",
                "What does wanting (3) have to do with this discussion?"
            ]],
            ["* i am* @sad *", [
                "I am sorry to hear that you are (3).",
                "Do you think coming here will help you not to be (3)?",
                "I'm sure it's not pleasant to be (3).",
                "Can you explain what made you (3)?"
            ]],
            ["* i am* @happy *", [
                "How have I helped you to be (3)?",
                "Has your treatment made you (3)?",
                "What makes you (3) just now?",
                "Can you explain why you are suddenly (3)?"
            ]],
            ["* i was *", [
                "goto was"
            ]],
            ["* i @belief i *", [
                "Do you really think so?",
                "But you are not sure you (3).",
                "Do you really doubt you (3)?"
            ]],
            ["* i* @belief *you *", [
                "goto you"
            ]],
            ["* i am *", [
                "Is it because you are (2) that you came to me?",
                "How long have you been (2)?",
                "Do you believe it is normal to be (2)?",
                "Do you enjoy being (2)?",
                "Do you know anyone else who is (2)?",
                "Are you (2) because of your parents?",
                "Are your friends (2) too?",
                "Is your spouse (2) too?"
            ]],
            ["* i @cannot *", [
                "How do you know that you can't (3)?",
                "Have you tried?",
                "Perhaps you could (3) now.",
                "Do you really want to be able to (3)?",
                "What if you could (3)?"
            ]],
            ["* i don't *", [
                "Don't you really (2)?",
                "Why don't you (2)?",
                "Do you wish to be able to (2)?",
                "Does that trouble you?"
            ]],
            ["* i feel *", [
                "Tell me more about such feelings.",
                "Do you often feel (2)?",
                "Do you enjoy feeling (2)?",
                "Of what does feeling (2) remind you?"
            ]],
            ["* i * you *", [
                "Perhaps in your fantasies we (2) each other.",
                "Do you wish to (2) me?",
                "You seem to need to (2) me.",
                "Do you (2) anyone else?"
            ]],
            ["*", [
                "You say (1)?",
                "Can you elaborate on that?",
                "Do you say (1) for some special reason?",
                "(1). Really?",
                "When did you first think about (1)"
            ]]
        ]],
        ["you", 0, [
            ["* you remind me of *", [
                "goto alike"
            ]],
            ["* you are *", [
                "What makes you think I am (2)?",
                "Does it please you to believe I am (2)?",
                "Do you sometimes wish you were (2)?",
                "Perhaps you would like to be (2)."
            ]],
            ["* you* me *", [
                "Why do you think I (2) you?",
                "You like to think I (2) you -- don't you?",
                "What makes you think I (2) you?",
                "Really, I (2) you?",
                "Do you wish to believe I (2) you?",
                "Suppose I did (2) you -- what would that mean?",
                "Does someone else believe I (2) you?"
            ]],
            ["* you *", [
                "We were discussing you -- not me.",
                "Oh, I (2)?",
                "You're not really talking about me -- are you?",
                "What are your feelings now?"
            ]]
        ]],
        ["yes", 0, [
            ["*", [
                "You seem to be quite positive.",
                "You are sure.",
                "I see.",
                "I understand."
            ]]
        ]],
        ["no", 0, [
            ["* no one *", [
                "Are you sure, no one (2)?",
                "Surely someone (2) .",
                "Can you think of anyone at all?",
                "Are you thinking of a very special person?",
                "Who, may I ask?",
                "You have a particular person in mind, don't you?",
                "Who do you think you are talking about?"
            ]],
            ["*", [
                "Are you saying no just to be negative?",
                "You are being a bit negative.",
                "Why not?",
                "Why 'no'?"
            ]]
        ]],
        ["my", 2, [
            ["$ * my *", [
                "Does that have anything to do with the fact that your (2)?",
                "Lets discuss further why your (2).",
                "Earlier you said your (2).",
                "But your (2)."
            ]],
            ["* my* @family *", [
                "Tell me more about your family.",
                "Who else in your family (4)?",
                "Your (3)?",
                "What else comes to your mind when you think of your (3)?"
            ]],
            ["* my *", [
                "Your (2)?",
                "Why do you say your (2)?",
                "Do you like your (2) ",
                "Do you have more than 1 (2)?",
                "Does that suggest anything else which belongs to you?",
                "Is it important to you that you have your (2)?"
            ]]
        ]],
        ["can", 0, [
            ["* can you *", [
                "You believe I can (2) don't you?",
                "goto what",
                "You want me to be able to (2).",
                "Perhaps you would like to be able to (2) yourself."
            ]],
            ["* can i *", [
                "Whether or not you can (2) depends on you more than on me.",
                "Do you want to be able to (2)?",
                "Perhaps you don't want to (2).",
                "goto what"
            ]]
        ]],
        ["what", 0, [
            ["*", [
                "Why do you ask?",
                "Does that question interest you?",
                "What is it you really want to know?",
                "Are such questions much on your mind?",
                "What answer would please you most?",
                "What do you think?",
                "What comes to mind when you ask that?",
                "Have you asked such questions before?",
                "Have you asked anyone else?"
            ]]
        ]],
        ["who", 0, [
            ["who *", [
                "goto what"
            ]]
        ]],
        ["when", 0, [
            ["when *", [
                "goto what"
            ]]
        ]],
        ["where", 0, [
            ["where *", [
                "goto what"
            ]]
        ]],
        ["how", 0, [
            ["how *", [
                "goto what"
            ]]
        ]],
        ["because", 0, [
            ["*", [
                "Is that the real reason?",
                "Don't any other reasons come to mind?",
                "Does that reason seem to explain anything else?",
                "What other reasons might there be?"
            ]]
        ]],
        ["why", 0, [
            ["* why don't you *", [
                "Do you believe I don't (2)?",
                "Perhaps I will (2) in good time.",
                "Should you (2) yourself?",
                "You want me to (2)?",
                "goto what"
            ]],
            ["* why can't i *", [
                "Do you think you should be able to (2)?",
                "Do you want to be able to (2)?",
                "Do you believe this will help you to (2)?",
                "Have you any idea why you can't (2)?",
                "goto what"
            ]],
            ["*", [
                "goto what"
            ]]
        ]],
        ["everyone", 2, [
            ["* @everyone *", [
                "Really, (2)?",
                "Surely not (2).",
                "Can you think of anyone in particular?",
                "Who, for example?",
                "Are you thinking of a very special person?",
                "Who, may I ask?",
                "Someone special perhaps?",
                "You have a particular person in mind, don't you?",
                "Who do you think you're talking about?"
            ]]
        ]],
        ["everybody", 2, [
            ["*", [
                "goto everyone"
            ]]
        ]],
        ["nobody", 2, [
            ["*", [
                "goto everyone"
            ]]
        ]],
        ["noone", 2, [
            ["*", [
                "goto everyone"
            ]]
        ]],
        ["always", 1, [
            ["*", [
                "Can you think of a specific example?",
                "When?",
                "What incident are you thinking of?",
                "Really, always?"
            ]]
        ]],
        ["alike", 10, [
            ["*", [
                "In what way?",
                "What resemblence do you see?",
                "What does that similarity suggest to you?",
                "What other connections do you see?",
                "What do you suppose that resemblence means?",
                "What is the connection, do you suppose?",
                "Could there really be some connection?",
                "How?"
            ]]
        ]],
        ["like", 10, [
            ["* @be *like *", [
                "goto alike"
            ]]
        ]],
        ["different", 0, [
            ["*", [
                "How is it different?",
                "What differences do you see?",
                "What does that difference suggest to you?",
                "What other distinctions do you see?",
                "What do you suppose that disparity means?",
                "Could there be some connection, do you suppose?",
                "How?"
            ]]
        ]]

    ];

    this.elizaPostTransforms = [
        / old old/g, " old",
        /\bthey were( not)? me\b/g, "it was$1 me",
        /\bthey are( not)? me\b/g, "it is$1 me",
        /Are they( always)? me\b/, "it is$1 me",
        /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2?",
        /\bI to have (\w+)/, "I have $1",
        /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
    ];

    this.elizaFinals = [
        "Goodbye.  It was nice talking to you.",
        // additions (not original)
        "Goodbye.  This was really a nice talk.",
        "Goodbye.  I'm looking forward to our next session.",
        "This was a good session, wasn't it -- but time is over now.  Goodbye.",
        "Maybe we could discuss this moreover in our next session?  Goodbye."
    ];

    this.elizaQuits = [
        "bye",
        "goodbye",
        "done",
        "exit",
        "quit"
    ];

    this.elizaPres = [
        "dont", "don't",
        "cant", "can't",
        "wont", "won't",
        "recollect", "remember",
        "recall", "remember",
        "dreamt", "dreamed",
        "dreams", "dream",
        "maybe", "perhaps",
        "certainly", "yes",
        "machine", "computer",
        "machines", "computer",
        "computers", "computer",
        "were", "was",
        "you're", "you are",
        "i'm", "i am",
        "same", "alike",
        "identical", "alike",
        "equivalent", "alike"
    ];

    this.elizaPosts = [
        "am", "are",
        "your", "my",
        "me", "you",
        "myself", "yourself",
        "yourself", "myself",
        "i", "you",
        "you", "I",
        "my", "your",
        "i'm", "you're",
        "us", "you"
    ];

    this.elizaSynons = {
        "be": ["am", "is", "are", "was"],
        "belief": ["feel", "think", "believe", "wish", "guess", "suppose"],
        "cannot": ["can't"],
        "desire": ["want", "need"],
        "everyone": ["everybody", "nobody", "noone"],
        "family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child", "uncle", "aunt", "son", "daughter"],
        "happy": ["elated", "glad", "better", "glad"],
        "sad": ["unhappy", "depressed", "sick"]
    };

    this.noRandom = (noRandomFlag) ? true : false;
    this.capitalizeFirstLetter = true;
    this.debug = false;
    this.memSize = 20;
    this.version = "1.1 (original)";

    this._dataParsed = false;
    if (!this._dataParsed) {
        this._init();
        this._dataParsed = true;
    }
    this.reset();
}

ElizaBot.prototype.reset = function () {
    this.quit = false;
    this.mem = [];
    this.lastchoice = [];

    for (var k = 0; k < this.elizaKeywords.length; k++) {
        this.lastchoice[k] = [];
        var rules = this.elizaKeywords[k][2];
        for (var i = 0; i < rules.length; i++) this.lastchoice[k][i] = -1;
    }
};

ElizaBot.prototype._init = function () {
    // parse data and convert it from canonical form to internal use
    // prodoce synonym list
    var synPatterns = {};

    if ((this.elizaSynons) && (typeof this.elizaSynons == 'object')) {
        for (var i in this.elizaSynons) {
            synPatterns[i] = '(' + i + '|' + this.elizaSynons[i].join('|') + ')';
        }
    }
    // check for keywords or install empty structure to prevent any errors
    if ((!this.elizaKeywords) || (typeof this.elizaKeywords.length == 'undefined')) {
        this.elizaKeywords = [
            ['###', 0, [
                ['###', []]
            ]]
        ];
    }
    // 1st convert rules to regexps
    // expand synonyms and insert asterisk expressions for backtracking
    var sre = /@(\S+)/;
    var are = /(\S)\s*\*\s*(\S)/;
    var are1 = /^\s*\*\s*(\S)/;
    var are2 = /(\S)\s*\*\s*$/;
    var are3 = /^\s*\*\s*$/;
    var wsre = /\s+/g;
    for (var k = 0; k < this.elizaKeywords.length; k++) {
        var rules = this.elizaKeywords[k][2];
        this.elizaKeywords[k][3] = k; // save original index for sorting
        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            // check mem flag and store it as decomp's element 2
            if (r[0].charAt(0) == '$') {
                var ofs = 1;
                while (r[0].charAt[ofs] == ' ') ofs++;
                r[0] = r[0].substring(ofs);
                r[2] = true;
            }
            else {
                r[2] = false;
            }
            // expand synonyms (v.1.1: work around lambda function)
            var m = sre.exec(r[0]);
            while (m) {
                var sp = (synPatterns[m[1]]) ? synPatterns[m[1]] : m[1];
                r[0] = r[0].substring(0, m.index) + sp + r[0].substring(m.index + m[0].length);
                m = sre.exec(r[0]);
            }
            // expand asterisk expressions (v.1.1: work around lambda function)
            if (are3.test(r[0])) {
                r[0] = '\\s*(.*)\\s*';
            }
            else {
                m = are.exec(r[0]);
                if (m) {
                    var lp = '';
                    var rp = r[0];
                    while (m) {
                        lp += rp.substring(0, m.index + 1);
                        if (m[1] != ')') lp += '\\b';
                        lp += '\\s*(.*)\\s*';
                        if ((m[2] != '(') && (m[2] != '\\')) lp += '\\b';
                        lp += m[2];
                        rp = rp.substring(m.index + m[0].length);
                        m = are.exec(rp);
                    }
                    r[0] = lp + rp;
                }
                m = are1.exec(r[0]);
                if (m) {
                    var lp = '\\s*(.*)\\s*';
                    if ((m[1] != ')') && (m[1] != '\\')) lp += '\\b';
                    r[0] = lp + r[0].substring(m.index - 1 + m[0].length);
                }
                m = are2.exec(r[0]);
                if (m) {
                    var lp = r[0].substring(0, m.index + 1);
                    if (m[1] != '(') lp += '\\b';
                    r[0] = lp + '\\s*(.*)\\s*';
                }
            }
            // expand white space
            r[0] = r[0].replace(wsre, '\\s+');
            wsre.lastIndex = 0;
        }
    }
    // now sort keywords by rank (highest first)
    this.elizaKeywords.sort(this._sortKeywords);
    // and compose regexps and refs for pres and posts
    ElizaBot.prototype.pres = {};
    ElizaBot.prototype.posts = {};

    if ((this.elizaPres) && (this.elizaPres.length)) {
        var a = [];
        for (var i = 0; i < this.elizaPres.length; i += 2) {
            a.push(this.elizaPres[i]);
            ElizaBot.prototype.pres[this.elizaPres[i]] = this.elizaPres[i + 1];
        }
        ElizaBot.prototype.preExp = new RegExp('\\b(' + a.join('|') + ')\\b');
    }
    else {
        // default (should not match)
        ElizaBot.prototype.preExp = /####/;
        ElizaBot.prototype.pres['####'] = '####';
    }

    if ((this.elizaPosts) && (this.elizaPosts.length)) {
        var a = [];
        for (var i = 0; i < this.elizaPosts.length; i += 2) {
            a.push(this.elizaPosts[i]);
            ElizaBot.prototype.posts[this.elizaPosts[i]] = this.elizaPosts[i + 1];
        }
        ElizaBot.prototype.postExp = new RegExp('\\b(' + a.join('|') + ')\\b');
    }
    else {
        // default (should not match)
        ElizaBot.prototype.postExp = /####/;
        ElizaBot.prototype.posts['####'] = '####';
    }
    // check for elizaQuits and install default if missing
    if ((!this.elizaQuits) || (typeof this.elizaQuits.length == 'undefined')) {
        this.elizaQuits = [];
    }
    // done
    ElizaBot.prototype._dataParsed = true;
};

ElizaBot.prototype._sortKeywords = function (a, b) {
    // sort by rank
    if (a[1] > b[1]) return -1;
    else if (a[1] < b[1]) return 1;
    // or original index
    else if (a[3] > b[3]) return 1;
    else if (a[3] < b[3]) return -1;
    else return 0;
};

ElizaBot.prototype.transform = function (text) {
    var rpl = '';
    // unify text string
    text = text.toLowerCase();
    text = text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ');
    text = text.replace(/\s+-+\s+/g, '.');
    text = text.replace(/\s*[,\.\?!;]+\s*/g, '.');
    text = text.replace(/\s*\bbut\b\s*/g, '.');
    text = text.replace(/\s{2,}/g, ' ');
    // split text in part sentences and loop through them
    var parts = text.split('.');
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part != '') {
            // check for quit expression
            for (var q = 0; q < this.elizaQuits.length; q++) {
                if (this.elizaQuits[q] == part) {
                    return this.getFinal();
                }
            }
            // preprocess (v.1.1: work around lambda function)
            var m = this.preExp.exec(part);
            if (m) {
                var lp = '';
                var rp = part;
                while (m) {
                    lp += rp.substring(0, m.index) + this.pres[m[1]];
                    rp = rp.substring(m.index + m[0].length);
                    m = this.preExp.exec(rp);
                }
                part = lp + rp;
            }
            this.sentence = part;
            // loop trough keywords
            for (var k = 0; k < this.elizaKeywords.length; k++) {
                if (part.search(new RegExp('\\b' + this.elizaKeywords[k][0] + '\\b', 'i')) >= 0) {
                    rpl = this._execRule(k);
                }
                if (rpl != '') return rpl;
            }
        }
    }
    // nothing matched try mem
    rpl = this._memGet();
    // if nothing in mem, so try xnone
    if (rpl == '') {
        this.sentence = ' ';
        var k = this._getRuleIndexByKey('xnone');
        if (k >= 0) rpl = this._execRule(k);
    }
    // return reply or default string
    return (rpl != '') ? rpl : 'I am at a loss for words.';
};

ElizaBot.prototype._execRule = function (k) {
    var rule = this.elizaKeywords[k];
    var decomps = rule[2];
    var paramre = /\(([0-9]+)\)/;
    for (var i = 0; i < decomps.length; i++) {
        var m = this.sentence.match(decomps[i][0]);
        if (m != null) {
            var reasmbs = decomps[i][1];
            var memflag = decomps[i][2];
            var ri = (this.noRandom) ? 0 : Math.floor(Math.random() * reasmbs.length);
            if (((this.noRandom) && (this.lastchoice[k][i] > ri)) || (this.lastchoice[k][i] == ri)) {
                ri = ++this.lastchoice[k][i];
                if (ri >= reasmbs.length) {
                    ri = 0;
                    this.lastchoice[k][i] = -1;
                }
            }
            else {
                this.lastchoice[k][i] = ri;
            }
            var rpl = reasmbs[ri];
            if (this.debug) alert('match:\nkey: ' + this.elizaKeywords[k][0] +
                '\nrank: ' + this.elizaKeywords[k][1] +
                '\ndecomp: ' + decomps[i][0] +
                '\nreasmb: ' + rpl +
                '\nmemflag: ' + memflag);
            if (rpl.search('^goto ', 'i') == 0) {
                var ki = this._getRuleIndexByKey(rpl.substring(5));
                if (ki >= 0) return this._execRule(ki);
            }
            // substitute positional params (v.1.1: work around lambda function)
            var m1 = paramre.exec(rpl);
            if (m1) {
                var lp = '';
                var rp = rpl;
                while (m1) {
                    var param = m[parseInt(m1[1])];
                    // postprocess param
                    var m2 = this.postExp.exec(param);
                    if (m2) {
                        var lp2 = '';
                        var rp2 = param;
                        while (m2) {
                            lp2 += rp2.substring(0, m2.index) + this.posts[m2[1]];
                            rp2 = rp2.substring(m2.index + m2[0].length);
                            m2 = this.postExp.exec(rp2);
                        }
                        param = lp2 + rp2;
                    }
                    lp += rp.substring(0, m1.index) + param;
                    rp = rp.substring(m1.index + m1[0].length);
                    m1 = paramre.exec(rp);
                }
                rpl = lp + rp;
            }
            rpl = this._postTransform(rpl);
            if (memflag) {
                this._memSave(rpl);
            }
            else {
                return rpl;
            }
        }
    }
    return '';
};

ElizaBot.prototype._postTransform = function (s) {
    // final cleanings
    s = s.replace(/\s{2,}/g, ' ');
    s = s.replace(/\s+\./g, '.');
    if ((this.elizaPostTransforms) && (this.elizaPostTransforms.length)) {
        for (var i = 0; i < this.elizaPostTransforms.length; i += 2) {
            s = s.replace(this.elizaPostTransforms[i], this.elizaPostTransforms[i + 1]);
            this.elizaPostTransforms[i].lastIndex = 0;
        }
    }
    // capitalize first char (v.1.1: work around lambda function)
    if (this.capitalizeFirstLetter) {
        var re = /^([a-z])/;
        var m = re.exec(s);
        if (m) s = m[0].toUpperCase() + s.substring(1);
    }
    return s;
};

ElizaBot.prototype._getRuleIndexByKey = function (key) {
    for (var k = 0; k < this.elizaKeywords.length; k++) {
        if (this.elizaKeywords[k][0] == key) return k;
    }
    return -1;
};

ElizaBot.prototype._memSave = function (t) {
    this.mem.push(t);
    if (this.mem.length > this.memSize) this.mem.shift();
};

ElizaBot.prototype._memGet = function () {
    if (this.mem.length) {
        if (this.noRandom) return this.mem.shift();
        else {
            var n = Math.floor(Math.random() * this.mem.length);
            var rpl = this.mem[n];
            for (var i = n + 1; i < this.mem.length; i++) this.mem[i - 1] = this.mem[i];
            this.mem.length--;
            return rpl;
        }
    }
    else return '';
};

ElizaBot.prototype.getFinal = function () {

    if (!this.elizaFinals) return '';
    return this.elizaFinals[Math.floor(Math.random() * this.elizaFinals.length)];
};

ElizaBot.prototype.getInitial = function () {
    if (!this.elizaInitials) return '';
    return this.elizaInitials[Math.floor(Math.random() * this.elizaInitials.length)];
};

// fix array.prototype methods (push, shift) if not implemented (MSIE fix)
if (typeof Array.prototype.push == 'undefined') {
    Array.prototype.push = function (v) {
        return this[this.length] = v;
    };
}

if (typeof Array.prototype.shift == 'undefined') {
    Array.prototype.shift = function () {
        if (this.length == 0) return null;
        var e0 = this[0];
        for (var i = 1; i < this.length; i++) this[i - 1] = this[i];
        this.length--;
        return e0;
    };
}