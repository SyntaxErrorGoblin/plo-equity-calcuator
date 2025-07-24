
import pokerkit as pk
import time
import json
import os
from concurrent.futures import ProcessPoolExecutor

# --- Configuration ---
# The number of villain hands to sample from the selected range.
HAND_VS_RANGE_SAMPLE_SIZE = 2000
# The number of simulations for the initial hand ranking.
PRECOMPUTE_SIM_COUNT = 10000
RESULTS_FILE = 'ranked_hands.json' 

# --- Load Pre-computed Data ---
try:
    with open(RESULTS_FILE, 'r') as f:
        RANKED_HANDS = json.load(f)
    TOTAL_HAND_COUNT = len(RANKED_HANDS)
    print(f"✅ Successfully loaded {TOTAL_HAND_COUNT} ranked hands from {RESULTS_FILE}")
except FileNotFoundError:
    print(f"⚠️ WARNING: Could not find {RESULTS_FILE}. Please run precompute.py first.")
    RANKED_HANDS = []
    TOTAL_HAND_COUNT = 0

# --- Helper Function 1: Hand vs. Random (For Pre-computation) ---
# This function is necessary for precompute.py
def get_equity_vs_random(hero_hand_str: str, executor: ProcessPoolExecutor | None = None) -> float:
    """
    Calculates a hand's equity against a single random opponent.
    This uses the high-level pokerkit analysis function.
    """
    hero_range = pk.parse_range(hero_hand_str)
    hand_strength = pk.analysis.calculate_hand_strength(
        player_count=2,
        hole_range=hero_range,
        board_cards=(),
        hole_dealing_count=5,
        board_dealing_count=5,
        deck=pk.Deck.STANDARD,
        hand_types=(pk.OmahaHoldemHand,),
        sample_count=PRECOMPUTE_SIM_COUNT,
        executor=executor,
    )
    return hand_strength * 100

# --- Helper function to determine the winner on a single board ---
def get_winner_on_board(hero_hole_cards, villain_hole_cards, board_cards) -> int:
    """
    Determines the winner between two hands on a specific board.
    Returns 1 for hero win, 0 for tie, -1 for villain win.
    """
    # from_game correctly takes the collection of hole cards and board cards
    best_hero_hand = pk.OmahaHoldemHand.from_game(hero_hole_cards, board_cards)
    best_villain_hand = pk.OmahaHoldemHand.from_game(villain_hole_cards, board_cards)

    if best_hero_hand > best_villain_hand:
        return 1
    elif best_hero_hand == best_villain_hand:
        return 0
    else:
        return -1

# --- Main API Function ---
def calculate_hand_vs_range_equity(hero_hand_str: str, villain_range_percent: int) -> float:
    """
    Calculates a hero's hand equity against a villain's range by dealing
    one random board for each hand in a sample of the villain's range.
    """
    if not RANKED_HANDS:
        return 0.0
    
    # Get the top X% of hands from our ranked list
    villain_hand_count = int(TOTAL_HAND_COUNT * (villain_range_percent / 100))
    if villain_hand_count == 0: return 0.0
    villain_range_hands = RANKED_HANDS[:villain_hand_count]
    
    # Take a random sample from the villain's range.
    shuffled_range = pk.shuffled(villain_range_hands)
    hands_to_simulate = shuffled_range[:HAND_VS_RANGE_SAMPLE_SIZE]
    
    wins = 0
    ties = 0
    valid_matchups = 0
    
    hero_hand_obj = pk.OmahaHoldemHand(hero_hand_str)
    
    # This is the main simulation loop
    for item in hands_to_simulate:
        villain_hand_str = item["hand"]
        villain_hand_obj = pk.OmahaHoldemHand(villain_hand_str)

        # Use set intersection for a reliable conflict check
        if not set(hero_hand_obj.cards).isdisjoint(set(villain_hand_obj.cards)):
            continue
            
        cards_in_play = set(hero_hand_obj.cards) | set(villain_hand_obj.cards)
        
        remaining_cards = [card for card in pk.Deck.STANDARD if card not in cards_in_play]
        
        shuffled_deck_list = pk.shuffled(remaining_cards)

        board = shuffled_deck_list[:5]

        # Determine the winner on this single board by passing the raw cards
        result = get_winner_on_board(hero_hand_obj.cards, villain_hand_obj.cards, board)

        if result == 1:
            wins += 1
        elif result == 0:
            ties += 1

        valid_matchups += 1
    
    if valid_matchups == 0: return 0.0
    
    win_equity = (wins / valid_matchups)
    tie_equity = (ties / valid_matchups)
    average_equity = win_equity + (tie_equity / 2)
    
    return average_equity * 100
