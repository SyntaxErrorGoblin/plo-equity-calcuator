import pokerkit as pk
from concurrent.futures import ProcessPoolExecutor

# A constant for the number of simulations to run for accuracy
SIMULATION_COUNT = 1000

def get_equity_vs_random(hero_hand_str: str, executor: ProcessPoolExecutor | None = None) -> float:
    """
    Calculates a hero hand's equity against a single random opponent
    in PLO5 using the built-in pokerkit.analysis.calculate_hand_strength function.
    This function can accept an executor for parallel processing.
    """
    hero_range = pk.parse_range(hero_hand_str)

    # The documentation example for Texas Hold'em uses (pk.StandardHighHand,)
    # for the hand type, which is correct for any standard high-hand game like PLO.
    hand_strength = pk.analysis.calculate_hand_strength(
        player_count=2,
        hole_range=hero_range,
        board_cards=(),
        hole_dealing_count=5,
        board_dealing_count=5,
        deck=pk.Deck.STANDARD,
        hand_types=(pk.StandardHighHand,),
        sample_count=SIMULATION_COUNT,
        executor=executor,  # We pass the executor to the function
    )

    return hand_strength * 100  # Convert to percentage