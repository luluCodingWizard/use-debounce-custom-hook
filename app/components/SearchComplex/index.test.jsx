import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import SearchComplex from "./index";
import mockFetch from "../../../lib/mockFetch";

// Mock the debounce hook
jest.mock("../../hooks/useDebounce", () => jest.fn((value) => value));

jest.mock("../../../lib/mockFetch.js", () => {
  return jest.fn((query) =>
    Promise.resolve(
      ["apple", "banana", "orange", "grape", "strawberry", "watermelon"]
        .filter((item) => item.includes(query))
        .map((item) => ({ title: item }))
    )
  );
});

describe("SearchComplex component:", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockFetch.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("debounce the input and fetch data", async () => {
    render(<SearchComplex />);
    // simulate someone typing in teh field
    fireEvent.change(screen.getByPlaceholderText("Search with debounce..."), {
      target: { value: "a" },
    });

    // fast-roward 500ms
    await act(async () => {
      jest.advanceTimersByTime(500); // debounce the time
    });
    // the mockfetch should be called after the debounce
    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith("a");

    // Now simulate the fetch and update of state
    await act(async () => {
      await mockFetch.mock.results[0].value; // Resolve the fetch promise
    });

    // check the results of my search
    expect(screen.getByText("apple")).toBeInTheDocument();
    expect(screen.getByText("banana")).toBeInTheDocument();
  });
});
