defmodule CodeBreaker.PlayingModes.SinglePlayer do
  @moduledoc """
  This module starts a new instance of a game.
  It defines the defaults for code size and number
  of turns the player has to match the code.
  """

  alias CodeBreaker.BoardConfiguration.Matcher
  alias CodeBreaker.BoardConfiguration.Bag

  @code_size 4
  @max_attempts 5

  def start() do
    bag = Bag.of([1, 2, 3, 4, 5, 6])

    Agent.start_link(
      fn ->
        %{
          bag: bag,
          code: Bag.take(bag, @code_size),
          attempts: @max_attempts
        }
      end,
      name: __MODULE__
    )
  end

  def current_code() do
    Agent.get(__MODULE__, fn %{code: code} -> code end)
  end

  def attempt(guess) do
    game = Agent.get(__MODULE__, fn game -> game end)
    valid? = Bag.contains?(game.bag, guess)
    {status, hint} = Matcher.match(game.code, guess)

    cond do
      not valid? ->
        :invalid

      status == :found ->
        Agent.update(__MODULE__, fn game -> %{game | attempts: 0} end)
        :win

      status == :missed ->
        if game.attempts > 0 do
          Agent.update(__MODULE__, fn game -> %{game | attempts: game.attempts - 1} end)
          {:next, hint}
        else
          {:lose, game.code}
        end
    end
  end
end
