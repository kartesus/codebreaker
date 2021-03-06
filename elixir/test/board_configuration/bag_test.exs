defmodule CodeBreaker.BoardConfiguration.BagTest do
  use ExUnit.Case

  alias CodeBreaker.BoardConfiguration.Bag

  test "takes a shuffled subset of the initial set" do
    bag = Bag.of([1, 2, 3, 4, 5, 6])
    code = Bag.take(bag, 3)

    assert length(code) == 3
    assert Bag.contains?(bag, code)
  end

  test "elements of code should be unique" do
    bag = Bag.of([1, 2, 3, 4, 5, 6])

    assert not Bag.contains?(bag, [1, 1, 1])
  end
end
