import pokerkit as pk

SIMULATION_COUNT = 2000

def calculate_plo5_equity(hand1_str: str, hand2_str: str) -> float:
    """
    Calculates the equity for a 2-player, 5-card PLO hand using the
    built-in pokerkit.calculate_equities function.
    """
    hole_cards = (
        pk.parse_range(hand1_str),
        pk.parse_range(hand2_str),
    )

    # We use positional arguments for the required parameters,
    # and keywords for the optional ones.
    equities = pk.calculate_equities(
        hole_cards,
        (),                            # Empty board for preflop calculation
        5,                             # hole_dealing_count for PLO5
        5,                             # board_dealing_count for a full runout
        pk.Deck.STANDARD,
        (pk.OmahaHoldemHand,),       
        sample_count=SIMULATION_COUNT
    )

    hero_equity = equities[0]

    return hero_equity * 100

if __name__ == "__main__":
    hero_hand = "AsKsAdKdQc"      # A very strong hand
    villain_hand = "7h6h5s4s3d"  # A weak, uncoordinated hand

    print(f"Calculating equity for {hero_hand} vs {villain_hand}...")

    try:
        equity = calculate_plo5_equity(hero_hand, villain_hand)
        
        print(f"\nSimulation complete ({SIMULATION_COUNT} hands).")
        print(f"Hero's Equity: {equity:.2f}%")

    except Exception as e:
        print(f"\n--- ❌ An error occurred ---")
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {e}")