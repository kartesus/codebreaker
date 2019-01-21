# Codebreaker

This is an exercise I use almost like a kata, to practice design
in a controlled environment where the business rules are stable 
and well known.

## How the game works

It can be played in single player mode or one player against the other.

At the beginning of the game the computer will generate sequece of
4 unique numbers from 1 to 6.

Each player has 6 changes to guess the sequence. In multiplayer, each guess
is a turn.

After a guess, the computer shows a hint:
  - `o` for every exact match of a number in the correct position
  - `x` for every number that is part of the sequence, but is in
    the wrong position
  - `-` for every number that isn't in the sequence

So if the sequence is `[1, 2, 3, 4]` 
the guess `[1, 3, 4, 5]` will produce the hint `["o", "x", "x", "-"]`

The hint is always ordered first with every `o`, followed by every `x` and finally all `-`.
So the position of the hint isn't indicative of which number in the sequence is right or wrong.
