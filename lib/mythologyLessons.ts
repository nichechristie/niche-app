import { MythologyLesson } from "@/types/mythology";

export const mythologyLessons: MythologyLesson[] = [
  {
    id: "myth-1",
    title: "Greek Gods and the Olympians",
    description: "Explore the pantheon of Greek gods and their domains",
    culture: "Greek",
    content: `The ancient Greeks believed in a powerful pantheon of gods who ruled from Mount Olympus. These deities controlled various aspects of nature and human life.

**The Twelve Olympians:**

**Zeus** - King of the gods, ruler of the sky and thunder. He wielded the mighty thunderbolt and was known for his authority over both gods and mortals.

**Hera** - Queen of the gods, goddess of marriage and family. Wife of Zeus, she was protector of married women.

**Poseidon** - God of the sea, earthquakes, and horses. Brother of Zeus, he ruled the oceans with his trident.

**Athena** - Goddess of wisdom, warfare, and crafts. Born from Zeus's head fully armored, she was patron of Athens.

**Apollo** - God of light, music, poetry, and prophecy. Twin brother of Artemis, he drove the sun chariot across the sky.

**Artemis** - Goddess of the hunt, wilderness, and the moon. A virgin goddess who protected young women and animals.

**Aphrodite** - Goddess of love and beauty. Born from sea foam, she could make gods and mortals fall in love.

**Ares** - God of war. Unlike Athena's strategic warfare, Ares represented brutal combat.

**Hephaestus** - God of fire, metalworking, and crafts. Despite being lame, he created magnificent weapons and armor.

**Demeter** - Goddess of agriculture and harvest. Her grief when her daughter Persephone was taken to the underworld caused winter.

**Hermes** - Messenger of the gods, god of travelers and thieves. Known for his winged sandals and cunning nature.

**Dionysus** - God of wine, celebration, and theater. He brought joy but also madness to his followers.

These gods were not perfect - they had human flaws like jealousy, anger, and pride, making Greek mythology rich with dramatic stories.`,
    questions: [
      {
        id: "q1",
        question: "Who was the king of the Greek gods?",
        options: ["Poseidon", "Zeus", "Hades", "Apollo"],
        correctAnswer: 1,
        explanation: "Zeus was the king of the gods and ruler of Mount Olympus, wielding the thunderbolt."
      },
      {
        id: "q2",
        question: "Which goddess was born from Zeus's head?",
        options: ["Aphrodite", "Hera", "Athena", "Artemis"],
        correctAnswer: 2,
        explanation: "Athena, goddess of wisdom, was born fully armored from Zeus's head."
      },
      {
        id: "q3",
        question: "What did Poseidon rule over?",
        options: ["The underworld", "The sky", "The sea", "The sun"],
        correctAnswer: 2,
        explanation: "Poseidon was god of the sea, earthquakes, and horses, ruling the oceans with his trident."
      }
    ],
    reward: "10",
    estimatedTime: "12 minutes",
    difficulty: "beginner"
  },
  {
    id: "myth-2",
    title: "Norse Mythology and the Nine Realms",
    description: "Journey through the Norse cosmos and meet its mighty gods",
    culture: "Norse",
    content: `Norse mythology describes a cosmos of nine interconnected realms, home to gods, giants, elves, dwarves, and humans. At the center stands Yggdrasil, the World Tree.

**The Nine Realms:**

1. **Asgard** - Home of the Aesir gods like Odin and Thor
2. **Midgard** - The realm of humans, connected to Asgard by the rainbow bridge Bifrost
3. **Vanaheim** - Home of the Vanir gods, associated with nature and fertility
4. **Jotunheim** - Land of the giants (Jotnar), enemies of the gods
5. **Alfheim** - Realm of the light elves
6. **Svartalfheim** - Home of the dark elves and dwarves, master craftsmen
7. **Niflheim** - The primordial realm of ice and mist
8. **Muspelheim** - The realm of fire
9. **Helheim** - The underworld, ruled by the goddess Hel

**Key Norse Gods:**

**Odin** - The All-Father, god of wisdom, war, and death. He sacrificed his eye for knowledge and hung himself on Yggdrasil for nine days to learn the runes.

**Thor** - God of thunder, strength, and protection. Wielder of the mighty hammer Mjolnir, protector of both gods and humans.

**Loki** - The trickster god, both helper and enemy of the gods. Father of monsters including Fenrir the wolf and Jormungandr the world serpent.

**Freya** - Goddess of love, beauty, fertility, and war. She received half of those who died in battle.

**Frigg** - Odin's wife, goddess of marriage and motherhood, who knew all fates but spoke none.

Unlike Greek gods who were immortal, Norse gods could die, and their mythology culminates in Ragnarok - the twilight of the gods, where the world would be destroyed and reborn.`,
    questions: [
      {
        id: "q1",
        question: "What connects the nine realms in Norse mythology?",
        options: ["A rainbow bridge", "Yggdrasil the World Tree", "The ocean", "A golden chain"],
        correctAnswer: 1,
        explanation: "Yggdrasil, the World Tree, connects all nine realms in Norse cosmology."
      },
      {
        id: "q2",
        question: "What is Thor's mighty weapon called?",
        options: ["Gungnir", "Mjolnir", "Gram", "Tyrfing"],
        correctAnswer: 1,
        explanation: "Thor wielded Mjolnir, a powerful hammer that could level mountains and always returned to his hand."
      },
      {
        id: "q3",
        question: "What is Ragnarok?",
        options: [
          "A feast of the gods",
          "The twilight of the gods and end of the world",
          "Thor's palace",
          "A type of magic"
        ],
        correctAnswer: 1,
        explanation: "Ragnarok is the prophesied end of the world where gods and giants battle, leading to the world's destruction and rebirth."
      }
    ],
    reward: "10",
    estimatedTime: "15 minutes",
    difficulty: "beginner"
  },
  {
    id: "myth-3",
    title: "Egyptian Gods and the Afterlife",
    description: "Discover the gods of ancient Egypt and their beliefs about death",
    culture: "Egyptian",
    content: `Ancient Egyptian mythology centered around the cycle of life, death, and rebirth, with gods representing natural forces and cosmic order (Ma'at).

**Major Egyptian Deities:**

**Ra (Re)** - The sun god, creator deity who sailed across the sky in his solar boat each day. Often depicted with a falcon head crowned with the sun disk.

**Osiris** - God of the afterlife, resurrection, and agriculture. Murdered by his brother Set and resurrected by Isis, he became ruler of the underworld.

**Isis** - Goddess of magic, motherhood, and healing. Wife of Osiris and mother of Horus, she was one of the most powerful goddesses.

**Horus** - Sky god with the head of a falcon. Son of Osiris and Isis, he avenged his father and became the god of kingship.

**Set** - God of chaos, deserts, and storms. Brother and murderer of Osiris, representing necessary disorder.

**Anubis** - God of mummification and the dead, depicted with a jackal head. He guided souls to the afterlife.

**Thoth** - God of wisdom, writing, and magic. The ibis-headed god recorded the judgment of souls.

**Ma'at** - Goddess of truth, justice, and cosmic order. Her feather was used to weigh hearts in the afterlife.

**The Journey to the Afterlife:**

When an Egyptian died, their soul embarked on a perilous journey through the Duat (underworld). The heart was weighed against Ma'at's feather of truth. If the heart was lighter than the feather, the soul achieved eternal life in the Field of Reeds. If heavier (burdened with sin), the heart was devoured by Ammit, a demon, resulting in permanent death.

This belief in the afterlife drove Egyptian practices of mummification, tomb building, and burial with precious goods for the journey beyond.`,
    questions: [
      {
        id: "q1",
        question: "Who was the Egyptian god of the sun?",
        options: ["Osiris", "Horus", "Ra", "Anubis"],
        correctAnswer: 2,
        explanation: "Ra (or Re) was the sun god who sailed across the sky each day in his solar boat."
      },
      {
        id: "q2",
        question: "What was weighed against the feather of Ma'at in the afterlife?",
        options: ["The soul", "The heart", "The body", "The mind"],
        correctAnswer: 1,
        explanation: "The heart was weighed against Ma'at's feather of truth to determine if the deceased could enter the afterlife."
      },
      {
        id: "q3",
        question: "Who was the god of mummification?",
        options: ["Thoth", "Set", "Anubis", "Horus"],
        correctAnswer: 2,
        explanation: "Anubis, depicted with a jackal head, was the god of mummification and guided souls to the afterlife."
      }
    ],
    reward: "10",
    estimatedTime: "15 minutes",
    difficulty: "intermediate"
  },
  {
    id: "myth-4",
    title: "Heroes and Monsters: Greek Legends",
    description: "Epic tales of heroes facing incredible challenges",
    culture: "Greek",
    content: `Greek mythology is filled with tales of heroes who performed impossible feats, often aided or hindered by the gods.

**Heracles (Hercules):**
The greatest of Greek heroes, son of Zeus and a mortal woman. To atone for killing his family in a madness sent by Hera, he performed the Twelve Labors, including:
- Slaying the Nemean Lion (impervious to weapons)
- Killing the nine-headed Hydra
- Capturing the Golden Hind of Artemis
- Cleaning the Augean Stables in one day
- Obtaining the girdle of Hippolyta, Queen of the Amazons
- Capturing Cerberus, the three-headed dog of the underworld

**Perseus:**
Son of Zeus and Danaë, Perseus was tasked with bringing back the head of Medusa, a Gorgon whose gaze turned people to stone. With gifts from the gods (winged sandals, a mirrored shield, and an invisible helm), he succeeded and later saved Princess Andromeda from a sea monster.

**Theseus:**
Hero of Athens who volunteered to face the Minotaur - a half-man, half-bull monster in the Labyrinth of Crete. With help from Ariadne's thread, he navigated the maze, slew the Minotaur, and escaped.

**Odysseus:**
King of Ithaca, known for his cunning. His ten-year journey home from Troy (the Odyssey) included encounters with:
- The Cyclops Polyphemus
- The enchantress Circe who turned men to pigs
- The Sirens whose song lured sailors to death
- Scylla and Charybdis, monsters guarding a narrow strait

**Jason and the Argonauts:**
Jason led heroes on the ship Argo to retrieve the Golden Fleece. With help from the sorceress Medea, he completed impossible tasks set by King Aeëtes.

These stories taught virtues like courage, cleverness, perseverance, and respect for the gods, while warning against hubris (excessive pride).`,
    questions: [
      {
        id: "q1",
        question: "How many labors did Heracles have to perform?",
        options: ["Ten", "Twelve", "Seven", "Nine"],
        correctAnswer: 1,
        explanation: "Heracles performed Twelve Labors as penance for killing his family."
      },
      {
        id: "q2",
        question: "What turned people to stone when they looked at it?",
        options: ["The Minotaur", "Cerberus", "Medusa's gaze", "The Sirens' song"],
        correctAnswer: 2,
        explanation: "Medusa the Gorgon had the power to turn anyone who looked at her to stone."
      },
      {
        id: "q3",
        question: "What did Theseus use to navigate the Labyrinth?",
        options: ["A magic sword", "Ariadne's thread", "A map", "Divine guidance"],
        correctAnswer: 1,
        explanation: "Ariadne gave Theseus a ball of thread to mark his path through the Labyrinth so he could find his way out."
      }
    ],
    reward: "15",
    estimatedTime: "18 minutes",
    difficulty: "intermediate"
  },
  {
    id: "myth-5",
    title: "Creation Myths Across Cultures",
    description: "How different civilizations explained the origin of the world",
    culture: "Comparative",
    content: `Every ancient culture had stories explaining how the world and humanity came to be. These creation myths reveal how different peoples understood their place in the cosmos.

**Greek Creation:**
In the beginning was Chaos, a void of nothingness. From Chaos emerged Gaia (Earth), Tartarus (the Underworld), and Eros (Love). Gaia gave birth to Uranus (Sky), and together they produced the Titans. The Titan Kronos overthrew Uranus, only to be overthrown by his son Zeus, establishing the Olympian gods.

**Norse Creation:**
The cosmos began with two realms: Muspelheim (fire) and Niflheim (ice). Where they met, the giant Ymir was born. From Ymir's body, Odin and his brothers created the world: his flesh became earth, his blood the seas, his bones the mountains, and his skull the sky. The first humans, Ask and Embla, were created from two trees.

**Egyptian Creation (Heliopolitan):**
In the beginning was the primordial waters of Nun. From Nun arose Atum, who created himself. Atum produced the first gods through thought and word: Shu (air) and Tefnut (moisture). They gave birth to Geb (earth) and Nut (sky), who produced Osiris, Isis, Set, and Nephthys.

**Mesopotamian Creation (Enuma Elish):**
The world began with two waters: Apsu (fresh water) and Tiamat (salt water). Their offspring, the younger gods, disturbed Apsu who planned to destroy them. Ea killed Apsu, enraging Tiamat who became a chaos monster. Marduk defeated Tiamat, splitting her body to create the heavens and earth. Humanity was created from the blood of a slain god to serve the deities.

**Hindu Creation:**
Multiple creation myths exist. In one, the universe cycles through creation and destruction. Brahma emerges from a golden egg floating on the cosmic waters and creates the world through meditation. In another, the sacrifice of the cosmic giant Purusha created all existence.

**Common Themes:**
- Emergence from chaos or void
- Separation of earth and sky
- Creation through sacrifice or divine act
- Humans created to serve or honor gods
- Cyclical nature of creation and destruction

These myths served not just to explain origins, but to establish moral codes, justify social structures, and give meaning to human existence.`,
    questions: [
      {
        id: "q1",
        question: "What emerged first in Greek creation myth?",
        options: ["Zeus", "Gaia", "Chaos", "The Titans"],
        correctAnswer: 2,
        explanation: "Chaos, the void of nothingness, was the primordial state from which everything emerged in Greek mythology."
      },
      {
        id: "q2",
        question: "In Norse mythology, what were the first humans created from?",
        options: ["Clay", "Divine breath", "Trees", "Giant's blood"],
        correctAnswer: 2,
        explanation: "The first humans, Ask and Embla, were created from two trees by Odin and his brothers."
      },
      {
        id: "q3",
        question: "What common theme appears in multiple creation myths?",
        options: [
          "A great flood",
          "Emergence from chaos or void",
          "A speaking serpent",
          "Magic crystals"
        ],
        correctAnswer: 1,
        explanation: "Most creation myths begin with chaos, void, or primordial waters from which order emerges."
      }
    ],
    reward: "15",
    estimatedTime: "20 minutes",
    difficulty: "advanced"
  },
  {
    id: "myth-6",
    title: "Mythological Creatures and Beasts",
    description: "Fantastic beings that populated ancient mythologies",
    culture: "Comparative",
    content: `Ancient mythologies teemed with creatures that embodied fears, virtues, and the unknown. These beings often served as challenges for heroes or symbols of cosmic forces.

**Greek Creatures:**

**The Sphinx** - A creature with a lion's body, woman's head, and eagle's wings. She guarded Thebes, asking riddles and devouring those who answered incorrectly.

**Centaurs** - Half-human, half-horse beings. Most were wild and lawless, but Chiron was wise and taught many heroes.

**Pegasus** - The winged horse born from Medusa's blood, tamed by Bellerophon to fight the Chimera.

**Chimera** - A fire-breathing hybrid with a lion's head, goat's body, and serpent's tail.

**Cerberus** - The three-headed dog guarding the entrance to the underworld, preventing the dead from leaving.

**Hydra** - A many-headed serpent that grew two new heads for each one cut off.

**Norse Creatures:**

**Fenrir** - The monstrous wolf, son of Loki, prophesied to kill Odin during Ragnarok. The gods bound him with an unbreakable chain.

**Jormungandr** - The World Serpent, so large it encircled Midgard and bit its own tail. Thor's destined enemy at Ragnarok.

**Sleipnir** - Odin's eight-legged horse, the fastest of all steeds, born from Loki.

**Valkyries** - Warrior maidens who chose which soldiers died in battle and brought them to Valhalla.

**Egyptian Creatures:**

**Ammit** - The "Devourer of the Dead," with a crocodile head, lion's body, and hippo's hindquarters. She consumed hearts that failed judgment.

**Bennu** - A sacred bird associated with the sun, death, and rebirth, similar to the Phoenix.

**Apep (Apophis)** - A giant serpent of chaos who tried to devour Ra's sun boat each night.

**Other Cultures:**

**Phoenix** - A bird that cyclically regenerates by burning itself and rising from its ashes, symbolizing renewal.

**Dragons** - Present in nearly every culture, from the treasure-hoarding European dragons to the wise, benevolent Chinese long.

**Griffins** - Eagle-headed, lion-bodied guardians of treasure and divine power.

These creatures represented humanity's attempt to explain natural phenomena, embody abstract concepts, and create memorable stories that taught moral lessons.`,
    questions: [
      {
        id: "q1",
        question: "What happened if you answered the Sphinx's riddle incorrectly?",
        options: [
          "You were enslaved",
          "You were devoured",
          "You turned to stone",
          "You were cursed"
        ],
        correctAnswer: 1,
        explanation: "The Sphinx would devour anyone who failed to answer her riddle correctly."
      },
      {
        id: "q2",
        question: "How many heads did Cerberus have?",
        options: ["One", "Two", "Three", "Nine"],
        correctAnswer: 2,
        explanation: "Cerberus, the guardian of the underworld, had three heads."
      },
      {
        id: "q3",
        question: "What was unique about Fenrir?",
        options: [
          "He could fly",
          "He was a giant wolf bound by the gods",
          "He guarded treasure",
          "He could grant wishes"
        ],
        correctAnswer: 1,
        explanation: "Fenrir was a monstrous wolf, son of Loki, whom the gods bound with magic chains to prevent him from causing destruction."
      }
    ],
    reward: "20",
    estimatedTime: "20 minutes",
    difficulty: "advanced"
  }
];
