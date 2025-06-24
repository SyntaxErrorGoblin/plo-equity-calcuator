import pokerkit as pk
import json
import os
from concurrent.futures import ProcessPoolExecutor
from engine import get_equity_vs_random

# --- Configuration ---
RESULTS_FILE = 'ranked_hands.json'
HANDS_TO_COMPUTE_IN_THIS_RUN = 50

def generate_unique_random_hand(processed_hands: set) -> str:
    """
    Generates a unique, random 5-card PLO hand that has not been processed before.
    """
    while True:
        deck = pk.Deck.STANDARD
        shuffled_cards = pk.shuffled(deck)
        random_hand = shuffled_cards[:5]
        
        hand_str = "".join(map(repr, random_hand))
        if hand_str not in processed_hands:
            return hand_str

def load_results():
    """Loads existing results from the JSON file if it exists."""
    if os.path.exists(RESULTS_FILE):
        with open(RESULTS_FILE, 'r') as f:
            data = json.load(f)
            results = {item['hand']: item['equity'] for item in data}
            processed_hands = set(results.keys())
            print(f"Loaded {len(results)} existing hand rankings.")
            return results, processed_hands
    return {}, set()

def save_results(results_dict):
    """Saves the results dictionary to the JSON file, sorted by equity."""
    results_list = [{"hand": hand, "equity": equity} for hand, equity in results_dict.items()]
    results_list.sort(key=lambda item: item['equity'], reverse=True)
    with open(RESULTS_FILE, 'w') as f:
        json.dump(results_list, f, indent=2)

def run_precomputation(executor):
    """Main function to run the pre-computation loop."""
    results, processed_hands = load_results()
    
    print(f"--- Starting pre-computation run of {HANDS_TO_COMPUTE_IN_THIS_RUN} new hands ---")

    for i in range(HANDS_TO_COMPUTE_IN_THIS_RUN):
        hand_str = generate_unique_random_hand(processed_hands)

        equity = get_equity_vs_random(hand_str, executor)
        
        processed_hands.add(hand_str)
        results[hand_str] = equity
        
        if (i + 1) % 5 == 0 and i > 0:
            print(f"--- Saving progress to {RESULTS_FILE} ---")
            save_results(results)

    print(f"--- Final save for this run. ---")
    save_results(results)
    print(f"Total hands ranked: {len(results)}")


if __name__ == "__main__":
    with ProcessPoolExecutor() as executor:
        run_precomputation(executor)