defmodule CodeBreaker.BoardConfiguration.Bag do
  use Agent

  def of(elements) do
    {:ok, bag} = Agent.start_link(fn -> Enum.into(elements, %MapSet{}) end)
    bag
  end

  def take(agent, n) do
    Agent.get(agent, fn elements ->
      elements
      |> Enum.into([])
      |> Enum.shuffle()
      |> Enum.take(n)
    end)
  end

  def contains?(agent, code) do
    Agent.get(agent, fn elements ->
      unique? =
        code
        |> Enum.uniq()
        |> (fn filtered -> filtered == code end).()

      subset? =
        code
        |> Enum.into(%MapSet{})
        |> MapSet.subset?(elements)

      unique? && subset?
    end)
  end
end
