"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FloatingCoin } from "@/components/FloatingCoin";
import Image from "next/image";

// Card types
type Suit = "hearts" | "diamonds" | "clubs" | "spades";
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

interface Card {
  suit: Suit;
  rank: Rank;
  id: string;
}

// Game state type
type GameState = "betting" | "playing" | "dealer-turn" | "game-over";

export default function BlackjackPage() {
  const [balance, setBalance] = useState(1000); // Starting NICHE balance
  const [bet, setBet] = useState(0);
  const [currentBet, setCurrentBet] = useState(10);
  const [gameState, setGameState] = useState<GameState>("betting");
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [message, setMessage] = useState("Place your bet to start!");
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  // Create a new deck of cards
  const createDeck = (): Card[] => {
    const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
    const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const newDeck: Card[] = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        newDeck.push({
          suit,
          rank,
          id: `${rank}-${suit}-${Math.random()}`,
        });
      }
    }

    // Shuffle deck
    return newDeck.sort(() => Math.random() - 0.5);
  };

  // Calculate hand value
  const calculateHandValue = (hand: Card[]): number => {
    let value = 0;
    let aces = 0;

    for (const card of hand) {
      if (card.rank === "A") {
        aces += 1;
        value += 11;
      } else if (["J", "Q", "K"].includes(card.rank)) {
        value += 10;
      } else {
        value += parseInt(card.rank);
      }
    }

    // Adjust for aces
    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }

    return value;
  };

  // Update scores when hands change
  useEffect(() => {
    setPlayerScore(calculateHandValue(playerHand));
    setDealerScore(calculateHandValue(dealerHand));
  }, [playerHand, dealerHand]);

  // Start a new game
  const startGame = () => {
    if (currentBet > balance) {
      setMessage("Insufficient balance!");
      return;
    }

    const newDeck = createDeck();
    const newPlayerHand = [newDeck.pop()!, newDeck.pop()!];
    const newDealerHand = [newDeck.pop()!, newDeck.pop()!];

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setBet(currentBet);
    setBalance(balance - currentBet);
    setGameState("playing");
    setMessage("Hit or Stand?");
  };

  // Player hits
  const hit = () => {
    if (gameState !== "playing") return;

    const newDeck = [...deck];
    const newCard = newDeck.pop()!;
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    setDeck(newDeck);

    const newScore = calculateHandValue(newHand);
    if (newScore > 21) {
      setGameState("game-over");
      setMessage(`Bust! You lose ${bet} NICHE`);
    }
  };

  // Player stands
  const stand = () => {
    if (gameState !== "playing") return;
    setGameState("dealer-turn");
    setMessage("Dealer's turn...");
    dealerPlay();
  };

  // Dealer plays
  const dealerPlay = () => {
    setTimeout(() => {
      let newDeck = [...deck];
      let newDealerHand = [...dealerHand];
      let dealerValue = calculateHandValue(newDealerHand);

      while (dealerValue < 17) {
        const newCard = newDeck.pop()!;
        newDealerHand.push(newCard);
        dealerValue = calculateHandValue(newDealerHand);
      }

      setDealerHand(newDealerHand);
      setDeck(newDeck);
      determineWinner(calculateHandValue(playerHand), dealerValue);
    }, 1000);
  };

  // Determine winner
  const determineWinner = (playerValue: number, dealerValue: number) => {
    setGameState("game-over");

    if (dealerValue > 21) {
      setMessage(`Dealer busts! You win ${bet * 2} NICHE! 🎉`);
      setBalance(balance + bet * 2);
    } else if (playerValue > dealerValue) {
      setMessage(`You win ${bet * 2} NICHE! 🎉`);
      setBalance(balance + bet * 2);
    } else if (playerValue < dealerValue) {
      setMessage(`Dealer wins. You lose ${bet} NICHE`);
    } else {
      setMessage("Push! Bet returned");
      setBalance(balance + bet);
    }
  };

  // Reset game
  const newRound = () => {
    setGameState("betting");
    setPlayerHand([]);
    setDealerHand([]);
    setBet(0);
    setMessage("Place your bet to start!");
  };

  // Get card symbol
  const getCardSymbol = (suit: Suit) => {
    const symbols = {
      hearts: "♥",
      diamonds: "♦",
      clubs: "♣",
      spades: "♠",
    };
    return symbols[suit];
  };

  // Get card color
  const getCardColor = (suit: Suit) => {
    return suit === "hearts" || suit === "diamonds" ? "text-red-500" : "text-gray-900";
  };

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full p-8 relative overflow-hidden">
        {/* Floating Coins */}
        <FloatingCoin size={70} className="absolute top-10 right-10 animate-spin-slow" animationDelay="0s" />
        <FloatingCoin size={55} className="absolute bottom-20 left-10 animate-rotate-3d" animationDelay="2s" />
        <FloatingCoin size={65} className="absolute top-1/3 right-1/4 animate-float" animationDelay="1.5s" />

        <div className="mb-8 relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 glow-text">
            🃏 NICHE Blackjack 🎰
          </h1>
          <p className="text-gray-300 text-xl">
            Play blackjack and win NICHE tokens!
          </p>
        </div>

        {/* Balance Display */}
        <div className="glass rounded-xl p-6 mb-6 relative z-10">
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500">
              <Image src="/IMG_3411.jpeg" alt="NICHE" fill className="object-cover" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Your Balance</p>
              <p className="text-3xl font-bold text-white glow-text">{balance} NICHE</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Dealer's Hand */}
          <div className="lg:col-span-3 glass rounded-xl p-6 relative z-10">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                Dealer's Hand {gameState !== "betting" && `(${gameState === "playing" ? "?" : dealerScore})`}
              </h2>
            </div>
            <div className="flex justify-center gap-4 min-h-[200px] items-center flex-wrap">
              {dealerHand.map((card, index) => (
                <div
                  key={card.id}
                  className={`relative transition-all duration-500 ${
                    index === 1 && gameState === "playing" ? "card-back" : "card-3d"
                  }`}
                  style={{
                    transform: `translateX(${index * 20}px) rotateY(${index * 5}deg)`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {index === 1 && gameState === "playing" ? (
                    // Hidden card
                    <div className="w-32 h-44 glass border-4 border-purple-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <Image src="/IMG_3411.jpeg" alt="NICHE" fill className="object-cover" />
                      </div>
                      <div className="text-6xl z-10">🃏</div>
                    </div>
                  ) : (
                    // Visible card
                    <div className="w-32 h-44 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-between p-4 border-4 border-gray-200 relative overflow-hidden">
                      <div className="absolute top-2 left-2 opacity-10">
                        <Image src="/IMG_3411.jpeg" alt="NICHE" width={100} height={100} className="object-contain" />
                      </div>
                      <div className={`text-3xl font-bold ${getCardColor(card.suit)} z-10`}>
                        {card.rank}
                        <div className="text-2xl">{getCardSymbol(card.suit)}</div>
                      </div>
                      <div className={`text-6xl z-10`}>{getCardSymbol(card.suit)}</div>
                      <div className={`text-3xl font-bold ${getCardColor(card.suit)} z-10 transform rotate-180`}>
                        {card.rank}
                        <div className="text-2xl transform rotate-180">{getCardSymbol(card.suit)}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Player's Hand */}
          <div className="lg:col-span-3 glass rounded-xl p-6 relative z-10">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                Your Hand {gameState !== "betting" && `(${playerScore})`}
              </h2>
            </div>
            <div className="flex justify-center gap-4 min-h-[200px] items-center flex-wrap">
              {playerHand.map((card, index) => (
                <div
                  key={card.id}
                  className="card-3d"
                  style={{
                    transform: `translateX(${index * 20}px) rotateY(${-index * 5}deg)`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="w-32 h-44 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-between p-4 border-4 border-gray-200 relative overflow-hidden">
                    <div className="absolute top-2 left-2 opacity-10">
                      <Image src="/IMG_3411.jpeg" alt="NICHE" width={100} height={100} className="object-contain" />
                    </div>
                    <div className={`text-3xl font-bold ${getCardColor(card.suit)} z-10`}>
                      {card.rank}
                      <div className="text-2xl">{getCardSymbol(card.suit)}</div>
                    </div>
                    <div className={`text-6xl z-10`}>{getCardSymbol(card.suit)}</div>
                    <div className={`text-3xl font-bold ${getCardColor(card.suit)} z-10 transform rotate-180`}>
                      {card.rank}
                      <div className="text-2xl transform rotate-180">{getCardSymbol(card.suit)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Message */}
        <div className="glass rounded-xl p-6 mb-6 text-center relative z-10">
          <p className="text-2xl font-bold text-white glow-text">{message}</p>
          {bet > 0 && gameState !== "betting" && (
            <p className="text-lg text-indigo-300 mt-2">Current Bet: {bet} NICHE</p>
          )}
        </div>

        {/* Controls */}
        <div className="glass rounded-xl p-6 relative z-10">
          {gameState === "betting" && (
            <div className="space-y-4">
              <div className="text-center">
                <label className="block text-white mb-2 font-semibold">Bet Amount (NICHE)</label>
                <div className="flex justify-center gap-2 mb-4">
                  {[10, 50, 100, 500].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setCurrentBet(amount)}
                      className={`px-6 py-3 rounded-lg font-bold transition-all ${
                        currentBet === amount
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white glow"
                          : "glass text-gray-300 hover:text-white"
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <p className="text-3xl font-bold text-white mb-4">{currentBet} NICHE</p>
              </div>
              <button
                onClick={startGame}
                disabled={currentBet > balance}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl glow"
              >
                🎲 Deal Cards
              </button>
            </div>
          )}

          {gameState === "playing" && (
            <div className="flex gap-4">
              <button
                onClick={hit}
                className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all font-bold text-xl glow"
              >
                👆 Hit
              </button>
              <button
                onClick={stand}
                className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-bold text-xl glow"
              >
                ✋ Stand
              </button>
            </div>
          )}

          {gameState === "game-over" && (
            <button
              onClick={newRound}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-xl glow"
            >
              🔄 New Round
            </button>
          )}
        </div>

        {/* Game Rules */}
        <div className="mt-6 glass rounded-xl p-6 relative z-10">
          <h3 className="text-xl font-bold text-white mb-3">🎯 How to Play</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Try to get as close to 21 as possible without going over</li>
            <li>• Face cards (J, Q, K) are worth 10 points</li>
            <li>• Aces can be worth 1 or 11 points</li>
            <li>• Dealer must hit on 16 and below, stand on 17 and above</li>
            <li>• Win 2x your bet if you beat the dealer!</li>
          </ul>
        </div>
      </main>

      <style jsx>{`
        @keyframes card-deal {
          from {
            opacity: 0;
            transform: translateY(-100px) rotateY(180deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateY(0deg);
          }
        }

        .card-3d {
          animation: card-deal 0.5s ease-out forwards;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .card-3d:hover {
          transform: translateY(-10px) scale(1.05);
        }

        .card-back {
          animation: card-deal 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
