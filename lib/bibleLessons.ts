import { BibleLesson } from "@/types/bible";

export const bibleLessons: BibleLesson[] = [
  {
    id: "lesson-1",
    title: "God's Love and Creation",
    description: "Learn about God's creation and His love for humanity",
    scripture: "Genesis 1:1, John 3:16",
    content: `In the beginning, God created the heavens and the earth. Everything we see around us - the stars, the oceans, the mountains, and all living creatures - were made by God.

But God's greatest creation was humanity. He made us in His own image and loves us deeply. John 3:16 tells us: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."

This demonstrates the depth of God's love - He sent Jesus to save us because He cares for each and every person.`,
    questions: [
      {
        id: "q1",
        question: "Who created the heavens and the earth?",
        options: ["Angels", "God", "Humans", "Nature"],
        correctAnswer: 1,
        explanation: "God created everything in the beginning, as stated in Genesis 1:1."
      },
      {
        id: "q2",
        question: "According to John 3:16, why did God give His only Son?",
        options: [
          "To rule the earth",
          "Because He loved the world",
          "To punish sin",
          "To create a religion"
        ],
        correctAnswer: 1,
        explanation: "God gave His Son Jesus because He loved the world and wanted to provide salvation."
      },
      {
        id: "q3",
        question: "What does it mean that humans are made in God's image?",
        options: [
          "We look exactly like God",
          "We have God's creative and moral nature",
          "We are divine beings",
          "We are perfect"
        ],
        correctAnswer: 1,
        explanation: "Being made in God's image means we reflect His nature in our ability to love, create, and make moral choices."
      }
    ],
    reward: "10",
    estimatedTime: "10 minutes",
    difficulty: "beginner"
  },
  {
    id: "lesson-2",
    title: "Faith and Trust in God",
    description: "Understanding what it means to have faith in God",
    scripture: "Hebrews 11:1, Proverbs 3:5-6",
    content: `Faith is the foundation of our relationship with God. Hebrews 11:1 tells us: "Now faith is confidence in what we hope for and assurance about what we do not see."

Proverbs 3:5-6 instructs us: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."

Faith means trusting God even when we can't see the outcome. It means believing in His promises and relying on His guidance rather than our own limited understanding.`,
    questions: [
      {
        id: "q1",
        question: "According to Hebrews 11:1, what is faith?",
        options: [
          "Blind belief without reason",
          "Confidence in what we hope for",
          "Following religious rules",
          "Being a good person"
        ],
        correctAnswer: 1,
        explanation: "Faith is confidence in what we hope for and assurance about what we do not see."
      },
      {
        id: "q2",
        question: "What does Proverbs 3:5 tell us NOT to do?",
        options: [
          "Not to pray",
          "Not to read the Bible",
          "Not to lean on our own understanding",
          "Not to help others"
        ],
        correctAnswer: 2,
        explanation: "We are instructed not to lean on our own understanding, but to trust in the Lord."
      },
      {
        id: "q3",
        question: "What happens when we submit to God in all our ways?",
        options: [
          "We become rich",
          "He will make our paths straight",
          "We will never face problems",
          "We will be famous"
        ],
        correctAnswer: 1,
        explanation: "When we submit to God in all our ways, He will make our paths straight and guide us."
      }
    ],
    reward: "10",
    estimatedTime: "12 minutes",
    difficulty: "beginner"
  },
  {
    id: "lesson-3",
    title: "Prayer and Communication with God",
    description: "Learn how to pray and communicate with God",
    scripture: "Matthew 6:9-13, 1 Thessalonians 5:16-18",
    content: `Prayer is our direct line of communication with God. Jesus taught us how to pray in Matthew 6:9-13, known as the Lord's Prayer.

Prayer is not just asking God for things - it's about building a relationship with Him. We can talk to God about anything: our joys, our fears, our needs, and our gratitude.

1 Thessalonians 5:16-18 encourages us: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus."

We can pray anywhere, anytime. God is always listening and ready to hear from us.`,
    questions: [
      {
        id: "q1",
        question: "What did Jesus teach in Matthew 6:9-13?",
        options: [
          "The Ten Commandments",
          "The Lord's Prayer",
          "The Beatitudes",
          "The Golden Rule"
        ],
        correctAnswer: 1,
        explanation: "Jesus taught the Lord's Prayer, showing us how to pray to our Heavenly Father."
      },
      {
        id: "q2",
        question: "According to 1 Thessalonians 5:17, how often should we pray?",
        options: [
          "Once a day",
          "Only on Sundays",
          "Continually",
          "When we need something"
        ],
        correctAnswer: 2,
        explanation: "We are encouraged to pray continually, maintaining constant communication with God."
      },
      {
        id: "q3",
        question: "Prayer is primarily about:",
        options: [
          "Getting what we want",
          "Following religious rules",
          "Building a relationship with God",
          "Impressing others"
        ],
        correctAnswer: 2,
        explanation: "Prayer is fundamentally about building and maintaining a relationship with God."
      }
    ],
    reward: "10",
    estimatedTime: "15 minutes",
    difficulty: "beginner"
  },
  {
    id: "lesson-4",
    title: "Forgiveness and Grace",
    description: "Understanding God's forgiveness and how to forgive others",
    scripture: "Ephesians 4:32, 1 John 1:9",
    content: `God's grace and forgiveness are at the heart of the Gospel. 1 John 1:9 promises: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness."

But forgiveness isn't just something we receive - it's something we're called to extend to others. Ephesians 4:32 says: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you."

When we understand how much God has forgiven us, it becomes easier to forgive those who have wronged us. Forgiveness frees us from bitterness and helps us live in peace.`,
    questions: [
      {
        id: "q1",
        question: "What does God do when we confess our sins?",
        options: [
          "Punishes us",
          "Ignores us",
          "Forgives and purifies us",
          "Keeps a record against us"
        ],
        correctAnswer: 2,
        explanation: "God is faithful and just to forgive us and purify us from all unrighteousness."
      },
      {
        id: "q2",
        question: "According to Ephesians 4:32, why should we forgive others?",
        options: [
          "Because they deserve it",
          "To feel superior",
          "Because God forgave us in Christ",
          "To avoid conflict"
        ],
        correctAnswer: 2,
        explanation: "We forgive others just as God forgave us in Christ - it's a response to God's grace."
      },
      {
        id: "q3",
        question: "What does forgiveness free us from?",
        options: [
          "Responsibility",
          "Bitterness and anger",
          "Consequences",
          "Relationships"
        ],
        correctAnswer: 1,
        explanation: "Forgiveness frees us from bitterness, anger, and resentment, allowing us to live in peace."
      }
    ],
    reward: "15",
    estimatedTime: "15 minutes",
    difficulty: "intermediate"
  },
  {
    id: "lesson-5",
    title: "The Fruit of the Spirit",
    description: "Understanding the characteristics God develops in believers",
    scripture: "Galatians 5:22-23",
    content: `The Holy Spirit produces good fruit in our lives when we follow Jesus. Galatians 5:22-23 lists these fruits: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control."

These aren't things we manufacture through our own effort - they're the natural result of God's Spirit working in us. As we grow closer to God, these qualities develop in our character.

Each fruit represents an aspect of Christ's character that God wants to see in us:
- Love: selfless care for others
- Joy: deep contentment in God
- Peace: calm assurance in God's control
- Patience: endurance in difficult times
- Kindness: compassion toward others
- Goodness: moral excellence
- Faithfulness: reliability and loyalty
- Gentleness: humble strength
- Self-control: discipline over our desires`,
    questions: [
      {
        id: "q1",
        question: "How many fruits of the Spirit are listed in Galatians 5:22-23?",
        options: ["Seven", "Eight", "Nine", "Ten"],
        correctAnswer: 2,
        explanation: "There are nine fruits of the Spirit listed in this passage."
      },
      {
        id: "q2",
        question: "Who produces these fruits in our lives?",
        options: [
          "We produce them through hard work",
          "The Holy Spirit",
          "Our church community",
          "Religious practices"
        ],
        correctAnswer: 1,
        explanation: "These are fruits of the Spirit - produced by God's Holy Spirit working in us."
      },
      {
        id: "q3",
        question: "Which is NOT one of the fruits of the Spirit?",
        options: ["Love", "Wisdom", "Peace", "Self-control"],
        correctAnswer: 1,
        explanation: "While wisdom is valuable, it's not listed among the nine fruits of the Spirit in this passage."
      }
    ],
    reward: "15",
    estimatedTime: "18 minutes",
    difficulty: "intermediate"
  },
  {
    id: "lesson-6",
    title: "Walking in the Light",
    description: "Living a life that reflects God's truth and righteousness",
    scripture: "1 John 1:5-7, Ephesians 5:8-10",
    content: `The Bible often contrasts light and darkness to represent good and evil, truth and lies. 1 John 1:5 declares: "God is light; in him there is no darkness at all."

As believers, we're called to walk in the light. Ephesians 5:8-10 says: "For you were once darkness, but now you are light in the Lord. Live as children of light (for the fruit of the light consists in all goodness, righteousness and truth) and find out what pleases the Lord."

Walking in the light means:
- Living with integrity and honesty
- Pursuing righteousness instead of sin
- Being transparent with God and others
- Letting God's truth guide our decisions
- Reflecting Christ's character to the world

When we walk in the light, we have fellowship with God and with other believers, and Jesus' blood cleanses us from all sin.`,
    questions: [
      {
        id: "q1",
        question: "According to 1 John 1:5, what is in God?",
        options: [
          "No darkness at all",
          "A little darkness",
          "Equal light and dark",
          "Mostly light"
        ],
        correctAnswer: 0,
        explanation: "God is pure light with no darkness at all - He is completely holy and good."
      },
      {
        id: "q2",
        question: "What does the fruit of the light consist of?",
        options: [
          "Power and wealth",
          "Goodness, righteousness and truth",
          "Knowledge and wisdom",
          "Happiness and success"
        ],
        correctAnswer: 1,
        explanation: "The fruit of the light consists in all goodness, righteousness, and truth."
      },
      {
        id: "q3",
        question: "What should we find out according to Ephesians 5:10?",
        options: [
          "What makes us happy",
          "What is popular",
          "What pleases the Lord",
          "What is easiest"
        ],
        correctAnswer: 2,
        explanation: "We should seek to find out what pleases the Lord and align our lives accordingly."
      }
    ],
    reward: "20",
    estimatedTime: "20 minutes",
    difficulty: "advanced"
  }
];
