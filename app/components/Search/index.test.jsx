import { render, fireEvent, waitFor } from "@testing-library/react";
import Search from "./index";
describe("Search component:", () => {
  test("renders search input and displays the search results:", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Search />);

    // check if input field in the document
    const fieldInput = getByPlaceholderText("Type to search...");
    expect(fieldInput).toBeInTheDocument();

    fireEvent.change(fieldInput, { target: { value: "item" } });
    const searchingMessage = getByText("Searching...");
    expect(searchingMessage).toBeInTheDocument();
    await waitFor(
      () => {
        const resultItem = getByText("item 11");
        expect(resultItem).toBeInTheDocument();
      },
      { timeout: 4000 }
    );

    expect(queryByText("Searching ....")).toBeNull();
  });
});
