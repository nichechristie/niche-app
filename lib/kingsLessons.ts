import { KingsLesson } from "@/types/kings";

export const kingsLessons: KingsLesson[] = [
  {
    id: "lesson-1",
    title: "Saul: Israel's First King",
    description: "Learn about King Saul and the establishment of the monarchy in Israel",
    period: "United Kingdom (1050-930 BC)",
    content: `Saul was anointed as Israel's first king around 1050 BC by the prophet Samuel. The Israelites had demanded a king to be like other nations, even though God was their true king.

Saul started well, but his reign was marked by disobedience to God's commands. Key events include:

**The Selection**: Saul was from the tribe of Benjamin, tall and handsome. God chose him, but warned that having a human king would bring consequences (1 Samuel 8-10).

**Early Success**: Saul won victories against Israel's enemies, particularly the Ammonites and Philistines. He showed military prowess and initially sought God's guidance.

**The Decline**: Saul's downfall came through:
- Offering an unauthorized sacrifice (1 Samuel 13)
- Failing to completely destroy the Amalekites as commanded (1 Samuel 15)
- Growing jealousy of David
- Consulting a medium at Endor (1 Samuel 28)

**Lessons**: Saul's story teaches us about the importance of complete obedience to God, the dangers of pride and jealousy, and how partial obedience is disobedience.`,
    questions: [
      {
        id: "q1",
        question: "Who anointed Saul as the first king of Israel?",
        options: ["Moses", "Samuel", "David", "Eli"],
        correctAnswer: 1,
        explanation: "The prophet Samuel anointed Saul as the first king of Israel."
      },
      {
        id: "q2",
        question: "What was Saul's main failure that led to his rejection by God?",
        options: [
          "He was a poor military leader",
          "He worshiped other gods",
          "He disobeyed God's commands",
          "He was too humble"
        ],
        correctAnswer: 2,
        explanation: "Saul was rejected because of his repeated disobedience to God's specific commands."
      },
      {
        id: "q3",
        question: "Which tribe was Saul from?",
        options: ["Judah", "Levi", "Benjamin", "Ephraim"],
        correctAnswer: 2,
        explanation: "Saul was from the tribe of Benjamin, the smallest tribe of Israel."
      }
    ],
    reward: "10",
    estimatedTime: "12 minutes",
    difficulty: "beginner"
  },
  {
    id: "lesson-2",
    title: "David: The Man After God's Own Heart",
    description: "Explore the life and reign of King David, Israel's greatest king",
    period: "United Kingdom (1010-970 BC)",
    content: `David, anointed while still a shepherd boy, became Israel's greatest king and established Jerusalem as the capital. His 40-year reign (c. 1010-970 BC) was marked by military success, deep faith, and human failure.

**Early Life**: David was the youngest of Jesse's eight sons, a shepherd from Bethlehem. He defeated Goliath as a youth, showing remarkable faith and courage (1 Samuel 17).

**Rise to Power**: After years fleeing from Saul's jealousy, David became king of Judah at age 30, and later king of all Israel. He conquered Jerusalem and made it his capital.

**Major Achievements**:
- Unified all twelve tribes under one kingdom
- Defeated Israel's enemies (Philistines, Moabites, Ammonites, Edomites)
- Brought the Ark of the Covenant to Jerusalem
- Received God's covenant promise of an eternal dynasty (2 Samuel 7)
- Wrote many Psalms, expressing deep devotion to God

**The Bathsheba Incident**: David's greatest moral failure - adultery with Bathsheba and arranging her husband Uriah's death. Nathan the prophet confronted David, who genuinely repented (2 Samuel 11-12, Psalm 51).

**Legacy**: Despite his sin, David was called "a man after God's own heart" because he truly sought God and genuinely repented when he failed. The Messiah (Jesus) would come from David's lineage.`,
    questions: [
      {
        id: "q1",
        question: "How old was David when he became king?",
        options: ["20 years old", "25 years old", "30 years old", "40 years old"],
        correctAnswer: 2,
        explanation: "David was 30 years old when he became king, as stated in 2 Samuel 5:4."
      },
      {
        id: "q2",
        question: "What city did David establish as Israel's capital?",
        options: ["Bethlehem", "Hebron", "Jerusalem", "Samaria"],
        correctAnswer: 2,
        explanation: "David conquered Jerusalem (also called the City of David) and made it his capital."
      },
      {
        id: "q3",
        question: "What did God promise David through the prophet Nathan?",
        options: [
          "Great wealth",
          "An eternal dynasty",
          "Victory over all enemies",
          "A peaceful reign"
        ],
        correctAnswer: 1,
        explanation: "God promised David that his dynasty would be established forever, ultimately fulfilled in Jesus Christ."
      }
    ],
    reward: "15",
    estimatedTime: "15 minutes",
    difficulty: "intermediate"
  },
  {
    id: "lesson-3",
    title: "Solomon: Wisdom and Glory",
    description: "Study Solomon's wisdom, wealth, and the building of God's Temple",
    period: "United Kingdom (970-930 BC)",
    content: `Solomon, David's son, reigned over Israel's golden age (c. 970-930 BC). Known for his wisdom, wealth, and the building of the Temple, Solomon's reign represents both the pinnacle and the beginning of decline for the united kingdom.

**The Gift of Wisdom**: When God offered Solomon anything he wanted, he asked for wisdom to govern well. God was pleased and gave him wisdom, plus wealth and honor (1 Kings 3).

**Major Accomplishments**:
- **Built the Temple**: A magnificent structure in Jerusalem where God's presence dwelled (1 Kings 6-8)
- **Vast Wealth**: Silver was as common as stones in Jerusalem. His annual gold revenue was 666 talents
- **International Influence**: The Queen of Sheba visited, amazed by his wisdom and prosperity
- **Literary Contributions**: Wrote Proverbs, Ecclesiastes, and Song of Solomon
- **Organized Administration**: Divided Israel into 12 districts for efficient governance

**The Decline**: Solomon's downfall came through:
- Marrying 700 wives and 300 concubines, many from pagan nations
- His wives turned his heart to worship other gods in his old age
- Heavy taxation and forced labor that burdened the people
- Setting the stage for the kingdom's division after his death

**Lessons**: Solomon shows us that wisdom must be applied throughout life, that compromise in faith leads to spiritual decline, and that even great gifts from God require faithful stewardship.`,
    questions: [
      {
        id: "q1",
        question: "What did Solomon ask God for when offered anything?",
        options: ["Wealth", "Long life", "Wisdom", "Power"],
        correctAnswer: 2,
        explanation: "Solomon asked for wisdom to govern God's people well, which pleased God."
      },
      {
        id: "q2",
        question: "What was Solomon's greatest architectural achievement?",
        options: [
          "The palace",
          "The Temple in Jerusalem",
          "The city walls",
          "The stables"
        ],
        correctAnswer: 1,
        explanation: "Solomon built the magnificent Temple in Jerusalem, fulfilling David's dream."
      },
      {
        id: "q3",
        question: "What led to Solomon's spiritual decline?",
        options: [
          "Losing his wealth",
          "Military defeats",
          "His many foreign wives turning his heart from God",
          "Losing his wisdom"
        ],
        correctAnswer: 2,
        explanation: "Solomon's many foreign wives turned his heart to worship their gods in his old age."
      }
    ],
    reward: "15",
    estimatedTime: "18 minutes",
    difficulty: "intermediate"
  },
  {
    id: "lesson-4",
    title: "The Divided Kingdom: Rehoboam and Jeroboam",
    description: "Understand how Israel split into two kingdoms",
    period: "Divided Kingdom (930 BC)",
    content: `After Solomon's death around 930 BC, the united kingdom of Israel split into two separate nations, setting the stage for centuries of conflict and eventual exile.

**The Division**:
- **Northern Kingdom (Israel)**: 10 tribes led by Jeroboam, capital at Samaria
- **Southern Kingdom (Judah)**: 2 tribes (Judah & Benjamin) led by Rehoboam, capital at Jerusalem

**Rehoboam's Folly** (Judah):
Solomon's son Rehoboam faced a critical choice. The people asked for lighter taxation and reduced forced labor. His older advisors counseled him to be kind; his young friends told him to be even harsher.

Rehoboam foolishly chose harshness, saying "My father made your yoke heavy; I will make it even heavier. My father scourged you with whips; I will scourge you with scorpions" (1 Kings 12:14).

This arrogance caused 10 tribes to rebel and form the Northern Kingdom under Jeroboam.

**Jeroboam's Sin** (Israel):
Fearing his people would return to Jerusalem to worship and thus return their allegiance to Judah, Jeroboam committed a great sin:
- Set up golden calves at Bethel and Dan
- Said "Here are your gods, Israel, who brought you up out of Egypt"
- Appointed non-Levitical priests
- Changed the religious festivals

This idolatry became known as "the sin of Jeroboam" and infected all subsequent northern kings.

**Consequences**:
- The two kingdoms often warred with each other
- Both were weakened and vulnerable to foreign powers
- The Northern Kingdom lasted about 200 years before Assyrian conquest (722 BC)
- The Southern Kingdom lasted about 340 years before Babylonian conquest (586 BC)`,
    questions: [
      {
        id: "q1",
        question: "How many tribes formed the Northern Kingdom of Israel?",
        options: ["Two", "Ten", "Twelve", "Five"],
        correctAnswer: 1,
        explanation: "Ten tribes broke away to form the Northern Kingdom under Jeroboam."
      },
      {
        id: "q2",
        question: "What was Rehoboam's critical mistake?",
        options: [
          "He listened to older advisors",
          "He reduced taxation",
          "He harshly rejected the people's request for lighter burdens",
          "He made peace with enemies"
        ],
        correctAnswer: 2,
        explanation: "Rehoboam foolishly chose to make the people's burdens even heavier, causing the division."
      },
      {
        id: "q3",
        question: "What great sin did Jeroboam commit?",
        options: [
          "He murdered Rehoboam",
          "He set up golden calves for worship",
          "He destroyed the Temple",
          "He made peace with Egypt"
        ],
        correctAnswer: 1,
        explanation: "Jeroboam set up golden calves at Bethel and Dan, leading Israel into idolatry."
      }
    ],
    reward: "20",
    estimatedTime: "20 minutes",
    difficulty: "advanced"
  },
  {
    id: "lesson-5",
    title: "Hezekiah: A Reformer King",
    description: "Learn about King Hezekiah's faithfulness and God's deliverance",
    period: "Kingdom of Judah (715-686 BC)",
    content: `Hezekiah was one of Judah's greatest kings, known for his religious reforms, trust in God, and the miraculous deliverance of Jerusalem from Assyrian siege.

**Religious Reforms**:
"He did what was right in the eyes of the LORD, just as his father David had done" (2 Kings 18:3).

Hezekiah's reforms included:
- Removing and destroying the high places of idol worship
- Breaking down the sacred stones and Asherah poles
- Even destroying the bronze serpent Moses had made, as people were burning incense to it
- Reopening and cleansing the Temple
- Restoring proper worship and Passover celebration

**The Assyrian Crisis**:
When the mighty Assyrian Empire under Sennacherib besieged Jerusalem (701 BC), Hezekiah faced a choice: surrender or trust God.

The Assyrian commander Rabshakeh mocked God and demanded surrender. Hezekiah's response:
- Tore his clothes in distress
- Went to the Temple to pray
- Sent messengers to the prophet Isaiah for counsel
- Trusted God's promise of deliverance

**Miraculous Deliverance**:
God sent the angel of the LORD who struck down 185,000 Assyrian soldiers in one night. Sennacherib returned to Nineveh in disgrace and was later murdered by his own sons (2 Kings 19).

**Hezekiah's Illness and Pride**:
When terminally ill, Hezekiah prayed and God added 15 years to his life. However, he later showed pride when Babylonian envoys visited, displaying all his treasures. Isaiah prophesied that Babylon would one day carry away these treasures.

**Legacy**: Hezekiah demonstrated that trusting God brings deliverance, that true reform requires removing all idolatry, and that even faithful leaders must guard against pride.`,
    questions: [
      {
        id: "q1",
        question: "What empire threatened Jerusalem during Hezekiah's reign?",
        options: ["Babylon", "Egypt", "Assyria", "Persia"],
        correctAnswer: 2,
        explanation: "The Assyrian Empire under Sennacherib besieged Jerusalem."
      },
      {
        id: "q2",
        question: "How did God deliver Jerusalem from the Assyrians?",
        options: [
          "Through military victory",
          "An angel struck down 185,000 Assyrian soldiers",
          "The Egyptians attacked Assyria",
          "The Assyrians ran out of supplies"
        ],
        correctAnswer: 1,
        explanation: "The angel of the LORD struck down 185,000 Assyrian soldiers in one night."
      },
      {
        id: "q3",
        question: "How many years did God add to Hezekiah's life when he prayed?",
        options: ["5 years", "10 years", "15 years", "20 years"],
        correctAnswer: 2,
        explanation: "God added 15 years to Hezekiah's life in response to his prayer."
      }
    ],
    reward: "20",
    estimatedTime: "22 minutes",
    difficulty: "advanced"
  },
  {
    id: "lesson-6",
    title: "Josiah: The Boy King Who Reformed Judah",
    description: "Study the remarkable reign of Josiah and the rediscovery of God's Law",
    period: "Kingdom of Judah (640-609 BC)",
    content: `Josiah became king at age 8 and is remembered as one of Judah's greatest reformers. His reign represents the last major spiritual renewal before Judah's exile to Babylon.

**Early Reign**:
"He did what was right in the eyes of the LORD and followed completely the ways of his father David, not turning aside to the right or to the left" (2 Kings 22:2).

At age 16, Josiah began to seek the God of David. At age 20, he began purging Judah of idolatry.

**The Discovery of the Law**:
In the 18th year of his reign (age 26), while repairing the Temple, the high priest Hilkiah found the Book of the Law (likely Deuteronomy). When it was read to Josiah, he tore his robes in distress, realizing how far Judah had strayed from God's commands.

**Sweeping Reforms**:
- Removed and destroyed all idols, Asherah poles, and high places
- Desecrated pagan altars from Jerusalem to Bethel
- Removed mediums, spiritists, and household gods
- Executed pagan priests who had led people astray
- Reinstituted Passover celebration on a scale not seen since the days of the judges

**The Prophetess Huldah**:
When Josiah sought God's word through Huldah the prophetess, she confirmed judgment would come to Judah, but not in Josiah's lifetime because of his humble response to God's word.

**Tragic End**:
Despite his faithfulness, Josiah died young at age 39 in battle against Pharaoh Necho of Egypt at Megiddo. He was deeply mourned by all Judah, including the prophet Jeremiah.

**Lessons**: Josiah shows us that age is no barrier to serving God faithfully, that God's Word should guide our lives, that incomplete reforms of previous generations require completion, and that genuine repentance and reform please God.

"Neither before nor after Josiah was there a king like him who turned to the LORD as he did—with all his heart and with all his soul and with all his strength" (2 Kings 23:25).`,
    questions: [
      {
        id: "q1",
        question: "How old was Josiah when he became king?",
        options: ["5 years old", "8 years old", "12 years old", "16 years old"],
        correctAnswer: 1,
        explanation: "Josiah became king of Judah at the young age of 8 years old."
      },
      {
        id: "q2",
        question: "What important discovery was made during Temple repairs?",
        options: [
          "Hidden treasure",
          "The Ark of the Covenant",
          "The Book of the Law",
          "Ancient weapons"
        ],
        correctAnswer: 2,
        explanation: "The Book of the Law (likely Deuteronomy) was discovered during Temple repairs."
      },
      {
        id: "q3",
        question: "How did 2 Kings 23:25 describe Josiah's devotion to God?",
        options: [
          "With great wealth",
          "With military might",
          "With all his heart, soul, and strength",
          "With wisdom and knowledge"
        ],
        correctAnswer: 2,
        explanation: "Josiah turned to the LORD with all his heart, soul, and strength - complete devotion."
      }
    ],
    reward: "25",
    estimatedTime: "25 minutes",
    difficulty: "advanced"
  }
];
