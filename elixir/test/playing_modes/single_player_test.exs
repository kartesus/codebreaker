defmodule CodeBreaker.PlayingModes.SinglePlayerTest do
  use ExUnit.Case

  alias CodeBreaker.PlayingModes.SinglePlayer

  test "identifies invalid guesses" do
    SinglePlayer.start()
    assert SinglePlayer.attempt([0, 9, 8, 7]) == :invalid
  end

  test "indetifies winning guesses" do
    SinglePlayer.start()
    assert SinglePlayer.attempt(SinglePlayer.current_code()) == :win
  end

  test "identifies wrong guesses, and gives hint" do
    SinglePlayer.start()
    {status, hint} = SinglePlayer.attempt([1, 2, 3, 4])
    assert status == :next
    assert length(hint) == 4
  end

  test "game ends on the sixth wrong guess, and gives code" do
    SinglePlayer.start()
    SinglePlayer.attempt([1, 2, 3, 4])
    SinglePlayer.attempt([1, 2, 3, 4])
    SinglePlayer.attempt([1, 2, 3, 4])
    SinglePlayer.attempt([1, 2, 3, 4])
    SinglePlayer.attempt([1, 2, 3, 4])
    {status, code} = SinglePlayer.attempt([1, 2, 3, 4])
    assert status == :lose
    assert code == SinglePlayer.current_code()
  end
end
