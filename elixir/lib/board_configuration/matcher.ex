defmodule CodeBreaker.BoardConfiguration.Matcher do
  @moduledoc """
  Matching logic for the board
  """

  @doc """
  Given some code and a prediction, returns wheter the
  code was found and a hint.

  ## Examples

      iex> alias CodeBreaker.BoardConfiguration.Matcher
      iex> Matcher.match([1,2,3,4], [1,2,3,4])
      {:found, [:hit, :hit, :hit, :hit]}
      iex> Matcher.match([1,2,3,4], [4,3,2,1])
      {:missed, [:misplaced, :misplaced, :misplaced, :misplaced]}
      iex> Matcher.match([1,2,3,4], [5,6,7,8])
      {:missed, [:none, :none, :none, :none]}
      iex> Matcher.match([1,2,3,4], [2,6,3,4])
      {:missed, [:hit, :hit, :misplaced, :none]}
  """
  def match(code, prediction) do
    Enum.zip(code, prediction)
    |> Enum.map(fn pair -> hint(code, pair) end)
    |> Enum.sort()
    |> format_result()
  end

  defp hint(code, {a, b}) do
    cond do
      a == b -> :hit
      Enum.member?(code, b) -> :misplaced
      true -> :none
    end
  end

  defp format_result([:hit, :hit, :hit, :hit] = hint), do: {:found, hint}
  defp format_result(hint), do: {:missed, hint}
end
