defmodule CodeBreaker.CLI do
  alias CodeBreaker.PlayingModes.SinglePlayer

  def main(_args) do
    SinglePlayer.start()
    greet()
  end

  defp greet() do
    IO.puts("Welcome to CodeBreaker!")
    IO.puts("You have 6 attempts to break the secret code.")
    IO.puts("The code has 4 unique digits, from 1 to 6\n")
    IO.puts("I'll respond with a hint, where")
    IO.puts("- every 'o' means a digit you guessed correctly")
    IO.puts("- every 'x' means a digit you guessed in the wrong position")
    IO.puts("- every '-' means a digit you got wrong\n")

    ask_for_guess()
  end

  defp ask_for_guess() do
    guess =
      IO.gets("> ")
      |> String.trim()
      |> String.split("", trim: true)
      |> Enum.map(&String.to_integer/1)

    case SinglePlayer.attempt(guess) do
      :invalid ->
        IO.puts("Invalid attempt.")
        IO.puts("The code has 4 unique digits, from 1 to 6\n")
        IO.puts("Try again")
        ask_for_guess()

      {:next, hint} ->
        hint
        |> parse_hint()
        |> IO.puts()

        ask_for_guess()

      :win ->
        IO.puts("YOU WIN :)")

      {:lose, code} ->
        IO.puts("YOU LOSE :(")
        IO.puts("The code was #{Enum.join(code, "")}")
    end
  end

  defp parse_hint(hint) do
    Enum.reduce(hint, "", fn x, acc ->
      case x do
        :hit -> acc <> "o"
        :misplaced -> acc <> "x"
        :none -> acc <> "-"
      end
    end)
  end
end
